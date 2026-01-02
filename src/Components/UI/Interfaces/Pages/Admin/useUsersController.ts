import { useState, useEffect } from "react";
import { API_URL } from "../../../../constants/Index";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import { toast } from "react-toastify";

export interface UserSummary {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isSubscribed: boolean;
    isAdmin: boolean;
    revenue: number;
    invoiceCount: number;
    freemiumCount: number;
}

export default function useUsersController() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAppSelector((state) => state.userSlice);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  const fetchUsers = async (page = 1) => {
    const token = userToken || localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
        const response = await fetch(`${API_URL}/api/admin/users?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
            setUsers(data.users);
            setPagination(data.pagination);
        } else {
            toast.error("Failed to fetch users");
        }
    } catch (error) {
        console.error("Users fetch error:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) fetchUsers();
  }, [userToken]);

  const togglePro = async (userId: number, currentStatus: boolean) => {
      try {
          const res = await fetch(`${API_URL}/api/admin/user/toggle-pro`, {
              method: "PATCH",
              headers: { 
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ userId, status: !currentStatus })
          });
          if (res.ok) {
              toast.success("User status updated");
              // Optimistic update
              setUsers(prev => prev.map(u => u.id === userId ? { ...u, isSubscribed: !currentStatus } : u));
          } else {
              toast.error("Failed to update status");
          }
      } catch (e) {
          toast.error("Error updating status");
      }
  };

  const adjustFreemium = async (userId: number, amount: number) => {
    try {
        const res = await fetch(`${API_URL}/api/admin/user/adjust-freemium`, {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, amount })
        });
        if (res.ok) {
            toast.success("Freemium credits updated");
            // Optimistic update
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, freemiumCount: amount } : u));
        } else {
            toast.error("Failed to update credits");
        }
    } catch (e) {
        toast.error("Error updating credits");
    }
  };

  return { users, loading, pagination, fetchUsers, togglePro, adjustFreemium };
}
