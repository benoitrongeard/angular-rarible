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
  public accountChangedObservable: Subject<string | null> = new Subject();

  private isAdmin = false;

  // TODO get role for user

  init(): Promise<boolean> {
    return Moralis.start({
      serverUrl: environment.moralis.serverUrl,
      appId: environment.moralis.appId,
    })
      .then(async (_) => {
        console.debug('Moralis is initialized');
        try {
          await this.initWeb3();
          await this.initRoles();
          this.initEvents();
          return true;
        } catch (error) {
          console.error('Moralis is not correctly initialized');
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
    return Moralis.enableWeb3({ provider: provider })
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

  async initRoles() {
    this.isAdmin = await Moralis.Cloud.run('isAdmin');
  }

  initEvents() {
    this.chainEventChange();
    this.accountEventChange();
  }

  chainEventChange() {
    Moralis.onChainChanged((chain: string | null) => {
      if (chain) {
        this.chainChangedObservable.next(chain);
      }
    });

    /// Metamask Event
    // (window as any).ethereum.on("chainChanged", (chain: string) => {
    //     console.debug('CHAIN CHANGED');
    //     this.chainChangedObservable.next(chain);
    // });
  }

  accountEventChange() {
    Moralis.onAccountChanged((account: string | null) => {
      this.disconnectUser().then((success) => {
        this.accountChangedObservable.next(account);
      });
    });
  }

  disconnectUser(): Promise<boolean> {
    return Moralis.User.logOut().then(() => {
      console.debug('user log out');
      this.currentUser = Moralis.User.current();
      return true;
    });
  }

  login(): Promise<boolean> {
    return Moralis.authenticate({ signingMessage: 'Log in using Moralis' })
      .then((user: Moralis.User) => {
        this.currentUser = user;
        return true;
      })
      .catch(function (error: any) {
        console.error('USER NOT CONNECTED');
        console.error(error);
        return false;
      });
  }

  isUserAdmin() {
    return this.isAdmin;
  }
}
