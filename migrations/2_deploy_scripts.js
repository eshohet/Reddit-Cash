const RedditCash = artifacts.require("RedditCash");
const CuratedBondedCurve = artifacts.require("CuratedBondedCurve");


module.exports = function (deployer, network) {
    deployer.deploy(RedditCash);
    deployer.deploy(CuratedBondedCurve);
};
