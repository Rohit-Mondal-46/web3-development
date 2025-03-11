const { GENESIS_DATA, MINE_RATE } = require("./config");
const { hash } = require("crypto");
const { generateHash } = require("./hashGenerator");

class Block{
    constructor({timeStamp,prevHash,hash,data,nonce,difficulty}){
        this.timeStamp = timeStamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let timeStamp,hash,difficulty;
        let nonce = 0;
        const prevHash = prevBlock.hash;
        // let difficulty = prevBlock.difficulty;
        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock:prevBlock,timeStamp})
            hash = generateHash(timeStamp,prevHash,data,nonce,difficulty)
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            timeStamp,
            prevHash,
            data,
            hash,
            nonce,
            difficulty
        })
    }
    static adjustDifficulty({originalBlock, timeStamp}){
        const difficulty = originalBlock.difficulty;
        if(difficulty <= 1) return 1;
        const difference = timeStamp - originalBlock.timeStamp;
        if(difference < MINE_RATE) return difficulty+1;
        return difficulty-1;
    }
}



module.exports = Block