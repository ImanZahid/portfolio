import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string;
  updated_at: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');

  useEffect(() => {
    fetch('https://api.github.com/users/ImanZahid/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching repos:', err);
        setLoading(false);
      });
  }, []);

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [repos, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Projects</h1>
          <p className="text-gray-300 mb-6">
            Explore my open-source projects and contributions on GitHub.
          </p>

          <div className="flex gap-2">
            <Button
              variant={sortBy === 'updated' ? 'default' : 'outline'}
              onClick={() => setSortBy('updated')}
            >
              Recently Updated
            </Button>
            <Button
              variant="outline"
              className={sortBy === 'stars' ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600' : 'border-purple-500/50 bg-slate-900/50 text-purple-200 hover:bg-slate-800/80 hover:text-white hover:border-purple-400/70 transition-all'}
              onClick={() => setSortBy('stars')}
            >
              Most Stars
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col bg-slate-900/50 border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2 text-white">
                    <span className="line-clamp-1">{repo.name}</span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-purple-400 hover:text-purple-300"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-gray-400">
                    {repo.description || 'No description available'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 5).map(topic => (
                        <Badge key={topic} variant="outline" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-200 transition-colors">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between text-sm text-gray-400">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-4 w-4 text-blue-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                  {repo.language && (
                    <span className="text-xs text-purple-400">{repo.language}</span>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {sortedRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
