import React from "react";
import {
  Input,
} from "reactstrap";

const InputProvider = React.memo(
  ({
    schema,
    settings,
    handleChange,
    handleSubmit,
    title,
    isPro,
    onUpgrade,
  }: {
    schema: {
      type: string;
      name: string;
      value: boolean | string;
      label: string;
      checked?: boolean | string;
      options?: string[];
      disabled?: boolean;
      gated?: boolean;
    }[];
    settings: any;
    handleChange: (name: string, newVal: string | boolean) => void;
    handleSubmit(): void;
    title: string;
    isPro?: boolean;
    onUpgrade?: () => void;
  }) => {
    const safeSettings = settings || {};
    
    const FORM = schema.map((_, i) => {
      switch (_.type) {
        case "switch":
          const isLocked = _.gated && !isPro;
          return (
            <div className="relative bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-3 hover:bg-white hover:border-violet-100 hover:shadow-lg hover:shadow-violet-200/10 transition-all flex items-center justify-between group" key={i}>
              <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                     <label className={`text-sm font-black ${isLocked ? 'text-slate-400' : 'text-slate-800'} cursor-pointer mb-0.5`}>{_.label}</label>
                     {isLocked && <span className="bg-slate-200 text-slate-500 text-[9px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1">🔒 PRO</span>}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status: {safeSettings[_.name] ? 'Enabled' : 'Disabled'}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={!!safeSettings[_.name]}
                    disabled={isLocked}
                    onChange={(e) => {
                        if(isLocked && onUpgrade) {
                            onUpgrade();
                            return;
                        }
                        handleChange(_.name, e.currentTarget.checked);
                    }}
                />
                 {/* Upgrade Overlay for Click Hijacking if needed, but visually disabled input handles it partially. Better to wrap in div for click capture. */}
                 {isLocked ? (
                     <div onClick={(e) => { e.preventDefault(); if(onUpgrade) onUpgrade(); }} className="w-12 h-7 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer shadow-none">
                         <span className="text-[10px]">🔒</span>
                     </div>
                 ) : (
                    <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-violet-600 shadow-inner group-hover:scale-105 transform"></div>
                 )}
              </label>
            </div>
          );
        case "select":
          return (
            <div className="relative mb-6" key={i}>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400 uppercase font-black tracking-[0.15em] ml-1"> {_.label}</label>
                <div className="relative group">
                    <Input
                    type="select"
                    className="w-full h-14 px-5 rounded-2xl appearance-none cursor-pointer text-slate-900 bg-slate-50 border-slate-100 font-bold focus:ring-4 focus:ring-violet-50 focus:border-violet-200 focus:bg-white transition-all shadow-sm"
                    value={safeSettings[_.name] || ""}
                    onChange={(e) =>
                        handleChange(_.name, e.target.value)
                    }
                    >
                    {_.options && _.options.length > 0 ? (
                        _.options.map((opt: string, idx: number) => (
                             <option key={idx} className="text-slate-800 font-medium" value={opt}>{opt}</option>
                        ))
                    ) : (
                        <>
                            <option className="text-slate-500">
                                {_.options ? "--select--" : "Loading resources..."}
                            </option>
                        </>
                    )}
                    </Input>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-violet-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="relative mb-6" key={i}>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400 uppercase font-black tracking-[0.15em] ml-1"> {_.label}</label>
                <Input
                  type="text"
                  disabled={_.disabled}
                  className="w-full h-14 px-5 rounded-2xl text-sm font-bold text-slate-900 bg-slate-50 border-slate-100 focus:ring-4 focus:ring-violet-50 focus:border-violet-200 focus:bg-white transition-all shadow-sm disabled:opacity-50 disabled:bg-slate-100 cursor-not-allowed"
                  value={safeSettings[_.name] || ""}
                  onChange={(e) => handleChange(_.name, e.target.value)}
                />
              </div>
            </div>
          );
      }
    });

    return (
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/20">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
            {title && <div className="mt-2 w-12 h-1 bg-violet-600 rounded-full"></div>}
        </div>
        
        <div className="p-8">
            <form
                className="flex flex-col gap-2 h-full"
                onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                }}
            >
                {FORM}
            </form>
        </div>
      </div>
    );
  }
);

export default InputProvider;
