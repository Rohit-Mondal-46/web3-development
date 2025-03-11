// SPDX-License-Identfier: GPL-3.0

pragma solidity >=0.8.6 <0.9.0;

//There are two entities
    // 1. Manager(who will manage the lottery)
    // 2. Participants(who will but the lotteries)

contract Lottery{
    address public manager;
    address payable[] public participants;

    constructor(){
        manager = msg.sender;
    }

    //receive is a special type of function which is used to accept ehter in account

    receive() payable external{
        require(msg.value>=2 ether);
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        require(msg.sender == manager);
        return address(this).balance;
    }

    function random() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.prevrandao,block.timestamp,participants.length)));
    }

    function selectWinner() public returns(address){
        require(msg.sender == manager);
        require(participants.length >= 3);
        uint index = random() % participants.length;
        address payable winner;
        winner = participants[index];
        winner.transfer(getBalance());
        participants = new address payable[](0);//empty the participants array
        return winner;
    }
}
