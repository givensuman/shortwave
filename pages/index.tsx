import { Box } from "@chakra-ui/react"

import Search from "@/components/Search"
import StationList from "@/components/StationLits"
import { SearchProvider } from "@/hooks/useSearch"

export default function Home() {
  return (
    <Box>
      <SearchProvider>
        <Search />
        <StationList />
      </SearchProvider>
    </Box>
  )
}
