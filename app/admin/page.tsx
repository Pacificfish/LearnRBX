import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/supabase/server';
import { Upload } from 'lucide-react';

export default async function AdminPage() {
  const user = await getUser();

  // Simple admin check - in production, you'd check a role or specific emails
  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Manage lessons and challenges</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Lesson</CardTitle>
            <CardDescription>Add MDX lesson content and challenge configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="track" className="block text-sm font-medium mb-2">
                Track
              </label>
              <select
                id="track"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Core Luau & Roblox Basics</option>
                <option>Gameplay Scripting</option>
                <option>UI Scripting</option>
              </select>
            </div>

            <div>
              <label htmlFor="module" className="block text-sm font-medium mb-2">
                Module
              </label>
              <input
                id="module"
                type="text"
                placeholder="Language Basics"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="lesson-title" className="block text-sm font-medium mb-2">
                Lesson Title
              </label>
              <input
                id="lesson-title"
                type="text"
                placeholder="Variables & Printing"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="mdx-file" className="block text-sm font-medium mb-2">
                MDX Content File
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <input type="file" id="mdx-file" accept=".mdx,.md" className="hidden" />
                <label
                  htmlFor="mdx-file"
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  Click to upload MDX file
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="challenge-file" className="block text-sm font-medium mb-2">
                Challenge JSON File
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <input type="file" id="challenge-file" accept=".json" className="hidden" />
                <label
                  htmlFor="challenge-file"
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  Click to upload challenge JSON
                </label>
              </div>
            </div>

            <Button className="w-full">Create Lesson</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Lessons</CardTitle>
            <CardDescription>Manage existing content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              No lessons yet. Upload your first lesson to get started.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

