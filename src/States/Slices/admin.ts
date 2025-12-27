import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../Components/constants/Index";

export interface AdminStats {
    totalUsers: number;
    proUsers: number;
    totalRevenue: number;
    totalInvoices: number;
    activeSubscriptions: number;
    conversionRate: string;
}

export interface BroadcastMessage {
    message: string;
    type: 'info' | 'warning' | 'maintenance';
    isActive: boolean;
    updatedAt?: string;
}

export interface PaginationMetadata {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

export interface AdminUser {
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

export interface AdminState {
    stats: AdminStats | null;
    users: AdminUser[];
    pagination: PaginationMetadata | null;
    broadcast: BroadcastMessage | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    stats: null,
    users: [],
    pagination: null,
    broadcast: null,
    loading: false,
    error: null,
};

export const fetchAdminStats = createAsyncThunk(
    "admin/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.ok) throw new Error("Failed to fetch stats");
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAdminUsers = createAsyncThunk(
    "admin/fetchUsers",
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Fetch Users Failed: Status ${response.status}`, errorText);
                throw new Error(`Failed to fetch users: ${response.status}`);
            }
            return await response.json();
        } catch (error: any) {
            console.error("Thunk Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const toggleUserProStatus = createAsyncThunk(
    "admin/togglePro",
    async ({ userId, status }: { userId: number; status: boolean }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/user/toggle-pro`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, status }),
            });
            if (!response.ok) throw new Error("Failed to update user");
            return { userId, status };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const adjustFreemiumCount = createAsyncThunk(
    "admin/adjustFreemium",
    async ({ userId, amount }: { userId: number; amount: number }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/user/adjust-freemium`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, amount }),
            });
            if (!response.ok) throw new Error("Failed to update credits");
            return { userId, amount };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const bulkAddCredits = createAsyncThunk(
    "admin/bulkAddCredits",
    async ({ amount }: { amount: number }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users/bulk-add-credits`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });
            if (!response.ok) throw new Error("Failed to update users");
            return { amount };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBroadcast = createAsyncThunk(
    "admin/fetchBroadcast",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/public/system/broadcast`);
            if (!response.ok) throw new Error("Failed to fetch broadcast");
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBroadcast = createAsyncThunk(
    "admin/updateBroadcast",
    async (data: BroadcastMessage, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/broadcast/update`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to update broadcast");
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminStats.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchAdminStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAdminUsers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(toggleUserProStatus.fulfilled, (state, action) => {
                const user = state.users.find(u => u.id === action.payload.userId);
                if (user) user.isSubscribed = action.payload.status;
            })
            .addCase(adjustFreemiumCount.fulfilled, (state, action) => {
                const user = state.users.find(u => u.id === action.payload.userId);
                if (user) user.freemiumCount = action.payload.amount;
            })
            .addCase(fetchBroadcast.fulfilled, (state, action) => {
                state.broadcast = action.payload;
            })
            .addCase(updateBroadcast.fulfilled, (state, action) => {
                state.broadcast = action.payload;
            })

    },
});

export default adminSlice.reducer;
