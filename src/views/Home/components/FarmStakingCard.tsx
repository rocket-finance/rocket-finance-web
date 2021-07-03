import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, MetamaskIcon, LinkExternal } from 'rocket-finance-uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import getColor from 'style/Colors'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { BASE_URL } from '../../../config'
import registerToken from '../../../utils/metamaskUtils'

const StyledFarmStakingCard = styled(Card)`
  background-image: ${({ theme }) => (theme.isDark ? "url('/images/cake-bg-dark.png')" : "url('/images/cake-bg.png')")};
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 0px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 44px;
`

const TertiaryButton = styled(Button)`
  margin: 5px 0;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => getColor(theme.isDark).seventh};
`

const StyledLabel = styled(Label)`
  color: ${({ theme }) => getColor(theme.isDark).sixth};
`

const StyledUnlockButton = styled(UnlockButton)`
  background: none;
  border: ${({ theme }) => `1px solid ${getColor(theme.isDark).seventh}`};
  color: ${({ theme }) => getColor(theme.isDark).seventh};
`

const HarvestButton = styled(Button)`
  background: ${({ theme }) => getColor(theme.isDark).eight};
  color: ${({ theme }) => getColor(theme.isDark).first};
  box-shadow: ${({ theme }) => `0px 2px 8px${getColor(theme.isDark).sixth}`};
`

const AddRocketsToMetamask = styled(TertiaryButton)`
  background: ${({ theme }) => getColor(theme.isDark).eight};
  color: ${({ theme }) => getColor(theme.isDark).first};
  box-shadow: ${({ theme }) => `0px 2px 8px${getColor(theme.isDark).sixth}`};
`

const ViewOnBscScan = styled(LinkExternal)`
  a {
    svg {
      fill: red;
    }
  }
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const tokenImageSrc = `${BASE_URL}/images/farms/rocket.png`
  const tokenName = `ROCKETS`
  const tokenAddress = `0xcc0743bc0b2122a43881aac5597650ce82d9caaa`

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <StyledHeading size="lg" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </StyledHeading>
        <Block>
          <StyledLabel>{TranslateString(544, 'ROCKETs to Harvest')}:</StyledLabel>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <StyledLabel>{TranslateString(546, 'ROCKETs in Wallet')}:</StyledLabel>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <HarvestButton
              id="harvest-all"
              // disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting ROCKET')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </HarvestButton>
          ) : (
            <StyledUnlockButton width="100%" />
          )}
        </Actions>

        <Block>
          <AddRocketsToMetamask
            variant="primary"
            scale="sm"
            onClick={() => registerToken(tokenAddress, tokenName, 18, tokenImageSrc)}
            startIcon={<MetamaskIcon />}
            width="100%"
          >
            Add {tokenName} to Metamask
          </AddRocketsToMetamask>
          <AddRocketsToMetamask variant="primary" scale="sm" width="100%">
            <LinkExternal
              showIcon={false}
              to="https://bscscan.com/token/0xcc0743bc0b2122a43881aac5597650ce82d9caaa"
              color="#ffffff"
            >
              {TranslateString(356, 'View on BscScan')}
            </LinkExternal>
          </AddRocketsToMetamask>
        </Block>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
