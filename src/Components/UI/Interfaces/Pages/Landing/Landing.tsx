import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckMarkCircle, 
  Diamond,
  MoneyBagDollar as Wallet,
  Star as ChartBar
} from "react-huge-icons/solid";
import { Invoice } from "react-huge-icons/bulk";
import { User as UserGroup } from "react-huge-icons/outline";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
                <Invoice className="text-2xl" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">Etherbill</span>
            </div>
            <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500">
              <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-violet-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-violet-600 transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/login" className="text-sm font-black text-slate-600 hover:text-slate-900 transition-colors">
                Log in
              </Link>
              <Link 
                to="/create/new/account" 
                className="px-6 py-3 bg-slate-900 text-white text-sm font-black rounded-xl hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 hover:shadow-violet-200 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply transition-all duration-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100/50 text-violet-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-in-up shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            New: High Performance Dashboard
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1] animate-fade-in-up delay-100">
            Professional Billing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-rose-500">
              Made Beautiful.
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-500 mb-12 font-medium leading-relaxed animate-fade-in-up delay-200">
            The all-in-one financial toolkit for modern entrepreneurs. Track invoices, manage relationships, and scale your business with crystal-clear precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up delay-300">
            <Link 
              to="/create/new/account"
              className="w-full sm:w-auto px-10 py-5 bg-violet-600 text-white text-lg font-black rounded-2xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-200 hover:shadow-violet-300 active:scale-95 flex items-center justify-center gap-3"
            >
              Start for Free <ArrowRight className="text-xl" />
            </Link>
            <Link 
              to="/login"
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              Watch Demo
            </Link>
          </div>

          {/* Product Preview Mockup */}
          <div className="mt-24 relative animate-fade-in-up delay-500 group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl overflow-hidden p-4 md:p-8 backdrop-blur-xl">
                  {/* Mock Dashboard Shell */}
                  <div className="flex flex-col gap-8">
                      {/* Top Metrics */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-5 bg-violet-600 rounded-3xl text-left shadow-lg shadow-violet-200">
                              <p className="text-[10px] font-black text-violet-200 uppercase tracking-widest mb-1">Total Revenue</p>
                              <h4 className="text-xl font-black text-white">$42,912.00</h4>
                          </div>
                          <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-left">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Invoices Sent</p>
                              <h4 className="text-xl font-black text-slate-900">128</h4>
                          </div>
                          <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-left">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Clients</p>
                              <h4 className="text-xl font-black text-slate-900">42</h4>
                          </div>
                          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-3xl text-left">
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Pending Pay</p>
                              <h4 className="text-xl font-black text-emerald-700">$3,400.00</h4>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Main Chart Area */}
                          <div className="md:col-span-2 space-y-6">
                              <div className="bg-slate-50/50 border border-slate-100 h-64 md:h-80 rounded-[2rem] p-8 flex flex-col justify-end gap-4 overflow-hidden relative">
                                  <div className="absolute top-8 left-8">
                                      <h5 className="text-lg font-black text-slate-900">Growth Projection</h5>
                                      <p className="text-xs font-bold text-slate-400">Quarterly performance analysis</p>
                                  </div>
                                  <div className="flex items-end justify-between h-32 gap-2">
                                      {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85].map((h, i) => (
                                          <div key={i} className="flex-1 bg-violet-500/20 rounded-t-xl hover:bg-violet-600 transition-all duration-500 cursor-pointer" style={{ height: `${h}%` }}></div>
                                      ))}
                                  </div>
                              </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="space-y-4 text-left">
                              <h5 className="text-sm font-black text-slate-900 px-2">Recent Settlements</h5>
                              {[
                                  { name: "Design Studio", amt: "+$2,400", time: "2m ago", color: "bg-emerald-500" },
                                  { name: "Apple Inc.", amt: "+$850", time: "1h ago", color: "bg-blue-500" },
                                  { name: "Stripe Payout", amt: "-$120", time: "4h ago", color: "bg-violet-500" },
                                  { name: "Web Hosting", amt: "-$45", time: "1d ago", color: "bg-rose-500" },
                                  { name: "Consultancy", amt: "+$1,200", time: "1d ago", color: "bg-amber-500" }
                              ].map((item, i) => (
                                  <div key={i} className="p-4 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl flex items-center gap-3 transition-all group">
                                      <div className={`w-10 h-10 rounded-xl ${item.color} flex-shrink-0 opacity-80 group-hover:scale-110 transition-transform`}></div>
                                      <div className="flex-1">
                                          <p className="text-xs font-black text-slate-900 leading-none mb-1">{item.name}</p>
                                          <p className="text-[10px] font-bold text-slate-400">{item.time}</p>
                                      </div>
                                      <span className={`text-xs font-black ${item.amt.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{item.amt}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Built for individuals, <br />scaled for teams.</h2>
            <p className="text-xl text-slate-500 font-medium">No more spreadsheets. No more friction. Just a seamless billing experience that lives where you do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <FeatureCard 
              icon={<Invoice />} 
              title="Branded Invoicing" 
              desc="Professional, custom-tailored invoices that speak your brand's language in every pixel."
              color="text-violet-600"
              bg="bg-violet-100"
            />
            <FeatureCard 
              icon={<UserGroup />} 
              title="Identity CRM" 
              desc="Deep insights into your client relationships. Track every interaction and payment history."
              color="text-blue-600"
              bg="bg-blue-100"
            />
            <FeatureCard 
              icon={<Wallet />} 
              title="Instant Cashflow" 
              desc="Integrated payment gateways ensure you get paid at the speed of light, anywhere."
              color="text-emerald-600"
              bg="bg-emerald-100"
            />
            <FeatureCard 
              icon={<ChartBar />} 
              title="Live Analytics" 
              desc="Real-time financial pulse. Visualize your growth with interactive charts and reports."
              color="text-amber-600"
              bg="bg-amber-100"
            />
            <FeatureCard 
              icon={<Diamond />} 
              title="Pro Infrastructure" 
              desc="Enterprise-grade features like auto-chasing and recurring billing for everyone."
              color="text-indigo-600"
              bg="bg-indigo-100"
            />
             <FeatureCard 
              icon={<CheckMarkCircle />} 
              title="Secure Archiving" 
              desc="Cloud-native invoice storage with professional PDF exports whenever you need them."
              color="text-rose-600"
              bg="bg-rose-100"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto mb-20 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Transparent growth.</h2>
                <p className="text-xl text-slate-400 font-medium">Choose a plan that scales with your ambition. No hidden fees, ever.</p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                {/* Free Plan */}
                <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 text-left hover:bg-white/[0.07] transition-all group">
                    <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest mb-4">Starter</h3>
                    <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-6xl font-black">$0</span>
                        <span className="text-sm font-bold text-slate-500 tracking-wide">/ LIFETIME</span>
                    </div>
                    <ul className="space-y-5 text-slate-300 font-medium mb-12 flex-1">
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-emerald-500 text-xl" /> 50 Complimentary Invoices</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-emerald-500 text-xl" /> Manage up to 3 Clients</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-emerald-500 text-xl" /> Integrated Payment Processing</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-emerald-500 text-xl" /> Standard PDF Templates</li>
                    </ul>
                    <Link to="/create/new/account" className="block w-full py-5 text-center bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-sm transition-all shadow-xl group-hover:shadow-white/5">
                        Begin Free Entry
                    </Link>
                </div>

                {/* Pro Plan */}
                 <div className="flex flex-col bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2.5rem] p-10 text-left relative shadow-2xl shadow-violet-900/40 transform hover:scale-[1.02] transition-all hover:rotate-1">
                    <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">Elite</div>
                    <h3 className="text-lg font-black text-violet-200 uppercase tracking-widest mb-4">Pro Plan</h3>
                    <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-6xl font-black">$4.5</span>
                        <span className="text-sm font-bold text-violet-200 tracking-wide">/ MONTHLY</span>
                    </div>
                    <ul className="space-y-5 text-white font-medium mb-12 flex-1">
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Unlimited Client Relationships</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Integrated Payment Processing</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Recurring Invoices (Set & Forget)</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Auto-Pursuing (Smart Follow-ups)</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Smart Tax & Discounts</li>
                        <li className="flex items-center gap-3"><CheckMarkCircle className="text-white text-xl" /> Real-time Invoice Chat</li>
                    </ul>
                    <Link to="/create/new/account" className="block w-full py-5 text-center bg-white text-violet-700 hover:bg-slate-50 rounded-2xl font-black text-sm transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95">
                        Unlock Pro Access
                    </Link>
                </div>
             </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                <div className="col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-white">
                             <Invoice className="text-lg" />
                        </div>
                        <span className="font-black text-xl text-slate-900 tracking-tight">Etherbill</span>
                    </div>
                    <p className="text-slate-500 font-medium max-w-sm leading-relaxed">Redefining how independent creators and growing agencies experience financial management.</p>
                </div>
                <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-6">Product</h4>
                    <ul className="space-y-4 text-sm text-slate-500 font-bold">
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Infrastructure</a></li>
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Pricing Mode</a></li>
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Security Kit</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-6">Company</h4>
                    <ul className="space-y-4 text-sm text-slate-500 font-bold">
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Our Vision</a></li>
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Methodology</a></li>
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Reach Us</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm text-slate-500 font-bold">
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Privacy Privacy</a></li>
                        <li><a href="#" className="hover:text-violet-600 transition-colors">Terms of Work</a></li>
                    </ul>
                </div>
            </div>
            <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-400 text-sm font-bold">&copy; 2024 Etherbill Technologies. All rights reserved.</p>
                <div className="flex gap-8 text-slate-400 font-bold text-sm">
                    <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
                </div>
            </div>
         </div>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, bg }: any) => (
  <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-violet-100/50 hover:shadow-2xl hover:shadow-violet-500/5 transition-all group overflow-hidden relative">
    <div className={`w-16 h-16 rounded-[1.5rem] ${bg} ${color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm`}>
      <span className="text-3xl">{icon}</span>
    </div>
    <div className="relative z-10">
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-100 rounded-full group-hover:bg-violet-50 transition-colors duration-500"></div>
  </div>
);

export default Landing;
