<div align="center">

# 🗳️ Decentralized Voting System

### A blockchain-powered election platform built with Solidity, React & Ethers.js

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Hardhat](https://img.shields.io/badge/Hardhat-3.x-F7DF1E?style=for-the-badge&logo=hardhat)](https://hardhat.org/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-v6-3C3C3D?style=for-the-badge)](https://docs.ethers.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **Transparent. Tamper-proof. Trustless.**  
> Every vote is recorded permanently on the Ethereum blockchain — no central authority, no manipulation, no middlemen.

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [How It Works](#-how-it-works)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Compile & Deploy](#compile--deploy)
  - [Run the Frontend](#run-the-frontend)
- [Admin Guide](#-admin-guide)
- [Voter Guide](#-voter-guide)
- [Smart Contract Reference](#-smart-contract-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔍 About the Project

Traditional voting systems suffer from a fundamental problem: **you have to trust someone**. You trust the organizer to count correctly, trust the system not to be hacked, and trust that your vote was actually registered.

This project eliminates all of that.

**Decentralized Voting System** is a full-stack DApp (Decentralized Application) where every voting action — adding candidates, casting a vote, ending an election — is a real transaction on the Ethereum blockchain. The results are **publicly verifiable** by anyone in the world, and **impossible to alter** once recorded.

Built as a real-world demonstration of Web3 technology, this project combines a Solidity smart contract with a modern React frontend to deliver a seamless, professional voting experience.

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                        FLOW OVERVIEW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Admin deploys the Voting.sol smart contract             │
│     └─> Admin address is permanently stored on-chain        │
│                                                             │
│  2. Admin adds candidates (before election starts)          │
│     └─> Each candidate stored in a Solidity array           │
│                                                             │
│  3. Admin starts the election                               │
│     └─> electionStarted = true                              │
│                                                             │
│  4. Voters connect MetaMask and cast their vote             │
│     └─> voters[electionId][address] = true  (prevents       │
│          double-voting across election restarts)            │
│                                                             │
│  5. Admin ends the election                                 │
│     └─> electionEnded = true, winner calculated on-chain    │
│                                                             │
│  6. Admin can restart — clears candidates, bumps electionId │
│     └─> Previous votes cannot be reused in new election     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🔐 For Admins
- ✅ Deploy a fresh election contract in seconds
- ✅ Add unlimited candidates before the election starts
- ✅ Start and end the election with a single click
- ✅ Restart the election after it concludes (with a new session ID)
- ✅ Admin-only dashboard hidden from regular users

### 🗳️ For Voters
- ✅ Connect with any MetaMask wallet — no signup needed
- ✅ See live candidates and vote counts without logging in
- ✅ Cast one vote per election per wallet address
- ✅ Voting is blocked after the election ends
- ✅ See the winner announced automatically after conclusion

### 🌐 For Everyone
- ✅ Public contract data loads on page visit — no wallet required to *view*
- ✅ Fully responsive UI — works on mobile, tablet, and desktop
- ✅ Real-time status: Live / Not Started / Concluded
- ✅ Transparent results verifiable by anyone on the blockchain

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Smart Contract | **Solidity 0.8.28** | On-chain election logic |
| Local Blockchain | **Ganache** | Local Ethereum node for development |
| Contract Framework | **Hardhat 3** | Compile, test, deploy contracts |
| Frontend Library | **React 19 + Vite** | Fast, modern UI |
| Web3 Library | **Ethers.js v6** | Blockchain interaction from browser |
| Wallet | **MetaMask** | User authentication + transaction signing |
| Styling | **Vanilla CSS** | Glassmorphism dark-mode design |

---

## 📁 Project Structure

```
Decentralized-Voting-System/
│
├── contracts/
│   └── Voting.sol              # The core smart contract
│
├── scripts/
│   └── deploy_native.js        # Deploy script (uses ethers.js directly)
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── App.jsx             # Main React application
│       ├── index.css           # All styling (glassmorphism dark theme)
│       ├── main.jsx            # React entry point
│       ├── ABI.json            # Contract ABI (auto-generated on deploy)
│       └── contractAddress.js  # Contract address (auto-generated on deploy)
│
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Root npm scripts
├── .env                        # Private key (never committed)
├── .env.example                # Template for environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| Ganache Desktop | Latest | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| MetaMask | Latest | [metamask.io](https://metamask.io/) (browser extension) |
| Git | Any | [git-scm.com](https://git-scm.com/) |

---

### Installation

**Step 1 — Clone the repository**
```bash
git clone https://github.com/Anuragkumarbharti/Decentralized-Voting-System.git
cd Decentralized-Voting-System
```

**Step 2 — Install all dependencies at once**
```bash
npm run setup
```
> This installs root dependencies (Hardhat, Ethers.js) and frontend dependencies (React, Vite) in one command.

---

### Environment Setup

**Step 3 — Create your `.env` file**
```bash
cp .env.example .env
```

Open `.env` and set your Ganache admin private key:
```env
PRIVATE_KEY=0xYOUR_GANACHE_ACCOUNT_PRIVATE_KEY_HERE
```

> **How to get your private key from Ganache:**
> 1. Open Ganache Desktop and start a workspace.
> 2. Click the 🔑 key icon next to any account.
> 3. Copy the **Private Key** shown.
> 4. Paste it into `.env` — this account becomes the **Admin**.

> ⚠️ **Security Warning:** Never share your private key. The `.env` file is listed in `.gitignore` and will **never** be pushed to GitHub.

---

### Compile & Deploy

**Step 4 — Start Ganache**

Open Ganache Desktop and make sure your workspace is running on:
```
RPC Server: http://127.0.0.1:7545
```

**Step 5 — Compile the smart contract**
```bash
npm run compile
```

**Step 6 — Deploy the contract**
```bash
npm run deploy
```

This single command will:
- Deploy `Voting.sol` to your local Ganache blockchain
- Automatically write the contract address to `frontend/src/contractAddress.js`
- Automatically write the trimmed ABI to `frontend/src/ABI.json`

You'll see output like:
```
Deploying Voting contract...
✅ Deployed to: 0xAbCd...1234
📁 contractAddress.js and ABI.json updated in frontend/src/
```

---

### Run the Frontend

**Step 7 — Start the React development server**
```bash
npm run frontend
```

Open your browser and visit: **http://localhost:5173**

---

## 🛡️ Admin Guide

The Admin Dashboard is **automatically visible** once you connect with the wallet that deployed the contract. Here's how:

### Connecting as Admin

1. Open **MetaMask** in your browser.
2. Click the account icon → **Import Account**.
3. Paste the same private key you used in your `.env` file.
4. Switch MetaMask to the **Localhost 7545** network:
   - Network Name: `Ganache`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
5. On the website, click **"Connect MetaMask to Vote"**.

The **Admin Dashboard** panel will appear with a gold **ADMIN PANEL** badge.

### Running an Election

| Step | Action | Button |
|---|---|---|
| 1 | Type a candidate name and click Add | **Add** |
| 2 | Repeat for all candidates | **Add** |
| 3 | When ready, start the election | **Start Election** |
| 4 | Let voters cast their votes | — |
| 5 | Close the election | **End Election** |
| 6 | Winner is announced automatically | — |
| 7 | Reset for a new round | **🔄 Restart Election** |

> When you restart, all candidate data is cleared and a new `electionId` is assigned. Previous voters can vote again in the new election — their old vote does not carry over.

---

## 🗳️ Voter Guide

1. Visit the website at `http://localhost:5173`
2. The candidates and election status are **visible immediately** — no wallet needed to view.
3. To vote, click **"Connect MetaMask to Vote"** and approve the connection.
4. If the election is Live, a **"Vote"** button will appear next to each candidate.
5. Click **Vote** next to your preferred candidate and **Confirm** the MetaMask popup.
6. Your vote is recorded permanently on the blockchain. You cannot vote again in the same election.

---

## 📄 Smart Contract Reference

**Contract:** `Voting.sol`

### State Variables

| Variable | Type | Description |
|---|---|---|
| `admin` | `address` | Address of the election administrator |
| `electionStarted` | `bool` | Whether the election is currently running |
| `electionEnded` | `bool` | Whether the election has concluded |
| `electionId` | `uint` | Increments on each restart to invalidate old votes |
| `candidates` | `Candidate[]` | Array of registered candidates |
| `voters` | `mapping(uint => mapping(address => bool))` | Vote records per election per voter |

### Functions

| Function | Access | Description |
|---|---|---|
| `addCandidate(string name)` | Admin only | Add a candidate before election starts |
| `startElection()` | Admin only | Open voting |
| `endElection()` | Admin only | Close voting |
| `restartElection()` | Admin only | Reset state and increment `electionId` |
| `vote(uint index)` | Any voter | Cast a vote for a candidate |
| `getCandidates()` | Public | Returns the full candidates array |
| `getWinner()` | Public | Returns winner name and vote count (after election ends) |

### Security Design

- **`onlyAdmin` modifier** — all sensitive functions revert if called by non-admin.
- **Double-vote protection** — `voters[electionId][msg.sender]` ensures one vote per wallet per election round.
- **State guards** — functions check `electionStarted` and `electionEnded` before execution to prevent invalid state transitions.

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👨‍💻 Author

**Anurag Kumar Bharti**

- GitHub: [@Anuragkumarbharti](https://github.com/Anuragkumarbharti)

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

**⭐ If you found this project useful, please consider giving it a star on GitHub!**

*Built with ❤️ using Solidity, React, and Ethers.js*

</div>
