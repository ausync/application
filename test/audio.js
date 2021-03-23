const Audio = artifacts.require("Audio");

/*
 The documentation for erc721 can be found here: https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
*/

contract("Audio", accounts => {
  it("should get 0 from total supply", () =>
    Audio.deployed()
      .then(instance => instance.totalSupply())
      .then(total => {
        assert.equal(
          total.valueOf(),
          0
        );
      }));

  it("should mint audio", () =>
    Audio.deployed()
      .then(instance => instance.mintAudio(accounts[1], "ipfs://HASH"))
      .then(t => {
        assert.equal(t.logs[0].type, "mined");
        assert.ok(t.tx);
      }));

  it("should not mint audio twice", async () => {
    let instance = await Audio.deployed();
    let transaction = await instance.mintAudio(accounts[1], "ipfs://HASH_2");
    assert.ok(transaction.tx);

    instance.mintAudio(accounts[2], "ipfs://HASH_2")
     .then(() => assert(false, "testThrow was supposed to throw but didn't."))
     .catch(function(error) {
            assert.include(
                error.message,
                'Hash already exists!'
            )
     });
  });

  it("should get URI from token id", async () => {
    let instance = await Audio.deployed();
    hash = "ipfs://HASH" + Math.random();
    let tokenCreated = await instance.mintAudio(accounts[1], hash).then(t => instance.balanceOf(accounts[1]));

    let tokenURI = await instance.tokenURI(tokenCreated.valueOf());
    assert.equal(tokenURI.valueOf(), hash);
  });

});