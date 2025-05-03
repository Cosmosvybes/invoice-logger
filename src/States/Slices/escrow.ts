import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ESCROWVOTE {
  client: number | any;
  worker: number | any;
}
export interface EscrowInterface {
  _jobID: number;
  client: string;
  worker: string | any;
  jobTitle: string;
  budget: number;
  startTime: string;
  jobDuration: string;
  isCompleted: boolean;
  inDispute: boolean;
  completedTime: string;
  tradeBallot: ESCROWVOTE;
  jobDeadline: any;
  escrowID: number;
}

const initialState = {
  escrows: [] as EscrowInterface[],
  currentEscrow: {} as EscrowInterface,
};
const escrowSlice = createSlice({
  name: "escrowSlice",
  initialState,
  reducers: {
    openEscrow: (state, action: PayloadAction<EscrowInterface>) => {
      const Escrow = action.payload;
      // state.escrows.push(Escrow);
      state.currentEscrow = Escrow;
    },
    setEscrows: (state, action: PayloadAction<EscrowInterface[]>) => {
      state.escrows = action.payload;
    },

    closeEscrow: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const escrowIndex = state.escrows.findIndex(
        (escrow) => escrow.escrowID == id
      );
      state.escrows.splice(escrowIndex, 1);
    },
  },
});

export default escrowSlice.reducer;
export const { openEscrow, setEscrows, closeEscrow } = escrowSlice.actions;
