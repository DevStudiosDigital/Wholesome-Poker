// SPDX-License-Identifier: Unlicensed
// Author: Dev

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

enum YieldMode {
    AUTOMATIC,
    VOID,
    CLAIMABLE
}

enum GasMode {
    VOID,
    CLAIMABLE
}

interface IBlast {
    // configure
    function configureContract(
        address contractAddress,
        YieldMode _yield,
        GasMode gasMode,
        address governor
    ) external;

    function configure(
        YieldMode _yield,
        GasMode gasMode,
        address governor
    ) external;

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

    function configureGovernorOnBehalf(
        address _newGovernor,
        address contractAddress
    ) external;

    // claim yield
    function claimYield(
        address contractAddress,
        address recipientOfYield,
        uint256 amount
    ) external returns (uint256);

    function claimAllYield(address contractAddress, address recipientOfYield)
        external
        returns (uint256);

    // claim gas
    function claimAllGas(address contractAddress, address recipientOfGas)
        external
        returns (uint256);

    function claimGasAtMinClaimRate(
        address contractAddress,
        address recipientOfGas,
        uint256 minClaimRateBips
    ) external returns (uint256);

    function claimMaxGas(address contractAddress, address recipientOfGas)
        external
        returns (uint256);

    function claimGas(
        address contractAddress,
        address recipientOfGas,
        uint256 gasToClaim,
        uint256 gasSecondsToConsume
    ) external returns (uint256);

    // read functions
    function readClaimableYield(address contractAddress)
        external
        view
        returns (uint256);

    function readYieldConfiguration(address contractAddress)
        external
        view
        returns (uint8);

    function readGasParams(address contractAddress)
        external
        view
        returns (
            uint256 etherSeconds,
            uint256 etherBalance,
            uint256 lastUpdated,
            GasMode
        );
}

interface IBlastPoints {
    function configurePointsOperator(address operator) external;

    function configurePointsOperatorOnBehalf(
        address contractAddress,
        address operator
    ) external;
}

pragma solidity >=0.8.20 <0.8.21;

contract M23D is ERC721A, Ownable, ReentrancyGuard, ERC2981 {
    using Strings for uint256;

    // ================== Variables Start =======================

    error transferBlacklisted(address account);
    bytes32 public merkleRoot;
    string internal uri;
    string public uriExtension = ".json";
    string public hiddenMetadataUri = "ipfs://hiddencid/filename.json";
    uint256 public price = 0.025 ether;
    uint256 public wlprice = 0.03 ether;
    uint256 public supplyLimit = 10000;
    uint256 public wlsupplyLimit = 10000;
    uint256 public maxMintAmountPerTx = 10;
    uint256 public wlmaxMintAmountPerTx = 2;
    uint256 public maxLimitPerWallet = 10000;
    uint256 public wlmaxLimitPerWallet = 2;
    bool public revealed = false;
    mapping(address => uint256) public wlMintCount;
    mapping(address => uint256) public publicMintCount;
    uint256 public publicMinted;
    uint256 public wlMinted;
    uint96 internal royaltyFraction = 500; // 100 = 1% , 1000 = 10%
    address internal royaltiesReciever =
        0xF56A27f4630E2d028DF892ae192fD3122245bD92;
    // time set in epoch
    uint256 public wlStartTime = 1709389800;
    uint256 public wlEndTime = 1779389800;
    uint256 public publicStartTime = 1708265793;
    uint256 public publicEndTime = 1708267213;
    mapping(address => bool) public blacklistStatus;
    IBlast public constant BLAST =
        IBlast(0x4300000000000000000000000000000000000002);
    // for testnet: 0x2fc95838c71e76ec69ff817983BFf17c710F34E0
    // for mainnet: 0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800
    IBlastPoints public constant BLASTPointsAddress =
        IBlastPoints(0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800);

    bool public forceStop = false;

    // ================== Variables End =======================

    // ================== Constructor Start =======================

    constructor(string memory _uri, address _pointsOperator)
        ERC721A("M23D", "23")
        Ownable(msg.sender)
    {
        seturi(_uri);
        setRoyaltyInfo(royaltiesReciever, royaltyFraction);
        BLASTPointsAddress.configurePointsOperator(_pointsOperator);
        BLAST.configureClaimableGas();
        BLAST.configureClaimableYield();
    }

    // ================== Constructor End =======================

    // ================== Mint Functions Start =======================

    // Minting with eth functions

    function WlMint(uint256 _mintAmount, bytes32[] calldata _merkleProof)
        public
        payable
        nonReentrant
    {
        // Verify wl requirements
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Not Whitelited!"
        );
        require(whitelistSaleStatus(), "The WlSale is paused!");
        require(!forceStop, "Contract is Force Stopped!");

        // Normal requirements
        require(
            _mintAmount > 0 && _mintAmount <= wlmaxMintAmountPerTx,
            "Invalid mint amount!"
        );
        require(
            totalSupply() + _mintAmount <= wlsupplyLimit,
            "Max supply exceeded!"
        );
        require(
            wlMintCount[msg.sender] + _mintAmount <= wlmaxLimitPerWallet,
            "Max mint per wallet exceeded!"
        );
        require(msg.value >= wlprice * _mintAmount, "Insufficient funds!");

        // Mint
        _safeMint(_msgSender(), _mintAmount);

        // Mapping update
        wlMintCount[msg.sender] += _mintAmount;
        wlMinted += _mintAmount;
    }

    function PublicMint(uint256 _mintAmount) public payable nonReentrant {
        // Normal requirements
        require(
            _mintAmount > 0 && _mintAmount <= maxMintAmountPerTx,
            "Invalid mint amount!"
        );
        require(publicSaleStatus(), "The Public Sale is paused!");
        require(!forceStop, "Contract is Force Stopped!");

        require(
            totalSupply() + _mintAmount <= supplyLimit,
            "Max supply exceeded!"
        );
        require(
            publicMintCount[msg.sender] + _mintAmount <= maxLimitPerWallet,
            "Max mint per wallet exceeded!"
        );
        require(msg.value >= price * _mintAmount, "Insufficient funds!");

        // Mint
        _safeMint(_msgSender(), _mintAmount);

        // Mapping update
        publicMintCount[msg.sender] += _mintAmount;
        publicMinted += _mintAmount;
    }

    function OwnerMint(uint256 _mintAmount, address _receiver)
        public
        onlyOwner
    {
        require(
            totalSupply() + _mintAmount <= supplyLimit,
            "Max supply exceeded!"
        );
        _safeMint(_receiver, _mintAmount);
    }

    function MassAirdrop(address[] calldata receivers) external onlyOwner {
        for (uint256 i; i < receivers.length; ++i) {
            require(totalSupply() + 1 <= supplyLimit, "Max supply exceeded!");
            _mint(receivers[i], 1);
        }
    }

    // ================== Mint Functions End =======================

    // ================== Set Functions Start =======================

    // reveal
    function setRevealed(bool _state) public onlyOwner {
        revealed = _state;
    }

    // uri
    function seturi(string memory _uri) public onlyOwner {
        uri = _uri;
    }

    function seturiExtension(string memory _uriExtension) public onlyOwner {
        uriExtension = _uriExtension;
    }

    function setHiddenMetadataUri(string memory _hiddenMetadataUri)
        public
        onlyOwner
    {
        hiddenMetadataUri = _hiddenMetadataUri;
    }

    // hash set
    function setwlMerkleRootHash(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    // max per tx
    function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx)
        public
        onlyOwner
    {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    function setwlmaxMintAmountPerTx(uint256 _wlmaxMintAmountPerTx)
        public
        onlyOwner
    {
        wlmaxMintAmountPerTx = _wlmaxMintAmountPerTx;
    }

    // pax per wallet
    function setmaxLimitPerWallet(uint256 _maxLimitPerWallet) public onlyOwner {
        maxLimitPerWallet = _maxLimitPerWallet;
    }

    function setwlmaxLimitPerWallet(uint256 _wlmaxLimitPerWallet)
        public
        onlyOwner
    {
        wlmaxLimitPerWallet = _wlmaxLimitPerWallet;
    }

    // price
    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setwlPrice(uint256 _wlprice) public onlyOwner {
        wlprice = _wlprice;
    }

    // supply limit
    function setsupplyLimit(uint256 _supplyLimit) public onlyOwner {
        supplyLimit = _supplyLimit;
    }

    function setwlsupplyLimit(uint256 _wlsupplyLimit) public onlyOwner {
        wlsupplyLimit = _wlsupplyLimit;
    }

    // set royalties info

    function setRoyaltyTokens(
        uint256 _tokenId,
        address _receiver,
        uint96 _royaltyFeesInBips
    ) public onlyOwner {
        _setTokenRoyalty(_tokenId, _receiver, _royaltyFeesInBips);
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips)
        public
        onlyOwner
    {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }

    // set timings
    function setTimings(
        uint256 _pubStartTime,
        uint256 _pubEndTime,
        uint256 _wlStartTime,
        uint256 _wlEndTime
    ) public onlyOwner {
        wlStartTime = _wlStartTime;
        wlEndTime = _wlEndTime;
        publicStartTime = _pubStartTime;
        publicEndTime = _pubEndTime;
    }

    // set blacklist status

    function setblacklistStatus(address _address, bool _blacklistStatus)
        public
        onlyOwner
    {
        blacklistStatus[_address] = _blacklistStatus;
    }

    // set force stop

    function setForceStop(bool _status) public onlyOwner {
        forceStop = _status;
    }

    // ================== Set Functions End =======================

    // ================== Withdraw Function Start =======================

    function withdraw() public onlyOwner nonReentrant {
        //owner withdraw
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    // ================== Withdraw Function End=======================

    // ================== Read Functions Start =======================

    function tokensOfOwner(address owner)
        external
        view
        returns (uint256[] memory)
    {
        unchecked {
            uint256[] memory a = new uint256[](balanceOf(owner));
            uint256 end = _nextTokenId();
            uint256 tokenIdsIdx;
            address currOwnershipAddr;
            for (uint256 i; i < end; i++) {
                TokenOwnership memory ownership = _ownershipAt(i);
                if (ownership.burned) {
                    continue;
                }
                if (ownership.addr != address(0)) {
                    currOwnershipAddr = ownership.addr;
                }
                if (currOwnershipAddr == owner) {
                    a[tokenIdsIdx++] = i;
                }
            }
            return a;
        }
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return hiddenMetadataUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        uriExtension
                    )
                )
                : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uri;
    }

    event ethReceived(address, uint256);

    receive() external payable {
        emit ethReceived(msg.sender, msg.value);
    }

    function blockTime() internal view returns (uint256) {
        return block.timestamp;
    }

    function whitelistSaleStatus() public view returns (bool) {
        if (blockTime() <= wlEndTime && blockTime() >= wlStartTime) {
            return true;
        } else {
            return false;
        }
    }

    function publicSaleStatus() public view returns (bool) {
        if (blockTime() <= publicEndTime && blockTime() >= publicStartTime) {
            return true;
        } else {
            return false;
        }
    }

    modifier transferAllowed(address _address) {
        _transferAllowed(_address);
        _;
    }

    function _transferAllowed(address _address) internal view virtual {
        if (blacklistStatus[_address] == true) {
            revert transferBlacklisted(_address);
        }
    }

    function setApprovalForAll(address operator, bool approved)
        public
        override
        transferAllowed(operator)
    {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId)
        public
        payable
        override
        transferAllowed(operator)
    {
        super.approve(operator, tokenId);
    }

    // blast functions

    function claimMyContractAllGas() public onlyOwner {
        BLAST.claimAllGas(address(this), msg.sender);
    }

    function claimMyContractMaxGas() public onlyOwner {
        BLAST.claimMaxGas(address(this), msg.sender);
    }

    function claimYield(address recipient, uint256 amount) public onlyOwner {
        BLAST.claimYield(address(this), recipient, amount);
    }

    function claimAllYield(address recipient) public onlyOwner {
        BLAST.claimAllYield(address(this), recipient);
    }

    // ================== Read Functions End =======================
}
