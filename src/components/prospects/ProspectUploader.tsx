import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileCheck, AlertCircle } from "lucide-react";

interface ProspectUploaderProps {
  onUpload?: (file: File) => void;
  onUrlsAdd?: (urls: string[]) => void;
  isLoading?: boolean;
  error?: string;
}

const ProspectUploader = ({
  onUpload = () => {},
  onUrlsAdd = () => {},
  isLoading = false,
  error = "",
}: ProspectUploaderProps) => {
  const [urls, setUrls] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulated upload progress
  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "text/csv") {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    simulateProgress();
    onUpload(file);
  };

  const handleUrlsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlList = urls.split("\n").filter((url) => url.trim());
    onUrlsAdd(urlList);
    setUrls("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-white">
      {/* CSV Upload Section */}
      <Card className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <div className="text-lg font-medium mb-2">
            Drag and drop your CSV file here
          </div>
          <div className="text-sm text-gray-500 mb-4">
            or click to select a file
          </div>
          <Input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Select CSV File
            </label>
          </Button>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {uploadProgress === 100 && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <FileCheck className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              File uploaded successfully!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mt-4 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* LinkedIn URLs Section */}
      <Card className="p-6">
        <form onSubmit={handleUrlsSubmit}>
          <Label htmlFor="linkedin-urls">LinkedIn Profile URLs</Label>
          <div className="mt-2">
            <textarea
              id="linkedin-urls"
              className="min-h-[100px] w-full rounded-md border border-gray-300 p-2 text-sm"
              placeholder="Paste LinkedIn URLs (one per line)"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={isLoading}>
            Add URLs
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProspectUploader;
