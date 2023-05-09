import { Injectable } from '@angular/core';
import {  ethers } from 'ethers';
import  EtherWallet  from '../../artifacts/contracts/EtherWallet.sol/EtherWallet.json';
import { BehaviorSubject } from 'rxjs';
import { WalletService } from './wallet.service';
import { AlchemyService } from './alchemy.service';
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractAddress = '0xE487bD7D701c3D468C0B707e1163EC606a7c72cc';
 
  private ethBalanceSubject = new BehaviorSubject<string>('0');
  ethBalance$= this.ethBalanceSubject.asObservable();

  private responseSubject = new BehaviorSubject<any>('');
  response$= this.responseSubject.asObservable();
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();
  contract = new ethers.Contract(this.contractAddress, EtherWallet.abi, this.signer);
  
  constructor(
    private  walletService: WalletService,
    private alchemyService: AlchemyService ) {
     this.getContractBallanceWithAlchemy();
   }



  async getContractBallanceWithEther() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(this.contractAddress, EtherWallet.abi, provider);

    this.ethBalanceSubject.next(ethers.utils.formatEther(await contract['balanceOf']()));
  }   
  async getContractBallanceWithAlchemy() {
    const balance = await this.alchemyService.alchemy.core.getBalance(this.contractAddress);
    this.ethBalanceSubject.next(ethers.utils.formatEther( balance));
  }    


  async deposit(amount: number)  {
    try{
      
      const transaction = await this.contract['deposit']({value: ethers.utils.parseEther(amount.toString())});
      await transaction.wait();
      await this.walletService.connectWalletWithAlchemy();
      await this.getContractBallanceWithAlchemy();
      this.responseSubject.next( {reason: 'Deposit successful'});
    } catch (error) {
      console.log(error);
      this.responseSubject.next(error);
    }
  }   
 
  async withdraw(amount: number)  {
    try{
      
      const transaction = await this.contract['withdraw']( this.signer.getAddress(), ethers.utils.parseEther(amount.toString()));
      await transaction.wait();
      await this.walletService.connectWalletWithAlchemy();
      await this.getContractBallanceWithAlchemy();
      this.responseSubject.next( {reason: 'successful withdrawal'});
    } catch (error) {
      console.log(error);
      this.responseSubject.next(error);
    }

   

  }   

  public getContractAddress() {
    return this.contractAddress;
  } 

}
