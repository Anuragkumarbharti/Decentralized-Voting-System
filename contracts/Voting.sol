// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public electionStarted;
    bool public electionEnded;
    uint public electionId;
    
    struct Candidate {
        string name;
        uint voteCount;
    }
    
    Candidate[] public candidates;
    mapping(uint => mapping(address => bool)) public voters;
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        electionId = 1;
    }
    
    function addCandidate(string memory _name) public onlyAdmin {
        require(!electionStarted, "Election has already started");
        require(!electionEnded, "Election has ended");
        
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }
    
    function startElection() public onlyAdmin {
        require(!electionStarted, "Election has already started");
        require(!electionEnded, "Election has ended");
        electionStarted = true;
    }
    
    function endElection() public onlyAdmin {
        require(electionStarted, "Election has not started yet");
        require(!electionEnded, "Election has already ended");
        electionEnded = true;
    }
    
    function restartElection() public onlyAdmin {
        require(electionEnded, "Election is not ended yet! Can only restart after it concludes.");
        electionStarted = false;
        electionEnded = false;
        delete candidates;
        electionId++;
    }
    
    function vote(uint _candidateIndex) public {
        require(electionStarted, "Election has not started yet");
        require(!electionEnded, "Election has ended");
        require(!voters[electionId][msg.sender], "You have already voted!");
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        
        voters[electionId][msg.sender] = true;
        candidates[_candidateIndex].voteCount += 1;
    }
    
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
    
    function getWinner() public view returns (string memory winnerName, uint winnerVoteCount) {
        require(electionEnded, "Election is not ended yet");
        require(candidates.length > 0, "No candidates available");
        
        uint highestVoteCount = 0;
        uint winningIndex = 0;
        
        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningIndex = i;
            }
        }
        
        return (candidates[winningIndex].name, highestVoteCount);
    }
}
