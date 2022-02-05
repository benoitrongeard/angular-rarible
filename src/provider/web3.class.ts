import { Injectable } from '@angular/core';
import Moralis from 'moralis';
import { environment } from 'src/environments/environment';

@Injectable()
export class Web3Provider {
    public currentUser: Moralis.User | undefined;
    public notLoad = false;
    public web3Provider: Moralis.MoralisWeb3Provider;


    init(): Promise<boolean> {
        return Moralis.start({serverUrl: environment.moralis.serverUrl, appId: environment.moralis.appId})
        .then(async _ => { 
          console.debug('Moralis is initialized');
          return await this.initWeb3();
        })
        .catch((err) => {
          console.error('Moralis is not init ' + err);
          this.notLoad = true;
          return false;
        });
    }

    initWeb3(provider: Moralis.Web3ProviderType = 'metamask'): Promise<boolean> {
        return Moralis.enableWeb3({provider: provider})
        .then((web3Provider: Moralis.MoralisWeb3Provider) => {
            console.debug('WEB 3 ENABLE');
            this.currentUser = Moralis.User.current();
            this.web3Provider = web3Provider;
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