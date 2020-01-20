import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateBackup } from './CreateBackup';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import ducks from '@selfkey/wallet-core/modules';

function CreateBackupContainer(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const handleBack = useCallback(() => navigate(Routes.APP_SETTINGS), []);
  const handleChange = useCallback(password => setPassword(password));
  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(ducks.wallet.operations.backupWalletOperation(password));
      navigate(Routes.APP_SETTINGS)
    } catch(err) {
      setError(err.message);
    }
  });
  
  return (
    <CreateBackup
      onChange={handleChange}
      onSubmit={handleSubmit}
      password={password}
      error={error}
      onBack={handleBack}
    />
  );
}


export default CreateBackupContainer;
