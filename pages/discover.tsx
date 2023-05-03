import Search from "@/components/Search"
import StationList from "@/components/StationList"
import { SearchProvider } from "@/hooks/useSearch"
import { Box, Center, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react"

import Carousel from "@/components/Carousel"
import { getTrending } from "./api/getTrending"
import { useEffect } from "react"
import Station from "@/components/Station"

export default function Discover() {

    const { data } = getTrending()

    console.log(data)

    return (
        <Box> 
            {/* <SearchProvider>
                <Search />
                <StationList />
            </SearchProvider> */}
            <Carousel />
            <Stack>
                <Stack px={3}>
                    <Heading fontSize="xl">
                        Trending Stations
                    </Heading>
                    <SimpleGrid columns={2}>
                        {data && data.map((item, index) => (
                            <Station key={index} station={item} />
                        ))}
                    </SimpleGrid>
                </Stack>
            </Stack>
        </Box>
    )
}