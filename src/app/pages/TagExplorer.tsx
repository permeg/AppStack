import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { X, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { TagChip } from '../components/TagChip';
import { MOCK_APPLICATIONS, TAGS } from '../data/mockData';
import { Tag } from '../types';

export default function TagExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilterId = searchParams.get('filter');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    initialFilterId ? new Set([initialFilterId]) : new Set()
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tags by search
  const filteredTags = TAGS.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get responses filtered by selected tags
  const filteredResponses = useMemo(() => {
    const responses: Array<{
      questionId: string;
      question: string;
      response: string;
      tags: Tag[];
      applicationTitle: string;
      applicationId: string;
    }> = [];

    MOCK_APPLICATIONS.forEach((app) => {
      app.questions.forEach((q) => {
        if (selectedTags.size === 0) {
          // Show all if no tags selected
          responses.push({
            questionId: q.id,
            question: q.question,
            response: q.response,
            tags: q.tags,
            applicationTitle: app.title,
            applicationId: app.id,
          });
        } else {
          // Check if question has any of the selected tags
          const hasTag = q.tags.some((tag) => selectedTags.has(tag.id));
          if (hasTag) {
            responses.push({
              questionId: q.id,
              question: q.question,
              response: q.response,
              tags: q.tags,
              applicationTitle: app.title,
              applicationId: app.id,
            });
          }
        }
      });
    });

    return responses;
  }, [selectedTags]);

  const toggleTag = (tagId: string) => {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(tagId)) {
      newSelected.delete(tagId);
    } else {
      newSelected.add(tagId);
    }
    setSelectedTags(newSelected);
    
    // Update URL
    if (newSelected.size === 1) {
      setSearchParams({ filter: Array.from(newSelected)[0] });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedTags(new Set());
    setSearchParams({});
  };

  // Group responses by application
  const responsesByApp = useMemo(() => {
    const grouped = new Map<string, typeof filteredResponses>();
    filteredResponses.forEach((response) => {
      const existing = grouped.get(response.applicationId) || [];
      grouped.set(response.applicationId, [...existing, response]);
    });
    return grouped;
  }, [filteredResponses]);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-white">Tag Explorer</h1>
        <p className="text-muted-foreground">
          Filter and explore your responses by tags
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Tag List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-5 sticky top-6">
            <h2 className="text-lg mb-4 text-white">Tags</h2>

            {/* Search Tags */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-white placeholder:text-muted-foreground"
              />
            </div>

            {/* Tag List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredTags.map((tag) => {
                const isSelected = selectedTags.has(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/30 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-sm flex-1 text-white">{tag.name}</span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-primary-foreground"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Filtered Responses */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filters */}
          {selectedTags.size > 0 && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white">Active Filters:</span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedTags).map((tagId) => {
                  const tag = TAGS.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <TagChip
                      key={tag.id}
                      name={tag.name}
                      color={tag.color}
                      removable
                      onRemove={() => toggleTag(tag.id)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredResponses.length} {filteredResponses.length === 1 ? 'response' : 'responses'} found
          </div>

          {/* Grouped Results */}
          <div className="space-y-6">
            {Array.from(responsesByApp.entries()).map(([appId, responses]) => (
              <motion.div
                key={appId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <Link
                  to={`/applications/${appId}`}
                  className="text-xl hover:text-primary transition-colors mb-4 inline-block text-white"
                >
                  {responses[0].applicationTitle}
                </Link>

                <div className="space-y-4">
                  {responses.map((response) => (
                    <div
                      key={response.questionId}
                      className="p-4 bg-secondary/30 rounded-lg border border-border/50"
                    >
                      <h4 className="mb-3 text-white">{response.question}</h4>
                      <p className="text-white text-sm mb-3 leading-relaxed line-clamp-3">
                        {response.response}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {response.tags.map((tag) => (
                          <TagChip
                            key={tag.id}
                            name={tag.name}
                            color={tag.color}
                            onClick={() => toggleTag(tag.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResponses.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl mb-2 text-white">No responses found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting different tags or clearing your filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}