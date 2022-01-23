import { Component, OnInit } from '@angular/core';
import { Moralis } from 'moralis';
import chains from 'src/assets/data/chains';
import { environment } from 'src/environments/environment';
import { Web3Provider } from 'src/provider/web3.class';
import { TokenUtils } from 'src/utils/tokens.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rarible';
  notLoad = false;
  onChainChanged: any;

  constructor(private web3: Web3Provider) {
  }

  ngOnInit() {
    console.debug('STARTING APP');
    Moralis.start({serverUrl: environment.moralis.serverUrl, appId: environment.moralis.appId})
    .then(async _ => { 
      console.debug('Moralis is initialized');
      await this.login();
      await this.web3.init();
      this.initEvents();
      this.getNativeBalance();
    })
    .catch((err) => {
      console.error('Moralis is not init ' + err);
      this.notLoad = true;
    });
  }

  initEvents() {
    console.debug('INIT EVENTS');
    /// Moralis Event not working correctly actually
    // this.web3.getOnChainEvent((chain: string | null) => {
    //   console.log('Chain changed');
    //   console.log(chain);
    //   this.getNativeBalance();
    // });

    /// Metamask Event
    (window as any).ethereum.on("chainChanged", (chain: any) => {
      this.getNativeBalance();
    });
  }

  async getNativeBalance() {
    console.debug('GET NATIVE BALANCE');
    const chainId: any = Moralis.chainId;

    if (chainId != null) {

      console.log('chain id');
      console.log(chainId);
      const data: {balance: string} = await Moralis.Web3API.account.getNativeBalance({
        chain: chainId,
        address: this.web3.currentUser?.get('ethAddress'),
      });

      console.log('data balance');
      console.log(Number(data.balance));

      const chainNativeTokenInfo = chains.find((c) => {
        return TokenUtils.decimalToHexString(c.chainId) === chainId;
      });

      console.log('chainNativeTokenInfo');
      console.log(chainNativeTokenInfo);

      const value = TokenUtils.tokenValue(Number(data.balance), Number(chainNativeTokenInfo?.nativeCurrency?.decimals));
      console.debug("Value : ");
      console.log(value);
    }
  }

  async getTokenBalances() {
    const chainId: any = Moralis.chainId;

    console.log('get native balance');
    console.log(chainId);

    const balances = await Moralis.Web3API.account.getTokenBalances({
      chain: chainId,
      address: this.web3.currentUser?.get('ethAddress'),
    });

    console.log('get native balance');
    console.log(chainId);
    console.log(balances);
  }

  async login(): Promise<Moralis.User | undefined> {
    let user = Moralis.User.current();
    if (!user) {
      await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then((user: Moralis.User) => {
          user = user;
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }

    return user;
  }
}
