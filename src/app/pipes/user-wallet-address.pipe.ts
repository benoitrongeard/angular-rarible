import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userWalletAddress'
})
export class UserWalletAddressPipe implements PipeTransform {

  transform(value: string): string {
    const truncateRegex = /^(0x[a-zA-Z0-9]{6})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/;

    const match = value.match(truncateRegex);
    if (!match) {
      return value;
    }
    return `${match[1]}....${match[2]}`;
  }
} 