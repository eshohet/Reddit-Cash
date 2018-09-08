const RedditCash = artifacts.require("RedditCash");

module.exports = function(deployer) {
  deployer.deploy(RedditCash);
};
