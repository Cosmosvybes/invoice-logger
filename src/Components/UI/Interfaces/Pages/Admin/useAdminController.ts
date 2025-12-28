import { useState, useEffect } from "react";
import { API_URL } from "../../../../constants/Index";
import { useAppSelector } from "../../../../../States/hoooks/hook";

export interface AdminStats {
  totalUsers: number;
  proUsers: number;
  totalRevenue: number;
  totalInvoices: number;
  activeSubscriptions: number;
  activeMRR: number;
  ltv: number;
  weeklyGrowth: string;
  recentUsers: { name: string; email: string; plan: string; joined: string }[];
  recentInvoices: { id: string; user: string; amount: number; currency: string }[];
  conversionRate: string;
}

export default function useAdminController() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchStats = async () => {
      const token = userToken || localStorage.getItem("token");
      if (!token) return;
      
      try {
        const response = await fetch(`${API_URL}/api/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
            setStats(data);
        } else {
            console.error("Failed to fetch admin stats:", data);
        }
      } catch (error) {
        console.error("Admin stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userToken]);

  return { stats, loading };
}
