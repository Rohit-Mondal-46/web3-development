// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.6 <0.9.0;

contract EventOrganization{
    struct Event{
        address organizer;
        string name;
        uint date;
        uint price;
        uint totalTickets;
        uint remainingTickets;
    }

    mapping(uint=>Event) public events;
    mapping(address=>mapping(uint=>uint)) public tickets;
    uint public eventId;


    //Create a new event
    function createEvent(string memory _name,uint _date,uint _price,uint _totalTickets) external  {
        require(_date>block.timestamp,"You are not allowed to create a event for past dates!!!");
        require(_totalTickets>0,"you have keep atleast 1 ticket");
        events[eventId] = Event(msg.sender,_name,_date,_price,_totalTickets,_totalTickets);
        eventId++;
    }

    //Buy tickets
    function buyTickets(uint _showId,uint _quantity) external payable {
        require(events[_showId].date != 0,"This events doesn't exist");
        require(events[_showId].date>block.timestamp,"This is a past event!");
        require(events[_showId].remainingTickets>=0,"Sorry, there are no more tickets available");
        require(msg.value >= (events[_showId].price * _quantity),"Not enough Ether");
        events[_showId].remainingTickets -= _quantity;
        tickets[msg.sender][_showId] += _quantity;
    }

    //send tickets to someone
    function sendTickets(address _reciever,uint _showId ,uint _ticketQuantity) public {
        require(events[_showId].date != 0,"This events doesn't exist");
        require(events[_showId].date>block.timestamp,"This is a past event!");
        require(tickets[msg.sender][_showId]>=_ticketQuantity,"You do not have enough tickets to send someone");
        tickets[_reciever][_showId] += _ticketQuantity;
        tickets[msg.sender][_showId] -= _ticketQuantity;
    }

    //create a function to send tickets to someone
}