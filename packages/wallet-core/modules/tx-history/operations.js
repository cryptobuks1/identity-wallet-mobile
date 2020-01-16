import txHistoryActions from './actions';
import txHistoryDuck from './index';
import ducks from '../index';
import { TxHistoryModel } from '../../models';
import { TxHistoryService } from '@selfkey/wallet-core/services/tx-history-service';

const txHistoryModel = TxHistoryModel.getInstance();
const txHistoryService = TxHistoryService.getInstance();

// TODO: Move to configs
const chainId = 3;

export const operations = {
  updateTransactionOperation: (hash, updatedData) => async (dispatch, getState) => {
    await txHistoryModel.updateById(hash, updatedData); 
    await dispatch(txHistoryActions.updateTransaction(hash, updatedData));
  },

  loadTxHistoryOperation: () => async (dispatch, getState) => {
    const state = getState();
    const address = ducks.wallet.selectors.getAddress(state);
    // TODO: Need to get lastBlock from wallet db and pass it here
    await txHistoryService.syncByWallet(address, null);
    const transactions = await txHistoryModel.findByAddress(address.toLowerCase());
    await dispatch(txHistoryActions.setTransactions(transactions.reverse()));
  },
  /**
   * Create txHistory
   */
  createTransactionOperation: (transaction) => async (dispatch, getState) => {
    const newTransaction = {
      hash: transaction.hash,
      networkId: chainId,
      tokenSymbol: transaction.tokenSymbol,
      from: transaction.from,
      to: transaction.address,
      gasPrice: transaction.gasPrice,
      gasLImit: transaction.gasLimit,
      tokenDecimal: transaction.tokenDecimal,
      value: parseFloat(transaction.amount),
      nonce: transaction.nonce,
      contractAddress: transaction.contractAddress,
      // TODO: Figure out how to handle it
      txReceiptStatus: 0,
      isError: false,
      timeStamp: Date.now(),
      status: transaction.status
      // confirmations: 1,
      // blockNumber: ''
      // timeStamp: Date.now(),
      // transactionIndex: 0,
    };

    await txHistoryModel.create(newTransaction);
    const createdTx = await txHistoryModel.findById(newTransaction.hash);

    await dispatch(txHistoryActions.addTransaction(newTransaction));

    // nonce: 0,
    // tokenDecimal: 10,
    // gasPrice: 0.00001,
    // gasLimit: 28000,
    // address: 'some-address',
    // amount: amount,
    // cryptoCurrency: getToken(state),
    // hash: getTransactionHash(state),
    // from: ducks.wallet.selectors.getAddress(state),
    // contractAddress: tokenDetails.tokenContract,

    // const wallet = getWallet(getState());
    // const transaction = getTransaction(getState());
    // const { cryptoCurrency } = transaction;
    // const tokenSymbol = cryptoCurrency === 'ETH' ? null : cryptoCurrency;
    // const data = {
    //   ...transaction,
    //   tokenSymbol,
    //   networkId: chainId,
    //   from: wallet.address,
    //   to: transaction.address,
    //   value: +transaction.amount,
    //   gasPrice: +transaction.gasPrice,
    //   hash: transactionHash
    // };
  }
};

export const transactionOperations = {
  ...txHistoryActions,
  ...operations,
};

export default transactionOperations;