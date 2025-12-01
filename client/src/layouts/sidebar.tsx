import { useState } from "react";
import { Home, Calendar, Menu } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6">
          <h1 className="text-gray-900">peers</h1>
        </div>

        <nav className="flex-1 px-4">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg"
          >
            <Calendar className="w-5 h-5" />
            <span>My Events</span>
          </a>
        </nav>
      </aside>
    </>
  );
}
