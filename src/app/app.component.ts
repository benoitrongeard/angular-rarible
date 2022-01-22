import { Component, OnInit } from '@angular/core';
import { Moralis } from 'moralis';
import { environment } from 'src/environments/environment';
import { Web3Provider } from 'src/provider/web3.class';

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
      await this.web3.init();
      this.initEvents();
      // const chainId = Moralis.chainId;
      // this.getNativeBalance(chainId);
    })
    .catch((err) => {
      console.error('Moralis is not init ' + err);
      this.notLoad = true;
    });
  }

  initEvents() {
    // this.web3.getChainEvent((chain: string | null) => {
    //   console.log('Chain changed');
    //   console.log(chain);
    //   this.getNativeBalance(chain);
    // });
    console.debug('INIT EVENTS');
    this.onChainChanged = Moralis.onChainChanged(chain => {
      console.log('Chain changed');
      console.log(chain);
      this.getNativeBalance(chain);
    });
  }

  async getNativeBalance(chain: string | null) {
    console.log('get native balance');
    console.log(chain);

    if (chain != null) {
      // const toto = await Moralis.Web3API.account.getNativeBalance({
      //   chain: chain,
      //   address: this.web3.currentUser?.get('ethAddress'),
      // });

      // console.log('balance');
      // console.log(toto);
      const options: any = { chain: 'polygon', address: this.web3.currentUser?.get('ethAddress')};
      const balances = await Moralis.Web3API.account.getTokenBalances(options);
      console.debug("balances");
      console.debug(balances);
      // const resultBalance = balances.find( ({ token_address }) => token_address === contractAddress );
      // const resultBalanceNumber = Moralis.Units.FromWei(resultBalance.balance)
      // const balanceIntl = Intl.NumberFormat('en-US').format(resultBalanceNumber)
      // console.log(balanceIntl)
    }
  }

  async login() {
    let user = Moralis.User.current();
    if (!user) {
      await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user: any) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          user = user;
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
  }
}
