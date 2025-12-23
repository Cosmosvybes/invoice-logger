import { Input } from "reactstrap";
import useProductsListController from "./products.controller";
import { PlusRectangle, TrashBent } from "react-huge-icons/bulk";
import { Item } from "../../../../../../States/Slices/invoice.types";
import React from "react";

const ProductsList = React.memo(({}) => {
  const { addNew, remove, handleChange, invoiceInformation } =
    useProductsListController();

  return (
    <>
      <div className="w-full relative py-2">
        <div className="flex justify-between items-center mb-4 px-1">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Items List</h4>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                {invoiceInformation.itemList.length} Items
            </span>
        </div>
        
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
            {invoiceInformation.itemList.map((item: Item, i: number) => (
              <div
                key={i}
                className="relative bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200 group"
              >
                <div className="flex justify-between items-start mb-3 gap-3">
                    <div className="flex-1">
                        <label className="text-[10px] uppercase font-bold text-slate-600 mb-1 block">Description</label>
                        <Input
                            className="clean-input w-full p-2 text-sm text-slate-700 placeholder-slate-500 font-medium"
                            type={"text"}
                            placeholder={"Item name / description"}
                            value={item.description}
                            onChange={(e) => handleChange(e, i, "description")}
                        />
                    </div>
                    <button
                        onClick={() => remove(i, item.itemID)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 mt-6"
                    >
                        <TrashBent className="text-lg" />
                    </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-600 mb-1 block">Qty</label>
                         <Input
                            className="clean-input w-full p-2 text-center text-sm text-slate-700 placeholder-slate-500 font-mono font-medium"
                            type={"number"}
                            placeholder={"0"}
                            value={item.quantity}
                            onChange={(e) => handleChange(e, i, "quantity")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-600 mb-1 block">Price</label>
                        <Input
                            className="clean-input w-full p-2 text-center text-sm text-slate-700 placeholder-slate-500 font-mono font-medium"
                            type={"number"}
                            placeholder={"0.00"}
                            value={item.unitPrice}
                            onChange={(e) => handleChange(e, i, "unitPrice")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-600 mb-1 block">Total</label>
                         <div className="w-full p-2 text-center text-sm font-mono font-bold text-violet-600 bg-slate-50 rounded-lg border border-slate-100 h-[38px] flex items-center justify-center">
                            {Number(item.unitTotal).toFixed(2)}
                         </div>
                    </div>
                </div>
              </div>
            ))}
            
            {invoiceInformation.itemList.length === 0 && (
                 <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <p className="text-slate-500 text-sm font-bold">No items added yet</p>
                    <p className="text-slate-500/60 text-xs">Click the button below to add your first item</p>
                </div>
            )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
             <button 
                onClick={addNew} 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95"
            >
                <PlusRectangle className="text-lg" />
                <span className="text-sm font-bold uppercase tracking-wide">Add New Item</span>
            </button>
        </div>
      </div>
    </>
  );
});

export default ProductsList;
