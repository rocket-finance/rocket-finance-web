import React from 'react'
import { Button, useWalletModal } from 'rocket-finance-uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

const Unlock = styled(Button)`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  color: ${({ theme }) => theme.colors.input};
`

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Unlock onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Unlock>
  )
}

export default UnlockButton
