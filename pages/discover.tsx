import { Box, Stack, useColorMode } from "@chakra-ui/react"

import Carousel from "@/components/Carousel"
import api from "@/utils/api"
import StationBlock from "@/components/StationBlock"

export default function Discover() {

    const popularQuery = api.getPopular()
    const trendingQuery = api.getTrending()
    const activeQuery = api.getActive()

    const { toggleColorMode } = useColorMode()

    return (
        <Box>
            <button onClick={toggleColorMode}>toggle</button>
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