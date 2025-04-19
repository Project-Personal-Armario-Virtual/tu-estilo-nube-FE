import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { Button } from "@/components/ui/button"
import { useAuth } from "../hooks/useAuth"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text">Tu Armario Virtual</h1>
              <p className="text-xl mb-8 text-text/80">
                Organiza tu ropa, crea conjuntos y recibe recomendaciones personalizadas para vestirte mejor cada día.
              </p>
              {user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => navigate("/dashboard")}>
                    Ir al Dashboard
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/closet")}>
                    Ver Mi Armario
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => navigate("/register")}>
                    Registrarse
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                    Iniciar Sesión
                  </Button>
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Virtual Closet Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
