import fs from "fs";
import { ethers, JsonRpcProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/Voting.sol/Voting.json", "utf8")
  );

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  console.log("Deploying Voting contract...");
  const voting = await factory.deploy();
  await voting.waitForDeployment();
  const address = await voting.getAddress();
  console.log("✅ Deployed to:", address);

  // Write contract address for frontend
  fs.writeFileSync(
    "./frontend/src/contractAddress.js",
    `export const CONTRACT_ADDRESS = "${address}";\n`
  );

  // Write trimmed ABI (plain array) for frontend
  fs.writeFileSync(
    "./frontend/src/ABI.json",
    JSON.stringify(artifact.abi, null, 2)
  );

  console.log("📁 contractAddress.js and ABI.json updated in frontend/src/");
}

main().catch(console.error);
