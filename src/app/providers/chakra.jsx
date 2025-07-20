'use client'

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const ProviderChakra = ( { children } ) => {
  return (
    <ChakraProvider theme={theme}>
      { children }
    </ChakraProvider>
  )
}

export default ProviderChakra;