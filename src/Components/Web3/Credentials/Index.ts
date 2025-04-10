import { ethers } from "ethers";
import { shopCredientials } from "./Shop/constants";
import { tokenCredientials } from "./Token/constants";
import { useAppDispatch, useAppSelector } from "../../../States/hoooks/hook";
import {
  setIsConnected,
  setLoading,
  setTransactionHistory,
  setWalletAddress,
  setWalletBalance,
} from "../../../States/Slices/wallet";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function useSmartContractController() {
  const { address, balance, transactionHistory } = useAppSelector(
    (state) => state.walletSlice
  );

  const dispatch = useAppDispatch();
  const ethereum = (window as any).ethereum;
  const { abi, contractAddress } = shopCredientials;
  const { tokenAbi, tokenAddress } = tokenCredientials;
  const [lastReciept, setPreviousReciept] = useState("");
  const [isToggled, setISToggled] = useState(false);
  const [purchaseFormToggle, setPurchaseFormToggle] = useState(false);
  const [swapTokenToggle, setSwapTokenToggle] = useState(false);
  const [active, setActive] = useState(10);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(10);

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
      if (!ethereum) {
        alert("Please install metamask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      dispatch(setIsConnected());
      dispatch(setWalletAddress({ address: account }));
      setPreviousReciept("" + Math.random() + "abse");
      // return await getAccountBalance();
    } catch (error: any) {
      console.log(error);
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
      const balance = await smartContractTransaction.balanceOf(address);
      dispatch(setLoading());
      console.log(balance);
    } catch (error) {
      console.log(error);
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
      dispatch(setWalletBalance({ balanceValue: accountBalance.toString() }));
      dispatch(setLoading());
    } catch (error: any) {
      dispatch(setLoading());
      console.log(error);
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
    try {
      dispatch(setLoading());
      const smartContractTransaction = await getSmartContractTransaction(
        contractAddress,
        abi
      );
      const tx = await smartContractTransaction.getClientTransactions(address);

      dispatch(setLoading());
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
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTransactionHistory();
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

  return {
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
  };
}
