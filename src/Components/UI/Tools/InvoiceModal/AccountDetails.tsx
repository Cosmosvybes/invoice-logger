
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../States/hoooks/hook";
import InvoiceTemplate from "../_helper/Formbuilder/Common/InvoiceTemplate";
import { useState } from "react";
// import { Card, CardBody, CardText, CardTitle } from "reactstrap"; // Removed Reactstrap
// import GlassCard from "../GlassCard"; // Removed GlassCard usage
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const AccountDetails = () => {
  const { draft, sent, revenue, paid, settings } = useAppSelector(
    (state) => state.invoice
  );
  // const { balance, isConnected } = useAppSelector((store) => store.walletSlice);
  const [invoicesPerPage] = useState(2);

  const [currrentPage] = useState(1);
  let indexOfLastInvoice = currrentPage * invoicesPerPage;
  let indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = draft?.slice(indexOfFirstInvoice, indexOfLastInvoice);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Chart Global Defaults for Light Mode
  ChartJS.defaults.color = "#475569"; // slate-600
  ChartJS.defaults.borderColor = "#e2e8f0"; // slate-200

  // Helper to calculate monthly volume
  const getMonthlyCounts = (invoices: any[]) => {
    const counts = new Array(12).fill(0);
    invoices?.forEach((inv) => {
        // Use ID as timestamp if available, fallback to createdAt if it were ISO (but it's not)
        // ideally ID is Date.now() from creation
        const date = new Date(Number(inv.id));
        if (!isNaN(date.getTime())) {
            const month = date.getMonth(); // 0-11
            counts[month]++;
        }
    });
    return counts;
  };

  // Get real data
  const paidCounts = getMonthlyCounts(paid || []);
  const draftCounts = getMonthlyCounts(draft || []);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Paid",
        data: paidCounts, // [NEW] Real Data
        borderColor: "#7c3aed", // Violet 600
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#7c3aed",
      },
      {
        label: "Draft",
        data: draftCounts, // [NEW] Real Data
        borderColor: "#0ea5e9", // Sky 500
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#0ea5e9",
      },
    ],
  };

  const LineChart = () => {
    return (
      <>
        <Line
          height={180}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, // Ensure we start at 0
                    ticks: {
                        stepSize: 1, // Count is integer
                        precision: 0
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
              legend: { position: "top", labels: { color: "#475569" } },
              title: { display: false, text: "Invoicing Metrics", color: "#1e293b" },
            },
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="relative overflow-y-scroll w-full flex-col transition max-sm:py-2 max-sm:h-auto flex justify-center items-center max-sm:px-0 max-sm:w-full">
        <div className="relative h-auto w-full max-sm:w-full rounded-3xl flex flex-col gap-4 px-1 font-bold">
          <div className="w-full block relative">
            <p className="text-slate-900 px-2 text-xl max-sm:text-sm font-bold mb-4 tracking-tight">
              Overview
            </p>

            <div className="relative w-full grid gap-4 max-md:gap-5 mt-2 px-1 grid-cols-4 max-md:grid-cols-2 max-sm:gap-2 max-sm:grid-cols-2">
              <div className="flex flex-col justify-center gap-2 bg-white border border-slate-200 shadow-sm p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-slate-600 text-sm uppercase tracking-wide font-bold">Revenue</h3>
                <p className="text-slate-900 text-3xl max-sm:text-xl font-extrabold tracking-tight">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: typeof settings?.defaultCurrency === 'string' ? settings.defaultCurrency : 'USD' }).format(revenue)}
                </p>
              </div>
              
              <div className="flex flex-col justify-center gap-2 bg-white border border-slate-200 shadow-sm p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-slate-600 text-sm uppercase tracking-wide font-bold">Total Invoices</h3>
                <p className="text-slate-900 text-3xl max-sm:text-xl font-extrabold tracking-tight">
                  {draft.length + sent.length + paid.length}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-2 bg-white border border-slate-200 shadow-sm p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-slate-600 text-sm uppercase tracking-wide font-bold">Drafts</h3>
                <p className="text-slate-900 text-3xl max-sm:text-xl font-extrabold tracking-tight">
                  {draft.length}
                </p>
              </div>

              <div className="flex flex-col justify-center gap-2 bg-white border border-slate-200 shadow-sm p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-slate-600 text-sm uppercase tracking-wide font-bold">Outgoing</h3>
                <p className="text-slate-900 text-3xl max-sm:text-xl font-extrabold tracking-tight">
                  {sent.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full flex items-center mt-6 gap-2 justify-between max-sm:px-0 max-sm:grid max-sm:grid-cols-1 max-sm:w-full">
            <div className="relative w-full flex justify-between items-center px-1">
              <p className="text-slate-700 text-sm font-bold uppercase tracking-wider">
                Latest Invoice
              </p>
              <Link
                to={"/invoices"}
                className="text-violet-600 text-sm font-bold hover:text-violet-800 transition-colors bg-violet-50 px-3 py-1 rounded-full"
               >
                View All
              </Link>
            </div>
          </div>

          {/* invoice drafts */}
          <div className="relative w-full max-sm:h-auto h-auto gap-6 border-none flex justify-between max-sm:flex-col max-md:flex-col mt-2">
            <div className="w-1/2 max-sm:w-full flex-col gap-4">
              <div className="flex flex-col w-full gap-4">
                {draft?.length == 0 ? (
                  <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
                    <p className="text-slate-400 text-lg font-medium">No recent invoices found</p>
                  </div>
                ) : (
                  <div className="w-full flex-col gap-3 flex">
                    {currentInvoices.reverse().map((invoice: any) => (
                      <div
                        className="relative rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all p-1"
                        key={invoice.id}
                      >
                        <InvoiceTemplate invoice={invoice} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/2 h-full max-sm:w-full">
              <div className="w-full h-full min-h-[350px] bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
