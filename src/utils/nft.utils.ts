export class NftUtils {
    static resolveLink(url: string): string {
        if (!url || !url.includes("ipfs://")) {
            return url;
        }
        
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    }
}