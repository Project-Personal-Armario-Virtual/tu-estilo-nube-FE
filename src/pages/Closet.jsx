// src/pages/Closet.jsx
import React, { useEffect, useState } from "react"
import api from "../services/api"
import ItemCard from "../components/ItemCard"
import Layout from "../components/Layout"

const Closet = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/images/list")
        setItems(res.data)
      } catch (err) {
        console.error("Failed to load items:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-text">My Closet</h1>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items found in your closet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Closet
