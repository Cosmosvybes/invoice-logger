
import { PlusThin } from "react-huge-icons/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MoneyBagDollar, Invoice, LoadingDashed, ChartHistogram, ExchangeRectangle } from "react-huge-icons/solid";
import { useAppDispatch } from "../../../../States/hoooks/hook";
import { createNewInvoice } from "../../../../States/Slices/invoice";

const AccountDetails = () => {
  const { draft, sent, revenue, paid, settings } = useAppSelector(
    (state) => state.invoice
  );
  const { account } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  
  const [invoicesPerPage] = useState(2);
  const [currentPage] = useState(1);
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = draft?.slice(indexOfFirstInvoice, indexOfLastInvoice);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  // Chart Global Defaults
  ChartJS.defaults.color = "#94a3b8";
  ChartJS.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  const getMonthlyCounts = (invoices: any[]) => {
    const counts = new Array(12).fill(0);
    invoices?.forEach((inv) => {
        const date = new Date(Number(inv.id));
        if (!isNaN(date.getTime())) {
            const month = date.getMonth();
            counts[month]++;
        }
    });
    return counts;
  };

  const paidCounts = getMonthlyCounts(paid || []);
  const draftCounts = getMonthlyCounts(draft || []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: paidCounts,
        borderColor: "#8b5cf6",
        backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
            return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#8b5cf6",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Work in Progress",
        data: draftCounts,
        borderColor: "#0ea5e9",
        backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(14, 165, 233, 0)');
            gradient.addColorStop(1, 'rgba(14, 165, 233, 0.1)');
            return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#0ea5e9",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const LineChart = () => {
    return (
        <Line
          height={240}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#94a3b8' },
                    grid: { display: true, color: '#f1f5f9' }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
              legend: { 
                position: "top", 
                align: 'end',
                labels: { 
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: { size: 12, weight: 'bold' }
                } 
              },
              tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
                cornerRadius: 8,
                displayColors: false
              }
            },
          }}
        />
    );
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-12 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
            {greeting()}, {account?.Firstname || 'there'}!
          </h1>
          <p className="text-slate-500 font-medium">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Link 
                to="/new/invoice"
                onClick={() => dispatch(createNewInvoice())}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95"
            >
                <Invoice className="text-lg" />
                Quick Invoice
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <MoneyBagDollar className="text-7xl -mr-4 -mt-4 text-violet-600" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Revenue</p>
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: typeof settings?.defaultCurrency === 'string' ? settings.defaultCurrency : 'USD' }).format(revenue)}
          </h2>
          <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold">
            <span className="p-1 rounded-full bg-emerald-50 text-[8px]">↑</span>
            Calculated from paid invoices
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ChartHistogram className="text-7xl -mr-4 -mt-4 text-sky-600" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Invoices</p>
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            {draft.length + sent.length + paid.length}
          </h2>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
            All registered transactions
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <LoadingDashed className="text-7xl -mr-4 -mt-4 text-amber-600" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Drafts</p>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{draft.length}</h2>
          <div className="flex items-center gap-1.5 text-amber-600 text-[10px] font-bold">
            Unsent or incomplete work
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ExchangeRectangle className="text-7xl -mr-4 -mt-4 text-blue-600" />
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Outgoing</p>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{sent.length}</h2>
          <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-bold">
            Awaiting payment confirmation
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart View */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Performance Volume</h3>
            <div className="flex items-center gap-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                {new Date().getFullYear()} Overview
            </div>
          </div>
          <div className="h-[280px]">
            <LineChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Invoices</h3>
            <Link to="/invoices" className="text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors uppercase tracking-widest">
                View All
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {draft?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                <Invoice className="text-4xl mb-2" />
                <p className="text-sm font-medium">No recent activity</p>
              </div>
            ) : (
                currentInvoices.reverse().map((invoice: any) => (
                  <div key={invoice.id} className="group cursor-pointer">
                    <div className="flex items-center justify-between p-1 bg-slate-50 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-100">
                        <InvoiceTemplate invoice={invoice} />
                    </div>
                  </div>
                ))
            )}
            
            <Link 
                to="/new/invoice" 
                onClick={() => dispatch(createNewInvoice())}
                className="mt-4 flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-slate-200 text-slate-400 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50/50 transition-all font-bold text-sm"
            >
                <PlusThin className="text-lg" />
                Create New Invoice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
