// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @title Wholesome Poker Staking
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

interface IWholesomePokerStaking {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract WholeSomePokerStaking is IWholesomePokerStaking, Ownable {

    // A struct to represent the stake details of each staked NFT token.
    struct Stake {
        address staker;              // The address of the user who staked the token.
        uint256 startTimestamp;      // Timestamp when the token was staked.
        uint256 lastClaimTimestamp;  // Timestamp when rewards were last claimed.
        uint256 claimedTokens;       // Total number of tokens claimed.
    }

    mapping(uint256 => Stake) public stakes;            // Mapping of token ID to its stake information.
    mapping(address => uint256) public totalClaimed;    // Total amount a staker has claimed all time
    IERC721 public NFT;                                 // Interface to interact with the NFT contract.
    IERC20Metadata public TOKEN;                        // Interface for the ERC-20 token used for rewards.
    uint256 private rewardPerDay = 1;                   // Daily reward rate per staked token.

    // Enum to manage the operational states of the contract.
    enum ContractState {
        OFF,  // Contract is not accepting stakes.
        OPEN  // Contract is open for staking.
    }
    ContractState public contractState = ContractState.OPEN; // Initial state is set to OPEN.


    constructor() {
        // NFT = IERC721();
        // TOKEN = IERC20Metadata();

        // IBlast(0x4300000000000000000000000000000000000002).configureClaimableGas();
    }

    ///
    /// MODIFIERS
    ///

    /**
     * @dev Ensures that a function is called only when the contract is in the specified state.
     * @param requiredState The state in which the function should be callable.
     */
    modifier isContractState(ContractState requiredState) {
        require(contractState == requiredState, "Invalid State!");
        _;
    }

    ///
    /// STAKE
    ///

    /**
     * @dev Allows a user to stake multiple NFT tokens. The contract must be in the OPEN state.
     * @param tokenIds An array of token IDs that the user wants to stake.
     */
    function stake(uint256[] calldata tokenIds) external isContractState(ContractState.OPEN) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(NFT.ownerOf(tokenIds[i]) == msg.sender, "Not The Owner!");
            stakes[tokenIds[i]] = Stake(msg.sender, block.timestamp, block.timestamp, 0);
            NFT.transferFrom(msg.sender, address(this), tokenIds[i]);     
        }
    }

    /**
     * @dev Allows a user to unstake multiple NFT tokens and claim any accumulated rewards. The contract must be in the OPEN state.
     * @param tokenIds An array of token IDs that the user wants to unstake.
     */
    function unstake(uint256[] calldata tokenIds) external isContractState(ContractState.OPEN) {
        uint256 totalRewards = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(stakes[tokenIds[i]].staker == msg.sender, "Not Staker");
            totalRewards += calculateReward(tokenIds[i]);
            delete stakes[tokenIds[i]];
            NFT.transferFrom(address(this), msg.sender, tokenIds[i]);
        }
        totalClaimed[msg.sender] += totalRewards;
        TOKEN.transfer(msg.sender, totalRewards);
    }

    /**
     * @dev Allows a user to claim rewards for multiple staked tokens without unstaking them. The contract must be in the OPEN state.
     * @param tokenIds An array of token IDs for which to claim rewards.
     */
    function claim(uint256[] calldata tokenIds) external isContractState(ContractState.OPEN) {
        uint256 totalRewards = 0;
        for (uint i = 0; i < tokenIds.length; i++) {
            require(stakes[tokenIds[i]].staker == msg.sender, "Not Staker!");
            uint256 reward = calculateReward(tokenIds[i]);
            totalRewards += reward;
            stakes[tokenIds[i]].lastClaimTimestamp = block.timestamp;
            stakes[tokenIds[i]].claimedTokens += reward;
        }
        totalClaimed[msg.sender] += totalRewards;
        TOKEN.transfer(msg.sender, totalRewards);
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
     * @dev Sets the address of the NFT contract. This can only be called by the contract owner.
     * @param _nftAddress The address of the IERC721Enumerable contract.
     */
    function setNFTAddress(address _nftAddress) external onlyOwner {
        NFT = IERC721(_nftAddress);
    }

    /**
     * @dev Sets the address of the TOKEN contract. This can only be called by the contract owner.
     * @param _tokenAddress The address of the IERC20Metadata contract.
     */
    function setTokenAddress(address _tokenAddress) external onlyOwner {
        TOKEN = IERC20Metadata(_tokenAddress);
    }

    /**
     * @dev Sets the daily reward amount. Only the owner can call this function.
     * @param _rewardPerDay The new reward per day value.
     */
    function setRewardPerDay(uint256 _rewardPerDay) external onlyOwner {
        rewardPerDay = _rewardPerDay;
    }


    ///
    /// VIEWS
    ///

    /**
     * List all the staked tokens owned by the given address.
     * @param owner The owner address to query.
     */
    function listStakedTokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 supply = NFT.totalSupply();
        uint256[] memory tokenIds = new uint256[](supply);
        uint256 count = 0;
        for (uint256 tokenId = 0; tokenId < supply; tokenId++) {
            if (stakes[tokenId].staker == owner) {
                tokenIds[count] = tokenId;
                count++;
            }
        }
        return resizeArray(tokenIds, count);
    }

    /**
     * @notice Calculates the accrued rewards for a staked token since its last claim.
     * @dev This function computes rewards based on the number of full days elapsed since the last claim.
     * It multiplies the number of days by the daily reward rate (`rewardPerDay`).
     * The division by `1 days` converts the time difference from seconds to days.
     * @param tokenId The ID of the staked token for which rewards are being calculated.
     * @return uint256 The total accrued reward in tokens. The reward accumulates daily and is calculated as 
     * the number of full days multiplied by the daily reward rate.
     */
    function calculateReward(uint256 tokenId) public view returns(uint256) { 
        return ((block.timestamp - stakes[tokenId].lastClaimTimestamp) / 1 days) * (rewardPerDay * 10 ** TOKEN.decimals());
    }

    /**
     * List the original owner of the staked nft
     * @param tokenId the token id to query
     */
    function ownerOf(uint256 tokenId) external view override returns(address) {
        return stakes[tokenId].staker;
    }


    ///
    /// MISC
    ///

    /**
     * @dev Internal function to resize an array to fit exactly the number of non-zero entries it contains.
     * @param input The original array containing possible zero entries.
     * @param length The true length of meaningful entries in the array.
     * @return The resized array containing only non-zero entries.
     */
    function resizeArray(uint256[] memory input, uint256 length) internal pure returns (uint256[] memory) {
        uint256[] memory output = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            output[i] = input[i];
        }
        return output;
    }
    
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

    function claimMyContractsGas(address recipient) external onlyOwner {
        IBlast(0x4300000000000000000000000000000000000002).claimAllGas(address(this), recipient);
    }

    
    
}