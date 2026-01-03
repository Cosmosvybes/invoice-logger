import { ArrowLeft } from "react-huge-icons/solid";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors mb-8 group">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
          <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 mb-8 font-medium">Last Updated: January 2026</p>
          
          <div className="space-y-10 prose prose-slate prose-lg">
            <section>
              <h2 className="text-2xl font-black mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to STEADYBILL. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">2. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Personal identifiers (Name, Email, Phone Number)</li>
                <li>Business information (Business Name, Address, Tax ID)</li>
                <li>Financial information (Payment details, Transaction history)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed">
                We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">4. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">5. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions or comments about this policy, you may email us at support@steadybill.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
