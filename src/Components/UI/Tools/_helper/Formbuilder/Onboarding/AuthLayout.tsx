import React from 'react';
import { Invoice } from 'react-huge-icons/bulk';
import { CheckMarkCircle } from 'react-huge-icons/solid';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageAlt?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans">
      {/* Left Side: Brand & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Invoice className="text-2xl text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight uppercase">Etherbill</span>
          </div>

          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Simplify your invoicing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
              and grow your business.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Join thousands of professionals managing their finances with ease. Precise, fast, and secure.
          </p>

          <div className="space-y-4">
            <BenefitItem text="Professional Branded Invoices" />
            <BenefitItem text="Real-time Financial Analytics" />
            <BenefitItem text="Secure Global Payments" />
            <BenefitItem text="Automated Tax Compliance" />
          </div>
        </div>

        {/* Subtle Bottom Accent */}
        <div className="absolute bottom-8 left-12 text-slate-500 text-sm font-medium">
            &copy; 2024 Etherbill. All rights reserved.
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-8">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                    <Invoice className="text-xl" />
                </div>
                <span className="font-bold text-xl text-slate-900">Etherbill</span>
             </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">{title}</h2>
              <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
            </div>
            {children}
          </div>

          {/* Small Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400 font-medium">
             <a href="#" className="hover:text-slate-600">Privacy Policy</a>
             <a href="#" className="hover:text-slate-600">Terms of Service</a>
             <a href="#" className="hover:text-slate-600">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="bg-slate-800 rounded-full p-1 border border-slate-700">
        <CheckMarkCircle className="text-violet-400 text-lg" />
    </div>
    <span className="text-slate-300 font-medium text-sm">{text}</span>
  </div>
);

export default AuthLayout;
