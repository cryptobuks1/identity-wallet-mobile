import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmMnemonic } from './ConfirmMnemonic';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

const { operations, selectors } = ducks.createWallet;

function ConfirmMnemonicContainer(props) {
  const dispatch = useDispatch();
  const mnemonic = useSelector(selectors.getShuffledMnemonic);
  const mnemonicConfirmation = useSelector(selectors.getMnemonicConfirmation);
  const errorMessage = useSelector(selectors.getConfirmationError);

  const handleBack = useCallback(() => {
    navigate(Routes.CREATE_WALLET_BACKUP);
  });

  const handleSubmit = useCallback(() => {
    dispatch(operations.submitConfirmationOperation())
  });

  const handleWordPress = useCallback(word => {
    dispatch(operations.addConfirmationWord(word));
  });

  const handleClear = useCallback(() => {
    dispatch(operations.clearConfirmation());
  });

  return (
    <ConfirmMnemonic
      onWordPress={handleWordPress}
      mnemonicConfirmation={mnemonicConfirmation}
      mnemonic={mnemonic}
      onClear={handleClear}
      onSubmit={handleSubmit}
      onBack={handleBack}
      errorMessage={errorMessage}
    />
  );
}


export default ConfirmMnemonicContainer;