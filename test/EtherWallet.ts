
import {expect} from 'chai';
import {ethers} from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
// example test
describe('EtherWallet', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const EtherWallet = await ethers.getContractFactory('EtherWallet');
        const etherWallet = await EtherWallet.deploy();
        return { etherWallet, owner, otherAccount };
    }

    describe('Deployment', function () {
        it('should deploy the contract and set the owner to be the deployer address', async function () {
            const { etherWallet , owner } = await loadFixture(deployFixture);
            expect(await etherWallet.owner()).to.equal(owner.address);
        });
    });
    describe('Balance', function () {
        it('should return 0 ether for the contract balance', async function () {
            const { etherWallet , owner } = await loadFixture(deployFixture);
            expect(await etherWallet.balanceOf()).to.equal(0);
        });
        it('should return 1 ether for the contract balance', async function () {
            const { etherWallet , owner } = await loadFixture(deployFixture);
            const amount = ethers.utils.parseEther('1');
            await etherWallet.deposit({value: amount});
            expect(await etherWallet.balanceOf()).to.equal(amount);
        }
        );
    });

    
    describe('Send', function () {

    });     

    describe('Deposit', function () {
        it('should deposit 1 ether to the contract', async function () {
            const { etherWallet , owner } = await loadFixture(deployFixture);
            const amount = ethers.utils.parseEther('1');
            await etherWallet.deposit({value: amount});
            expect(await etherWallet.balanceOf()).to.equal(amount);
        });
    });
    describe('Withdraw', function () {
        it('should withdraw 1 ether from the contract', async function () {
            const { etherWallet, owner } = await loadFixture(deployFixture);
            const amount = ethers.utils.parseEther('1');
            await etherWallet.deposit({value: amount});
            await etherWallet.withdraw(owner.address, amount);
            expect(await etherWallet.balanceOf()).to.equal(0);
        });
        it('should not withdraw 1 ether from the contract if not owner', async function () {
            const { etherWallet, owner, otherAccount } = await loadFixture(deployFixture);
            const amount = ethers.utils.parseEther('1');
            await etherWallet.deposit({value: amount});
            await expect(etherWallet.connect(otherAccount).withdraw(owner.address, amount)).to.be.revertedWith('Only owner can withdraw the Ether');
        });
    });


});


