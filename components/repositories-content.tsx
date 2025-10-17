"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FolderGit2,
  Plus,
  Star,
  GitFork,
  Settings,
  Github,
  Users,
  Lock,
  Unlock,
  Search,
  Filter,
  ExternalLink,
  Bell,
  BellOff,
} from "lucide-react"

const repositories = [
  {
    id: 1,
    name: "web-app",
    fullName: "company/web-app",
    description: "Main web application with React and TypeScript",
    isPrivate: false,
    stars: 124,
    forks: 23,
    language: "TypeScript",
    lastActivity: "2 hours ago",
    isConnected: true,
    notifications: true,
    owner: "company",
    url: "https://github.com/company/web-app",
  },
  {
    id: 2,
    name: "mobile-ui",
    fullName: "company/mobile-ui",
    description: "React Native mobile application UI components",
    isPrivate: true,
    stars: 45,
    forks: 8,
    language: "JavaScript",
    lastActivity: "1 day ago",
    isConnected: true,
    notifications: false,
    owner: "company",
    url: "https://github.com/company/mobile-ui",
  },
  {
    id: 3,
    name: "api-backend",
    fullName: "company/api-backend",
    description: "Node.js REST API backend with Express and MongoDB",
    isPrivate: true,
    stars: 67,
    forks: 12,
    language: "JavaScript",
    lastActivity: "3 days ago",
    isConnected: false,
    notifications: true,
    owner: "company",
    url: "https://github.com/company/api-backend",
  },
  {
    id: 4,
    name: "docs",
    fullName: "company/docs",
    description: "Documentation site built with Next.js and MDX",
    isPrivate: false,
    stars: 89,
    forks: 34,
    language: "MDX",
    lastActivity: "1 week ago",
    isConnected: true,
    notifications: true,
    owner: "company",
    url: "https://github.com/company/docs",
  },
  {
    id: 5,
    name: "design-system",
    fullName: "company/design-system",
    description: "Shared design system components and tokens",
    isPrivate: false,
    stars: 156,
    forks: 45,
    language: "TypeScript",
    lastActivity: "4 days ago",
    isConnected: false,
    notifications: false,
    owner: "company",
    url: "https://github.com/company/design-system",
  },
]

const organizations = [
  {
    id: 1,
    name: "company",
    avatar: "/generic-company-logo.png",
    repositories: 12,
    members: 25,
  },
  {
    id: 2,
    name: "open-source-org",
    avatar: "/opensource-logo.jpg",
    repositories: 8,
    members: 156,
  },
]

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    MDX: "bg-purple-500",
    Python: "bg-green-500",
    Go: "bg-cyan-500",
  }
  return colors[language] || "bg-gray-500"
}

export function RepositoriesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddRepoOpen, setIsAddRepoOpen] = useState(false)

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedTab === "connected") return matchesSearch && repo.isConnected
    if (selectedTab === "disconnected") return matchesSearch && !repo.isConnected
    return matchesSearch
  })

  const handleToggleConnection = (repoId: number) => {
    // Handle repository connection toggle
    console.log("Toggle connection for repo:", repoId)
  }

  const handleToggleNotifications = (repoId: number) => {
    // Handle notifications toggle
    console.log("Toggle notifications for repo:", repoId)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Repositories</h1>
          <p className="text-muted-foreground text-pretty">
            Manage your GitHub repositories and Pull-Mate integrations.
          </p>
        </div>
        <Dialog open={isAddRepoOpen} onOpenChange={setIsAddRepoOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Connect Repository
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Repository</DialogTitle>
              <DialogDescription>Connect a GitHub repository to enable Pull-Mate features.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input id="repo-url" placeholder="https://github.com/username/repository" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddRepoOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddRepoOpen(false)}>Connect</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Repositories</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="disconnected">Available</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredRepos.map((repo) => (
              <Card key={repo.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {repo.isPrivate ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Unlock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <h3 className="text-lg font-semibold">{repo.name}</h3>
                        </div>
                        <Badge variant={repo.isConnected ? "secondary" : "outline"}>
                          {repo.isConnected ? "Connected" : "Available"}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={repo.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>

                      <p className="text-muted-foreground text-pretty">{repo.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`} />
                          {repo.language}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks}
                        </div>
                        <span>Updated {repo.lastActivity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`notifications-${repo.id}`} className="text-sm">
                          Notifications
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleNotifications(repo.id)}
                          disabled={!repo.isConnected}
                        >
                          {repo.notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`connection-${repo.id}`} className="text-sm">
                          Connected
                        </Label>
                        <Switch
                          id={`connection-${repo.id}`}
                          checked={repo.isConnected}
                          onCheckedChange={() => handleToggleConnection(repo.id)}
                        />
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4">
            {filteredRepos
              .filter((repo) => repo.isConnected)
              .map((repo) => (
                <Card key={repo.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {repo.isPrivate ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Unlock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h3 className="text-lg font-semibold">{repo.name}</h3>
                          </div>
                          <Badge variant="secondary">Connected</Badge>
                        </div>
                        <p className="text-muted-foreground text-pretty">{repo.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="disconnected" className="space-y-4">
          <div className="grid gap-4">
            {filteredRepos
              .filter((repo) => !repo.isConnected)
              .map((repo) => (
                <Card key={repo.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {repo.isPrivate ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Unlock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h3 className="text-lg font-semibold">{repo.name}</h3>
                          </div>
                          <Badge variant="outline">Available</Badge>
                        </div>
                        <p className="text-muted-foreground text-pretty">{repo.description}</p>
                      </div>
                      <Button size="sm" onClick={() => handleToggleConnection(repo.id)}>
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {organizations.map((org) => (
              <Card key={org.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={org.avatar || "/placeholder.svg"} alt={org.name} />
                      <AvatarFallback>
                        <Github className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>
                        {org.repositories} repositories • {org.members} members
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FolderGit2 className="h-4 w-4" />
                        {org.repositories} repos
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {org.members} members
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Repositories
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
