// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.6 <0.9.0;

contract CrowdFunding{
    mapping(address=>uint) public contributors;
    address public manager;
    uint public minimumContribution;
    uint public deadline;
    uint public target;
    uint public numOfContributor;
    uint public collectedAmount;

    constructor(uint _target, uint _deadline){
        target = _target;
        deadline =block.timestamp + _deadline;
        manager = msg.sender;
        minimumContribution = 100 wei;
    } 

    struct Request {
        string description;
        uint amount;
        address payable recipient;
        bool completed;
        uint totalVoters;
        mapping(address=>bool) voters;
    }

    mapping(uint=>Request) public requests;
    uint public numRequests;

    function donate() public payable {
        require(block.timestamp <= deadline,"Oops! Deadline has passed");
        require(msg.value >= minimumContribution,"You have to donate atleast 100 wei");
        if(contributors[msg.sender] == 0){
            numOfContributor++;
        }
        contributors[msg.sender] += msg.value;
        collectedAmount += msg.value;
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }

    function refund() public {
        require(block.timestamp > deadline && collectedAmount<target,"You can't withdraw before the deadline");
        require(contributors[msg.sender]>0,"You are not a contributor");
        address payable user = payable(msg.sender);
        user.transfer(contributors[msg.sender]);
        contributors[msg.sender] = 0;
    }

    modifier onlyManager(){
        require(msg.sender == manager,"You are not allowed to do that");
        _;
    }

    function createRequest(string memory _des,uint _amount, address payable _recipient) public onlyManager {
        Request storage request = requests[numRequests];
        numRequests++;
        request.description = _des;
        request.amount = _amount;
        request.recipient = _recipient;
        request.completed = false;
        request.totalVoters = 0;
    }

    function voteReq(uint _reqNum) public {
        require(_reqNum < numRequests,"request doesn't exists");
        require(contributors[msg.sender]>0,"you have to be a contributor for voting");
        Request storage thisReq = requests[_reqNum];
        require(thisReq.voters[msg.sender] == false,"you have already voted");
        thisReq.voters[msg.sender] = true;
        thisReq.totalVoters += 1; 
    }

    function makePayment(uint _reqNum) public onlyManager{
        require(collectedAmount >= target);
        Request storage thisReq = requests[_reqNum];
        require(thisReq.completed == false,"this request has been already closed!");
        require(thisReq.totalVoters >= numOfContributor/2,"Sorry, Majority of contributors doesnt support this request");
        thisReq.recipient.transfer(thisReq.amount);
        thisReq.completed = true;
        collectedAmount -= thisReq.amount;
    }
}

