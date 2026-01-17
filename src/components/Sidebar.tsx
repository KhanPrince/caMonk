import { useBlogs } from '@/hooks/useBlogs'
import { Link } from 'react-router-dom';

export function Sidebar() {
  const { data: blogs, isLoading } = useBlogs()

  // Get latest 5 blogs
  const latestBlogs = blogs?.slice(0, 5) ?? []

  return (
    <aside className="w-full md:w-80 bg-gray-100 border-r border-gray-200 p-6">
      <div className="sticky top-20">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Latest Blog Posts</h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-20"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            latestBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 rounded-xl bg-white p-4 -mx-6 px-6 block hover:bg-indigo-50 transition"
              >
                <div className="flex flex-wrap gap-1 mb-2">
                  {blog.category.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mb-1">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <div className="text-sm font-semibold text-slate-900 line-clamp-2">
                  {blog.title}
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {blog.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </aside>
  )
}
