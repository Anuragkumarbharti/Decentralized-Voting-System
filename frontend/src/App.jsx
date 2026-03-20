import React, { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcProvider, Contract } from "ethers";
import ContractABI from "./ABI.json";
import { CONTRACT_ADDRESS } from "./contractAddress";
import "./index.css";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [electionStarted, setElectionStarted] = useState(false);
  const [electionEnded, setElectionEnded] = useState(false);
  const [newCandidateName, setNewCandidateName] = useState("");
  const [winner, setWinner] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initPublicView = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const readOnlyContract = new Contract(CONTRACT_ADDRESS, ContractABI, provider);
        await loadContractData(readOnlyContract, null);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };
    initPublicView();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const votingContract = new Contract(CONTRACT_ADDRESS, ContractABI, signer);
        setContract(votingContract);
        await loadContractData(votingContract, address);
      } catch (err) {
        setError("Error connecting wallet. Make sure MetaMask is unlocked.");
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  const loadContractData = async (activeContract, userAddress) => {
    try {
      setError("");
      const started = await activeContract.electionStarted();
      const ended = await activeContract.electionEnded();
      setElectionStarted(started);
      setElectionEnded(ended);

      const candidatesList = await activeContract.getCandidates();
      const formattedCandidates = candidatesList.map((c, index) => ({
        index,
        name: c.name,
        voteCount: Number(c.voteCount),
      }));
      setCandidates(formattedCandidates);

      if (ended && formattedCandidates.length > 0) {
        const winnerData = await activeContract.getWinner();
        setWinner({ name: winnerData[0], votes: Number(winnerData[1]) });
      } else {
        setWinner(null);
      }

      if (userAddress) {
        const adminAddress = await activeContract.admin();
        setIsAdmin(adminAddress.toLowerCase() === userAddress.toLowerCase());
        const electionId = await activeContract.electionId();
        const votedStatus = await activeContract.voters(electionId, userAddress);
        setHasVoted(votedStatus);
      }
    } catch (err) {
      console.error("Error loading contract data:", err);
      if (userAddress) {
        setError("Error! Please make sure MetaMask is connected to Localhost 7545 (Ganache)!");
      }
    }
  };

  const addCandidate = async () => {
    if (!contract || !newCandidateName.trim()) return;
    try {
      const tx = await contract.addCandidate(newCandidateName.trim());
      await tx.wait();
      setNewCandidateName("");
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error adding candidate: " + (err.reason || err.message));
    }
  };

  const startElection = async () => {
    if (!contract) return;
    try {
      const tx = await contract.startElection();
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error starting election: " + (err.reason || err.message));
    }
  };

  const endElection = async () => {
    if (!contract) return;
    try {
      const tx = await contract.endElection();
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error ending election: " + (err.reason || err.message));
    }
  };

  const restartElection = async () => {
    if (!contract) return;
    try {
      const tx = await contract.restartElection();
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error restarting election: " + (err.reason || err.message));
    }
  };

  const vote = async (candidateIndex) => {
    if (!contract) return;
    try {
      const tx = await contract.vote(candidateIndex);
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error voting: " + (err.reason || err.message));
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const statusClass = !electionStarted ? "not-started" : electionEnded ? "ended" : "ongoing";
  const statusText  = !electionStarted ? "Voting Not Started" : electionEnded ? "Voting Concluded" : "Live Election Ongoing";

  return (
    <div className="app-container">
      <h1>Decentralized Voting System</h1>

      {error && (
        <div className="error-banner">
          <strong>⚠️ Action Required:</strong> {error}
        </div>
      )}

      {/* ── Status / Connect Bar ── */}
      <div className="glass-panel" style={{ marginBottom: "24px" }}>
        <div className="account-info">
          <div className="account-left">
            {!account ? (
              <button
                className="btn btn-primary"
                onClick={connectWallet}
                style={{ padding: "9px 18px", fontSize: "0.88rem" }}
              >
                Connect MetaMask to Vote
              </button>
            ) : (
              <>
                <span className="address-tag">{formatAddress(account)}</span>
                {isAdmin && <span className="admin-badge">Admin Panel</span>}
              </>
            )}
          </div>
          <span className={`status ${statusClass}`}>{statusText}</span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid-2">

        {/* ── Candidates Panel ── */}
        <div className="glass-panel">
          <h2>Candidates</h2>

          {candidates.length === 0 ? (
            <p style={{ fontStyle: "italic", opacity: 0.75 }}>
              No candidates yet. Admin can add them before the election starts.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Votes</th>
                    {electionStarted && !electionEnded && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c) => (
                    <tr key={c.index} className="table-row">
                      <td className="candidate-name">{c.name}</td>
                      <td className="candidate-votes">{c.voteCount}</td>
                      {electionStarted && !electionEnded && (
                        <td>
                          <button
                            className={`btn ${
                              !account
                                ? "btn-secondary"
                                : hasVoted
                                ? "btn-disabled"
                                : "btn-primary"
                            }`}
                            onClick={() =>
                              account ? vote(c.index) : connectWallet()
                            }
                            disabled={account && hasVoted}
                            style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                          >
                            {!account ? "Connect" : hasVoted ? "Voted ✓" : "Vote"}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Winner Banner */}
          {electionEnded && winner && (
            <div className="winner-banner">
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🏆</div>
              <div className="winner-text">The Winner is</div>
              <div className="winner-name">{winner.name}</div>
              <div className="winner-text">with {winner.votes} total votes!</div>
            </div>
          )}
        </div>

        {/* ── Admin Dashboard ── */}
        {isAdmin && account && (
          <div className="glass-panel">
            <h2>Admin Dashboard</h2>

            {/* Add Candidate — only before election starts */}
            {!electionStarted && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ marginBottom: "12px" }}>
                  Add candidates before the election begins.
                </p>
                <div className="input-group">
                  <input
                    className="glass-input"
                    type="text"
                    placeholder="Candidate name"
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCandidate()}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={addCandidate}
                    style={{ padding: "10px 18px" }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Election Status Summary */}
            <div
              style={{
                background: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "0.88rem",
                color: "var(--text-muted)",
              }}
            >
              <div>📋 Candidates registered: <strong style={{ color: "#fff" }}>{candidates.length}</strong></div>
              <div style={{ marginTop: "6px" }}>🗳️ Status: <span className={`status ${statusClass}`} style={{ fontSize: "0.72rem", padding: "3px 10px" }}>{statusText}</span></div>
            </div>

            {/* Action Buttons */}
            <div className="admin-action-row">
              {!electionStarted ? (
                <button
                  className="btn btn-success btn-block"
                  onClick={startElection}
                  disabled={candidates.length === 0}
                  title={candidates.length === 0 ? "Add at least one candidate first" : ""}
                >
                  Start Election
                </button>
              ) : !electionEnded ? (
                <button
                  className="btn btn-danger btn-block"
                  onClick={endElection}
                >
                  End Election
                </button>
              ) : (
                <button
                  className="btn btn-warning-custom btn-block"
                  onClick={restartElection}
                >
                  🔄 Restart Election
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
