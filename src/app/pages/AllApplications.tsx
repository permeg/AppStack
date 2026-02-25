import { Link } from 'react-router';
import { Calendar, FileText, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { MOCK_APPLICATIONS } from '../data/mockData';
import { ApplicationStatus } from '../types';

export default function AllApplications() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Filter and sort applications
  let filteredApps = MOCK_APPLICATIONS;
  if (statusFilter !== 'all') {
    filteredApps = filteredApps.filter((app) => app.status === statusFilter);
  }

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-white">All Applications</h1>
          <p className="text-muted-foreground">
            {filteredApps.length} {filteredApps.length === 1 ? 'application' : 'applications'}
          </p>
        </div>

        <Link
          to="/applications/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          + New Application
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-white">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-white"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="in-review">In Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-white">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-white"
            >
              <option value="date">Date Created</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedApps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/applications/${app.id}`}
              className="block bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-200 hover:translate-y-[-2px]"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="flex-1 text-white">{app.title}</h3>
                <StatusBadge status={app.status} />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(app.dateCreated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>
                    {app.questions.length} {app.questions.length === 1 ? 'question' : 'questions'}
                  </span>
                </div>
              </div>

              {/* Tag Count */}
              {app.questions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {new Set(app.questions.flatMap((q) => q.tags.map((t) => t.id))).size} tags used
                    </span>
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedApps.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl mb-2 text-white">No applications found</h3>
          <p className="text-muted-foreground mb-6">
            {statusFilter !== 'all'
              ? 'Try adjusting your filters or create a new application.'
              : 'Get started by creating your first application log.'}
          </p>
          <Link
            to="/applications/new"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Application
          </Link>
        </div>
      )}
    </div>
  );
}