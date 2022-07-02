import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { Web3Provider } from 'src/provider/web3.class';
import {
  NftCollectionClass,
  NftCollectionModel,
} from 'src/app/models/nft.class';
import { getNftCollectionsByChain } from 'src/assets/data/nftAddresses';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-rarible';
  showCollection: boolean = false;
  userLoad: boolean = false;
  nftCollection?: NftCollectionClass;
  nftCollectionModels: NftCollectionModel[] = [];
  nftCollectionModelsFiltered: Observable<NftCollectionModel[]> =
    new Observable();

  selectedNftCollectionModel: FormControl = new FormControl();

  nftBaseOffset: number = 50;
  nftCurrentOffset: number = 0;
  nftLimit: number;
  cursor?: string;

  allDataLoaded: boolean = false;

  constructor(private web3Provider: Web3Provider) {
    this.nftLimit = this.nftBaseOffset;
  }

  ngOnInit() {
    console.debug('STARTING APP');
    this.userLoad = this.web3Provider.currentUser != null;
    this.refreshNftModels();
    this.initEvents();
  }

  resetNftCollection() {
    this.allDataLoaded = false;
    delete this.nftCollection;
    delete this.cursor;
  }

  refreshSelectedModel(nftCollectionName: string) {
    this.selectedNftCollectionModel.setValue(nftCollectionName, {
      emitEvent: false,
    });
    this.resetNftCollection();
    this.getNft();
  }

  async getNft() {
    if (!this.nftCollectionModels) {
      console.log('No nft contract for this chain');
      return;
    }
    console.debug('GET NFT');

    let nftContractAddress: string | undefined = this.nftCollectionModels.find(
      (m) => m.name === this.selectedNftCollectionModel.value
    )?.addrs;

    if (!nftContractAddress) {
      return;
    }

    //TODO object type problem
    const options: any = {
      address: nftContractAddress,
      chain: 'eth',
      limit: this.nftLimit,
      cursor: this.cursor,
      order: 'asc',
    };
    let data = <NftCollectionClass>(
      await Moralis.Web3API.token.getAllTokenIds(options)
    );
    if (!this.nftCollection) {
      this.nftCollection = data;
    } else {
      this.nftCollection.cursor = data.cursor;
      this.nftCollection.page = data.page;
      this.nftCollection.total = data.total;
      this.nftCollection.page_size = data.page_size;
      if (data.result) {
        this.nftCollection.result?.push(...data.result);
      } else {
        this.allDataLoaded = true;
      }
    }
    this.cursor = this.nftCollection.cursor;
  }

  refreshNftModels() {
    this.nftCollectionModels = getNftCollectionsByChain(Moralis.chainId);
    this.nftCollectionModels?.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.resetNftCollection();
  }

  initEvents() {
    this.web3Provider.chainChangedObservable.subscribe(async (chain: any) => {
      this.refreshNftModels();
    });

    this.nftCollectionModelsFiltered =
      this.selectedNftCollectionModel.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterNftCollectionModels(value))
      );
  }

  private _filterNftCollectionModels(value: string): NftCollectionModel[] {
    const filterValue = value.toLowerCase();

    return this.nftCollectionModels?.filter((m) =>
      m.name.toLowerCase().includes(filterValue)
    );
  }

  toggleCollection() {
    this.showCollection = !this.showCollection;
  }

  onScroll() {
    console.log('scrolled');
    this.nftCurrentOffset += this.nftBaseOffset;
    this.nftLimit += this.nftBaseOffset;
    console.log('nft current offset');
    console.log(this.nftCurrentOffset);
    if (!this.allDataLoaded) {
      this.getNft();
    }
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
