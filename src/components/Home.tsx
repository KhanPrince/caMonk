import { Hero } from "./Hero"
import { Sidebar } from "./Sidebar"
import { Main } from "./Main"

export function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-1">
        <div className="hidden md:block md:w-80">
          <Sidebar />
        </div>
        <Main />
      </div>
    </>
  )
}