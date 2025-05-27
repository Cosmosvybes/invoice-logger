import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EscrowInterface } from "./escrow";

export interface DisputeInterface {
  disputes: EscrowInterface[];
  currentDispute: EscrowInterface;
}
const initialState: DisputeInterface = {
  disputes: [],
  currentDispute: {} as EscrowInterface,
};
const disputeSlice = createSlice({
  name: "disputeSlice",
  initialState,
  reducers: {
    openDispute: (state, action) => {
      const Dispute = action.payload;
      state.currentDispute = Dispute;
      localStorage.setItem("dispute", JSON.stringify(Dispute));
    },
    setDisputes: (state, action) => {
      state.disputes = action.payload;
    },
    clearDisputes: (state, action: PayloadAction<[]>) => {
      state.disputes=action.payload;
    },
    closeDispute: (state, action) => {
      const { id } = action.payload;
      const disputeIndex = state.disputes.findIndex(
        (dispute) => dispute.escrowID == id
      );
      state.disputes.splice(disputeIndex, 1);
    },
  },
});
export default disputeSlice.reducer;
export const { openDispute, setDisputes, closeDispute , clearDisputes} = disputeSlice.actions;
