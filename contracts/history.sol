// SPDX-License-Identifier: MIT

//  Polygon

pragma solidity 0.8.17;

contract history{


uint deposit = 1000;

mapping(uint256 => Stream) public streams;

mapping (address => uint256[]) public id_info;

struct Stream {
        uint256 deposit;
        uint256 ratePerSecond;
        uint256 remainingBalance;
        uint256 startTime;
        uint256 stopTime;
        address recipient;
        address sender;
        address tokenAddress;
        uint256 remainder;
        bool isEntity; 
        uint256 blockTime;
        bool senderCancel;
        bool recipientCancel;
    }

function testCreateStream(uint256 _id)  external  returns (uint256){

    uint256 rem;

        
        /* Create and store the stream object. */
        uint256 streamId = _id;
        streams[streamId] = Stream({
            remainingBalance: 0,
            deposit: deposit + 1,
            isEntity: true,
            ratePerSecond: 2,
            recipient: 0x55B50cCd840cF815E5C4d01C51a6Cb43b1395C0D,
            sender: msg.sender,
            startTime: block.timestamp + 1,
            stopTime: block.timestamp + 100,
            tokenAddress: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
            blockTime: block.timestamp,
            senderCancel: false,
            recipientCancel: false,
            remainder: rem
        });

          

        
        
        
        return streamId;
    }


}