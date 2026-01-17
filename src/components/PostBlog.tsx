// c:\Users\786kh\OneDrive\Desktop\interview\Frontend-Interview\src\components\PostBlog.tsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button"

export function PostBlog() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    coverImage: "",
    content: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const mutation = useMutation({
    mutationFn: async (newBlog: Omit<typeof formData, "category"> & { id: string; category: string[] }) => {
      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      })
      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      navigate("/")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newBlog = {
      ...formData,
      id: Date.now().toString(),
      category: formData.category.split(",").map((cat) => cat.trim()),
      date: new Date(formData.date).toISOString(),
    }

    mutation.mutate(newBlog)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl w-5/6 md:w-2/3 mx-auto px-4 py-8 my-1">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category (comma separated)
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            placeholder="e.g. Tech, Finance"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700">
            Cover Image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            required
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Publishing..." : "Publish Blog"}
        </Button>
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">Error: {mutation.error.message}</p>
        )}
      </form>
    </div>
  )
}
