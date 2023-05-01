import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <ChakraProvider theme={extendTheme({
    initialColorMode: "dark",
    useSystemColorMode: false
  })}>
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
  </ChakraProvider>
  </>
}
