import hre from "hardhat";
import fs from "fs";

async function main() {
  console.log("Deploying Voting contract...");
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();
  const address = await voting.getAddress();
  console.log("Voting deployed to:", address);
  
  fs.writeFileSync('deployed_address.txt', address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
