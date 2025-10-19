"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GitBranch,
  GitPullRequest,
  Sparkles,
  Eye,
  Send,
  RefreshCw,
  Plus,
  Minus,
  FileText,
  Users,
  Tag,
} from "lucide-react";

const mockDiff = [
  {
    file: "src/components/auth/LoginForm.tsx",
    additions: 23,
    deletions: 5,
    changes: [
      {
        type: "addition",
        line: 15,
        content: "+ const [isLoading, setIsLoading] = useState(false)",
      },
      {
        type: "addition",
        line: 16,
        content: "+ const [error, setError] = useState('')",
      },
      {
        type: "deletion",
        line: 18,
        content: "- const handleSubmit = (e) => {",
      },
      {
        type: "addition",
        line: 18,
        content: "+ const handleSubmit = async (e: FormEvent) => {",
      },
      { type: "addition", line: 19, content: "+   setIsLoading(true)" },
      { type: "addition", line: 20, content: "+   setError('')" },
    ],
  },
  {
    file: "src/utils/api.ts",
    additions: 12,
    deletions: 2,
    changes: [
      {
        type: "addition",
        line: 8,
        content: "+ export interface LoginResponse {",
      },
      { type: "addition", line: 9, content: "+   token: string" },
      { type: "addition", line: 10, content: "+   user: User" },
      { type: "addition", line: 11, content: "+ }" },
      { type: "deletion", line: 25, content: "- return response.json()" },
      {
        type: "addition",
        line: 25,
        content: "+ return response.json() as Promise<LoginResponse>",
      },
    ],
  },
];

const aiSuggestions = {
  title: "Add TypeScript support and error handling to authentication system",
  description: `## Summary
This PR introduces comprehensive TypeScript support to the authentication system and implements robust error handling mechanisms.

## Changes Made
- **Enhanced LoginForm component**: Added proper TypeScript types and loading states
- **Improved API utilities**: Added type definitions for API responses
- **Error handling**: Implemented user-friendly error messages and loading indicators

## Testing
- ✅ Unit tests updated for new TypeScript interfaces
- ✅ Integration tests pass with new error handling
- ✅ Manual testing completed on login flow

## Breaking Changes
None - all changes are backward compatible.

## Related Issues
Closes #123, #124`,
  tags: ["enhancement", "typescript", "authentication"],
  reviewers: ["jane-smith", "tech-lead"],
};

export function PREditorContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("main");
  const [isGenerating, setIsGenerating] = useState(false);
  const [useAISuggestion, setUseAISuggestion] = useState(false);

  const handleGenerateAIDraft = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setTitle(aiSuggestions.title);
      setDescription(aiSuggestions.description);
      setUseAISuggestion(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmitPR = () => {
    // Handle PR submission
    console.log("Submitting PR:", {
      title,
      description,
      selectedRepo,
      selectedBranch,
      targetBranch,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            PR Editor
          </h1>
          <p className="text-muted-foreground text-pretty">
            Create and manage your Pull Requests with AI assistance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSubmitPR} className="gap-2">
            <Send className="h-4 w-4" />
            Submit PR
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - PR Form */}
        <div className="space-y-6">
          {/* Repository Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Repository & Branch
              </CardTitle>
              <CardDescription>
                Select the repository and branches for your PR
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repository">Repository</Label>
                  <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select repository" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-app">web-app</SelectItem>
                      <SelectItem value="mobile-ui">mobile-ui</SelectItem>
                      <SelectItem value="api-backend">api-backend</SelectItem>
                      <SelectItem value="docs">docs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Source Branch</Label>
                  <Select
                    value={selectedBranch}
                    onValueChange={setSelectedBranch}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature/auth-system">
                        feature/auth-system
                      </SelectItem>
                      <SelectItem value="feature/ui-improvements">
                        feature/ui-improvements
                      </SelectItem>
                      <SelectItem value="bugfix/login-issue">
                        bugfix/login-issue
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Merging into</span>
                <Badge variant="outline">{targetBranch}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* PR Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GitPullRequest className="h-5 w-5" />
                  Pull Request Details
                </CardTitle>
                <CardDescription>
                  Provide title and description for your PR
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateAIDraft}
                disabled={isGenerating}
                className="gap-2 bg-transparent"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                AI Draft
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your changes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of your changes..."
                  className="min-h-[200px] font-mono text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {useAISuggestion && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    AI-Generated Content
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This content was generated based on your code changes. Feel
                    free to edit as needed.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Reviewers & Labels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Reviewers</Label>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.reviewers.map((reviewer) => (
                    <Badge key={reviewer} variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {reviewer}
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 gap-1 bg-transparent"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Labels</Label>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 gap-1 bg-transparent"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Code Diff */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Code Changes
              </CardTitle>
              <CardDescription>
                Review the changes in your branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diff" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="diff">Diff View</TabsTrigger>
                  <TabsTrigger value="files">Files Changed</TabsTrigger>
                </TabsList>
                <TabsContent value="diff" className="space-y-4">
                  <ScrollArea className="h-[600px] w-full">
                    {mockDiff.map((file, index) => (
                      <div key={index} className="space-y-2 mb-6">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                          <span className="font-mono text-sm font-medium">
                            {file.file}
                          </span>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1 text-secondary">
                              <Plus className="h-3 w-3" />
                              {file.additions}
                            </span>
                            <span className="flex items-center gap-1 text-destructive">
                              <Minus className="h-3 w-3" />
                              {file.deletions}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1 font-mono text-xs">
                          {file.changes.map((change, changeIndex) => (
                            <div
                              key={changeIndex}
                              className={`px-3 py-1 ${
                                change.type === "addition"
                                  ? "bg-secondary/20 text-secondary-foreground"
                                  : "bg-destructive/20 text-destructive-foreground"
                              }`}
                            >
                              <span className="text-muted-foreground mr-4">
                                {change.line}
                              </span>
                              {change.content}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="files" className="space-y-2">
                  {mockDiff.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="font-mono text-sm">{file.file}</span>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="secondary" className="gap-1">
                          <Plus className="h-3 w-3" />
                          {file.additions}
                        </Badge>
                        <Badge variant="destructive" className="gap-1">
                          <Minus className="h-3 w-3" />
                          {file.deletions}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
