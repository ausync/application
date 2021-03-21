pragma solidity ^0.6.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Audio is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;

    constructor() public ERC721("Ausync", "AUS") {}

    function mintAudio(address recipient, string memory hash) public returns (uint256) {
        require(hashes[hash] != 1, "Hash already exists!");
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, hash);
        return newItemId;
    }

    /**
    * Override isApprovedForAll to enable gas-less listings.
    */
    function isApprovedForAll(address owner, address operator) public override view returns (bool) {
        return true;
    }
}
