interface GitHubStats {
  stars: number | string;
  forks: number | string;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const fallback: GitHubStats = { stars: "--", forks: "--" };

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "jac-website",
    };

    const token = import.meta.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(
      "https://api.github.com/repos/jaseci-labs/jaseci",
      { headers },
    );

    if (!response.ok) {
      return fallback;
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count ?? "--",
      forks: data.forks_count ?? "--",
    };
  } catch {
    return fallback;
  }
}
