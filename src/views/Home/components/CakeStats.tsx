import React from 'react'
import { Card, CardBody, Heading, LinkExternal, Text } from 'rocket-finance-uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import getColor from 'style/Colors'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
`

const RowHighlighted = styled(Row)`
  background-color: ${({ theme }) => (theme.isDark ? '#36343c' : '#fbfbfb')};
  padding: 10px 5px;
  border-radius: 5px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const tapsPrice = usePriceCakeBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)
  const marketCap = tapsPrice.times(circSupply)

  let tapsPerBlock = 0
  if (farms && farms[0] && farms[0].tapsPerBlock) {
    tapsPerBlock = new BigNumber(farms[0].tapsPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  const StyledHeading = styled(Heading)`
    color: ${({ theme }) => getColor(theme.isDark).seventh};
  `

  const CirculatingSupplyText = styled(Text)`
    color: ${({ theme }) => getColor(theme.isDark).seventh};
  `

  return (
    <StyledCakeStats>
      <CardBody>
        <StyledHeading size="lg" mb="24px">
          {TranslateString(534, 'ROCKET Stats')}
        </StyledHeading>
        <RowHighlighted>
          <CirculatingSupplyText fontSize="14px">
            <strong>
              {TranslateString(10004, 'Circulating Supply')}{' '}
              <span data-tip data-for="circulatingSupplyTooltip">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </strong>
            <ReactTooltip id="circulatingSupplyTooltip" effect="solid">
              <span>
                = {TranslateString(536, 'Total Minted')} - {TranslateString(10007, 'Total of token burned')}
              </span>
            </ReactTooltip>
          </CirculatingSupplyText>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </RowHighlighted>
        <Row>
          <CirculatingSupplyText fontSize="14px">{TranslateString(10005, 'Market Cap')}</CirculatingSupplyText>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <CirculatingSupplyText fontSize="14px">{TranslateString(536, 'Total Minted')}</CirculatingSupplyText>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <CirculatingSupplyText fontSize="14px">
            {TranslateString(538, 'ROCKETS locked')}{' '}
            <span data-tip data-for="totalBurnedTooltip">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </CirculatingSupplyText>
          <ReactTooltip id="totalBurnedTooltip" effect="solid">
            <span>{TranslateString(10007, 'Total of token burned')}</span>
          </ReactTooltip>
          <LinkExternal to="https://bscscan.com/token/0xcc0743bc0b2122a43881aac5597650ce82d9caaa?a=0x000000000000000000000000000000000000dead">
            <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
          </LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New ROCKET/block')}</Text>
          <Text bold fontSize="14px">
            {tapsPerBlock}
          </Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
