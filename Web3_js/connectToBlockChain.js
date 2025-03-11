const { Web3 } = require('web3');
async function connect() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    
    return web3;
}

module.exports = {connect}
