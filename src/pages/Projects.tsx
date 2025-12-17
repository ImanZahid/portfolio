import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
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
  readme?: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const fetchFromGitHub = async (): Promise<GitHubRepo[]> => {
      console.log('Fetching fresh data from GitHub API...');
      const response = await fetch('https://api.github.com/users/ImanZahid/repos?sort=updated&per_page=100');

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      // Fetch README for each repo
      const reposWithReadme = await Promise.all(
        data.map(async (repo: GitHubRepo) => {
          try {
            const readmeResponse = await fetch(`https://api.github.com/repos/ImanZahid/${repo.name}/readme`, {
              headers: { Accept: 'application/vnd.github.v3.raw' }
            });
            if (readmeResponse.ok) {
              const readme = await readmeResponse.text();
              const shortReadme = readme.slice(0, 200).trim() + (readme.length > 200 ? '...' : '');
              return { ...repo, readme: shortReadme };
            }
          } catch {
            // No README available
          }
          return repo;
        })
      );

      // Cache in localStorage
      localStorage.setItem('github_repos', JSON.stringify({
        fetchedAt: new Date().toISOString(),
        repos: reposWithReadme
      }));

      return reposWithReadme;
    };

    const loadRepos = async () => {
      try {
        // 1. Check localStorage cache first
        const cached = localStorage.getItem('github_repos');
        if (cached) {
          const { fetchedAt, repos: cachedRepos } = JSON.parse(cached);
          const cacheAge = Date.now() - new Date(fetchedAt).getTime();

          if (cacheAge < CACHE_DURATION) {
            console.log('Using localStorage cache');
            setRepos(cachedRepos);
            setLoading(false);
            return;
          }
        }

        // 2. Try static JSON file (built at deploy time)
        const staticResponse = await fetch('/data/repos.json');
        if (staticResponse.ok) {
          const { fetchedAt, repos: staticRepos } = await staticResponse.json();
          const cacheAge = Date.now() - new Date(fetchedAt).getTime();

          console.log('Using static cache from build');
          setRepos(staticRepos);
          setLoading(false);

          // If static cache is old, refresh in background
          if (cacheAge > CACHE_DURATION) {
            fetchFromGitHub().then(setRepos).catch(console.error);
          }
          return;
        }

        // 3. Fallback to live API
        const freshRepos = await fetchFromGitHub();
        setRepos(freshRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error loading repos:', err);
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [repos, sortBy]);

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(sortedRepos.length / CARDS_PER_PAGE);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return totalPages - 1;
      if (nextIndex >= totalPages) return 0;
      return nextIndex;
    });
  };

  const getCurrentPageRepos = () => {
    const startIndex = currentIndex * CARDS_PER_PAGE;
    return sortedRepos.slice(startIndex, startIndex + CARDS_PER_PAGE);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  const currentPageRepos = getCurrentPageRepos();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-3 text-white">Projects</h1>
          <p className="text-gray-300 mb-4">
            Swipe through my open-source projects and contributions on GitHub
          </p>

          <div className="flex gap-2 justify-center">
            <Button
              variant={sortBy === 'updated' ? 'default' : 'outline'}
              onClick={() => {
                setSortBy('updated');
                setCurrentIndex(0);
              }}
            >
              Recently Updated
            </Button>
            <Button
              variant="outline"
              className={sortBy === 'stars' ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600' : 'border-purple-500/50 bg-slate-900/50 text-purple-200 hover:bg-slate-800/80 hover:text-white hover:border-purple-400/70 transition-all'}
              onClick={() => {
                setSortBy('stars');
                setCurrentIndex(0);
              }}
            >
              Most Stars
            </Button>
          </div>
        </div>

        {sortedRepos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found.</p>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto">
            {/* Progress indicator */}
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-400">
                Page {currentIndex + 1} / {totalPages}
              </p>
              <div className="flex gap-1 justify-center mt-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-1 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-purple-500'
                        : 'w-1 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card Grid Swiper */}
            <div className="relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full cursor-grab active:cursor-grabbing grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {currentPageRepos.map((repo) => (
                    <Card key={repo.id} className="bg-slate-900/50 border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all backdrop-blur flex flex-col">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-start justify-between gap-2 text-white">
                          <span className="text-lg line-clamp-1">{repo.name}</span>
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
                        <CardDescription className="text-gray-400 text-sm line-clamp-3">
                          {repo.readme || repo.description || 'No description available'}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-grow space-y-3 pb-3">
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {repo.topics.slice(0, 3).map(topic => (
                              <Badge key={topic} variant="outline" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <span className="flex items-center gap-1 text-gray-400 text-sm">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="font-semibold">{repo.stargazers_count}</span>
                            </span>
                            <span className="flex items-center gap-1 text-gray-400 text-sm">
                              <GitFork className="h-4 w-4 text-blue-400" />
                              <span className="font-semibold">{repo.forks_count}</span>
                            </span>
                          </div>
                          {repo.language && (
                            <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <Button asChild size="sm" className="w-full">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on GitHub
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                className="h-12 w-12 rounded-full border-purple-500/50 bg-slate-900/50 text-purple-200 hover:bg-slate-800/80 hover:text-white hover:border-purple-400/70 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                className="h-12 w-12 rounded-full border-purple-500/50 bg-slate-900/50 text-purple-200 hover:bg-slate-800/80 hover:text-white hover:border-purple-400/70 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Swipe hint */}
            <p className="text-center text-sm text-gray-500 mt-3">
              Swipe or use arrows to navigate
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
