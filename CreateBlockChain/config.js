const INITIAL_DIFFICULTY = 2;
const MINE_RATE = 1000; //1 SECOND
const GENESIS_DATA={
    timeStamp:Date.now(),
    prevHash:'0',
    hash:'1',
    data:"i am the genesis block",
    nonce:0,
    difficulty: INITIAL_DIFFICULTY
}

module.exports = {GENESIS_DATA, MINE_RATE};