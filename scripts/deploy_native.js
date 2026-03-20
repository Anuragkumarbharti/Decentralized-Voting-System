import fs from "fs";
import { ethers, JsonRpcProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  const artifactJson = fs.readFileSync("./artifacts/contracts/Voting.sol/Voting.json", "utf8");
  const artifact = JSON.parse(artifactJson);
  
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  console.log("Deploying Voting contract natively...");
  const voting = await factory.deploy();
  await voting.waitForDeployment();
  const address = await voting.getAddress();
  console.log("Voting deployed to:", address);
  
  fs.writeFileSync("deployed_address.txt", address);
  fs.writeFileSync(
    "./frontend/src/contractAddress.js",
    `export const CONTRACT_ADDRESS = "${address}";\n`
  );
  
  console.log("Deployment complete! You can now use the Admin Dashboard in your browser to add candidates and start the election.");
}

main().catch(console.error);

