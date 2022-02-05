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
  onChainChanged: any;

  constructor(private web3: Web3Provider) {
  }

  ngOnInit() {
    console.debug('STARTING APP');
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
}
