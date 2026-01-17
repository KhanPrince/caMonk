import { Routes, Route } from "react-router-dom"
import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"
import { Home } from "./components/Home"
import { BlogDetail } from "./components/BlogDetail"
import { PostBlog } from "./components/PostBlog"

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-blog" element={<PostBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer isLoading={false} />
    </div>
  )
}

export default App