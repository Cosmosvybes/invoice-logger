import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface escrowProof {
  filesUrl: string[];
}



export const getEscrowProofs = createAsyncThunk(
  "escrowProofs",
  async (escrowID: any) => {
    try {
      const response = await fetch(
        `https://ether-bill-server-1.onrender.com/api/escrow_proofs/?escrowID=${escrowID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const answer = await response.json();
      return answer;
    } catch (error: any) {
      console.log(error);
    }
  }
);



const initialState: escrowProof = {
  filesUrl: [],
};

const dealProofSlice = createSlice({
  name: "dealProofs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEscrowProofs.fulfilled, (state, action) => {
      const { filesURl } = action.payload;
      if (!filesURl) return;
      state.filesUrl = filesURl;
    });
  },
});
export default dealProofSlice.reducer;
