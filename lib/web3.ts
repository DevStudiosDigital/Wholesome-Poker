import Web3 from "web3";
const web3Instance = new Web3(process.env.ALCHEMY_PROVIDER_URL);

export { web3Instance };
