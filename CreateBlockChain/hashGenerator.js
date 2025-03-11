const crypto = require('crypto');

function generateHash(...data){
    const hash = crypto.createHash('sha256');
    hash.update(data.join(''));
    return hash.digest('hex')
}

// console.log(generateHash("i am shdsa","asd"));

module.exports={generateHash};