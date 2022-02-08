import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Web3Provider } from 'src/provider/web3.class';
import { UserWalletAddressPipe } from './pipes/user-wallet-address.pipe';
import { LogoChainPipe } from './pipes/logo-chain.pipe';
import { NftPipe } from './pipes/nft.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserWalletAddressPipe,
    LogoChainPipe,
    NftPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    Web3Provider,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Web3Provider],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initApp(web3Provider: Web3Provider) {
  return () => web3Provider.init();
}
