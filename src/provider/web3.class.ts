import { Injectable } from '@angular/core';
import Moralis from 'moralis';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class Web3Provider {
    public currentUser?: Moralis.User;
    public notLoad = false;
    public web3Provider?: Moralis.MoralisWeb3Provider;
    public chainChangedObservable: Subject<string> = new Subject();


    init(): Promise<boolean> {
        return Moralis.start({serverUrl: environment.moralis.serverUrl, appId: environment.moralis.appId})
        .then(async _ => { 
          console.debug('Moralis is initialized');
          try {
            await this.initWeb3();
            this.initEvents();
            return true;

          } catch (error) {
            return false;
          }
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

    initEvents() {
        this.chainEventChange();
    }

    chainEventChange() {
        /// Moralis Event not working correctly actually
        // Moralis.onChainChanged((chain: string | null) => {
        //     if (chain) {
        //         this.chainChangedObservable.next(chain);
        //     }
        // });

        /// Metamask Event
        (window as any).ethereum.on("chainChanged", (chain: string) => {
            console.debug('CHAIN CHANGED');
            this.chainChangedObservable.next(chain);
        });
    }
}