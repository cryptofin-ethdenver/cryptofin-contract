const FaucetToken = artifacts.require("FaucetToken");

module.exports = function (deployer) {
    deployer.deploy(FaucetToken, "USD Coin", "USDC", 6);
    deployer.deploy(FaucetToken, "Tether USD", "USDT", 6);

    /* Except for Mumbai */
    // deployer.deploy(FaucetToken, "Matic Token", "MATIC", 18);

    /* For Polygon Mumbai */
    // deployer.deploy(FaucetToken, "Ethereum", "ETH", 18);
};
