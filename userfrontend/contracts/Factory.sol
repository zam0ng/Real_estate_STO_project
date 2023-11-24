// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./ERC20subscription.sol";

contract Factory {

    ERC20subscription[] public estates;

    function createCA(
        address _owner, 
        string memory _name, 
        string memory _symbol, 
        uint256 _totalsupply, 
        address[] memory subscribers, 
        uint256[] memory amounts, 
        uint256 _lockTime
        ) public  {
		ERC20subscription estate = new ERC20subscription(
            _owner,
            _name,
            _symbol,
            _totalsupply,
            subscribers,
            amounts,
            _lockTime
            );
        estates.push(estate);
    }

    function callCA() public view returns(ERC20subscription[] memory){
        return estates;
    }
}


