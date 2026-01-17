import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

interface Blog {
  id: number
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export function Main() {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/blogs")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json() as Promise<Blog[]>
    },
  })

  if (isLoading) {
    return (
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Latest Blog Posts</h2>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-900 font-semibold">Error loading blogs</h3>
            <p className="text-red-700 text-sm mt-1">
              Make sure the JSON server is running on port 3001 with: <code className="bg-red-100 px-2 py-1 rounded">npm run server</code>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Latest Blog Posts</h2>
        <div className="space-y-8">
          {blogs?.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="block group">
              <article
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Cover Image */}
                <div className="w-full h-64 md:h-80 overflow-hidden bg-slate-200">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-3">
                    {post.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                    <span className="text-sm text-slate-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read Time */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <span className="text-sm text-slate-500">
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
