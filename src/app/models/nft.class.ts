import Moralis from "moralis";

export class NftCollectionClass {
    /**
     * @description The total number of matches for this query
     * @example 2000
     */
    total?: number;
    /**
     * @description The page of the current result
     * @example 2
     */
    page?: number;
    /**
     * @description The number of results per page
     * @example 100
     */
    page_size?: number;
    
    /** The cursor returned in the last response (for getting the next page) */
    cursor?: string;
    result: NtfInterface[] = [];

    constructor(pros: JSON) {
        Object.assign(JSON.parse(JSON.stringify(pros)));
    }
}

export interface NtfInterface {
    /**
     * @description The address of the contract of the NFT
     * @example 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
     */
    token_address: string;
    /**
    * @description The token id of the NFT
    * @example 15
    */
    token_id: string;
    /**
    * @description The type of NFT contract standard
    * @example ERC721
    */
    contract_type: string;
    /** @description The uri to the metadata of the token */
    token_uri?: string;
    /** @description The metadata of the token */
    metadata?: any;
    /** @description when the metadata was last updated */
    synced_at?: string;
    /**
    * @description The number of this item the user owns (used by ERC1155)
    * @example 1
    */
    amount?: string;
    /**
    * @description The name of the Token contract
    * @example CryptoKitties
    */
    name: string;
    /**
    * @description The symbol of the NFT contract
    * @example RARI
    */
    symbol: string;
}

// Interface used to mock nft collection on different blockchains
export interface NftCollectionModel {
    image: string;
    name: string;
    addrs: string;
}