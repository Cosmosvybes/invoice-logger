import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "./client.types";
import useModalController from "../../../Components/UI/Tools/InvoiceModal/controller";

const { newCLientsFormField } = useModalController();

const newClientDetails = newCLientsFormField.reduce(
  (valuesBucket, currModal) => ({
    ...valuesBucket,
    [currModal.name]: currModal.value,
  }),
  { id: Date.now() }
);

const clients: Client[] = [];


const initialState = {
  clients,
  clientForm: newClientDetails,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Client>) => {
      const newClient: Client = action.payload;
      state.clients.push(newClient);
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const client = state.clients.find(
        (client: (typeof state.clients)[0]) => client.id == id
      );
      const clientIndex = state.clients.indexOf(client!);
      state.clients.splice(clientIndex, 1);
    },
  },
});

export default clientSlice.reducer;
export const { add, remove } = clientSlice.actions;
