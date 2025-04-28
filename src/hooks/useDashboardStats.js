import { useEffect, useState } from "react";
import api from "@/services/api";

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    mostCommonColor: "—",
    totalOutfits: 0, // 👈 nuevo campo inicializado
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return stats;
}
