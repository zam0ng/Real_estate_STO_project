// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Voting {
    // 해당 매물 토큰
    IERC20 public votingToken;

    string name;
    string description;
    address[] owners;
    uint256[] ownAmount;
    mapping(address => uint256) tokenOwners;
    mapping(uint256 => uint256) votes;
    mapping(address => bool) voted;
    address[] voters;
    uint256 agreeVotes;
    uint256 disagreeVotes;
    uint256 usedTokens;
    uint256 startDate;
    uint256 endDate;
    bool completed;
    bool result;
    
    uint256 public totalUsedTokens = 0;

    event ProposalCreated(string name, string description);
    event Voted(bool vote, address voter, uint256 usedTokens, uint256 agreeVotes, uint256 disagreeVotes, address[] voters);
    event Result(bool result);

    constructor(address _votingTokenAddress, address[] memory _owners, uint256[] memory _amount, string memory _name, string memory _description, uint256 _startDate, uint256 _endDate) {
        votingToken = IERC20(_votingTokenAddress);

        name = _name;
        description = _description;
        startDate = _startDate;
        endDate = _endDate;
        agreeVotes = 0;
        disagreeVotes = 0;
        usedTokens = 0;
        completed = false;
        owners = _owners;
        ownAmount = _amount;
        for(uint i=0; i<_owners.length; i++){
            tokenOwners[_owners[i]] = _amount[i];
        }

        emit ProposalCreated(_name, _description);
    }

    function vote(bool voteType) public {

        require(completed == false, "Vote has been closed");
        
        require(voted[msg.sender] == false, "You have already voted");

        require(tokenOwners[msg.sender] > 0, "You do not have the power to vote");

        voted[msg.sender] = true;
        voters.push(msg.sender);

        if(voteType){
            agreeVotes += tokenOwners[msg.sender];
            usedTokens += tokenOwners[msg.sender];
        }else{
            disagreeVotes += tokenOwners[msg.sender];
            usedTokens += tokenOwners[msg.sender];
        }

        emit Voted(voteType,msg.sender,usedTokens,agreeVotes,disagreeVotes,voters);
    }

    function forceCompleteVote() public {

        uint256 totalTokenSupply = votingToken.totalSupply();

        if(agreeVotes > totalTokenSupply / 2){
            result = true;
            completed = true;
        }else if(disagreeVotes > totalTokenSupply / 2){
            result = false;
            completed = true;
        }else if(block.timestamp > endDate){
            result = false;
            completed = true;
        }
    }

    function getVoteInfo() public view returns (string memory, string memory, uint256, uint256, address[] memory, address[] memory, bool, bool) {
        return (
            name,
            description,
            startDate,
            endDate,
            owners,
            voters,
            completed,
            result
        );
    }

    function getVoteCounts() public view returns (uint256, uint256, uint256, uint256) {
        return (
            votingToken.totalSupply(),
            usedTokens,
            agreeVotes,
            disagreeVotes
        );
    }

    function getBalanceOfVotingToken(address _voter) public view returns (uint256) {
        return votingToken.balanceOf(_voter);
    }
}