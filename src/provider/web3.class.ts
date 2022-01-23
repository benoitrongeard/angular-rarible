import { Injectable } from '@angular/core';
import Moralis from 'moralis';

@Injectable({
    providedIn: 'root',
})
export class Web3Provider {
    private web3Provider: Moralis.MoralisWeb3Provider;
    public currentUser: Moralis.User | undefined;

    init(provider: Moralis.Web3ProviderType = 'metamask'): Promise<boolean> {
        return this.web3Provider = Moralis.enableWeb3({provider: provider})
        .then((web3Provider: Moralis.MoralisWeb3Provider) => {
            console.log('WEB 3 ENABLE');
            console.log(web3Provider);
            this.web3Provider = web3Provider;
            console.debug('User : ');
            this.currentUser = Moralis.User.current();
            console.log(this.currentUser);
            return true;
        })
        .catch((err: any) => {
            console.error('WEB 3 ERROR');
            console.error(err);
            return false;
        });
    }

    getOnChainEvent(callback: Moralis.Web3ChainChangedEventCallback) {
        return Moralis.onChainChanged(callback);
    }
}