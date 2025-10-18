"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  GitPullRequest,
  GitMerge,
  MessageSquare,
  Sparkles,
  Clock,
  XCircle,
  Search,
  Filter,
  Calendar,
  User,
  Code,
  Eye,
  ExternalLink,
} from "lucide-react";

const activityData = [
  {
    id: 1,
    type: "pr_created",
    title: "Created PR: Add user authentication system",
    repository: "web-app",
    author: "john-doe",
    timestamp: "2024-01-15T10:30:00Z",
    status: "merged",
    aiGenerated: true,
    description:
      "AI generated comprehensive PR description with security considerations",
    prNumber: 123,
    url: "https://github.com/company/web-app/pull/123",
  },
  {
    id: 2,
    type: "ai_review",
    title: "AI Review: Potential security vulnerability detected",
    repository: "web-app",
    author: "pull-mate-ai",
    timestamp: "2024-01-15T09:45:00Z",
    status: "warning",
    aiGenerated: true,
    description:
      "Detected potential SQL injection vulnerability in user input handling",
    prNumber: 122,
    url: "https://github.com/company/web-app/pull/122",
  },
  {
    id: 3,
    type: "pr_merged",
    title: "Merged PR: Fix responsive layout issues",
    repository: "mobile-ui",
    author: "jane-smith",
    timestamp: "2024-01-15T08:20:00Z",
    status: "success",
    aiGenerated: false,
    description: "Successfully merged responsive layout fixes",
    prNumber: 45,
    url: "https://github.com/company/mobile-ui/pull/45",
  },
  {
    id: 4,
    type: "pr_review",
    title: "Reviewed PR: Update API documentation",
    repository: "api-docs",
    author: "tech-lead",
    timestamp: "2024-01-14T16:15:00Z",
    status: "approved",
    aiGenerated: false,
    description: "Approved documentation updates with minor suggestions",
    prNumber: 67,
    url: "https://github.com/company/api-docs/pull/67",
  },
  {
    id: 5,
    type: "ai_suggestion",
    title: "AI Suggestion: Code optimization opportunity",
    repository: "backend",
    author: "pull-mate-ai",
    timestamp: "2024-01-14T14:30:00Z",
    status: "info",
    aiGenerated: true,
    description: "Suggested performance improvements for database queries",
    prNumber: 89,
    url: "https://github.com/company/backend/pull/89",
  },
  {
    id: 6,
    type: "pr_closed",
    title: "Closed PR: Experimental feature branch",
    repository: "web-app",
    author: "dev-team",
    timestamp: "2024-01-14T12:00:00Z",
    status: "closed",
    aiGenerated: false,
    description: "Closed experimental feature that was not approved",
    prNumber: 121,
    url: "https://github.com/company/web-app/pull/121",
  },
  {
    id: 7,
    type: "pr_created",
    title: "Created PR: Implement dark mode support",
    repository: "design-system",
    author: "ui-designer",
    timestamp: "2024-01-13T15:45:00Z",
    status: "review",
    aiGenerated: true,
    description:
      "AI-assisted PR creation for comprehensive dark mode implementation",
    prNumber: 34,
    url: "https://github.com/company/design-system/pull/34",
  },
  {
    id: 8,
    type: "ai_review",
    title: "AI Review: Code quality improvements suggested",
    repository: "mobile-ui",
    author: "pull-mate-ai",
    timestamp: "2024-01-13T11:20:00Z",
    status: "info",
    aiGenerated: true,
    description:
      "Suggested improvements for code maintainability and readability",
    prNumber: 44,
    url: "https://github.com/company/mobile-ui/pull/44",
  },
];

function getActivityIcon(type: string) {
  switch (type) {
    case "pr_created":
      return <GitPullRequest className="h-4 w-4" />;
    case "pr_merged":
      return <GitMerge className="h-4 w-4" />;
    case "pr_review":
      return <MessageSquare className="h-4 w-4" />;
    case "ai_review":
    case "ai_suggestion":
      return <Sparkles className="h-4 w-4" />;
    case "pr_closed":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "merged":
    case "success":
    case "approved":
      return "bg-secondary text-secondary-foreground";
    case "review":
    case "info":
      return "bg-primary text-primary-foreground";
    case "warning":
      return "bg-yellow-500 text-yellow-50";
    case "closed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return "1 day ago";
  return `${Math.floor(diffInHours / 24)} days ago`;
}

export function ActivityLogContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredActivities = activityData.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRepo =
      selectedRepo === "all" || activity.repository === selectedRepo;
    const matchesType =
      selectedType === "all" || activity.type === selectedType;

    if (selectedTab === "ai")
      return (
        matchesSearch && matchesRepo && matchesType && activity.aiGenerated
      );
    if (selectedTab === "manual")
      return (
        matchesSearch && matchesRepo && matchesType && !activity.aiGenerated
      );

    return matchesSearch && matchesRepo && matchesType;
  });

  const repositories = Array.from(
    new Set(activityData.map((activity) => activity.repository))
  );
  const activityTypes = Array.from(
    new Set(activityData.map((activity) => activity.type))
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Activity Log
          </h1>
          <p className="text-muted-foreground text-pretty">
            Track all your Pull Request activities and AI-generated insights.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All repositories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All repositories</SelectItem>
            {repositories.map((repo) => (
              <SelectItem key={repo} value={repo}>
                {repo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="pr_created">PR Created</SelectItem>
            <SelectItem value="pr_merged">PR Merged</SelectItem>
            <SelectItem value="pr_review">PR Review</SelectItem>
            <SelectItem value="ai_review">AI Review</SelectItem>
            <SelectItem value="ai_suggestion">AI Suggestion</SelectItem>
            <SelectItem value="pr_closed">PR Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="ai">AI Generated</TabsTrigger>
          <TabsTrigger value="manual">Manual Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                All Pull Request activities and AI interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full pr-4">
                <div className="space-y-4">
                  {filteredActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 rounded-lg border p-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-balance">
                            {activity.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {activity.aiGenerated && (
                              <Badge variant="outline" className="gap-1">
                                <Sparkles className="h-3 w-3" />
                                AI
                              </Badge>
                            )}
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Code className="h-3 w-3" />
                          <span>{activity.repository}</span>
                          <span>•</span>
                          <User className="h-3 w-3" />
                          <span>{activity.author}</span>
                          <span>•</span>
                          <span>{formatTimestamp(activity.timestamp)}</span>
                          {activity.prNumber && (
                            <>
                              <span>•</span>
                              <span>#{activity.prNumber}</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground text-pretty">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 gap-1 text-xs"
                          >
                            <Eye className="h-3 w-3" />
                            View Details
                          </Button>
                          {activity.url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="h-6 gap-1 text-xs"
                            >
                              <a
                                href={activity.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3" />
                                GitHub
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI-Generated Activity
              </CardTitle>
              <CardDescription>
                Activities powered by Pull-Mate AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full pr-4">
                <div className="space-y-4">
                  {filteredActivities
                    .filter((activity) => activity.aiGenerated)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 rounded-lg border p-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Sparkles className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-balance">
                              {activity.title}
                            </h4>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Code className="h-3 w-3" />
                            <span>{activity.repository}</span>
                            <span>•</span>
                            <span>{formatTimestamp(activity.timestamp)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground text-pretty">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Manual Actions
              </CardTitle>
              <CardDescription>
                User-initiated activities and reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full pr-4">
                <div className="space-y-4">
                  {filteredActivities
                    .filter((activity) => !activity.aiGenerated)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 rounded-lg border p-4"
                      >
                        <div className="flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/abstract-geometric-shapes.png?height=32&width=32&query=${activity.author}`}
                            />
                            <AvatarFallback>
                              {activity.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-balance">
                              {activity.title}
                            </h4>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Code className="h-3 w-3" />
                            <span>{activity.repository}</span>
                            <span>•</span>
                            <span>{activity.author}</span>
                            <span>•</span>
                            <span>{formatTimestamp(activity.timestamp)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground text-pretty">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
