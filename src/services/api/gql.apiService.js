import { gql } from "graphql-request";

export const getAuctionContracts = gql`
  {
    digitalaxAuctionContracts(first: 1000) {
      id
      minBidIncrement
      bidWithdrawalLockTime
      platformFee
      platformFeeRecipient
      totalSales
    }
  }
`;

export const getMaterialVS = gql`
  {
    digitalaxMaterialV2S(first: 1000) {
      id
      name
      image
      tokenUri
      animation
      description
      attributes {
        value
        type
      }
    }
  }
`;

export const getModelCollectionGroups = gql`
  query digitalaxModelCollectionGroups {
    digitalaxModelCollectionGroups(first: 100) {
      id
      collections {
        id
        rarity
        garments(first: 1) {
          id
          animation
          image
          name
        }
        model {
          id
          name
          image
        }
        designer {
          id
          name
          image
        }
        valueSold
      }
    }
  }
`;

export const getDigitalaxGarmentNftV2GlobalStats = gql`
  query digitalaxGarmentNFTV2GlobalStats {
    digitalaxGarmentNFTV2GlobalStats(first: 1) {
      id
      monaPerEth
    }
  }
`;

export const COLLECTION_GROUPS = gql`
  query digitalaxCollectionGroups {
    digitalaxCollectionGroups(first: 100, skip: 2) {
      id
      auctions {
        id
        topBid
        startTime
        endTime
        designer {
          id
          name
          image
        }
        garment {
          id
          animation
          image
          name
        }
      }
      collections {
        id
        rarity
        garments(first: 1000) {
          id
          animation
          image
          name
        }
        designer {
          id
          name
          image
        }
        valueSold
      }
      digiBundle {
        id
        rarity
        garments(first: 1000) {
          id
          animation
          image
          name
        }
        designer {
          id
          name
          image
        }
        valueSold
      }
    }
  }
`;

export const DIGITALAX_MARKETPLACE_OFFERS = gql`
  query digitalaxMarketplaceOffers {
    digitalaxMarketplaceOffers(first: 100) {
      id
      primarySalePrice
      garmentCollection {
        id
        garments {
          id
          owner
        }
      }
    }
  }
`;

export const COLLECTION_GROUP_BY_ID = gql`
  query digitalaxCollectionGroup($id: ID!) {
    digitalaxCollectionGroup(id: $id) {
      id
      auctions {
        id
        designer {
          id
          name
          image
        }
        developer {
          id
          name
          image
        }
        garment {
          id
          animation
          image
          name
          designer
          description
        }
        topBid
        startTime
        endTime
      }
      collections {
        id
        designer {
          id
          name
          image
        }
        developer {
          id
          name
          image
        }
        garments(first: 1000) {
          id
          animation
          image
          name
          designer
          description
          primarySalePrice
        }
        rarity
      }
    }
  }
`;

export const GARMENTV2_BY_COLLECTION_ID = gql`
  query digitalaxGarmentV2Collection($id: ID!) {
    digitalaxGarmentV2Collection(id: $id) {
      id
      garments(first: 1000) {
        id
        name
        image
        animation
        description
        tokenUri
        primarySalePrice
        children {
          id
          tokenUri
        }
      }
      designer {
        id
        name
        description
        image
      }
      developer {
        id
        name
        description
        image
      }
    }
  }
`;

export const GARMENTV2_BY_COLLECTION_IDS = gql`
  query digitalaxGarmentV2Collections($ids: [ID!]) {
    digitalaxGarmentV2Collections(where: { id_in: $ids }) {
      id
      garments(first: 1) {
        id
        image
        animation
      }
    }
  }
`;

export const GARMENT_BY_COLLECTION_ID = gql`
  query digitalaxGarmentCollection($id: ID!) {
    digitalaxGarmentCollection(id: $id) {
      id
      garments(first: 1) {
        id
        name
        animation
        description
        primarySalePrice
      }
    }
  }
`;

export const GARMENTV2_BY_AUCTION_ID = gql`
  query digitalaxGarmentV2Auction($id: ID!) {
    digitalaxGarmentV2Auction(id: $id) {
      id
      startTime
      endTime
      topBid
      resulted
      garment {
        id
        name
        image
        animation
        description
        owner
        primarySalePrice
      }
      designer {
        id
        name
        description
        image
      }
      developer {
        id
        name
        description
        image
      }
    }
  }
`;

export const GARMENT_BY_AUCTION_ID = gql`
  query digitalaxGarmentAuction($id: ID!) {
    digitalaxGarmentAuction(id: $id) {
      id
      startTime
      endTime
      topBid
      garment {
        id
        name
        image
        animation
        description
        primarySalePrice
      }
    }
  }
`;

export const DIGITALAX_MARKETPLACE_V2_OFFER = gql`
  query digitalaxMarketplaceV2Offers($garmentCollection: String!) {
    digitalaxMarketplaceV2Offers(
      where: { garmentCollection: $garmentCollection }
    ) {
      id
      primarySalePrice
      startTime
      endTime
      amountSold
      garmentCollection {
        garments(first: 1000) {
          id
          owner
        }
      }
    }
  }
`;

export const DIGITALAX_MARKETPLACE_OFFER = gql`
  query digitalaxMarketplaceOffers($garmentCollection: String!) {
    digitalaxMarketplaceOffers(
      where: { garmentCollection: $garmentCollection }
    ) {
      id
      primarySalePrice
      startTime
      amountSold
      garmentCollection {
        garments(first: 1000) {
          id
          owner
        }
      }
    }
  }
`;

export const DIGITALAX_MARKETPLACE_V2_OFFERS = gql`
  query digitalaxMarketplaceV2Offers {
    digitalaxMarketplaceV2Offers(
      first: 1000
      where: { garmentCollection_gte: "0" }
    ) {
      id
      primarySalePrice
      startTime
      endTime
      amountSold
      garmentCollection {
        id
        garments(first: 1000) {
          id
          owner
        }
      }
    }
  }
`;

export const DIGITALAX_MARKETPLACE_V2_PURCHASE_HISTORIES = gql`
  query digitalaxMarketplaceV2PurchaseHistories($ids: [ID!]) {
    digitalaxMarketplaceV2PurchaseHistories(where: { token_in: $ids }) {
      id
      timestamp
      transactionHash
      buyer
      eventName
      value
    }
  }
`;

export const DIGITALAX_MARKETPLACE_PURCHASE_HISTORIES = gql`
  query digitalaxMarketplacePurchaseHistories($ids: [ID!]) {
    digitalaxMarketplacePurchaseHistories(where: { token_in: $ids }) {
      id
      timestamp
      transactionHash
      buyer
      eventName
      value
    }
  }
`;

export const DIGITALAX_GARMENT_V2_PURCHASE_HISTORIES = gql`
  query digitalaxGarmentV2PurchaseHistories($id: ID) {
    digitalaxGarmentV2AuctionHistories(where: { token: $id, value_not: null }) {
      id
      timestamp
      transactionHash
      value
      bidder {
        id
      }
      token {
        id
      }
    }
  }
`;

export const DIGITALAX_GARMENT_PURCHASE_HISTORIES = gql`
  query digitalaxGarmentPurchaseHistories($id: ID!) {
    digitalaxGarmentAuctionHistories(where: { token: $id, value_not: null }) {
      id
      timestamp
      transactionHash
      value
      bidder {
        id
      }
      token {
        id
      }
    }
  }
`;

export const DIGITALAX_GARMENT_NFT_V2_GLOBAL_STATS = gql`
  query digitalaxGarmentNFTV2GlobalStats {
    digitalaxGarmentNFTV2GlobalStats(first: 1) {
      id
      monaPerEth
    }
  }
`;

export const DIGITALAX_GARMENT_AUCTIONS = gql`
  query digitalaxGarmentAuctions {
    digitalaxGarmentAuctions(first: 4) {
      id
      garment {
        id
        animation
        image
        name
        designer
        description
      }
      topBid
      startTime
      endTime
    }
  }
`;

export const DIGITALAX_GARMENT_V2S = gql`
  query digitalaxGarmentV2S($ids: [ID!]) {
    digitalaxGarmentV2S(where: { id_in: $ids }) {
      id
      owner
    }
  }
`;

export const AVATAR_ELEMENTALS = gql`
  query avatarElementals($first: Int!, $lastID: ID!) {
    avatarElementals(first: $first, where: { id_gt: $lastID }) {
      id
      tokenUri
      totalSupply
      image
      animation
      name
      description
      external
      attributes {
        id
        type
        value
      }
    }
  }
`;

// For Profile Page

// DIGITALAX GARMENTS (eth, polygon)
export const DIGITALAX_GARMENTS_BY_OWNER = gql`
  query digitalaxGarments($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarments(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

export const DIGITALAX_GARMENTS = gql`
  query digitalaxGarments($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGarments(first: $first, where: { id_in: $ids, id_gt: $lastID }) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

// (polygon only)
export const DIGITALAX_GARMENT_V2S_BY_OWNER = gql`
  query digitalaxGarmentV2S($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarmentV2S(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

// (polygon digi bundle)
export const DIGITALAX_SUBSCRIPTIONS_BY_OWNER = gql`
  query digitalaxSubscriptions($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxSubscriptions(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      name
      owner
      tokenUri
      image
      animation
      designer
    }
  }
`;

// polygon digifizzy 1155
export const DIGITALAX_SUBSCRIPTION_COLLECTORS_BY_OWNER = gql`
  query digitalaxSubscriptionCollectors(
    $owner: ID!
    $first: Int!
    $lastID: ID!
  ) {
    digitalaxSubscriptionCollectors(
      first: $first
      where: { id: $owner, id_gt: $lastID }
    ) {
      id
      childrenOwned {
        id
        owner
        amount
        tokenUri
        token {
          id
          image
          animation
          name
          description
          totalSupply
          tokenUri
        }
      }
    }
  }
`;

// staked fashion NFTs polygon
export const DIGITALAX_NFT_STAKERS_BY_ADDRESS = gql`
  query digitalaxNFTStakers($staker: ID!) {
    digitalaxNFTStakers(where: { id: $staker }) {
      id
      garments {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// staked fashion NFTs ethereum
export const DIGITALAX_GARMENT_STAKED_TOKENS_BY_ADDRESS = gql`
  query digitalaxGarmentStakedTokens($staker: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarmentStakedTokens(
      first: $first
      where: { staker: $staker, id_gt: $lastID }
    ) {
      id
      staker
    }
  }
`;

// genesis NFTs ethereum
export const DIGITALAX_GENESIS_NFTS_BY_ADDRESS = gql`
  query digitalaxGenesisNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGenesisNFTs(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// genesis NFTs by ids ethereum
export const DIGITALAX_GENESIS_NFTS = gql`
  query digitalaxGenesisNFTs($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGenesisNFTs(
      first: $first
      where: { id_in: $ids, id_gt: $lastID }
    ) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// staked genesis NFTs ethereum
export const DIGITALAX_GENESIS_STAKED_TOKENS_BY_ADDRESS = gql`
  query digitalaxGenesisStakedTokens($staker: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGenesisStakedTokens(
      first: $first
      where: { staker: $staker, id_gt: $lastID }
    ) {
      id
      staker
    }
  }
`;

// get collection id by garment id polygon
export const DIGITALAX_GARMENT_V2_COLLECTION_BY_GARMENT_ID = gql`
  query digitalaxGarmentV2Collections($garmentIDs: [ID!]) {
    digitalaxGarmentV2Collections(where: { garments_contains: $garmentIDs }) {
      id
      rarity
      garmentAuctionID
    }
  }
`;

// get pode tokens by owner
export const PODE_NFT_V2S_BY_ADDRESS = gql`
  query podeNFTv2S($owner: ID!, $first: Int!, $lastID: ID!) {
    podeNFTv2S(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      tokenUri
      name
      animation
    }
  }
`;

// get staked pode tokens by staker
export const PODE_NFT_V2_STAKERS_BY_ADDRESS = gql`
  query podeNFTv2Stakers($staker: ID!, $first: Int!, $lastID: ID!) {
    podeNFTv2Stakers(first: $first, where: { id: $staker, id_gt: $lastID }) {
      id
      garments {
        id
      }
    }
  }
`;

// polygon digitalax 1155
export const DIGITALAX_COLLETOR_V2_BY_OWNER = gql`
  query digitalaxCollectorV2($owner: ID!) {
    digitalaxCollectorV2(id: $owner) {
      id
      childrenOwned {
        id
        owner
        amount
        tokenUri
        token {
          id
          image
          animation
          name
          description
          totalSupply
          tokenUri
        }
      }
    }
  }
`;

// gdn membership token polygon
export const GDN_MEMBERSHIP_NFTS_BY_OWNER = gql`
  query gdnmembershipNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    gdnmembershipNFTs(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// digitalax look (loot for fashion) nfts mainnet
export const DIGITALAX_LOOK_NFTS_BY_OWNER = gql`
  query digitalaxLookNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxLookNFTs(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      name
      owner
      background
      texture
      pattern
      color
      shape
      flare
      form
      line
      element
      tokenUri
    }
  }
`;

export const DIGITALAX_GARMENT_V2_COLLECTIONS = gql`
  query digitalaxGarmentV2Collections($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGarmentV2Collections(
      first: $first
      where: { id_in: $ids, id_gt: $lastID }
    ) {
      id
      garments(first: 1000) {
        id
      }
    }
  }
`;

export const DIGITALAX_GARMENT_V2_COLLECTIONS_BY_GARMENT_IDS = gql`
  query digitalaxGarmentV2Collections(
    $garmentIDs: [ID!]
    $first: Int!
    $lastID: ID!
  ) {
    digitalaxGarmentV2Collections(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

export const DIGITALAX_LOOK_GOLDEN_TICKETS_BY_OWNER = gql`
  query digitalaxLookGoldenTickets($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxLookGoldenTickets(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      name
      description
      animation
      image
      owner
      tokenUri
    }
  }
`;

// staked nfts by id list on polygon
export const DIGITALAX_NFT_STAKERS_BY_GARMENTS = gql`
  query digitalaxNFTStakers($garmentIDs: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxNFTStakers(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// whitelisted staked nfts on dlta by id list on polygon
export const GUILD_WHITELISTED_NFT_STAKERS_BY_GARMENTS = gql`
  query guildWhitelistedNFTStakers(
    $garmentIDs: [ID!]
    $first: Int!
    $lastID: ID!
  ) {
    guildWhitelistedNFTStakers(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// get staked pode tokens by staker
export const GUILD_WHITELISTED_NFT_STAKERS_BY_STAKER = gql`
  query guildWhitelistedNFTStakers($staker: ID!, $first: Int!, $lastID: ID!) {
    guildWhitelistedNFTStakers(
      first: $first
      where: { id: $staker, id_gt: $lastID }
    ) {
      id
      garments {
        id
        owner
        tokenAddress
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

export const GET_ALL_NFTS = gql`
  query nfts {
    nfts(first: 1000) {
      id
      tokenId
      token {
        id
      }
      name
      description
      lastSalePrice
      lastSeller
      lastBuyer
      tradeCount
      totalVolume
      lastRoyaltyFactor
      lastTradeIndex
      uri
    }
  }
`;

export const GET_ALL_NFTS_BY_OWNER = gql`
  query tokens($addresses: [ID!], $owner: ID!) {
    tokens(first: 1000, where: { owner: $owner }) {
      id
      name
      description
      image
      contract {
        id
      }
      tokenID
      owner {
        id
      }
    }
  }
`;

export const GET_ALL_NFTS_BY_IDS = gql`
  query tokens($ids: [ID!]) {
    tokens(first: 1000, where: { id_in: $ids }) {
      id
      name
      description
      image
      contract {
        id
      }
      tokenID
      owner {
        id
      }
    }
  }
`;

export const GET_NFT_BY_ID = gql`
  query token($id: ID!) {
    token(id: $id) {
      id
      name
      description
      image
      contract {
        id
      }
      tokenID
      metadata
      owner {
        id
      }
    }
  }
`;

export const GET_NFT_BY_CONTRACT_AND_TOKEN_ID = gql`
  query tokens($contract: String!, $tokenId: String!) {
    tokens(where: { contract: $contract, tokenID: $tokenId }) {
      id
      name
      description
      image
      contract {
        id
      }
      tokenID
      metadata
      owner {
        id
      }
    }
  }
`;

export const IS_NFT_LISTED = gql`
  query orders($owner: String, $token: String, $tokenId: [String!]) {
    orders(
      where: {
        maker: $owner
        token: $token
        tokenIds_contains: $tokenId
        expiry: 0
      }
    ) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
    }
  }
`;

export const GET_SECONDARY_ORDER_BY_CONTRACT_AND_TOKEN_ID = gql`
  query orders($contract: String!, $tokenIds: [String!]) {
    orders(where: { token: $contract, tokenIds_contains: $tokenIds }) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
    }
  }
`;

export const GET_SECONDARY_ORDER_BY_CONTRACT_TOKEN_AND_BUY_OR_SELL = gql`
  query orders($contract: String!, $tokenIds: [String!], $buyOrSell: String) {
    orders(
      where: {
        token: $contract
        tokenIds_contains: $tokenIds
        buyOrSell: $buyOrSell
      }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      createdTxHash
      executedTokenIds
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
      timestamp
    }
  }
`;

export const GET_SECODARY_ORDERS_BY_OWNER = gql`
  query orders($owner: String!) {
    orders(where: { maker: $owner }) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
    }
  }
`;

export const GET_SECONDARY_ORDERS = gql`
  query orders {
    orders(
      where: { buyOrSell: "Buy" }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      createdTxHash
      executedTokenIds
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
      timestamp
    }
  }
`;

export const GET_SELLING_NFTS = gql`
  query orders {
    orders(
      where: { buyOrSell: "Sell" }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      price
      token {
        id
      }
      tokenIds
      maker
      taker
      buyOrSell
      anyOrAll
      expiry
      tradeCount
      tradeMax
      executedTokenIds
      timestamp
    }
  }
`;

export const GET_SECONDARY_NFT_INFO = gql`
  query nft($id: ID!) {
    nft(id: $id) {
      id
      tokenId
      token {
        id
      }
      lastSalePrice
      lastSeller
      lastBuyer
      tradeCount
      totalVolume
      lastRoyaltyFactor
      lastTradeIndex
      lastOrderIndex
      orders {
        id
      }
      trades {
        id
      }
    }
  }
`;

export const GET_TRADES_BY_ORDER_ID = gql`
  query trades($ids: [String!]) {
    trades(where: { orders_contains: $ids }) {
      id
      royaltyFactor
      blockNumber
      taker
      timestamp
      executedTxHash
      orders(where: { id_in: $ids }) {
        id
        price
      }
      tokens {
        id
      }
    }
  }
`;

export const GET_DIGITALAX_COLLECTION_GROUPS_BY_GARMENT = gql`
  query digitalaxCollectionGroups($garment: [String!]) {
    digitalaxCollectionGroups(first: 1000) {
      id
      collections(where: { garments_contains: $garment }) {
        garments {
          id
        }
      }
    }
  }
`;

export const PATRONS_MARKETPLACE_OFFERS = gql`
  query patronMarketplaceOffers($first: Int!, $lastID: ID!) {
    patronMarketplaceOffers(first: $first, where: { id_gt: $lastID }) {
      id
      garmentCollection {
        id
        garments {
          id
          designer
          name
          description
          owner
          tokenUri
        }
        designer {
          id
          name
        }
      }
      primarySalePrice
    }
  }
`;
