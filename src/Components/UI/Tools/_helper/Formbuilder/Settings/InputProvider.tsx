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
  }: {
    schema: {
      type: string;
      name: string;
      value: boolean | string;
      label: string;
      checked?: boolean | string;
      options?: [];
    }[];
    data: { [key: string]: string };
    settings: { [key: string]: any };
    handleChange: (newVal: string, name: string | boolean) => void;
    handleSubmit(): void;
    title: string;
  }) => {
    const safeSettings = settings || {};
    
    const FORM = schema.map((_, i) => {
      switch (_.type) {
        case "switch":
          return (
            <div className="relative border border-slate-200 p-3 rounded-lg mb-2 bg-slate-50 hover:bg-slate-100 transition-colors" key={i}>
              <div className="flex justify-between items-center w-full">
                  <label className="text-sm text-slate-700 font-bold cursor-pointer">{_.label}</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={!!safeSettings[_.name]}
                        onChange={(e) => {
                            handleChange(_.name, e.currentTarget.checked);
                        }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600 shadow-inner"></div>
                </label>
              </div>
            </div>
          );
        case "select":
          return (
            <div className="relative mb-3" key={i}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-600 uppercase font-bold tracking-wider ml-1"> {_.label}</label>
                <div className="relative">
                    <Input
                    type="select"
                    className="clean-input w-full p-2.5 rounded-lg appearance-none cursor-pointer text-slate-800 bg-white font-medium"
                    value={safeSettings[_.name] || ""}
                    onChange={(e) =>
                        handleChange(_.name, e.target.value)
                    }
                    >
                    {_.options && _.options.length > 0 ? (
                        _.options.map((opt: string, idx: number) => (
                             <option key={idx} className="text-slate-800" value={opt}>{opt}</option>
                        ))
                    ) : (
                        <>
                            <option className="text-slate-500">--select--</option>
                            <option className="text-slate-800">USD</option>
                            <option className="text-slate-800">NGN</option>
                            <option className="text-slate-800">EUR</option>
                            <option className="text-slate-800">KWT</option>
                        </>
                    )}
                    </Input>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="relative mb-3" key={i}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-600 uppercase font-bold tracking-wider ml-1"> {_.label}</label>
                <Input
                  type="text"
                  className="clean-input text-sm font-medium text-slate-800"
                  value={safeSettings[_.name] || ""}
                  onChange={(e) => handleChange(_.name, e.target.value)}
                />
              </div>
            </div>
          );
      }
    });

    return (
      <div className="clean-card p-6 h-full flex flex-col bg-white border border-slate-200 shadow-sm rounded-xl">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
        <div className="w-full h-px bg-slate-100 mb-6"></div>
        
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
    );
  }
);

export default InputProvider;
