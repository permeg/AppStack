import { useParams, Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Calendar, Edit2, Plus, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StatusBadge } from '../components/StatusBadge';
import { TagChip } from '../components/TagChip';
import { MOCK_APPLICATIONS } from '../data/mockData';

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = MOCK_APPLICATIONS.find((app) => app.id === id);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  if (!application) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-white">Application not found</h2>
          <Link to="/" className="text-primary hover:text-primary/80">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const copyResponse = (response: string) => {
    navigator.clipboard.writeText(response);
    // Could add a toast notification here
  };

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <Link
        to="/applications"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl mb-3 text-white">{application.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Created {new Date(application.dateCreated).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{application.questions.length} questions</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={application.status} />
            <button
              onClick={() => navigate(`/applications/${id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {application.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-200"
            >
              {/* Question Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleQuestion(question.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 text-white">{question.question}</h3>
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag) => (
                            <TagChip key={tag.id} name={tag.name} color={tag.color} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyResponse(question.response);
                    }}
                    className="flex-shrink-0 p-2 hover:bg-secondary rounded-lg transition-colors"
                    title="Copy response"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Response - Always visible */}
                <div className="ml-11">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                    <p className="text-white leading-relaxed whitespace-pre-wrap">
                      {question.response}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Question Button */}
      <button className="w-full py-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-secondary/30 transition-all duration-200 flex items-center justify-center gap-2 text-muted-foreground hover:text-white">
        <Plus className="w-5 h-5" />
        Add Question
      </button>
    </div>
  );
}