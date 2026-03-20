import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "paris"
    }
  },
  networks: {
    ganache: {
      type: "http",
      url: "http://127.0.0.1:7545",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
