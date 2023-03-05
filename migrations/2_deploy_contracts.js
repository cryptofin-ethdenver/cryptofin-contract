const dotenv = require("dotenv");

dotenv.config();

const FaucetToken = artifacts.require("FaucetToken");
const DiingTransfer = artifacts.require("DiingTransfer");
const DiingLoan = artifacts.require("DiingLoan");

module.exports = function (deployer) {
    deployer.deploy(FaucetToken, "USD Coin", "USDC", 6);
    deployer.deploy(FaucetToken, "Tether USD", "USDT", 6);

    /* Except for Mumbai */
    // deployer.deploy(FaucetToken, "Matic Token", "MATIC", 18);

    /* For Polygon Mumbai */
    // deployer.deploy(FaucetToken, "Ethereum", "ETH", 18);



    module.exports = function (deployer) {
        deployer.deploy(FaucetToken, "USD Coin", "USDC", 6);
        deployer.deploy(FaucetToken, "Tether USD", "USDT", 6);

        /* Except for Mumbai */
        // deployer.deploy(FaucetToken, "Matic Token", "MATIC", 18);

        /* For Polygon Mumbai */
        // deployer.deploy(FaucetToken, "Ethereum", "ETH", 18);

        /* DiingTransfer */
        // deployer.deploy(DiingTransfer, process.env.VERIFIER_CONTRACT_ADDRESS, process.env.MERKLE_TREE_HEIGHT, process.env.DEPLOYER_WALLET_ADDRESS)

        /* DiingLoan */
        // deployer.deploy(DiingLoan, process.env.DEPLOYER_WALLET_ADDRESS, process.env.USDC_TOKEN_ADDRESS)
    };

};
