import { UserWalletAddressPipe } from './user-wallet-address.pipe';

describe('UserWalletAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new UserWalletAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
