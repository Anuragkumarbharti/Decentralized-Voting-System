import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import ContractABI from "./ABI.json";

// Replace with the address of your deployed contract
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";

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

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        
        const votingContract = new Contract(CONTRACT_ADDRESS, ContractABI, signer);
        setContract(votingContract);
        
        // Initial load
        await loadContractData(votingContract, address);
      } catch (err) {
        setError("Error connecting wallet: " + err.message);
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  const loadContractData = async (votingContract, userAddress) => {
    try {
      const adminAddress = await votingContract.admin();
      setIsAdmin(adminAddress.toLowerCase() === userAddress.toLowerCase());

      const started = await votingContract.electionStarted();
      const ended = await votingContract.electionEnded();
      setElectionStarted(started);
      setElectionEnded(ended);

      const votedStatus = await votingContract.voters(userAddress);
      setHasVoted(votedStatus);

      const candidatesList = await votingContract.getCandidates();
      const formattedCandidates = candidatesList.map((c, index) => ({
        index,
        name: c.name,
        voteCount: Number(c.voteCount)
      }));
      setCandidates(formattedCandidates);

      if (ended) {
        const winnerData = await votingContract.getWinner();
        setWinner({ name: winnerData[0], votes: Number(winnerData[1]) });
      }
    } catch (err) {
       console.error("Error loading contract data:", err);
       setError("Error loading contract data. Check console for details.");
    }
  };

  const addCandidate = async () => {
    if (!contract || !newCandidateName) return;
    try {
      const tx = await contract.addCandidate(newCandidateName);
      await tx.wait(); // Wait for transaction to be mined
      setNewCandidateName("");
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error adding candidate: " + err.message);
    }
  };

  const startElection = async () => {
    if (!contract) return;
    try {
      const tx = await contract.startElection();
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error starting election: " + err.message);
    }
  };

  const endElection = async () => {
    if (!contract) return;
    try {
      const tx = await contract.endElection();
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error ending election: " + err.message);
    }
  };

  const vote = async (candidateIndex) => {
    if (!contract) return;
    try {
      const tx = await contract.vote(candidateIndex);
      await tx.wait();
      await loadContractData(contract, account);
    } catch (err) {
      setError("Error voting: (" + err.reason + ") " + err.message);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Decentralized Voting System</h1>
      
      {error && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px', color: 'red', borderRadius: '5px', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!account ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button 
            onClick={connectWallet}
            style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#f6851b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
            <p style={{ margin: '5px 0' }}><strong>Account:</strong> {account} {isAdmin && "(Admin)"}</p>
            <p style={{ margin: '5px 0' }}>
              <strong>Election Status:</strong> {
                !electionStarted ? <span style={{color: 'orange'}}>Not Started</span> : 
                electionEnded ? <span style={{color: 'red'}}>Ended</span> : 
                <span style={{color: 'green'}}>Ongoing</span>
              }
            </p>
          </div>

          {isAdmin && (
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', backgroundColor: '#fff' }}>
              <h2 style={{ marginTop: 0 }}>Admin Panel</h2>
              
              {!electionStarted && (
                <div style={{ marginBottom: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter Candidate Name" 
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                  />
                  <button 
                    onClick={addCandidate}
                    style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    Add Candidate
                  </button>
                </div>
              )}
              
              {!electionStarted && (
                <button 
                  onClick={startElection}
                  style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Start Election
                </button>
              )}
              
              {electionStarted && !electionEnded && (
                <button 
                  onClick={endElection}
                  style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  End Election
                </button>
              )}
            </div>
          )}

          <h2>Candidates</h2>
          {candidates.length === 0 ? (
            <p>No candidates available yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Votes</th>
                  {electionStarted && !electionEnded && <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>}
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c.index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{c.index}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{c.name}</td>
                    <td style={{ padding: '12px' }}>{c.voteCount}</td>
                    {electionStarted && !electionEnded && (
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button 
                          onClick={() => vote(c.index)}
                          disabled={hasVoted}
                          style={{ 
                            padding: '6px 15px', 
                            backgroundColor: hasVoted ? '#ccc' : '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '3px', 
                            cursor: hasVoted ? 'not-allowed' : 'pointer' 
                          }}
                        >
                          {hasVoted ? "Already Voted" : "Vote"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {electionEnded && winner && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '5px', textAlign: 'center' }}>
              <h2 style={{ color: '#155724', margin: '0 0 10px 0' }}>🏆 Election Results 🏆</h2>
              <p style={{ fontSize: '18px', margin: 0 }}>
                <strong>{winner.name}</strong> won the election with <strong>{winner.votes}</strong> votes!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
