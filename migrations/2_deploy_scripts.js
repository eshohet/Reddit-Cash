const RedditCash = artifacts.require("RedditCash");
const CuratedBondedCurve = artifacts.require("CuratedBondedCurve");


module.exports = function(deployer) {
  deployer.deploy(RedditCash);
  deployer.deploy(CuratedBondedCurve);
};
