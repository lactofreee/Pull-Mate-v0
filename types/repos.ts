export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null; // ← 여기서 null 가능
  owner: {
    login: string;
  };
  html_url: string;
}

export interface Repo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  stars: number;
  forks: number;
  language: string | null;
  lastActivity: string;
  isConnected: boolean;
  notifications: boolean;
  owner: string;
  url: string;
}