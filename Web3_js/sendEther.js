const { Web3 } = require('web3');



async function sendEther() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const receiver = accounts[1];

    const transact = await web3.eth.sendTransaction({
        from:sender,
        to:receiver,
        value:web3.utils.toWei("10","ether")
    })
    console.log("transaction: ",transact);
}

// async function makePayment() {
//     const reciever = await web3.eth.getAccounts()[1]
//     sendEther(reciever,"10")
// }
sendEther()