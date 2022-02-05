import { Pipe, PipeTransform } from '@angular/core';
import iconManifestJson from 'cryptocurrency-icons/manifest.json';
import { ChainData } from 'src/assets/data/chains';

@Pipe({
  name: 'logoChain',
})
export class LogoChainPipe implements PipeTransform {

  iconManifest: iconManifestInterface[] = JSON.parse(JSON.stringify(iconManifestJson));

  getSrcIcon(chainLogo: string): string {
    return 'assets/crypto-icons/' + chainLogo + '.svg';
  }

  transform(userNativeChainInfo: ChainData | undefined): unknown {
    let chainSymbol = userNativeChainInfo?.nativeCurrency?.symbol;
    let ethChainTestSymbol = ['KOV', 'ROP', 'RIN', 'GOR'];
    let bscChainTestSymbol = ['TBNB'];

    console.log('chainSymbol');
    console.log(chainSymbol);

    if (!chainSymbol) {
      return null;
    }
    
    /// Override for test chain symbol
    if (ethChainTestSymbol.includes(chainSymbol.toUpperCase())) {
      chainSymbol = 'ETH';
    } else if (bscChainTestSymbol.includes(chainSymbol.toUpperCase())) {
      chainSymbol = 'BNB';
    }

    let chainLogo = this.iconManifest.find(i => i.symbol.toUpperCase() === chainSymbol)?.symbol.toLowerCase();

    return chainLogo != null ? this.getSrcIcon(chainLogo) : this.getSrcIcon('generic');
  }

}

export interface iconManifestInterface {
  symbol: string;
  name: string;
  color: string;
}