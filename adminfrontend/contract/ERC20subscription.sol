// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20subscription is ERC20, Ownable {
    uint256 private _totalMinted;
    uint256 private _totalSupply;
    uint256 private _lockTime;

    uint256 public _adminLockTime;
    string private _documentURI;
    string public _tokenSymbol;

    modifier lockTimeCheck() {
        if (msg.sender == owner()) {
            require(
                block.timestamp >= _adminLockTime,
                "admin's tokens are locked for an year"
            );
        }
        require(block.timestamp >= _lockTime, "not for sale yet");
        _;
    }

    // owner주소, 이름, symbol , 총공급량, 구매자주소[],분배량[],락업시간,documenturi
    constructor(
        address _owner,
        string memory _name,
        string memory _symbol,
        uint256 __totalSupply,
        address[] memory subscribers,
        uint256[] memory amounts,
        uint256 __lockTime
    )
        ERC20(_name,_symbol) Ownable(){
        require(subscribers.length == amounts.length, "subscribers and their amounts do not match");
        _tokenSymbol = _symbol;
        _totalSupply = __totalSupply;
        _lockTime = block.timestamp + __lockTime;

        for (uint256 i = 0; i < subscribers.length; i++) {
            require(amounts[i] + _totalMinted <= _totalSupply);
            _mint(subscribers[i], amounts[i]);
            _totalMinted += amounts[i];
        }

        uint256 remainedTokens = _totalSupply - _totalMinted;
        if (remainedTokens > 0) {
            _mint(_owner, remainedTokens);
            _adminLockTime = block.timestamp + 31536000; // 1년
        }
    }

    event TransferWithSymbol(
        address from,
        address to,
        uint256 value,
        string symbol
    );

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function transfer(
        address to,
        uint256 amount
    ) public override lockTimeCheck returns (bool) {
        uint256 newTotalBalance = balanceOf(to) + amount;
        require(
            newTotalBalance < (20 * totalSupply()) / 100,
            "Ownership capped at 20% to ensure decentralization"
        );

        emit TransferWithSymbol(msg.sender, to, amount, _tokenSymbol);

        return super.transfer(to, amount);
    }

    function getLockTime() public view returns (uint256) {
        return _lockTime;
    }

    function transferFrom(
        address from,
        address to,
        uint amount
    ) public override returns (bool) {
        if (from == owner()) {
            require(
                block.timestamp >= _adminLockTime,
                "Admin's tokens are locked"
            );
        } else {
            require(block.timestamp >= _lockTime, "Tokens are locked");
        }
        uint256 newTotalBalance = balanceOf(to) + amount;
        require(
            newTotalBalance <= (20 * totalSupply()) / 100,
            "Ownership capped at 20% to ensure decentralization"
        );

        emit TransferWithSymbol(from, to, amount, _tokenSymbol);

        return super.transferFrom(from, to, amount);
    }

    function getDocumentURI() public view returns (string memory) {
        return _documentURI;
    }

    function setDocumentURI (string memory __documentURI) public onlyOwner{
        _documentURI = __documentURI;
    }

    function ForceMint(address _useraddress, uint256 amount) public onlyOwner {
        _mint(_useraddress, amount);
    }

    function ForceBurn(address _useraddress, uint256 amount) public onlyOwner {
        _burn(_useraddress, amount);
    }

    function howBuy() public view returns (uint256){
        uint256 myAmount = balanceOf(msg.sender);
        uint256 howBuyAmount = ((20 * totalSupply()) / 100) - myAmount;
        return howBuyAmount;
    }

    function whatTokenSymbol() public view returns(string memory){
        return _tokenSymbol;
    }
}

// 토큰 강제소각, 재발행 (동적 공급량) (완료_)
// 락업 (완료)
// 계약서 첨부 (완료)
// admin 물량 자동락업 1년 (완료)
// 단일 계좌 20% 이상 보유 제한