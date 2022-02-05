import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rarible';

  constructor() {
  }

  ngOnInit() {
    console.debug('STARTING APP');
  }

  // async getTokenBalances() {
  //   const chainId: any = Moralis.chainId;

  //   console.log('get native balance');
  //   console.log(chainId);

  //   const balances = await Moralis.Web3API.account.getTokenBalances({
  //     chain: chainId,
  //     address: this.web3.currentUser?.get('ethAddress'),
  //   });

  //   console.log('get native balance');
  //   console.log(chainId);
  //   console.log(balances);
  // }
}
