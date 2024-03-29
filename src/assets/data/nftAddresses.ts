export const nftCollections: any = {  
    "0x1": [
      {
        image:
          "https://lh3.googleusercontent.com/Elp_bWKH4be7BFwUbM84JhRgggPwP1XM1akHPJsTksP88BJoY9NWt2ECMZpY-rI3l9wrNUFdekGVC7-6i4vn4Al4f9iQt4JgZ6Mgxw=s0",
        name: "Prime Ape Planet",
        addrs: "0x6632a9d63E142F17a668064D41A21193b49B41a0",
      },
      {
        image:
          "https://lh3.googleusercontent.com/WOG6cvt7zNSOGg96Ig2CupQVk6gK9cLOlIJ70elJE9fbGRmGqAi1toiUVAHdchDTErQZtRW-JbjZGstYaQXWhyixxS4s7Nky0wlR=s0",
        name: "Prime Kong Planet",
        addrs: "0x5845E5F0571427D0ce33550587961262CA8CDF5C",
      },
      {
        image:
          "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130",
        name: "Bored Ape Yacht Club",
        addrs: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      },
      {
        image:
          "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130",
        name: "Crypto Punks",
        addrs: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
      },
      {
        image:
          "https://lh3.googleusercontent.com/l1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1=s0",
        name: "Bored Ape Kennel Club",
        addrs: "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623",
      },
      {
        image:
          "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s0",
        name: "Doodles",
        addrs: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
      },
      {
        image:
          "https://lh3.googleusercontent.com/7gOej3SUvqALR-qkqL_ApAt97SpUKQOZQe88p8jPjeiDDcqITesbAdsLcWlsIg8oh7SRrTpUPfPlm12lb4xDahgP2h32pQQYCsuOM_s=s0",
        name: "0N1 Force",
        addrs: "0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D",
      },
      {
        image:
          "https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s0",
        name: "Mutant Ape Yacht Club",
        addrs: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
      },
      {
        image:
          "https://lh3.googleusercontent.com/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4=s0",
        name: "CyberKongz",
        addrs: "0x57a204AA1042f6E66DD7730813f4024114d74f37",
      },
      {
        image:
          "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s0",
        name: "Cool Cats NFT",
        addrs: "0x1A92f7381B9F03921564a437210bB9396471050C",
      },
    ],
  };

  /// Used to get NFT Contract for test network
  export const testChainToMainet = (chain: string) => {
    if (chain === '0x3' || chain === '0x2a' || chain === '0x42' || chain === '0x4' || chain === '0x5') {
        return '0x1';
    }
    return chain;
  };
  
  export const getNftCollectionsByChain = (chain: string | null) => chain != null ? nftCollections[testChainToMainet(chain)] : null;