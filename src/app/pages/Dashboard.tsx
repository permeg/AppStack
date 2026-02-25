import { Link } from 'react-router';
import { FileText, Tag, FolderOpen, Calendar, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { TagChip } from '../components/TagChip';
import { MOCK_APPLICATIONS, TAGS } from '../data/mockData';

export default function Dashboard() {
  // Calculate stats
  const totalApplications = MOCK_APPLICATIONS.length;
  const totalQuestions = MOCK_APPLICATIONS.reduce((sum, app) => sum + app.questions.length, 0);
  const uniqueTags = new Set(
    MOCK_APPLICATIONS.flatMap((app) => 
      app.questions.flatMap((q) => q.tags.map((t) => t.id))
    )
  ).size;

  // Get recent applications
  const recentApplications = [...MOCK_APPLICATIONS]
    .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    .slice(0, 5);

  // Get most used tags
  const tagUsage = new Map<string, { tag: typeof TAGS[0]; count: number }>();
  MOCK_APPLICATIONS.forEach((app) => {
    app.questions.forEach((q) => {
      q.tags.forEach((tag) => {
        const existing = tagUsage.get(tag.id);
        if (existing) {
          existing.count++;
        } else {
          tagUsage.set(tag.id, { tag, count: 1 });
        }
      });
    });
  });
  const mostUsedTags = Array.from(tagUsage.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-white">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your application responses.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FolderOpen className="w-6 h-6" />}
          label="Total Applications"
          value={totalApplications}
          trend="+2 this month"
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label="Total Responses"
          value={totalQuestions}
          trend="Across all applications"
        />
        <StatCard
          icon={<Tag className="w-6 h-6" />}
          label="Tags Created"
          value={uniqueTags}
          trend="Keep organizing!"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Recent Applications</h2>
              <Link
                to="/applications"
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentApplications.map((app) => (
                <Link
                  key={app.id}
                  to={`/applications/${app.id}`}
                  className="block p-4 bg-secondary/50 border border-border rounded-lg hover:border-primary/30 transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 truncate text-white">{app.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(app.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{app.questions.length} questions</span>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Most Used Tags */}
        <div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Popular Tags</h2>
              <Link
                to="/tags"
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
              >
                Explore
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {mostUsedTags.map(({ tag, count }) => (
                <Link
                  key={tag.id}
                  to={`/tags?filter=${tag.id}`}
                  className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-lg hover:border-primary/30 transition-all duration-200"
                >
                  <TagChip name={tag.name} color={tag.color} />
                  <span className="text-sm text-muted-foreground">
                    {count} {count === 1 ? 'use' : 'uses'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-4/10 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg mb-2 text-white">💡 Pro Tip</h3>
        <p className="text-muted-foreground">
          Tag your responses consistently to find and reuse them quickly. Try tagging by theme
          (Leadership, Teamwork) or by application type (Internship, Scholarship).
        </p>
      </div>
    </div>
  );
}