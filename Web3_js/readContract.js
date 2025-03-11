const {Web3} = require("web3");

async function readContract() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = "0x3De7193Cde8906Ba78159A4bf1c25750207c327e";

    const contract = new web3.eth.Contract(ABI,contractAddress);
    const acc1 = await web3.eth.getAccounts();
    // console.log(contract);
    //for making read operations on SC
    const res = await contract.methods.retrieve().call();

    // const res = await contract.methods.store(19).send({from:acc1[2]});
    console.log(res);
    
    
}

readContract()