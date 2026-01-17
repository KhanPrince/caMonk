import { useQuery } from '@tanstack/react-query'

interface Blog {
  id: string
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export function useBlogs() {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/blogs')
      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }
      return response.json()
    },
  })
}
