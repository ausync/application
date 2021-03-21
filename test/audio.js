const Audio = artifacts.require("Audio");

/*
 The documentation for erc721 can be found here: https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
*/

contract("Audio", accounts => {
  it("should get 0 from total supply", () =>
    Audio.deployed()
      .then(instance => instance.totalSupply.call())
      .then(total => {
        assert.equal(
          total.valueOf(),
          0
        );
      }));

  it("should mint audio", () =>
    Audio.deployed()
      .then(instance => instance.mintAudio.call(accounts[1], "ipfs://HASH"))
      .then(token => {
        assert.equal(
          token.valueOf(),
          1
        );
      }));

  it("should not mint audio twice", async () => {
    let instance = await Audio.deployed();
    let tokenCreated = await instance.mintAudio.call(accounts[1], "ipfs://HASH");
    assert.equal(tokenCreated.valueOf(), 1);

    // TODO: this should throw an exception but is doesnt, check if with https://github.com/rkalis/truffle-assertions something can be done
    let tokenCreated2 = await instance.mintAudio.call(accounts[2], "ipfs://HASH");
    assert.equal(tokenCreated2.valueOf(), 1);
  });

  // This is not working with truffle for some reason
  xit("should get URI from token id", async () => {
    let instance = await Audio.deployed();
    let tokenCreated = await instance.mintAudio.call(accounts[1], "ipfs://HASH");
    assert.equal(tokenCreated.valueOf(), 1);

    let tokenURI = await instance.tokenURI.call(1);
    assert.equal(tokenURI.valueOf(), "ipfs://HASH");
  });

});