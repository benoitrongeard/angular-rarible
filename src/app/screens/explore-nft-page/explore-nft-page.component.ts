import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Moralis from 'moralis';
import { map, Observable, startWith } from 'rxjs';
import {
  NftCollectionClass,
  NftCollectionModel,
} from 'src/app/models/nft.class';
import { getNftCollectionsByChain } from 'src/assets/data/nftAddresses';
import { Web3Provider } from 'src/provider/web3.class';

@UntilDestroy()
@Component({
  selector: 'app-explore-nft-page',
  templateUrl: './explore-nft-page.component.html',
  styleUrls: ['./explore-nft-page.component.scss'],
})
export class ExploreNftPageComponent implements OnInit {
  showCollection: boolean = false;
  nftCollection?: NftCollectionClass;
  nftCollectionModels: NftCollectionModel[] = [];
  nftCollectionModelsFiltered: Observable<NftCollectionModel[]> =
    new Observable();

  selectedNftCollectionModel: FormControl = new FormControl();

  nftBaseOffset: number = 50;
  nftLimit: number;
  cursor?: string;

  allDataLoaded: boolean = false;

  constructor(private web3Provider: Web3Provider) {
    this.nftLimit = this.nftBaseOffset;
  }

  ngOnInit() {
    console.log('NG ON INIT EXPLORE NFT');
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

    let nftContractAddress: string | undefined = this.nftCollectionModels.find(
      (m) => m.name === this.selectedNftCollectionModel.value
    )?.addrs;

    if (!nftContractAddress) {
      return;
    }

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
    this.web3Provider.chainChangedObservable
      .pipe(untilDestroyed(this))
      .subscribe(async (chain: any) => {
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
    this.nftLimit += this.nftBaseOffset;
    if (!this.allDataLoaded) {
      this.getNft();
    }
  }

  //Setting admin role
  async test() {
    // const query = new Moralis.Query(Moralis.Role);
    // const rolesList: Moralis.Role[] = await query.find({ useMasterKey: true });

    // rolesList.forEach((role) => {
    //   console.log(role);
    //   console.log(role.getName()); // Work
    //   console.log(role.getUsers()); // no users but in dashboard i can see my user
    // });

    console.log('begin');
    const isAdmin = await Moralis.Cloud.run('isAdmin');
    console.log('ratings', isAdmin);
    // ratings should be 4.5

    // const currentUser = Moralis.User.current();
    // console.log('currentUser', currentUser);
    // currentUser?.getACL();
    // currentUser?.get('role');
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
