import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Briefcase, Filter } from "lucide-react";

const JobAutomation = () => {
  const [resume, setResume] = useState<File | null>(null);

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Job Application Automation
          </h2>
          <p className="text-muted-foreground">
            Automate your job applications with AI-powered matching
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Resume</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                PDF or DOCX (Max 5MB)
              </p>
              <Button variant="outline">Select Resume</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Search Keywords</Label>
            <Input placeholder="e.g., Software Engineer, React, Remote" />
          </div>

          <div className="space-y-2">
            <Label>Location Preferences</Label>
            <Input placeholder="e.g., San Francisco, CA or Remote" />
          </div>

          <div className="space-y-2">
            <Label>Custom Cover Letter Template</Label>
            <Textarea
              placeholder="Dear {hiring_manager},\n\nI am writing to express my interest in the {job_title} position at {company}..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium">Automation Settings</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-apply to matching jobs</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically apply when job matches your criteria
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Easy Apply only</Label>
                <p className="text-sm text-muted-foreground">
                  Only apply to jobs with LinkedIn Easy Apply
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily application limit</Label>
                <p className="text-sm text-muted-foreground">
                  Maximum applications per day
                </p>
              </div>
              <Input type="number" className="w-20" defaultValue={25} />
            </div>
          </div>

          <Button className="w-full">
            <Briefcase className="w-4 h-4 mr-2" />
            Start Job Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobAutomation;
