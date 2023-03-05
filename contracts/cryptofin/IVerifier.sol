// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IVerifier {
    function verifyProof(bytes memory _proof, uint256[3] memory _input) external returns(bool);
}
