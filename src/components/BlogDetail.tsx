import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

interface Blog {
  id: number
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export function BlogDetail() {
  const { id } = useParams()

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/blogs/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch blog")
      }
      return response.json() as Promise<Blog>
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-slate-200 rounded-lg w-full"></div>
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center text-red-600">
        Error loading blog post
      </div>
    )
  }

  if (!blog) return null

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-slate-900">{blog.title}</h1>
        
        <div className="text-slate-500">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </div>
  )
}