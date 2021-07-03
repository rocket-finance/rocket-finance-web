import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from 'rocket-finance-uikit'
import getColor from 'style/Colors'
import styled from 'styled-components'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  bold?: boolean
  color?: string
}

const StyledText = styled(Text)`
  color: ${({ theme }) => getColor(theme.isDark).nine};
`

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  bold = true,
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <StyledText bold={bold} fontSize={fontSize} style={{ lineHeight }}>
      {prefix}
      {countUp}
    </StyledText>
  )
}

export default CardValue
