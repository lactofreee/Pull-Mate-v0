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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  BookOpen,
  Zap,
  Code,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Copy,
  CheckCircle,
  Sparkles,
  Github,
} from "lucide-react";

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { id: "introduction", title: "Introduction to Pull-Mate", type: "guide" },
      { id: "setup", title: "Initial Setup", type: "guide" },
      { id: "first-pr", title: "Creating Your First PR", type: "tutorial" },
      { id: "github-integration", title: "GitHub Integration", type: "guide" },
    ],
  },
  {
    id: "features",
    title: "Features",
    icon: Zap,
    items: [
      { id: "ai-assistant", title: "AI Assistant", type: "guide" },
      { id: "pr-editor", title: "PR Editor", type: "guide" },
      { id: "code-review", title: "Automated Code Review", type: "guide" },
      { id: "activity-tracking", title: "Activity Tracking", type: "guide" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    icon: Code,
    items: [
      { id: "authentication", title: "Authentication", type: "api" },
      { id: "endpoints", title: "API Endpoints", type: "api" },
      { id: "webhooks", title: "Webhooks", type: "api" },
      { id: "rate-limits", title: "Rate Limits", type: "api" },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Settings,
    items: [
      { id: "ai-settings", title: "AI Settings", type: "guide" },
      { id: "notifications", title: "Notifications", type: "guide" },
      { id: "team-setup", title: "Team Setup", type: "guide" },
      { id: "custom-prompts", title: "Custom Prompts", type: "advanced" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Help & Support",
    icon: HelpCircle,
    items: [
      { id: "faq", title: "Frequently Asked Questions", type: "help" },
      { id: "common-issues", title: "Common Issues", type: "help" },
      { id: "contact", title: "Contact Support", type: "help" },
      { id: "changelog", title: "Changelog", type: "info" },
    ],
  },
];

const examplePRs = [
  {
    title: "Feature: User Authentication System",
    description: "Complete authentication implementation with JWT tokens",
    code: `## Summary
This PR implements a comprehensive user authentication system using JWT tokens and secure session management.

## Changes Made
- Added JWT token generation and validation
- Implemented secure password hashing with bcrypt
- Created login/logout endpoints
- Added middleware for protected routes
- Updated user model with authentication fields

## Testing
- ✅ Unit tests for authentication functions
- ✅ Integration tests for login/logout flow
- ✅ Security testing for token validation

## Breaking Changes
None - all changes are backward compatible.`,
    tags: ["authentication", "security", "backend"],
  },
  {
    title: "Fix: Responsive Layout Issues",
    description: "Resolves CSS grid layout problems on mobile devices",
    code: `## Summary
Fixed responsive layout issues affecting mobile and tablet users.

## Changes Made
- Updated CSS Grid implementation for better mobile support
- Fixed flexbox alignment issues in navigation
- Improved touch target sizes for mobile interaction
- Added responsive breakpoints for tablet view

## Testing
- ✅ Tested on iOS Safari, Chrome Mobile, Firefox Mobile
- ✅ Verified tablet landscape/portrait modes
- ✅ Accessibility testing with screen readers

## Screenshots
[Before/After screenshots would be included here]`,
    tags: ["ui", "responsive", "mobile"],
  },
];

function getTypeColor(type: string) {
  switch (type) {
    case "guide":
      return "bg-primary text-primary-foreground";
    case "tutorial":
      return "bg-secondary text-secondary-foreground";
    case "api":
      return "bg-purple-500 text-white";
    case "advanced":
      return "bg-orange-500 text-white";
    case "help":
      return "bg-blue-500 text-white";
    case "info":
      return "bg-gray-500 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function DocsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("getting-started");
  const [selectedItem, setSelectedItem] = useState("introduction");
  const [openSections, setOpenSections] = useState<string[]>([
    "getting-started",
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="flex-1 flex">
      {/* Sidebar Navigation */}
      <div className="w-80 border-r bg-muted/30 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Documentation</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {filteredSections.map((section) => (
                <Collapsible
                  key={section.id}
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {openSections.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1">
                    {section.items.map((item) => (
                      <Button
                        key={item.id}
                        variant={
                          selectedItem === item.id ? "secondary" : "ghost"
                        }
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          setSelectedSection(section.id);
                          setSelectedItem(item.id);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{item.title}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getTypeColor(item.type)}`}
                          >
                            {item.type}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="max-w-4xl space-y-8">
            {selectedItem === "introduction" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-balance mb-4">
                    Welcome to Pull-Mate
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty">
                    Your AI-powered Pull Request assistant that streamlines code
                    review and collaboration.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      What is Pull-Mate?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-pretty">
                      Pull-Mate is an intelligent assistant that helps
                      developers create better Pull Requests faster. Using
                      advanced AI, it analyzes your code changes and generates
                      comprehensive PR descriptions, suggests improvements, and
                      automates routine review tasks.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Features</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• AI-generated PR descriptions</li>
                          <li>• Automated code review</li>
                          <li>• Smart suggestions</li>
                          <li>• Activity tracking</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Benefits</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Save time on documentation</li>
                          <li>• Improve code quality</li>
                          <li>• Enhance team collaboration</li>
                          <li>• Reduce review cycles</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>
                      Get up and running in minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Connect GitHub</h4>
                          <p className="text-sm text-muted-foreground">
                            Link your GitHub account to access repositories
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Select Repositories</h4>
                          <p className="text-sm text-muted-foreground">
                            Choose which repositories to enable Pull-Mate for
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Create Your First PR</h4>
                          <p className="text-sm text-muted-foreground">
                            Use the PR Editor to create AI-assisted Pull
                            Requests
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="gap-2">
                      <Github className="h-4 w-4" />
                      Connect GitHub Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedItem === "ai-assistant" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-balance mb-4">
                    AI Assistant
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Learn how Pull-Mate's AI helps you create better Pull
                    Requests.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-pretty">
                      Pull-Mate's AI analyzes your code changes, commit
                      messages, and repository context to generate comprehensive
                      PR descriptions that follow best practices.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Code Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Examines file changes, additions, and deletions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Context Understanding</h4>
                          <p className="text-sm text-muted-foreground">
                            Considers commit history and repository patterns
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Smart Generation</h4>
                          <p className="text-sm text-muted-foreground">
                            Creates structured descriptions with summaries and
                            details
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Settings</CardTitle>
                    <CardDescription>
                      Customize AI behavior to match your preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Description Styles</h4>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="rounded-lg border p-3">
                            <h5 className="font-medium text-sm">Brief</h5>
                            <p className="text-xs text-muted-foreground">
                              Concise, essential information only
                            </p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h5 className="font-medium text-sm">Detailed</h5>
                            <p className="text-xs text-muted-foreground">
                              Comprehensive with examples
                            </p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h5 className="font-medium text-sm">Technical</h5>
                            <p className="text-xs text-muted-foreground">
                              Focus on implementation details
                            </p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h5 className="font-medium text-sm">Business</h5>
                            <p className="text-xs text-muted-foreground">
                              Emphasize user impact
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedItem === "first-pr" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-balance mb-4">
                    Creating Your First PR
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Step-by-step tutorial for creating your first AI-assisted
                    Pull Request.
                  </p>
                </div>

                <Tabs defaultValue="examples" className="w-full">
                  <TabsList>
                    <TabsTrigger value="examples">PR Examples</TabsTrigger>
                    <TabsTrigger value="tutorial">Step-by-Step</TabsTrigger>
                    <TabsTrigger value="tips">Best Practices</TabsTrigger>
                  </TabsList>

                  <TabsContent value="examples" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>AI-Generated PR Examples</CardTitle>
                        <CardDescription>
                          See how Pull-Mate creates professional PR descriptions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {examplePRs.map((example, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-balance">
                                {example.title}
                              </h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    example.code,
                                    `example-${index}`
                                  )
                                }
                                className="gap-2 bg-transparent"
                              >
                                {copiedCode === `example-${index}` ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                                Copy
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground text-pretty">
                              {example.description}
                            </p>
                            <div className="flex gap-2">
                              {example.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="rounded-lg bg-muted p-4">
                              <pre className="text-sm whitespace-pre-wrap font-mono">
                                {example.code}
                              </pre>
                            </div>
                            {index < examplePRs.length - 1 && <Separator />}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tutorial" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Step-by-Step Tutorial</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                              1
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">
                                Navigate to PR Editor
                              </h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                Click on "PR Editor" in the sidebar or use the
                                "Create PR" button from the dashboard.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                              2
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">
                                Select Repository and Branch
                              </h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                Choose your repository and the source branch
                                containing your changes.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                              3
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">
                                Generate AI Draft
                              </h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                Click the "AI Draft" button to let Pull-Mate
                                analyze your changes and generate a PR
                                description.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                              4
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Review and Edit</h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                Review the AI-generated content and make any
                                necessary adjustments to match your preferences.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                              5
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Submit PR</h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                Click "Submit PR" to create the Pull Request on
                                GitHub with your AI-enhanced description.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tips" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Best Practices</CardTitle>
                        <CardDescription>
                          Tips for getting the most out of Pull-Mate
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Writing Good Commit Messages
                            </h4>
                            <p className="text-sm text-muted-foreground text-pretty mb-2">
                              AI works better with descriptive commit messages:
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-secondary" />
                                <code className="bg-muted px-2 py-1 rounded">
                                  feat: add user authentication with JWT tokens
                                </code>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-secondary" />
                                <code className="bg-muted px-2 py-1 rounded">
                                  fix: resolve mobile layout issues in navbar
                                </code>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Organizing Changes
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>
                                • Keep PRs focused on a single feature or fix
                              </li>
                              <li>• Group related changes together</li>
                              <li>
                                • Avoid mixing refactoring with new features
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Customizing AI Output
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>
                                • Adjust AI settings to match your team's style
                              </li>
                              <li>
                                • Use custom prompts for specific requirements
                              </li>
                              <li>
                                • Always review and edit AI-generated content
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {selectedItem === "faq" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-balance mb-4">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Common questions and answers about Pull-Mate.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: "How does Pull-Mate access my repositories?",
                      answer:
                        "Pull-Mate uses GitHub OAuth to securely access your repositories. You control which repositories to connect, and you can disconnect at any time from the settings page.",
                    },
                    {
                      question: "Is my code data secure?",
                      answer:
                        "Yes, we take security seriously. Code is analyzed in real-time and not stored permanently. All data transmission is encrypted, and we follow industry best practices for data protection.",
                    },
                    {
                      question:
                        "Can I customize the AI-generated descriptions?",
                      answer:
                        "You can choose from different description styles, create custom prompts, and always edit the AI-generated content before submitting your PR.",
                    },
                    {
                      question:
                        "Does Pull-Mate work with private repositories?",
                      answer:
                        "Yes, Pull-Mate works with both public and private repositories. You'll need to grant the appropriate permissions during the GitHub OAuth setup.",
                    },
                    {
                      question: "How much does Pull-Mate cost?",
                      answer:
                        "We offer a free tier with basic features and paid plans for advanced functionality and team features. Check our pricing page for current rates.",
                    },
                  ].map((faq, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-pretty">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Still have questions?</CardTitle>
                    <CardDescription>We're here to help!</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Button className="gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      Community Forum
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
