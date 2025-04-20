// src/pages/Home.jsx
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shirt, Palette, Sparkles } from "lucide-react"

function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl md:text-6xl">
              <span className="block">Your Cloud Style</span>
              <span className="block text-primary">Organize Your Style</span>
            </h1>
            <p className="mt-6 text-xl text-text/80 max-w-2xl mx-auto">
              Digitize your wardrobe, discover new outfit combinations, and simplify your daily clothing decisions.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shirt className="h-6 w-6 text-primary" />}
              title="Digital Wardrobe"
              description="Upload and categorize your clothing items to create a complete digital inventory of your wardrobe."
              bg="bg-primary/10"
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-secondary" />}
              title="Color Coordination"
              description="Get suggestions for color-coordinated outfits based on color theory and your personal style."
              bg="bg-secondary/10"
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Outfit Generator"
              description="Generate outfit combinations automatically based on occasion, weather, and your personal preferences."
              bg="bg-primary/10"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Organize Your Wardrobe?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their daily clothing decisions with Your Cloud Style.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ icon, title, description, bg }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text/80">{description}</p>
    </div>
  )
}

export default Home
