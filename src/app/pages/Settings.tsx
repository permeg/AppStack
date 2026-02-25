export default function Settings() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-white">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl mb-4 text-white">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-2">Name</label>
              <input
                type="text"
                defaultValue="Student User"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-2">Email</label>
              <input
                type="email"
                defaultValue="student@university.edu"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-white"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl mb-4 text-white">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your applications
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Auto-save Drafts</p>
                <p className="text-sm text-muted-foreground">
                  Automatically save your work
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl mb-4 text-white">Data Management</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Export your application data or delete your account
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Export Data
              </button>
              <button className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl mb-4 text-white">About AppArchive</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
            <p>© 2026 AppArchive</p>
            <p className="pt-4">
              AppArchive helps you organize and reuse your application responses efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}