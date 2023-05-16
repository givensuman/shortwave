import Search from "@/components/Search"
import StationList from "@/components/StationList"
import { SearchProvider } from "@/hooks/useSearch"
import { Box, Center, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react"

import Carousel from "@/components/Carousel"
import api from "@/utils/api"
import { useEffect } from "react"
import Station from "@/components/Station"
import StationBlock from "@/components/StationBlock"

export default function Discover() {

    const popularQuery = api.getPopular()
    const trendingQuery = api.getTrending()
    const activeQuery = api.getActive()

    return (
        <Box> 
            {/* <SearchProvider>
                <Search />
                <StationList />
            </SearchProvider> */}
            <Carousel />
            <Stack spacing={16} pb={48}>
                <StationBlock
                    heading="Popular Stations"
                    query={popularQuery}
                />
                <StationBlock
                    heading="Trending Stations"
                    query={trendingQuery}
                />
                <StationBlock
                    heading="Other Users Are Listening To"
                    query={activeQuery}
                />
            </Stack>
        </Box>
    )
}