import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Button, HelpIcon, ButtonProps } from 'rocket-finance-uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import ListedOn from 'views/Home/components/ListedOn'
import getColor from 'style/Colors'
import AuditCard from './components/AuditCard'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 22px;
  padding-top: 60px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Header = styled.div`
  padding: 32px 0px;
  background: none;

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const TokenImage = styled.img`
  margin-left: 5px;
  margin-right: 5px;
`

const BuyRocketButton = styled(Button)<ButtonProps>`
  background: none;
  color: ${({ theme }) => getColor(theme.isDark).seventh};
  border: ${({ theme }) => `1px solid ${getColor(theme.isDark).seventh}`};
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => getColor(theme.isDark).seventh};
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
      <Header>
        <StyledHeading as="h1" size="xl" color="secondary" mb="24px">
          {TranslateString(578, 'AMM +Yield Aggregator on Binance Smartchain')}
        </StyledHeading>
        <Heading size="lg" color="text">
          <a href="https://swap.tapswap.money/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0xcc0743bc0b2122a43881aac5597650ce82d9caaa">
            <BuyRocketButton>
              {TranslateString(733, 'GET')}{' '}
              <TokenImage src="/images/farms/rocket.png" alt="ROCKET Token" width="70" height="70" />{' '}
              {TranslateString(734, 'ROCKET  Now!')}
            </BuyRocketButton>
          </a>
        </Heading>
      </Header>
      <Page>
        <div>
          <Cards>
            <FarmStakingCard />
            <TwitterCard />
            <CakeStats />
            <TotalValueLockedCard />
          </Cards>
          {/* <Cards>
            <EarnAssetCard />
            <AuditCard />
          </Cards>
          <Cards>
            <ListedOn />
          </Cards> */}
        </div>
      </Page>
    </>
  )
}

export default Home
