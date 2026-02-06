import React, { useEffect, useState } from 'react';
import { Moon, Sun, Github, Star, GitFork } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [stars, setStars] = useState<number | null>(null);
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/jaseci-labs/jaseci')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count != null) setStars(data.stargazers_count);
        if (data.forks_count != null) setForks(data.forks_count);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="ByLLM Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-semibold text-primary">byLLM</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#install" className="text-muted-foreground hover:text-foreground transition-colors">
              Getting Started
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
              Tutorials
            </a>
            <a
              href="https://docs.jaseci.org/learn/jac-byllm/with_llm/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://discord.gg/6j3QNdtcN6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5865F2] text-white font-medium text-sm shadow-lg shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50 hover:scale-105 hover:bg-[#4752C4] transition-all duration-200 "
            >
              <svg width="16" height="12" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.2a.2.2 0 0 0-.2.1 40.8 40.8 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.4 37.4 0 0 0 25.4.3a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.5 5a.2.2 0 0 0-.1 0C1.5 18 -.9 30.6.3 43a.3.3 0 0 0 .1.2 58.7 58.7 0 0 0 17.7 9 .2.2 0 0 0 .3-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.9a.2.2 0 0 1 .2 0 41.9 41.9 0 0 0 35.6 0 .2.2 0 0 1 .2 0l1.1.9a.2.2 0 0 1 0 .4 36.3 36.3 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.2 47.2 0 0 0 3.6 5.9.2.2 0 0 0 .3.1 58.5 58.5 0 0 0 17.7-9 .2.2 0 0 0 .1-.2c1.4-14.8-2.4-27.6-10.1-39a.2.2 0 0 0-.1 0ZM23.7 35.3c-3.4 0-6.1-3.1-6.1-6.9s2.7-6.9 6.1-6.9 6.2 3.1 6.1 6.9c0 3.8-2.7 6.9-6.1 6.9Zm22.6 0c-3.4 0-6.1-3.1-6.1-6.9s2.7-6.9 6.1-6.9 6.2 3.1 6.1 6.9c0 3.8-2.7 6.9-6.1 6.9Z"/>
              </svg>
              Discord
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <a
            href="https://github.com/jaseci-labs/jaseci/tree/main/jac-byllm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-muted px-3 py-1.5 text-sm hover:bg-muted/70 transition-colors"
          >
            <Github className="h-4 w-4" />
            {stars !== null && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
              </span>
            )}
            {forks !== null && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <GitFork className="h-3.5 w-3.5" />
                {forks >= 1000 ? `${(forks / 1000).toFixed(1)}k` : forks}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
};