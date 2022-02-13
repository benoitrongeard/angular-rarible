import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import chains, { ChainData } from 'src/assets/data/chains';
import { Web3Provider } from 'src/provider/web3.class';
import { TokenUtils } from 'src/utils/tokens.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuOpened = false;

  public user: Moralis.User | undefined;
  public userAddress: string | undefined;
  public userNativeChainInfo: ChainData | undefined;
  public userNativeTokenValue: string | null = null;

  constructor(private web3: Web3Provider, private cdRef: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    if (this.web3.currentUser) {
      this.init();
    }
  }

  init() {
    this.initUser();
    this.initEvents();
    this.getNativeBalance();
  }

  initUser() {
    this.user = this.web3.currentUser;
    this.userAddress = this.user?.get('ethAddress');
  }

  async login(): Promise<Moralis.User | undefined> {
    let user = Moralis.User.current();
    if (!user) {
        await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
        .then((user: Moralis.User) => {
            console.debug('USER CONNECTED');
            user = user;
        })
        .catch(function (error: any) {
            console.error('USER NOT CONNECTED');
            console.error(error);
        });
    }

    if (!this.web3.web3Provider) {
        await this.web3.initWeb3();
    }

    this.init();

    return user;
  }

  initEvents() {
    console.debug('INIT EVENTS');
    this.web3.chainChangedObservable.subscribe(async (chain: any) => {
      this.getNativeBalance(chain);
    });
  }

  async getNativeBalance(chain: any = null) {
    console.debug('GET NATIVE BALANCE');
    const chainId: any = Moralis.chainId != null ? Moralis.chainId : chain;

    if (chainId != null) {
      const data: {balance: string} = await Moralis.Web3API.account.getNativeBalance({
        chain: chainId,
        address: this.web3.currentUser?.get('ethAddress'),
      });

      let chain = chains.find((c) => {
        return TokenUtils.decimalToHexString(c.chainId) === chainId;
      });

      this.userNativeChainInfo = chain;

      this.userNativeTokenValue = TokenUtils.tokenValueFormatted(Number(data.balance), Number(this.userNativeChainInfo?.nativeCurrency?.decimals));

      this.cdRef.detectChanges();
    }
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
