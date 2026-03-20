# 🗳️ Decentralized Voting System

A fully decentralized, blockchain-based voting platform built with **Solidity**, **Hardhat**, **React.js**, and **Ethers.js**. The system allows an admin to manage elections on-chain, while any user with a MetaMask wallet can cast their vote transparently.

---

## ✨ Features

- 🔐 Admin-controlled election lifecycle (Start → End → Restart)
- 👤 MetaMask wallet connection
- 🗳️ One vote per address per election (tracked on-chain via `electionId`)
- 📊 Live candidate vote counts visible to all visitors
- 🏆 Automatic winner calculation after election ends
- 🔄 Admin can restart a new election after one concludes
- 📱 Fully responsive UI (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Smart Contract | Solidity ^0.8.0  |
| Local Blockchain | Ganache           |
| Framework  | Hardhat               |
| Frontend   | React + Vite          |
| Web3 Library | Ethers.js v6        |
| Wallet     | MetaMask              |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Ganache Desktop](https://trufflesuite.com/ganache/) (running on port 7545)
- [MetaMask](https://metamask.io/) browser extension

### 1. Clone the Repository
```bash
git clone https://github.com/Anuragkumarbharti/Decentralized-Voting-System.git
cd Decentralized-Voting-System
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and paste your Ganache account's private key
```

### 4. Compile the Smart Contract
```bash
npx hardhat compile
```

### 5. Deploy the Contract
Make sure Ganache is running first, then:
```bash
node scripts/deploy_native.js
```
This will deploy the contract and automatically update the frontend's contract address.

### 6. Install Frontend Dependencies & Run
```bash
cd frontend
npm install
npm run dev
```

Open your browser at **http://localhost:5173**

---

## 🔑 Admin Access

The account whose **private key** is in your `.env` file becomes the contract **Admin**. To access the Admin Dashboard in the browser:
1. Import that private key into MetaMask.
2. Switch MetaMask to the **Localhost 7545** network (Ganache).
3. Click **Connect MetaMask to Vote** on the website.
4. The **Admin Dashboard** panel will appear automatically.

---

## 📁 Project Structure

```
VOTING/
├── contracts/          # Solidity smart contracts
│   └── Voting.sol
├── scripts/            # Deployment scripts
│   └── deploy_native.js
├── frontend/           # React frontend (Vite)
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── ABI.json
│       └── contractAddress.js
├── hardhat.config.js
├── .env.example
└── README.md
```

---

## 📜 License

MIT
