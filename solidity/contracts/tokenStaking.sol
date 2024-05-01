// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @title Token Staking
/// @author Andre Costa @ MyWeb3Startup.com


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @dev Interface of the ERC-20 standard as defined in the ERC.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/**
 * @dev Interface for the optional metadata functions from the ERC-20 standard.
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

// OpenZeppelin Contracts v4.4.1 (token/ERC721/IERC721.sol)

pragma solidity ^0.8.0;

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    /**
     * @dev Returns the total amount of tokens stored by the contract.
     */
    function totalSupply() external view returns (uint256);
}

enum YieldMode {
    AUTOMATIC,
    VOID,
    CLAIMABLE
}

enum GasMode {
    VOID,
    CLAIMABLE 
}

interface IBlast{
    // configure
    function configureContract(address contractAddress, YieldMode _yield, GasMode gasMode, address governor) external;
    function configure(YieldMode _yield, GasMode gasMode, address governor) external;

    // base configuration options
    function configureClaimableYield() external;
    function configureClaimableYieldOnBehalf(address contractAddress) external;
    function configureAutomaticYield() external;
    function configureAutomaticYieldOnBehalf(address contractAddress) external;
    function configureVoidYield() external;
    function configureVoidYieldOnBehalf(address contractAddress) external;
    function configureClaimableGas() external;
    function configureClaimableGasOnBehalf(address contractAddress) external;
    function configureVoidGas() external;
    function configureVoidGasOnBehalf(address contractAddress) external;
    function configureGovernor(address _governor) external;
    function configureGovernorOnBehalf(address _newGovernor, address contractAddress) external;

    // claim yield
    function claimYield(address contractAddress, address recipientOfYield, uint256 amount) external returns (uint256);
    function claimAllYield(address contractAddress, address recipientOfYield) external returns (uint256);

    // claim gas
    function claimAllGas(address contractAddress, address recipientOfGas) external returns (uint256);
    function claimGasAtMinClaimRate(address contractAddress, address recipientOfGas, uint256 minClaimRateBips) external returns (uint256);
    function claimMaxGas(address contractAddress, address recipientOfGas) external returns (uint256);
    function claimGas(address contractAddress, address recipientOfGas, uint256 gasToClaim, uint256 gasSecondsToConsume) external returns (uint256);

    // read functions
    function readClaimableYield(address contractAddress) external view returns (uint256);
    function readYieldConfiguration(address contractAddress) external view returns (uint8);
    function readGasParams(address contractAddress) external view returns (uint256 etherSeconds, uint256 etherBalance, uint256 lastUpdated, GasMode);
}

enum YieldMode {
  AUTOMATIC,
  VOID,
  CLAIMABLE
}

interface IERC20Rebasing {
  // changes the yield mode of the caller and update the balance
  // to reflect the configuration
  function configure(YieldMode) external returns (uint256);
  // "claimable" yield mode accounts can call this this claim their yield
  // to another address
  function claim(address recipient, uint256 amount) external returns (uint256);
  // read the claimable amount for an account
  function getClaimableAmount(address account) external view returns (uint256);
}

interface IBlastPoints {
  function configurePointsOperator(address operator) external;
  function configurePointsOperatorOnBehalf(address contractAddress, address operator) external;
}

interface IWholesomePokerStaking {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract TokenStaking is Ownable {

    // set hard cap staking limit
    // interface to check if somebody has an nft or is staked

    struct Staker {
        address staker;  // Address of the user who staked tokens.
        uint256 stakedUSDB;  // Total amount of USDB staked by the user.
        uint256 stakedETH;  // Total amount of ETH staked by the user.
        uint256 pointsEarned;  // Total rewards earned by the user.
        uint256 lastUpdateTimestamp;  // Last timestamp the user's staking data was updated.
    }

    mapping(address => Staker) public stakers;  // Maps user addresses to their staking information.

    uint256 private rewardPerDayUSDB = 1;  // Reward rate per day per staked USDB.
    uint256 private rewardPerDayETH = 1;  // Reward rate per day per staked ETH.

    IERC20Metadata public USDB;  // ERC20 token for USDB.
    IERC20Rebasing public USDBRebasing = IERC20Rebasing(0x4300000000000000000000000000000000000003);

    IWholesomePokerStaking public wpStaking;        // Interface to interact with the staking contract.
    IERC721 public NFT;                             // Interface to interact with the NFT contract.

    enum ContractState { OFF, OPEN }  // States of contract: OFF for not accepting stakes, OPEN for accepting stakes.
    ContractState public contractState = ContractState.OPEN;  // Initial state of the contract.

    constructor() {
        USDB = IERC20Metadata(usdbTokenAddress);
        // wpStaking = IWholesomePokerStaking();

        // USDBRebasing.configure(YieldMode.CLAIMABLE); //configure claimable yield for USDB

        // IBlast(0x4300000000000000000000000000000000000002).configureClaimableYield();
		// IBlast(0x4300000000000000000000000000000000000002).configureGovernor(msg.sender);
        // IBlast(0x4300000000000000000000000000000000000002).configureClaimableGas();

        // IBlastPoints(0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800).configurePointsOperator(pointsOperator);
    }

    /**
     * @dev Modifier to check the contract's current state before proceeding.
     * @param requiredState The state that the contract must be in.
     */
    modifier isContractState(ContractState requiredState) {
        require(contractState == requiredState, "Contract is not in the required state");
        _;
    }

    /**
     * @notice Allows users to stake USDB and ETH.
     * @param amountUSDB The amount of USDB tokens to stake.
     * @param amountETH The amount of ETH to stake.
     */
    function stake(uint256 amountUSDB, uint256 amountETH, uint25 stakedTokenId) external payable isContractState(ContractState.OPEN) {
        require(amountUSDB > 0 || amountETH > 0, "Must stake a non-zero amount of USDB or ETH");
        require(msg.value == amountETH, "ETH sent must match the specified amountETH");
        require(NFT.balanceOf(msg.sender) > 0 || wpStaking.ownerOf(stakedTokenId) == msg.sender, "Not NFT Holder Or Staker!");

        updateRewards(msg.sender);

        stakers[msg.sender].stakedUSDB += amountUSDB;
        stakers[msg.sender].stakedETH += amountETH;

        if (amountUSDB > 0) {
            bool sentUSDB = USDB.transferFrom(msg.sender, address(this), amountUSDB);
            require(sentUSDB, "Failed to transfer USDB tokens");
        }
    }

    /**
     * @notice Allows users to unstake USDB and ETH.
     * @param amountUSDB The amount of USDB tokens to unstake.
     * @param amountETH The amount of ETH to unstake.
     */
    function unstake(uint256 amountUSDB, uint256 amountETH) external isContractState(ContractState.OPEN) {
        require(stakers[msg.sender].stakedUSDB >= amountUSDB, "Insufficient USDB staked");
        require(stakers[msg.sender].stakedETH >= amountETH, "Insufficient ETH staked");

        updateRewards(msg.sender);

        stakers[msg.sender].stakedUSDB -= amountUSDB;
        stakers[msg.sender].stakedETH -= amountETH;

        if (amountUSDB > 0) {
            USDB.transfer(msg.sender, amountUSDB);
        }
        
        if (amountETH > 0) {
            (bool sentETH, ) = payable(msg.sender).call{value: amountETH}("");
            require(sentETH, "Failed to send ETH");
        }
    }

    /**
     * @dev Updates the reward points for a given staker.
     * @param staker The address of the staker to update.
     */
    function updateRewards(address staker) private {
        if (stakers[staker].lastUpdateTimestamp != 0) {
            stakers[staker].pointsEarned += calculateReward(staker);
        }
        stakers[staker].lastUpdateTimestamp = block.timestamp;
    }

    /**
     * @dev Calculates the total rewards earned by a staker based on the staked amounts and time elapsed.
     * @param staker The address of the staker.
     * @return The total rewards earned.
     */
    function calculateReward(address staker) public view returns (uint256) {
        uint256 timeElapsed = (block.timestamp - stakers[staker].lastUpdateTimestamp) / 1 days;
        return (stakers[staker].stakedUSDB * timeElapsed * rewardPerDayUSDB) + (stakers[staker].stakedETH * timeElapsed * rewardPerDayETH);
    }

    /**
     * @notice Retrieves the total points (earned and pending rewards) for a specified staker.
     * @dev This function computes the sum of already earned points and any additional rewards that 
     *      have accrued since the last update.
     * @param staker The address of the staker whose points are being queried.
     * @return The total number of points accumulated by the staker, including both 
     *         earned points and pending reward points calculated up to the current time.
     */
    function getPoints(address staker) external view returns(uint256) {
        return calculateReward(staker) + stakers[staker].pointsEarned;
    }

    ///
    /// SETTERS
    ///

    /**
     * @dev Sets the contract's operational state.
     * @param newState The new state to set the contract to (0 for OFF, 1 for OPEN).
     */
    function setContractState(uint256 newState) external onlyOwner {
        require(newState < 2, "Invalid State!");
        contractState = ContractState(newState);
    }

    /**
     * @dev Sets the reward rate per day for staked USDB.
     * @param _rewardPerDayUSDB The new reward rate per day per staked USDB.
     */
    function setRewardPerDayUSDB(uint256 _rewardPerDayUSDB) external onlyOwner {
        rewardPerDayUSDB = _rewardPerDayUSDB;
    }

    /**
     * @dev Sets the reward rate per day for staked ETH.
     * @param _rewardPerDayETH The new reward rate per day per staked ETH.
     */
    function setRewardPerDayETH(uint256 _rewardPerDayETH) external onlyOwner {
        rewardPerDayETH = _rewardPerDayETH;
    }

    /**
     * @dev Sets the USDB ERC20 token contract.
     * @param _USDB The address of the USDB ERC20 token contract.
     */
    function setUSDB(address _USDB) external onlyOwner {
        USDB = IERC20Metadata(_USDB);
        USDBRebasing = IERC20Rebasing(_USDB);
    }

    /**
     * @dev Sets the wpStaking contract.
     * @param _new The address of the wpStaking contract.
     */
    function setWPStaking(address _new) external onlyOwner {
        wpStaking = IWholesomePokerStaking(_new);
    }

    /**
     * @dev Sets the address of the NFT contract. This can only be called by the contract owner.
     * @param _nftAddress The address of the IERC721Enumerable contract.
     */
    function setNFTAddress(address _nftAddress) external onlyOwner {
        NFT = IERC721(_nftAddress);
    }

    ///
    /// MISC
    ///
    
    /// @notice Withdraws Ether from the contract
    /// @param recipient The address to receive the Ether
    /// @param amount The amount of Ether to withdraw
    function withdrawEther(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "Invalid Address!");
        require(amount > 0 && address(this).balance >= amount, "Invalid Amount!");

        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    /// @notice Withdraws ERC20 tokens from the contract
    /// @param recipient The address to receive the tokens
    /// @param amount The amount of tokens to withdraw
    /// @param token The address of the token contract
    function withdrawToken(address recipient, uint256 amount, address token) external onlyOwner {
        require(recipient != address(0), "Invalid Address!");
        require(amount > 0, "Invalid Amount!");
        require(token != address(0), "Invalid Token!");

        require(IERC20(token).transfer(recipient, amount), "Unsuccessful Transfer!");
    }

    function claimYield(address recipient, uint256 amount) external onlyOwner {
	  //This function is public meaning anyone can claim the yield
		USDBRebasing.claim(recipient, amount);
    }

    function claimMyContractsGas(address recipient) external onlyOwner {
        IBlast(0x4300000000000000000000000000000000000002).claimAllGas(address(this), recipient);
    }

}