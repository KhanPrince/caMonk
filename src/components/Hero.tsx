import { Button } from "./ui/button";
import { ArrowUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom";


export function Hero() {
  return (
    <section className="w-full bg-linear-to-r from-indigo-600 to-indigo-800 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          CA MONK
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 mb-8">
          Stay updated with the latest trends in finance,accounting, and career growth 
        </p>
        <div className="inline-block">            
          <Link to="/post-blog">
            <Button type="button" className="bg-white text-slate-900 text-xl hover:bg-gray-200 hover:border hover:border-slate-900 ">Post Blog<ArrowUpRightIcon /></Button>
          </Link>
        </div>
       
      </div>
    </section>
  )
}
