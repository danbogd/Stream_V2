/**
 *Submitted for verification at polygonscan.com on 2022-11-15
*/

// SPDX-License-Identifier: MIT 
// https://polygonscan.com/address/0x2adFB66eDDDeeb81Dfb8f38C5e3bfA0b73a47Ea1#code
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract nick{

  mapping(address => string) public addrNick;
  mapping(string => address) public nickAddr;

  function setNick(string calldata _nick)external{
    require (nickAddr[_nick] == address(0),"Nickname  already exists");
    nickAddr[_nick] = msg.sender;
    addrNick[msg.sender] = _nick;
  }

  function changeNick(string calldata _nickOld,string calldata _nickNew )external{
    
    require (nickAddr[_nickOld] == msg.sender, "Call must come from owner");
    require (nickAddr[_nickNew] == address(0),"Nickname  already exists");
    delete nickAddr[_nickOld];
    nickAddr[_nickNew] = msg.sender;
    addrNick[msg.sender] = _nickNew;
  }
  
}