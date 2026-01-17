import * as React from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap ,ChevronDownIcon } from "lucide-react"



export function Nav() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 md:pointer-events-none md:cursor-default"
          >
            <div className="p-2 bg-indigo-600 rounded-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-slate-900">CA MONK</span>
            <ChevronDownIcon className="ml-2 h-4 w-4 md:hidden" aria-hidden />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/tools" className="text-sm font-medium text-slate-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none">Tools</a>
            <a href="/practice" className="text-sm font-medium text-slate-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none">Practice</a>
            <a href="/events" className="text-sm font-medium text-slate-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none">Events</a>
            <a href="/jobboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none">Job Board</a>
            <a href="/points" className="text-sm font-medium text-slate-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none">Points</a>
          </nav>

          {/* removed separate Menu trigger — CA MONK now opens mobile menu; chevron hidden on md+ */}
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Profile</Button>
        </div>
      </div>
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

/* Mobile drawer */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-drawer"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 left-0 w-full bg-white shadow transform transition-transform ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="p-4">
          <nav className="flex flex-col gap-3">
            <a href="/tools" onClick={onClose} className="py-2 px-3 rounded hover:bg-slate-100">Tools</a>
            <a href="/practice" onClick={onClose} className="py-2 px-3 rounded hover:bg-slate-100">Practice</a>
            <a href="/events" onClick={onClose} className="py-2 px-3 rounded hover:bg-slate-100">Events</a>
            <a href="/jobboard" onClick={onClose} className="py-2 px-3 rounded hover:bg-slate-100">Job Board</a>
            <a href="/points" onClick={onClose} className="py-2 px-3 rounded hover:bg-slate-100">Points</a>
          </nav>
        </div>
      </div>
    </div>
  )
}
