// @flow
import React, { useContext, useCallback } from 'react';
import {
  ScreenContainer,
  TextInput,
  SKIcon,
  Paragraph,
  ThemeContext,
  Container,
  Grid,
  Row,
  Col,
  Button,
  H3,
} from '@selfkey/mobile-ui';
import styled from 'styled-components/native';

const errorMessages = {
  wrong_password: 'Wrong password. Please try again.',
};

export interface UnlockWalletProps {
  errors: any,
  values: any,
  onChange: (value: string) => void,
  onSubmit: () => void,
}

const ContentGrid = styled(Grid)`
  flex: 1;
  min-height: 450px;
`;

const InputRow = styled(Row)`
  margin-top: 30px;
`;

const IconCol = styled(Col)`
  align-items: center;
`;

const TitleCol = styled(Col)`
  justify-content: center;
`;

const PageTitle = styled(H3)`
  text-align: center;
`;

export function UnlockWallet(props: UnlockWalletProps) {
  const theme = useContext(ThemeContext);
  const { errors = {} } = props;

  return (
    <ScreenContainer sidePadding>
      <Container withMargin scrollable>
        <ContentGrid>
          <Row>
            <IconCol>
              <SKIcon name="icon-password" color={theme.colors.primary} size={66} />
            </IconCol>
          </Row>
          <Row>
            <TitleCol>
              <PageTitle align="center">
                Enter password to unlock your
              </PageTitle>
              <PageTitle align="center">
                SelfKey Identity Wallet
              </PageTitle>
            </TitleCol>
          </Row>
          <InputRow>
            <Col>
              <TextInput
                error={errors.password}
                errorMessage={errorMessages[errors.password]}
                value={props.values.password}
                placeholder="Password"
                label="Password"
                onChangeText={props.onChange('password')}
                secureTextEntry={true}
                onSubmitEditing={props.onSubmit}
              />
            </Col>
          </InputRow>
        </ContentGrid>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={props.onSubmit}
                type="full-primary"
              >
                Unlock
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    </ScreenContainer>
  );
}