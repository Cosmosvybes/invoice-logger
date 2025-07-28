import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { marketPlaceCredentials } from "../../Components/Web3/Credentials/Marketplace/Index";
import { toast } from "react-toastify";

const { markePlacetAddress, marketPlaceAbi } = marketPlaceCredentials;
const ethereum = (window as any).ethereum;


const getSmartContractTransaction = async (
  contractAddress: string,
  abi: any
) => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const contractTransaction = new ethers.Contract(contractAddress, abi, signer);
  return contractTransaction;
};




export const getMarketJobs = createAsyncThunk("getMarketJobs", async () => {
  const marketJobs: JOBINTERFACE[] = [];
  // dispatch(setLoading());
  try {
    const smartContractTransaction = await getSmartContractTransaction(
      markePlacetAddress,
      marketPlaceAbi
    );

    const jobsCounter = await smartContractTransaction.jobCount();
    for (let i = 0; i <= jobsCounter; i++) {
      const job = await smartContractTransaction.jobs(i);
      if (
        job[2] == "0x0000000000000000000000000000000000000000" ||
        Number(job[8]) != 0
      ) {
        continue;
      }
      marketJobs.push(job);
    }
    const structuredJobsData = marketJobs.map((job: JOBINTERFACE) => ({
      id: Number(job.id),
      client: job.client,
      description: job.description,
      budget: Number(job.budget),
      jobTitle: job.jobTitle,
      deadline: String(
        new Date(Number(job.deadline) * 1000).toLocaleString("en-Us", {
          hour12: true,
        })
      ),
      category: job.category,
      JobStatus: Number(job.executionStatus),
      postedAt: String(
        new Date(Number(job.postedAt) * 1000).toLocaleString("en-Us", {
          hour12: true,
        })
      ),
      executionDuration: job.executionDuration,
      executionStatus: Number(job.executionStatus),
    }));
    return structuredJobsData;
  } catch (error) {
    toast.error("Error fetching the business deals", {
      position: "top-center",
      theme: "colored",
    });
  }
});

export interface JOBINTERFACE {
  id: number;
  jobTitle: string;
  description: string;
  client: string;
  executionStatus: number;
  budget: number;
  category: string;
  executionDuration: any;
  postedAt: any;
  deadline: any;
  // executionStatus: number;
}
export interface iMARKETPLACE {
  jobs: JOBINTERFACE[];
  currentJobSelected: JOBINTERFACE;
  userDeals: JOBINTERFACE[];
}
const initialState: iMARKETPLACE = {
  currentJobSelected: {
    id: 0,
    jobTitle: "",
    description: "",
    client: "",
    executionStatus: 0,
    budget: 0,
    category: "",
    executionDuration: "",
    postedAt: "",
    deadline: "",
  },
  jobs: [],
  userDeals: [],
};

const marketplaceSlice = createSlice({
  name: "marketplaceSlice",
  initialState,
  reducers: {
    listJob: (state, action: PayloadAction<JOBINTERFACE>) => {
      state.jobs.push(action.payload);
    },
    setCurrentJob: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id == id);
      const job = state.jobs[jobIndex];
      state.currentJobSelected = job;
      // state.currentJobSelected = {...state.currentJobSelected,...job}
    },
    setJobs: (state, action: PayloadAction<JOBINTERFACE[]>) => {
      state.jobs = action.payload;
    },
    setUserDeals: (state, action: PayloadAction<any>) => {
      state.userDeals = action.payload;
    },
    clearUserDeals:(state,action:PayloadAction<[]>)=>{
      state.userDeals=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketJobs.fulfilled, (state, action) => {
      state.jobs = action.payload || [];
      state.currentJobSelected = action.payload![0];

      // console.log(state.jobs);
    });
  },
});

export const { listJob, setCurrentJob, clearUserDeals, setJobs, setUserDeals } =
  marketplaceSlice.actions;
export default marketplaceSlice.reducer;
