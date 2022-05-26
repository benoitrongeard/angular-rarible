import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NftUtils } from 'src/utils/nft.utils';
import { NftAttributes, NtfInterface } from '../models/nft.class';

@Pipe({
  name: 'nftFetchImage'
})
export class NftFetchImagePipe implements PipeTransform {

  async transform(nft: NtfInterface): Promise<string> {
    if (nft.metadata) {
      const metadata = JSON.parse(nft.metadata);
      return NftUtils.resolveLink(metadata.image);
    } else if(nft.token_uri) {
      const devEnv: boolean = environment.env === 'dev';
      // Use Heroku local proxy to bypass cors errors in dev enverionment. 
      return fetch(devEnv ? 'https://arcane-crag-89935.herokuapp.com/' + nft.token_uri : nft.token_uri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return NftUtils.resolveLink(data.image);
      })
      .catch((err) => {
        console.error(err);
        return '';
      });
    } else {
      return '';
    }
  }
}


@Pipe({
  name: 'nftFetchAttributes'
})
export class NftFetchAttributesPipe implements PipeTransform {

  async transform(nft: NtfInterface): Promise<NftAttributes[]> {
    if (nft.metadata) {
      const metadata = JSON.parse(nft.metadata);
      const attributes = metadata.attributes as NftAttributes[];
      return attributes.sort((a, b) => {
        if (a.trait_type < b.trait_type) {
          return -1;
        }

        if (a.trait_type > b.trait_type) {
          return 1;
        }

        return 0;
      }) ?? [];
    } else if(nft.token_uri) {
      const devEnv: boolean = environment.env === 'dev';
      // Use Heroku local proxy to bypass cors errors in dev enverionment. 
      return fetch(devEnv ? 'https://arcane-crag-89935.herokuapp.com/' + nft.token_uri : nft.token_uri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // return NftUtils.resolveLink(data.image);
        console.log('data', data);
        return [];
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
    } else {
      return [];
    }
  }
}
