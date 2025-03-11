const Storage = artifacts.require("./Storage");

module.exports = async function(deployer) {
    try {
        await deployer.deploy(Storage);
    } catch (error) {
        console.error("Error during deployment:", error);
        throw error;
    }
};