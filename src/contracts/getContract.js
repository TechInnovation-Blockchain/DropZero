import Web3 from "web3";

import { abi as erc20Abi } from "./abi/erc20Abi.json";
import { abi as dropFactoryAbi } from "./abi/_dropFactoryAbi.json";
import { logError } from "../utils/log";
import { CONTRACT_ADDRESSES, RPC_URL, VALID_CHAIN } from "../config/constants";

let web3;
let web3Infura;

try {
  web3 = new Web3(window?.web3?.currentProvider);
  web3Infura = new Web3(RPC_URL);
} catch (e) {
  logError("Connect Web3", e);
}

export const setWeb3Provider = (provider) => {
  web3 = new Web3(provider);
};

export const erc20TokenContract = (tokenAddress) => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(erc20Abi, tokenAddress);
    } else {
      contract = new web3Infura.eth.Contract(erc20Abi, tokenAddress);
    }
    return contract;
  } catch (e) {
    logError("erc20TokenContract", e);
  }
};

export const dropFactoryContract = () => {
  let contract;
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(
        dropFactoryAbi,
        CONTRACT_ADDRESSES.dropFactory
      );
    } else {
      contract = new web3Infura.eth.Contract(
        dropFactoryAbi,
        CONTRACT_ADDRESSES.dropFactory
      );
    }
    return contract;
  } catch (e) {
    logError("erc20TokenContract", e);
  }
};
