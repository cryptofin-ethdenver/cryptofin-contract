// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract DiingLoan {
    struct UserInfo {
        uint256 currentDebt;
        uint256 lastUpdate;
    }

    address public operator;
    address public token;
    uint256 private _guardCounter;
    uint256 public interestRate = 110000000; // 11%

    mapping(address => uint256) public maxLoanAmount;
    mapping(address => UserInfo) public userInfos;

    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor (address _operator, address _token) {
        operator = _operator;
        token = _token;
    }

    modifier onlyOperator() {
        require(msg.sender == operator);
        _;
    }

    modifier nonReentrant() {
        _guardCounter += 1;
        uint256 localCounter = _guardCounter;
        _;
        require(localCounter == _guardCounter, "ReentrancyGuard: reentrant call");
    }

    // User credit is updated by the admin
    function updateMaxLoanAmount(address _user, uint256 _amount) external nonReentrant onlyOperator {
        maxLoanAmount[_user] = _amount;
    }

    function borrow(uint256 _amount) external {
        _updateDebt(msg.sender);

        UserInfo storage user = userInfos[msg.sender];
        uint256 borrowable = maxLoanAmount[msg.sender] - user.currentDebt;
        require(borrowable >= _amount);

        _safeErc20Transfer(msg.sender, _amount);
        user.currentDebt = _amount;

        emit Borrowed(msg.sender, _amount);
    }

    function repay(uint256 _amount) external {
        _updateDebt(msg.sender);

        UserInfo storage user = userInfos[msg.sender];
        _safeErc20TransferFrom(msg.sender, address(this), _amount);

        user.currentDebt = user.currentDebt - _amount;
        emit Repaid(msg.sender, _amount);
    }

    function repayAll() external {
        _updateDebt(msg.sender);

        UserInfo storage user = userInfos[msg.sender];
        uint256 amount = user.currentDebt;
        _safeErc20TransferFrom(msg.sender, address(this), amount);

        user.currentDebt = user.currentDebt - amount;
        emit Repaid(msg.sender, amount);
    }

    function _updateDebt(address _user) private {
        UserInfo storage user = userInfos[msg.sender];
        uint256 interval = block.timestamp - user.lastUpdate;
        uint256 interest = user.currentDebt * interestRate / 100000000 * interval / 31540000;
        user.currentDebt = user.currentDebt + interest;
        user.lastUpdate = block.timestamp;
    }

    function _safeErc20TransferFrom(address _from, address _to, uint256 _amount) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd /* transferFrom */, _from, _to, _amount));
        require(success, "not enough allowed tokens");

        if (data.length > 0) {
            require(data.length == 32, "data length should be either 0 or 32 bytes");
            success = abi.decode(data, (bool));
            require(success, "not enough allowed tokens. Token returns false.");
        }
    }

    function _safeErc20Transfer(address _to, uint256 _amount) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb /* transfer */, _to, _amount));
        require(success, "not enough tokens");

        if (data.length > 0) {
            require(data.length == 32, "data length should be either 0 or 32 bytes");
            success = abi.decode(data, (bool));
            require(success, "not enough tokens. Token returns false.");
        }
    }
}