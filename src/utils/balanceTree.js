import MerkleTree from './merkleTree';
import { BigNumber, utils } from 'ethers';

export default class BalanceTree {
  #tree;
  decimal;
  constructor(balances, decimal) {
    this.decimal = decimal;
    this.#tree = new MerkleTree(
      balances.map(({ address, amount }, index) => {
        return this.toNode(index, address, amount);
      })
    );
  }

  verifyProof(index, account, amount, proof, root) {
    let pair = this.toNode(index, account, amount);
    for (const item of proof) {
      pair = MerkleTree.combinedHash(pair, item);
    }

    return pair.equals(root);
  }

  toNode(index, address, amount) {
    return Buffer.from(
      utils
        .solidityKeccak256(
          ['uint256', 'address', 'uint256'],
          [index, address, utils.parseUnits(String(amount), this.decimal)]
        )
        .substr(2),
      'hex'
    );
  }

  getHexRoot() {
    return this.#tree.getHexRoot();
  }

  getProof(index, account, amount) {
    return this.#tree.getHexProof(this.toNode(index, account, amount));
  }
}
