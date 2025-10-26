export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null;
  owner: {
    login: string;
  };
  html_url: string;
  default_branch?: string;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  stars: number;
  forks: number;
  language: string | null;
  lastActivity: string;
  url: string;
  owner: string;
  defaultBranch?: string;
  isConnected: boolean;
  notifications: boolean;
}

export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  protection: {
    enabled: boolean;
    required_status_checks?: {
      enforcement_level: string;
      contexts: string[];
      checks: Array<{ context: string; app_id: number | null }>;
    };
  };
  protection_url: string;
}

export interface CommitInfo {
  id: number;
  hash: string;
  message: string;
  branch: string;
  author: string;
  timestamp: string;
  filesChanged: number;
  url: string;
}
