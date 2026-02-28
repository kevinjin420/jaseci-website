import { useState, useEffect } from "react";

interface SearchPost {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  content: string;
  image: string;
  date: string;
}

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<SearchPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    fetch("/search-index.json")
      .then((res) => res.json())
      .then((posts: SearchPost[]) => {
        const lowerQuery = query.toLowerCase();
        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.description.toLowerCase().includes(lowerQuery) ||
            post.categories.some((c) => c.toLowerCase().includes(lowerQuery)) ||
            post.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
            post.content.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary-orange/30 border-t-primary-orange rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!query) {
    return (
      <p className="text-center text-[#999] py-12">
        Enter a search term to find posts.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="text-center text-[#999] py-12">
        No results found for "{query}".
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#999] mb-6">
        {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </p>
      {results.map((post) => (
        <a
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="block p-5 rounded-xl bg-[#1a1a1a]/50 border border-[#333]/30 hover:border-orange-500/40 transition-all"
        >
          <div className="flex gap-4">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0 hidden sm:block"
              />
            )}
            <div>
              <h3 className="text-white font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-[#999] line-clamp-2">
                {post.description || post.content.slice(0, 150)}
              </p>
              <div className="flex gap-2 mt-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
