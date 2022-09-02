import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mocktoken } from "../target/types/mocktoken";
import {
  getAccount,
  getMint,
  createMint, 
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress 
} from "@solana/spl-token";
import { PublicKey,Keypair, Connection } from '@solana/web3.js';
import {AccountStore} from '../config/wallet';
import { expect } from "chai";

describe("mocktoken", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mocktoken as Program<Mocktoken>;

  let mintKey: PublicKey;
  let mintAuthority: Keypair;
  let freezeAuthority: Keypair;

  let accounts: Keypair[] = new Array(10);

  it("Create Token!", async () => {
    accounts = await AccountStore();
    await multiAirDrop(accounts,100e6);
    mintAuthority = accounts[0];
    freezeAuthority = accounts[1];

    mintKey = await createToken(
                  mintAuthority,
                  mintAuthority.publicKey,
                  freezeAuthority.publicKey
              );
    const mint_info = await getMint(provider.connection,mintKey);
    expect(mint_info.mintAuthority.toBase58()).equal(mintAuthority.publicKey.toBase58());
    expect(mint_info.freezeAuthority.toBase58()).equal(freezeAuthority.publicKey.toBase58());
    expect(mint_info.decimals).equal(9);
    expect(Number(mint_info.supply)).equal(0);
    expect(mint_info.isInitialized).equal(true);
  });

  // it("Mint!", async () => {
  //   token = await createToken(mintAuthority);
  //   console.log("token", token.toBase58());
  // });










  async function createToken(wallet: Keypair,authority: PublicKey,fauthority: PublicKey) {
    const mint = await createMint(
      provider.connection,
      wallet,          // payer
      authority,       // mintAuthority
      fauthority,      // freezeAuthority  
      9                // decimals
    );
    return mint;
  }

  async function tokenAccountInfo(args:PublicKey){
      return await getAccount(provider.connection,args);
  }


  // async function mint(userWallet,userAssociateWallet,supply) {
  //   let signature = await mintTo(
  //     provider.connection,
  //     userWallet,
  //     tokenAddress,             //changes(mint)
  //     userAssociateWallet,
  //     userWallet.publicKey,
  //     new anchor.BN(supply)
  // );
  // //console.log('mint tx:', signature);
  // }

  async function airDrop(account,amount) {
    await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(account,amount),
        "confirmed"
    );
  } 

  async function multiAirDrop(account: Keypair[],amount: number) {
    for(let i=0; i<account.length;i++) {
      await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(account[i].publicKey,amount),
        "confirmed"
      );
    }
  }

});