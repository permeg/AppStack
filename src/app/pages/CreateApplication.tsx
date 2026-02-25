import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { TagChip } from '../components/TagChip';
import { TAGS } from '../data/mockData';
import { ApplicationStatus, Tag } from '../types';
import supabase from '../../supabase-client';

interface QuestionForm {
  id: string;
  question: string;
  response: string;
  tags: Tag[];
}

const addApplication = async (
  title: string,
  status: ApplicationStatus,
  dateCreated: string,
  questions: QuestionForm[]
) => {
  const { data, error } = await supabase
    .from('ApplicationLogs')
    .insert([
      {
        title,
        status,
        date_created: dateCreated,
        questions: questions,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchApplications = async () => {
  const { data, error } = await supabase.from('ApplicationLogs').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default function CreateApplication() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('draft');
  const [dateCreated, setDateCreated] = useState(new Date().toISOString().split('T')[0]);
  const [questions, setQuestions] = useState<QuestionForm[]>([
    { id: '1', question: '', response: '', tags: [] },
  ]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        await fetchApplications();
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };
    loadApplications();
  }, []);

  const addQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([...questions, { id: newId, question: '', response: '', tags: [] }]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof QuestionForm, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addTagToQuestion = (questionId: string, tag: Tag) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          // Check if tag already exists
          if (q.tags.find((t) => t.id === tag.id)) {
            return q;
          }
          return { ...q, tags: [...q.tags, tag] };
        }
        return q;
      })
    );
  };

  const removeTagFromQuestion = (questionId: string, tagId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, tags: q.tags.filter((t) => t.id !== tagId) };
        }
        return q;
      })
    );
  };

  const handleSave = async () => {
    try {
      await addApplication(title, status, dateCreated, questions);
      navigate('/applications');
    } catch (error) {
      console.error('Failed to save application:', error);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        <h1 className="text-3xl text-white">Create New Application</h1>
      </div>

      {/* Main Form */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">
              Application Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Google Software Engineering Internship"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-white placeholder:text-muted-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-white"
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="in-review">In Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Date Created</label>
              <input
                type="date"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <h2 className="text-xl text-white">Questions & Responses</h2>

        {questions.map((question, index) => (
          <div key={question.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <h3 className="text-white">Question {index + 1}</h3>
              </div>
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Question</label>
              <textarea
                value={question.question}
                onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                placeholder="Enter the application question..."
                rows={2}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-white placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Your Response</label>
              <textarea
                value={question.response}
                onChange={(e) => updateQuestion(question.id, 'response', e.target.value)}
                placeholder="Enter your response..."
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-white placeholder:text-muted-foreground"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-white mb-2">Tags</label>
              
              {/* Selected Tags */}
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag) => (
                    <TagChip
                      key={tag.id}
                      name={tag.name}
                      color={tag.color}
                      removable
                      onRemove={() => removeTagFromQuestion(question.id, tag.id)}
                    />
                  ))}
                </div>
              )}

              {/* Tag Selector */}
              <div className="flex flex-wrap gap-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
                {TAGS.map((tag) => {
                  const isSelected = question.tags.find((t) => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() =>
                        isSelected
                          ? removeTagFromQuestion(question.id, tag.id)
                          : addTagToQuestion(question.id, tag)
                      }
                      className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                        isSelected
                          ? 'opacity-40 hover:opacity-60'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        border: `1px solid ${tag.color}40`,
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="w-full py-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-secondary/30 transition-all duration-200 flex items-center justify-center gap-2 text-muted-foreground hover:text-white"
        >
          <Plus className="w-5 h-5" />
          Add Another Question
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          to="/applications"
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Application
        </button>
      </div>
    </div>
  );
}