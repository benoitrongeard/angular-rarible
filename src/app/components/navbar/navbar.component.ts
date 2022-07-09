import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Moralis from 'moralis';
import { Subscription } from 'rxjs';
import chains, { ChainData } from 'src/assets/data/chains';
import { Web3Provider } from 'src/provider/web3.class';
import { TokenUtils } from 'src/utils/tokens.utils';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isMenuOpened = false;

  public user: Moralis.User | undefined;
  public userAddress: string | undefined;
  public userNativeChainInfo: ChainData | undefined;
  public userNativeTokenValue: string | null = null;

  constructor(private web3: Web3Provider, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.initUser();
    this.initEvents();
    this.getNativeBalance();
    this.cdRef.detectChanges();
  }

  initUser() {
    this.user = this.web3.currentUser;
    this.refreshUserAddress();
  }

  refreshUserAddress() {
    this.userAddress = this.user?.get('ethAddress');
  }

  async login(): Promise<void> {
    await this.web3.login().then(
      (connected) => {
        console.log('USER CONNECTED');
        console.log(connected);
        this.init();
      },
      (error) => {
        console.error('USER NOT CONNECTED');
        console.error(error);
      }
    );

    return;
  }

  initEvents() {
    this.web3.chainChangedObservable
      .pipe(untilDestroyed(this))
      .subscribe(async (chain: string) => {
        this.getNativeBalance(chain);
      });

    this.web3.accountChangedObservable
      .pipe(untilDestroyed(this))
      .subscribe(async (account: string | null) => {
        this.init();
      });
  }

  async getNativeBalance(chain: any = null) {
    const chainId: any = Moralis.chainId != null ? Moralis.chainId : chain;

    if (chainId != null) {
      const data: { balance: string } =
        await Moralis.Web3API.account.getNativeBalance({
          chain: chainId,
          address: this.web3.currentUser?.get('ethAddress'),
        });

      let chain = chains.find((c) => {
        return TokenUtils.decimalToHexString(c.chainId) === chainId;
      });

      this.userNativeChainInfo = chain;

      this.userNativeTokenValue = TokenUtils.tokenValueFormatted(
        Number(data.balance),
        Number(this.userNativeChainInfo?.nativeCurrency?.decimals)
      );

      this.cdRef.detectChanges();
    }
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
