import { ArrowLeft, InformationCircle } from "react-huge-icons/solid";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors mb-8 group">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Help Center</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Everything you need to know about STEADYBILL. Can't find what you're looking for? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FAQCard 
            question="How do I create my first invoice?" 
            answer="Simply click on the 'New Invoice' button in your dashboard. Enter customer details, line items, and set your currency. You can then preview and send it directly via email."
          />
          <FAQCard 
            question="What are the platform fees?" 
            answer="STEADYBILL is free to start. We charge a minimal 0.3% commission on successful payments received through our platform to maintain our secure infrastructure."
          />
          <FAQCard 
            question="Can I use my own currency?" 
            answer="Yes! STEADYBILL supports multiple global currencies including USD and NGN. You can set the currency per invoice."
          />
          <FAQCard 
            question="Is my data secure?" 
            answer="We use enterprise-grade encryption and secure database practices. Your financial data and client information are protected by industry-standard security protocols."
          />
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Still have questions?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
              Our support team is available 24/7 to help you with any technical or billing inquiries.
            </p>
            <Link 
              to="/support" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-violet-50 transition-all shadow-xl active:scale-95"
            >
              Contact Support <InformationCircle className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQCard = ({ question, answer }: { question: string, answer: string }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-violet-200 transition-all group">
    <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors">
      <InformationCircle className="text-xl text-violet-600" />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{question}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{answer}</p>
  </div>
);

export default HelpCenter;
