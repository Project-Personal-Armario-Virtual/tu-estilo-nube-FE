"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shirt, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 overflow-hidden min-h-screen flex items-center justify-center text-center px-4">
        <img
          src="/hero-background.png"
          alt="Cloud Wardrobe"
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-90"
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
          >
            <span className="block">Your Cloud Style</span>
            <span className="block text-primary mt-2">Organize Your Style</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Digitize your wardrobe, discover new outfit combinations, and simplify your daily clothing decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button size="lg" asChild className="px-8 py-4 text-base">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-white text-gray-900 bg-white/80 hover:bg-white transition-all duration-300 px-8 py-4 text-base"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Divider (transición suave) */}
      <div className="relative">
        <svg className="absolute top-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#f8fafc" d="M0,0 C600,100 840,0 1440,100 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shirt className="h-6 w-6 text-primary" />}
              title="Digital Wardrobe"
              description="Upload and categorize your clothing items to create a complete digital inventory of your wardrobe."
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-secondary" />}
              title="Color Coordination"
              description="Get suggestions for color-coordinated outfits based on color theory and your personal style."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Outfit Generator"
              description="Generate outfit combinations automatically based on occasion, weather, and your personal preferences."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Organize Your Wardrobe?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their daily clothing decisions with CloudCloset.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100 transition"
            asChild
          >
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default Home;