import Web3 from "web3";

import { abi as erc20Abi } from "./abi/erc20Abi.json";
import { logError } from "../utils/log";

let web3;
let web3Infura;

try {
  web3 = new Web3(window?.web3?.currentProvider);
  web3Infura = new Web3(
    `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  );

  // console.log("WEB", web3Infura);
} catch (e) {
  logError("Connect Web3", e);
}

export const erc20TokenContract = (tokenAddress) => {
  let contract;
  try {
    if (window?.web3?.currentProvider && web3) {
      contract = new web3.eth.Contract(erc20Abi, tokenAddress);
    } else {
      contract = new web3Infura.eth.Contract(erc20Abi, tokenAddress);
    }
    return contract;
  } catch (e) {
    logError("erc20TokenContract", e);
  }
};
