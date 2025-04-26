import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User, Home, ShoppingBag, Grid, Tag, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle" // Puedes implementarlo más adelante

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: ShoppingBag },
    { href: "/closet", label: "My Closet", icon: Grid },
    { href: "/categories", label: "Categories", icon: Tag },
    { href: "/outfits", label: "Outfits", icon: Shirt },
    { href: "/my-outfits", label: "My Outfits", icon: ShoppingBag },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-bold text-xl">
            CloudCloset
            </Link>
            <div className="hidden sm:flex sm:ml-6 sm:space-x-6 ml-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={`inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium ${
                    isActive(route.href)
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:text-black"
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            {location.pathname === "/" && (
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(route.href)
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <route.icon className="inline-block w-5 h-5 mr-2" />
              {route.label}
            </Link>
          ))}
          {location.pathname === "/" && (
            <Button asChild className="w-full mt-2">
              <Link to="/register">Get Started</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
