// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/erc20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    IERC20 public propertyToken;

    constructor(address _propertyToken) Ownable(msg.sender) {
        propertyToken = IERC20(_propertyToken);
    }

    // 매물 블록에 들어갈 내용
    struct Property {
        // 매물 이름
        string name;
        // 매물 설명?
        string description;
        // 투표 마감 시간 (시작시간은 등록할때? 아니면 별도 입력 시간?)
        uint256 endtime; // duration?
        // 투표한 사람들
        mapping(address => bool) whoVoted;
        // 투표 옵션 : 찬성 == 1, 반대 == 0
        mapping(address => uint256) choice;
        // 투표 결과
        uint256 voteResult; // 1의 갯수 / totalSupply() ??
        // 투표 결과 선정 방식 == 찬성 득표율
        uint256 whenToEnd;
        // 투표 진행 상황 : 진행중 == 1, 진행x == 0
        bool inProgress;
    }

    function addProperty() public onlyOwner {
        
    }
}