import { ArrowLeft, CheckMarkCircle } from "react-huge-icons/solid";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors mb-8 group">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 mb-8 font-medium">Last Updated: January 2026</p>
          
          <div className="space-y-10 prose prose-slate prose-lg">
            <section>
              <h2 className="text-2xl font-black mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing or using STEADYBILL, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>

            <section className="p-8 bg-violet-50 rounded-3xl border border-violet-100">
              <h2 className="text-2xl font-black mb-4 text-violet-900 flex items-center gap-3">
                <CheckMarkCircle className="text-violet-600" /> 2. Transaction Fees
              </h2>
              <p className="text-slate-700 font-bold leading-relaxed mb-4">
                STEADYBILL provides payment processing services through integrated gateways. 
              </p>
              <div className="p-4 bg-white rounded-2xl border border-violet-200 shadow-sm">
                <p className="text-lg font-black text-violet-800 m-0">
                  A standard commission of <span className="text-3xl text-slate-900">0.3%</span> is charged on every successful transaction paid by your customers via STEADYBILL invoices.
                </p>
              </div>
              <p className="text-slate-500 text-sm mt-4 italic">
                These fees are automatically deducted or billed depending on your selected payment provider configuration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">3. User Responsibilities</h2>
              <p className="text-slate-600 leading-relaxed">
                As a user, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must ensure that all invoicing and billing practices comply with local laws and tax regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">4. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of STEADYBILL and its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                In no event shall STEADYBILL, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">6. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
