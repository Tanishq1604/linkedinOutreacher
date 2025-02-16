import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, Plus, Variable, HelpCircle } from "lucide-react";

interface TemplateEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  variables?: string[];
}

const TemplateEditor = ({
  initialContent = "Hi {firstName},\n\nI noticed you work at {company} and I thought we could connect...\n\nBest regards,\n{myName}",
  onSave = () => {},
  variables = ["firstName", "company", "myName", "title", "industry"],
}: TemplateEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [templateName, setTemplateName] = useState("New Template");

  const insertVariable = (variable: string) => {
    setContent((prev) => `${prev}{${variable}}`);
  };

  return (
    <div className="w-full h-full min-h-[600px] bg-background p-6">
      <Card className="h-full">
        <div className="flex flex-col h-full p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1 mr-4">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>
            <Button onClick={() => onSave(content)} className="self-end">
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>

          <div className="flex-1 flex gap-4">
            <div className="flex-1">
              <Label className="mb-2 block">Message Content</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] font-mono"
                placeholder="Write your message template here..."
              />
            </div>

            <div className="w-48">
              <div className="flex items-center justify-between mb-2">
                <Label>Variables</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to insert variables into your template</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ScrollArea className="h-[400px] border rounded-md p-2">
                <div className="space-y-2">
                  {variables.map((variable) => (
                    <Button
                      key={variable}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => insertVariable(variable)}
                    >
                      <Variable className="w-4 h-4 mr-2" />
                      {variable}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variable
                  </Button>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex-1">{content.length} characters</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TemplateEditor;
