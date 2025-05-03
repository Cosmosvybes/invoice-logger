import { ethers } from "ethers";
import { shopCredientials } from "./Shop/constants";
import { tokenCredientials } from "./Token/constants";
import { marketPlaceCredentials } from "./Marketplace/Index";
import { useAppDispatch, useAppSelector } from "../../../States/hoooks/hook";
import {
  setIsConnected,
  setLoading,
  setTransactionHistory,
  setWalletAddress,
  setWalletBalance,
} from "../../../States/Slices/wallet";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { JOBINTERFACE, setUserDeals } from "../../../States/Slices/marketplace";
import {
  closeEscrow,
  EscrowInterface,
  openEscrow,
  setEscrows,
} from "../../../States/Slices/escrow";
import { useNavigate } from "react-router-dom";

export default function useSmartContractController() {
  const { address, balance, transactionHistory } = useAppSelector(
    (state) => state.walletSlice
  );
  const { escrows } = useAppSelector((state) => state.escrowSlice);
  const dispatch = useAppDispatch();
  const ethereum = (window as any).ethereum;
  const { abi, contractAddress } = shopCredientials;
  const { tokenAbi, tokenAddress } = tokenCredientials;

  const { markePlacetAddress, marketPlaceAbi } = marketPlaceCredentials;

  const [lastReciept, setPreviousReciept] = useState("");
  const [isToggled, setISToggled] = useState(false);
  const [purchaseFormToggle, setPurchaseFormToggle] = useState(false);
  const [swapTokenToggle, setSwapTokenToggle] = useState(false);
  const [active, setActive] = useState(10);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();
  // const [marketJobs, setMarketJobs] = useState<any[]>([]);

  const getSmartContractTransaction = async (
    contractAddress: string,
    abi: any
  ) => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contractTransaction = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    return contractTransaction;
  };

  const handleConnectWallet = async () => {
    try {
      dispatch(setLoading());
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      dispatch(setIsConnected());
      dispatch(setWalletAddress({ address: account }));
      setPreviousReciept("" + Math.random() + "abse");
      dispatch(setLoading());
    } catch (error: any) {
      dispatch(setLoading());
      // console.log(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: [] }],
      });
      dispatch(setIsConnected());
      dispatch(setWalletAddress({ address: null }));
      dispatch(setWalletBalance({ balanceValue: 0 }));
      toast.success("Account disconnected sucessfully", {
        position: "top-center",
      });
      dispatch(setTransactionHistory({ transactionHistory: [] }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleTopUp = async (amount: any) => {
    try {
      dispatch(setLoading());
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        from: address,
        to: contractAddress,
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      dispatch(setLoading());
      setPreviousReciept(String(Math.random() + "abse"));

      toast.success(
        `Sucessfully purchased EBT ${
          String(tx.hash).slice(0, 3) + "..." + String(tx.hash).slice(25, 28)
        } `,
        {
          position: "top-center",
        }
      );
    } catch (error) {
      dispatch(setLoading());
      toast.error(`Transaction aborted `, {
        position: "top-center",
      });
    }
  };

  const handleGetbalance = async () => {
    try {
      const smartContractTransaction = await getSmartContractTransaction(
        tokenAddress,
        tokenAbi
      );
      dispatch(setLoading());
      await smartContractTransaction.balanceOf(address);
      dispatch(setLoading());
      // console.log(balance);
    } catch (error) {
      // console.log(error);
      dispatch(setLoading());
    }
  };

  const handleRedeemToken = async () => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        contractAddress,
        abi
      );
      const tx = await smartContractTransaction.redeemEBT(amount);
      await tx.wait();
      setPreviousReciept(tx);

      dispatch(setLoading());
      toast.success(
        `Token sold...${
          String(tx.hash).slice(0, 8) + "..." + String(tx.hash).slice(20, 25)
        } `,
        {
          position: "top-center",
        }
      );
    } catch (error: any) {
      toast.error("Can't buy EBT now!", {
        position: "top-center",
      });
      dispatch(setLoading());
    }
  };

  const getAccountBalance = async () => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        tokenAddress,
        tokenAbi
      );
      const accountBalance = await smartContractTransaction.balanceOf(address);
      await handleGetTransactionHistory();
      dispatch(setWalletBalance({ balanceValue: accountBalance.toString() }));
      dispatch(setLoading());
    } catch (error: any) {
      dispatch(setLoading());
    }
  };

  const handleSendEBT = async () => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        tokenAddress,
        tokenAbi
      );
      const smartContractTransaction_Shop = await getSmartContractTransaction(
        contractAddress,
        abi
      );

      const tx = await smartContractTransaction.transfer(recipient, amount);
      await tx.wait();
      await smartContractTransaction_Shop.recordTransaction(
        "sent",
        amount,
        0,
        address,
        recipient,
        address
      );
      await smartContractTransaction_Shop.recordTransaction(
        "received",
        amount,
        0,
        address,
        recipient,
        recipient
      );
      await getAccountBalance();
      dispatch(setLoading());
      toast.success(
        `Token successfully transfered ${
          String(tx.hash).slice(0, 8) + "..." + String(tx.hash).slice(20, 25)
        } `,
        {
          position: "top-center",
        }
      );
    } catch (error: any) {
      console.log(error);
      dispatch(setLoading());
      setISToggled(!isToggled);
    }
  };

  const handleOpenSendingForm = () => {
    setISToggled(!isToggled);
  };
  const handleSetBuyTokenForm = () => {
    setPurchaseFormToggle(!purchaseFormToggle);
  };

  const handleSwapTokenForm = () => {
    setSwapTokenToggle(!swapTokenToggle);
  };

  const handleRecipientChange = (e: any) => {
    setRecipient(e.target.value);
  };
  const handleAmountChange = (value: number) => {
    setAmount(value);
    setActive(value);
  };

  const handleGetTransactionHistory = async () => {
    if (!address) {
      return alert("no acccount detected , connect account");
    }
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        contractAddress,
        abi
      );
      const tx = await smartContractTransaction.getClientTransactions(address);

      dispatch(
        setTransactionHistory({
          transactionHistory: tx.map((tx_: any) => ({
            date: new Date(tx_[0].toString() * 1000).toLocaleString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
            category: tx_.category,
            amount: tx_[2].toString(),
            etherAmountPaid: tx_[3].toString(),
            addressFrom: tx_[4],
            addressTo: tx_[5],
          })),
        })
      );
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      // console.log(error);
    }
  };

  useEffect(() => {
    getAccountBalance();
  }, [lastReciept]);

  const [transactionPerPage] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const indexOfLastPage = pageNumber * transactionPerPage;
  const indexOfFirstPage = indexOfLastPage - transactionPerPage;

  const currentTransactions = transactionHistory.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleApproval = async () => {
    try {
      const tokenContractAddress = await getSmartContractTransaction(
        tokenAddress,
        tokenAbi
      );
      dispatch(setLoading());
      const txHash = await tokenContractAddress.approve(
        markePlacetAddress,
        50000
      );
      await txHash.wait();
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
    }
  };

  const handleListNewJob = async (
    jobTitle: string,
    jobDuration: string,
    budget: number,
    description: string,
    deadline: number,
    category: string
  ) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.listJob(
        jobTitle,
        description,
        jobDuration,
        category,
        budget,
        deadline
      );
      // console.log(tx.hash)
      if (tx.hash) {
        toast.success("You have successfully listed a job", {
          position: "top-center",
          theme: "colored",
        });
      }
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      toast.warn("Low $EBT balance, BUY $EBT to list yours jobs.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleGetJobStatus = async (id: number) => {
    let status;
    // const job = { jobExecutionState: 0 };
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );

      const jobsCounter = await smartContractTransaction.jobCount();
      for (let i = 0; i <= jobsCounter; i++) {
        const job = await smartContractTransaction.jobs(i);
        if (
          job[2] == "0x0000000000000000000000000000000000000000" ||
          Number(job[0]) != id
        ) {
          continue;
        }
        status = Number(job[8]);
        // console.log(job,status)
      }
      dispatch(setLoading());
      return status;
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
    }
  };
  const getUsersListedDeals = async () => {
    const usersDeals: JOBINTERFACE[] = [];
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );

      const jobsCounter = await smartContractTransaction.jobCount();
      for (let i = 0; i <= jobsCounter; i++) {
        const job = await smartContractTransaction.jobs(i);
        if (job[2].toUpperCase() != String(address).toUpperCase()) {
          continue;
        }
        usersDeals.push(job);
      }

      const structuredUserDeals = usersDeals.map((job: JOBINTERFACE) => ({
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
        JobStatus: Number(job.jobExecutionState),
        postedAt: String(
          new Date(Number(job.postedAt) * 1000).toLocaleString("en-Us", {
            hour12: true,
          })
        ),
        executionDuration: job.executionDuration,
        jobExecutionState: Number(job.jobExecutionState),
      }));

      dispatch(setUserDeals(structuredUserDeals));
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      toast.error("Error fetching the your listed deals", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleDelistDeal = async (id: number) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.unListJob(id);
      await tx.wait();
      if (tx)
        toast.success("Deal successfully delisted", {
          position: "top-center",
          theme: "colored",
        });
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      // console.log(error)
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleBidForJob = async (
    client: string,
    jobTitle: string,
    budget: number,
    jobDuration: string,
    id: number,
    jobDeadline: number
  ) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.bidForJob(
        client,
        jobTitle,
        budget,
        jobDuration,
        id,
        Math.floor(new Date(jobDeadline).getTime() / 1000)
      );
      await tx.wait();
      if (tx)
        dispatch(
          openEscrow({
            client,
            jobTitle,
            budget,
            jobDeadline,
            inDispute: false,
            isCompleted: false,
            startTime: "",
            completedTime: "",
            tradeBallot: { client: 0, worker: 0 },
            jobDuration,
            _jobID: id,
            worker: address,
            escrowID: escrows.length + 1,
          })
        );

      if (tx) {
        navigate(`/deal/escrow/${id}`);
        dispatch(setLoading());
      }
    } catch (error: any) {
      dispatch(setLoading());

      if (error.code == "CALL_EXCEPTION")
        toast.warn("You can't open multiple deals", {
          position: "top-center",
          theme: "colored",
        });
      else {
        toast.error("Error occured", {
          position: "top-center",
          theme: "colored",
        });
      }
    }
  };

  const handleCLoseEscrow = async (id: number) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.closeEscrow(id);
      await tx.wait();
      dispatch(closeEscrow({ id }));
      dispatch(setLoading());
      toast.success("Escrow closed, stake refunded");
    } catch (error) {
      dispatch(setLoading());
      // console.log(error);
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const getEscrows = async () => {
    const userEscrows: EscrowInterface[] = [];
    const tradeBallot = { client: 0, worker: 0 };
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const escrowCount = await smartContractTransaction.escrowCount();
      for (let i = 0; i <= Number(escrowCount); i++) {
        const escrow = await smartContractTransaction.getEscrow(i);

        if (
          escrow[0] != "0x0000000000000000000000000000000000000000" &&
          escrow[1] != "0x0000000000000000000000000000000000000000"
        ) {
          if (
            (escrow[0].toUpperCase() == String(address).toUpperCase() &&
              escrow[1].toUpperCase() == String(address).toUpperCase()) ||
            escrow[6] != true
          ) {
            userEscrows.push(escrow);
            tradeBallot.client = Number(escrow[10][0]);
            tradeBallot.worker = Number(escrow[10][1]);
          }
        }

        const structuredEscrowData = userEscrows.map(
          (escrow: EscrowInterface) => ({
            _jobID: Number(escrow._jobID),
            client: escrow.client,
            budget: Number(escrow.budget),
            worker: escrow.worker,
            jobTitle: escrow.jobTitle,
            startTime: String(
              new Date(Number(escrow.startTime) * 1000).toLocaleString(
                "en-Us",
                {
                  hour12: true,
                }
              )
            ),
            inDispute: escrow.inDispute,
            isCompleted: escrow.isCompleted,
            completedTime: String(
              new Date(Number(escrow.completedTime) * 1000).toLocaleString(
                "en-Us",
                {
                  hour12: true,
                }
              )
            ),
            tradeBallot: {
              client: tradeBallot.client,
              worker: tradeBallot.worker,
            },
            jobDuration: escrow.jobDuration,
            jobDeadline: String(
              new Date(Number(escrow.jobDeadline) * 1000).toLocaleString(
                "en-Us",
                {
                  hour12: true,
                }
              )
            ),
            escrowID: Number(escrow.escrowID),
          })
        );

        dispatch(setEscrows(structuredEscrowData));
      }
      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleStartJob = async (jobID: number, escrowID: number) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.startJOb(jobID, escrowID);
      await tx.wait();
      if (tx) {
        toast.success("You have successfully started this Job", {
          theme: "colored",
          position: "top-center",
        });
      }
      dispatch(setLoading());
    } catch (error: any) {
      dispatch(setLoading());
      console.log(error);
      if (error.code == "ACTION_REJECTED")
        return toast.error("Action rejected by you", { theme: "colored" });
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleMarkJobAsComplete = async (jobID: number, escrowID: number) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.markJobAsComplete(
        jobID,
        escrowID
      );
      dispatch(setLoading());
      if (tx)
        toast.success("Job marked as completed", {
          position: "top-center",
          theme: "colored",
        });
    } catch (error: any) {
      dispatch(setLoading());
      // console.log(error);
      if (error.code == "ACTION_REJECTED")
        return toast.error("Action rejected by you", {
          theme: "colored",
          position: "top-center",
        });
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleReleaseFunds = async (escrowID: number) => {
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        markePlacetAddress,
        marketPlaceAbi
      );
      const tx = await smartContractTransaction.clientReleaseFunds(escrowID);
      if (tx) {
        toast.success("Funds successfully released!", {
          position: "top-center",
          theme: "colored",
        });
      }
      dispatch(setLoading());
    } catch (error: any) {
      dispatch(setLoading());
      // console.log(error);
      if (error.code == "ACTION_REJECTED")
        return toast.error("Action rejected by you", {
          theme: "colored",
          position: "top-center",
        });
      toast.error("Error occured", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return {
    handleReleaseFunds,
    handleGetJobStatus,
    handleMarkJobAsComplete,
    handleApproval,
    handleStartJob,
    getEscrows,
    handleBidForJob,
    handleCLoseEscrow,
    handleListNewJob,
    handleConnectWallet,
    transactionPerPage,
    handleDisconnect,
    handleTopUp,
    handleGetbalance,
    handleRedeemToken,
    balance,
    getAccountBalance,
    handleSendEBT,
    handleOpenSendingForm,
    isToggled,
    handleRecipientChange,
    handleAmountChange,
    recipient,
    amount,
    active,
    handleSetBuyTokenForm,
    handleSwapTokenForm,
    purchaseFormToggle,
    swapTokenToggle,
    transactionHistory,
    currentTransactions,
    handlePageChange,
    getUsersListedDeals,
    handleDelistDeal,
  };
}
