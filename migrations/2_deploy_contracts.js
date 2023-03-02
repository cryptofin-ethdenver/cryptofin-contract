const dotenv = require('dotenv');
dotenv.config();

const FaucetToken = artifacts.require("FaucetToken");

module.exports = function (deployer) {
    deployer.deploy(FaucetToken, "USD Coin", "USDC", 6);
    // deployer.deploy(FaucetToken, "Tether USD", "USDT");
    // deployer.deploy(FaucetToken, "Matic Token", "MATIC");
    // deployer.deploy(FaucetToken, "Oasis Network", "ROSE");
};
