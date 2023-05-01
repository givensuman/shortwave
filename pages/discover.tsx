import Search from "@/components/Search"
import StationList from "@/components/StationList"
import { SearchProvider } from "@/hooks/useSearch"
import { Box } from "@chakra-ui/react"

import Carousel from "@/components/Carousel"

export default function Discover() {
    return (
        <Box> 
            {/* <SearchProvider>
                <Search />
                <StationList />
            </SearchProvider> */}
            <Carousel />
        </Box>
    )
}