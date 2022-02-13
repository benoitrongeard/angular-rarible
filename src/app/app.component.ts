import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { Web3Provider } from 'src/provider/web3.class';
import { NftCollectionClass, NftCollectionModel, NtfInterface } from 'src/app/models/nft.class';
import { getNftCollectionsByChain } from 'src/assets/data/nftAddresses';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-rarible';
  showCollection: boolean = false;
  userLoad: boolean = false;
  nftCollection?: NftCollectionClass;
  nftCollectionModels: NftCollectionModel[] = [];
  nftCollectionModelsFiltered: Observable<NftCollectionModel[]> = new Observable();

  selectedNftCollectionModel: FormControl = new FormControl();

  constructor(private web3Provider: Web3Provider) {
  }

  ngOnInit() {
    console.debug('STARTING APP');
    this.userLoad = this.web3Provider.currentUser != null;
    this.refreshNftModels();
    this.initEvents();
  }

  async getNft(nftCollectionName: string) {
    this.selectedNftCollectionModel.setValue(nftCollectionName, {emitEvent: false});

    if (!this.nftCollectionModels) {
      console.log('No nft contract for this chain');
      return;
    }
    console.debug('GET NFT');

    let nftContractAddress: string | undefined = this.nftCollectionModels.find(m => m.name === this.selectedNftCollectionModel.value)?.addrs;

    if (!nftContractAddress) {
      return;
    }

    //TODO object type problem
    const options: any = { address: nftContractAddress, chain: 'eth', limit: 10 };
    this.nftCollection = <NftCollectionClass> await Moralis.Web3API.token.getAllTokenIds(options);
    console.log('nft collection');
    console.log(this.nftCollection);
    this.nftCollection.result?.map(r => r.metadata = null);
  }

  refreshNftModels() {
    this.nftCollectionModels = getNftCollectionsByChain(Moralis.chainId);
    this.nftCollectionModels?.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
    delete this.nftCollection;
  }

  initEvents() {
    this.web3Provider.chainChangedObservable.subscribe(async (chain: any) => {
      this.refreshNftModels();
    });

    this.nftCollectionModelsFiltered = this.selectedNftCollectionModel.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNftCollectionModels(value)),
    );
  }

  private _filterNftCollectionModels(value: string): NftCollectionModel[] {
    const filterValue = value.toLowerCase();

    return this.nftCollectionModels?.filter(m => m.name.toLowerCase().includes(filterValue));
  }

  toggleCollection() {
    this.showCollection = !this.showCollection;
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
