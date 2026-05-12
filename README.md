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
- [Quick Start](#-quick-start)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Compile & Deploy](#compile--deploy)
  - [Run the Frontend](#run-the-frontend)
- [Usage Guide](#-usage-guide)
  - [Admin Dashboard](#admin-dashboard)
  - [Voter Workflow](#voter-workflow)
- [Smart Contract Reference](#-smart-contract-reference)
- [Troubleshooting](#-troubleshooting)
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
- ✅ **One-Click Deployment** — Deploy a fresh election contract in seconds with automated funding
- ✅ **Unlimited Candidates** — Add as many candidates as needed before the election starts
- ✅ **Election Control** — Start and end elections with a single click
- ✅ **Election Restart** — Reset elections with a new session ID to prevent vote reuse
- ✅ **Secure Admin Panel** — Admin-only dashboard hidden from regular users, identified automatically by wallet
- ✅ **Real-Time Monitoring** — Watch vote counts update as voters cast their ballots

### 🗳️ For Voters
- ✅ **Zero Setup** — Connect with any MetaMask wallet — no signup or registration needed
- ✅ **Public Transparency** — See live candidates and vote counts without logging in or connecting
- ✅ **One Vote Per Election** — Cast exactly one vote per wallet per election round
- ✅ **Election State Awareness** — Clear UI shows Live / Not Started / Concluded status
- ✅ **Blockchain-Backed** — Your vote is immutable and verifiable on the blockchain forever
- ✅ **Auto-Winner Announcement** — Winner is calculated and announced automatically when election ends

### 🌐 For Everyone
- ✅ **Fully Transparent** — All contract data is public and verifiable on-chain
- ✅ **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- ✅ **No Dependencies to View** — Public data loads immediately — no wallet or blockchain knowledge required
- ✅ **Glassmorphism UI** — Modern dark-mode design with smooth interactions
- ✅ **Gas-Efficient** — Optimized smart contract reduces transaction costs

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Smart Contract | **Solidity 0.8.28** | On-chain election logic with secure state management |
| Local Blockchain | **Hardhat** | Local Ethereum node for development & testing |
| Contract Framework | **Hardhat 3** | Compile, test, and deploy contracts with ease |
| Frontend Library | **React 19 + Vite** | Fast, modern UI with hot-reload development |
| Web3 Library | **Ethers.js v6** | Type-safe blockchain interaction from browser |
| Wallet | **MetaMask** | User authentication, transaction signing & fund management |
| Styling | **Vanilla CSS** | Glassmorphism dark-mode design with responsive layout |

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

## ⚡ Quick Start

**Got 2 minutes?** Here's the fastest way to get voting:

```bash
# 1. Clone and install
git clone https://github.com/Anuragkumarbharti/Decentralized-Voting-System.git
cd Decentralized-Voting-System
npm run setup

# 2. Start the local blockchain
npm run node

# (In another terminal)
# 3. Deploy the contract
npm run deploy

# 4. Start the frontend (in another terminal)
npm run frontend
```

Then:
- Open **http://localhost:5173** in your browser
- Connect MetaMask to `http://127.0.0.1:8546` (Chain ID: 31337)
- The first connected wallet becomes **Admin** — add candidates and start voting!

---

### Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| MetaMask | Latest | [metamask.io](https://metamask.io/) (browser extension) |
| Git | Any | [git-scm.com](https://git-scm.com/) |
| npm or yarn | Latest | Comes with Node.js |

> **Note:** Hardhat (the local blockchain) is installed automatically as an npm dependency. No manual setup needed!

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

**Step 3 — Create your `.env` file (optional for local development)**
```bash
cp .env.example .env
```

For local Hardhat development, the `.env` file is optional. However, if you want to specify a custom admin private key, add it to `.env`:

```env
PRIVATE_KEY=0xYOUR_HARDHAT_ACCOUNT_PRIVATE_KEY_HERE
```

> **Getting a private key for local development:**
> When you run `npm run node`, Hardhat generates 20 test accounts with known private keys. Use any of them! Example:
> ```
> Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
> Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
> ```

> ⚠️ **Security Warning:** Never use these test accounts on mainnet. Never share your private key. The `.env` file is listed in `.gitignore` and will **never** be pushed to GitHub.

---

### Compile & Deploy

**Step 4 — Start the Hardhat local blockchain**
```bash
npm run node
```

You'll see output showing 20 test accounts with their private keys and a message:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8546/
```

> This starts a local blockchain node that responds at `http://127.0.0.1:8546`. Keep this terminal running.

**Step 5 — In a new terminal, compile the smart contract**
```bash
npm run compile
```

This generates the ABI and bytecode needed for deployment.

**Step 6 — Deploy the contract**
```bash
npm run deploy
```

This single command will:
- Connect to your local Hardhat node
- Deploy `Voting.sol` to the blockchain
- Automatically write the contract address to `frontend/src/contractAddress.js`
- Automatically write the ABI to `frontend/src/ABI.json`

You'll see output like:
```
💰 Auto-funded admin wallet with 100 ETH
Deploying Voting contract...
✅ Deployed to: 0x5513F18ee5a5348bfc3B7d7E4f8876F17227A1b6
📁 contractAddress.js and ABI.json updated in frontend/src/
```

---

### Run the Frontend

**Step 7 — Start the React development server**
```bash
npm run frontend
```

You'll see output:
```
  VITE v8.0.1  ready in 2760 ms
  ➜  Local:   http://localhost:5173/
```

Open your browser and visit: **http://localhost:5173**

The website will load and connect to your local blockchain automatically! ✨

---

## 📖 Usage Guide

### Admin Dashboard

#### Connecting as Admin

1. Open **MetaMask** in your browser.
2. Add a custom network in MetaMask:
   - **Network Name:** `Hardhat Local`
   - **RPC URL:** `http://127.0.0.1:8546`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
3. Switch to this network in MetaMask.
4. Import an account using one of the private keys from `npm run node` output.
5. Visit **http://localhost:5173** and click **"Connect MetaMask"**.

> The wallet that first connects becomes the **Admin**. You'll see the gold **ADMIN PANEL** badge and all admin controls.

#### Admin Actions

| Step | Action | Notes |
|---|---|---|
| 1 | **Add Candidates** | Type candidate names one at a time and click **Add**. Repeat as many times as needed. |
| 2 | **Start Election** | Click **Start Election** to open voting. Voters can now cast ballots. |
| 3 | **Monitor Votes** | Watch vote counts update in real-time as voters participate. |
| 4 | **End Election** | Click **End Election** to close voting and calculate the winner. |
| 5 | **Announce Winner** | The winner is displayed with final vote counts. |
| 6 | **Restart Election** | Click **🔄 Restart Election** to clear all candidates and start fresh with a new `electionId`. |

> ⚠️ **Important:** When you restart, all previous candidates are cleared and the election ID increments. This prevents voter replay attacks — previous votes cannot be reused.

### Voter Workflow

1. Visit **http://localhost:5173** — no wallet needed to see candidates and vote counts.
2. When the election is **Live**, connect MetaMask by clicking **"Connect MetaMask to Vote"**.
3. The **Vote** button appears next to each candidate.
4. Click **Vote** next to your preferred candidate.
5. Approve the MetaMask popup — this signs the blockchain transaction.
6. Your vote is recorded permanently. You cannot vote again in the same election.
7. After the election ends, you'll see the final results and winner.

---

## 📄 Smart Contract Reference

**Contract:** `Voting.sol` (Solidity 0.8.28)

### Key Concepts

- **Admin:** The address that deploys the contract. Only admins can manage the election lifecycle.
- **Election ID:** Increments each time the election restarts. Prevents voter replay attacks.
- **Candidates:** Stored in an array. Each has a name and vote count.
- **Voters:** Tracked by `voters[electionId][address]`. Set to `true` when they vote.

### State Variables

| Variable | Type | Description |
|---|---|---|
| `admin` | `address` | Address of the election administrator (immutable) |
| `electionStarted` | `bool` | Whether voting is currently allowed |
| `electionEnded` | `bool` | Whether voting has been closed |
| `electionId` | `uint` | Current election session ID (increments on restart) |
| `candidates` | `Candidate[]` | Dynamic array of registered candidates |
| `voters` | `mapping(uint => mapping(address => bool))` | Tracks who voted per election per address |

### Public Functions

| Function | Access | Input | Output | Description |
|---|---|---|---|---|
| `addCandidate` | Admin | `string name` | — | Register a new candidate (only before election starts) |
| `startElection` | Admin | — | — | Open voting (candidates locked) |
| `endElection` | Admin | — | — | Close voting and calculate winner |
| `restartElection` | Admin | — | — | Clear candidates and increment `electionId` |
| `vote` | Any | `uint candidateIndex` | — | Cast a vote (once per wallet per election) |
| `getCandidates` | Public | — | `Candidate[]` | Returns all candidates with current vote counts |
| `getWinner` | Public | — | `(name, votes)` | Returns winner info (valid after election ends) |

### Security Features

- **`onlyAdmin` modifier:** Restricts sensitive functions to the admin wallet.
- **Double-vote prevention:** The mapping `voters[electionId][address]` ensures each wallet votes once per election.
- **State validation:** Functions check election state before execution:
  - `addCandidate` only works when `!electionStarted && !electionEnded`
  - `vote` only works when `electionStarted && !electionEnded`
  - `getWinner` only returns valid data when `electionEnded`
- **Immutable admin:** The admin address cannot be changed after deployment.

### Example Contract Interaction (Ethers.js)

```javascript
import { Contract, ethers } from 'ethers';
import votingABI from './ABI.json';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();
const votingContract = new Contract(contractAddress, votingABI, signer);

// Admin: Add a candidate
await votingContract.addCandidate('Alice');

// Admin: Start voting
await votingContract.startElection();

// Voter: Cast a vote for candidate at index 0
await votingContract.vote(0);

// Anyone: Get current candidates
const candidates = await votingContract.getCandidates();
console.log(candidates);
// Output: [ { name: 'Alice', voteCount: BigNumber(1) }, ... ]

// Anyone: Get winner (after election ends)
const [winnerName, winnerVotes] = await votingContract.getWinner();
console.log(`${winnerName} won with ${winnerVotes} votes`);
```

---

## 🐛 Troubleshooting

### "Cannot connect to http://127.0.0.1:8546"
**Problem:** The frontend can't reach the local blockchain.
**Solution:**
- Make sure `npm run node` is still running in a terminal
- Check that you haven't changed the port from `8546` in `hardhat.config.js`
- Try refreshing the browser page

### "MetaMask is not connected"
**Problem:** The website can't find your MetaMask wallet.
**Solution:**
- Install the MetaMask browser extension
- Make sure MetaMask is not locked (click the icon and log in if needed)
- Try clicking **"Connect MetaMask to Vote"** again
- Check that you're on the correct custom network (Chain ID: 31337)

### "Transaction failed" or "Not an admin"
**Problem:** You're trying to use admin functions but aren't connected as admin.
**Solution:**
- Make sure you're using the wallet that deployed the contract
- Import the correct private key into MetaMask from the `npm run node` output
- Switch to the Hardhat Local network in MetaMask

### "Account already voted in this election"
**Problem:** You've already cast a vote and tried to vote again.
**Solution:**
- Each wallet can vote once per election
- Wait for the admin to restart the election, then you can vote again

### "Cannot add candidate — election already started"
**Problem:** Tried to add a candidate after the election started.
**Solution:**
- Candidates must be added before **Start Election** is clicked
- If you need to add more candidates, restart the election (this clears candidates and bumps the election ID)

### Contract deployment fails with "ECONNREFUSED"
**Problem:** Deploy script can't connect to the blockchain.
**Solution:**
- Run `npm run node` first and let it start completely
- Wait a moment for the node to be ready
- Then run `npm run deploy` in a new terminal

### Port 5173 already in use
**Problem:** Another application is using the frontend port.
**Solution:**
```bash
# Kill the process using port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or just specify a different port:
cd frontend && npx vite --port 3000
```

### Port 8546 already in use
**Problem:** Another process is using the blockchain port.
**Solution:**
```bash
# Specify a different port in hardhat.config.js:
npx hardhat node --port 8547

# Then update .env or deployment script accordingly
```

---

## 📸 Screenshots

> **Screenshots coming soon!** Features include:
> - Admin Dashboard with candidate management
> - Live voting interface
> - Election results and winner announcement
> - Responsive mobile view
> - MetaMask integration flow

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome! Whether you're fixing bugs, adding features, or improving documentation, we'd love to have you involved.

### How to Contribute

1. **Fork** the repository
2. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with clear messages:
   ```bash
   git commit -m 'feat: add your feature description'
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request describing your changes

### Contribution Ideas

- 🐛 Bug fixes and code optimizations
- ✨ UI/UX improvements
- 📚 Documentation and tutorials
- ♿ Accessibility improvements
- 🌍 Internationalization (multiple languages)
- 📊 Gas optimization for smart contracts
- ✅ Additional test cases

---

## 👨‍💻 Author

**Anurag Kumar Bharti**

- GitHub: [@Anuragkumarbharti](https://github.com/Anuragkumarbharti)
- Project Repository: [Decentralized-Voting-System](https://github.com/Anuragkumarbharti/Decentralized-Voting-System)

Feel free to reach out with questions, suggestions, or feedback!

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use this code for personal or commercial projects
- ✅ Modify and distribute
- ✅ Include in closed-source applications

You must:
- ℹ️ Include a copy of the license
- ℹ️ Provide attribution to the original author

---

<div align="center">

**⭐ If you found this project useful, please consider giving it a star on GitHub!**

*Built with ❤️ using Solidity, React, and Ethers.js*

</div>
