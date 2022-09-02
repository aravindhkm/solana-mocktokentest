import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";
import * as bs58 from 'bs58';
import fs from "fs";

export async function AccountStore() {
  const pathSeed = process.env.HOME + "/.config/solana/seed.json";
  const seedFile = fs.readFileSync(pathSeed);
  const mnemonic = JSON.parse(seedFile.toString());
  // const mnemonic = "";
  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  const seeds = [];
  for (let i = 0; i < 10; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const keypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);
    // console.log(`${path}, "public key for base58" => ${keypair.publicKey.toBase58()}`);
    // console.log(`${path}, "public key for string" => ${keypair.publicKey.toString()}`);
    // console.log(`${path}, "secret key for base58" => ${bs58.encode(keypair.secretKey)}`);
    // console.log(`${path}, "secret key for string" =>`, ((keypair.secretKey)).toString());
    // console.log("private key unit8 array format", `[${Keypair.fromSecretKey(keypair.secretKey).secretKey}]`);
    
    seeds.push(Keypair.fromSecretKey(keypair.secretKey));
  }

  return seeds;
};

