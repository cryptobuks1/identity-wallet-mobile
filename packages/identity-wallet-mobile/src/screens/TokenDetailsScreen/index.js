import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TokenDetailsScreen } from './TokenDetailsScreen';
import { TokenDetails, TxHistoryContainer } from '../../components';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { IconKey, IconEth } from '@selfkey/mobile-ui/lib/svg-icons';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import modules from '@selfkey/wallet-core/modules';
import styled from 'styled-components/native';
import { Grid, Row, Col } from '@selfkey/mobile-ui';

const { selectors } = modules.wallet;

const TransactionsContainer = styled.View`
  margin-top: 10px;
`;

const ICON_MAP = {
  KEY: IconKey,
  KI: IconKey,
  ETH: IconEth
};

function getFiatDecimal(tokenDetails) {
  if (tokenDetails.code === 'ETH') {
    return 2;
  }

  return 4;
}

function TokenDetailsContainer(props) {
  const tokenSymbol = props.navigation.getParam('tokenId', 'ETH');
  const tokenDetails = useSelector(selectors.getTokenDetails(tokenSymbol));
  const dispatch = useDispatch();
  const handleBack = useCallback(() => {
    navigate(Routes.APP_DASHBOARD);
  }, []);

  const handleReceive = useCallback((tokenSymbol) => {
    dispatch(modules.app.operations.showReceiveTokensModal({
      visible: true,
      tokenSymbol,
    }));
  }, []);

  const handleSend = useCallback((tokenSymbol) => {
    dispatch(modules.transaction.operations.goToTransactionOperation(tokenDetails.symbol));
  }, [tokenDetails.symbol]);

  return (
    <TokenDetailsScreen
      title={tokenDetails.code}
      onBack={handleBack}
    >
      <Grid>
        <Row>
          <Col>
            <TokenDetails
              onReceive={handleReceive}
              onSend={handleSend}
              iconComponent={ICON_MAP[tokenDetails.code]}
              tokenName={tokenDetails.name}
              tokenCode={tokenDetails.code}
              fiatDecimal={getFiatDecimal(tokenDetails)}
              tokenAmount={tokenDetails.amount}
              fiatCurrency="usd"
              fiatAmount={tokenDetails.fiatAmount}
              lastPrice={tokenDetails.lastPrice}
              lastPriceCurrency="usd"
              contractAddress={tokenDetails.contractAddress}
            />
          </Col>
        </Row>
        <Row marginTop={20}>
          <Col>
            <TxHistoryContainer
              tokenSymbol={tokenSymbol}
              showEmptyAlert
            />
          </Col>
        </Row>
      </Grid>
    </TokenDetailsScreen>
  );
} 

export default TokenDetailsContainer;