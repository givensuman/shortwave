import { Center, Stack, useColorMode } from "@chakra-ui/react"
import { useQuery } from "react-query"

import Carousel from "../components/Carousel"
import StationBlock from "../components/StationBlock"

import useRadio from "../hooks/useRadio"

export default function Discover() {

    const radio = useRadio()

    const popularQuery = useQuery(['get popular'], async () => {
        return await radio.getStationsByVotes(20)
    })

    const trendingQuery = useQuery(['get trending'], async () => {
        return await radio.getStationsByClicks(20)
    })

    const activeQuery = useQuery(['get active'], async () => {
        return await radio.getStationsByRecentClicks(20)
    })

    const { toggleColorMode } = useColorMode()

    return (
        <Center
            w="full"
            flexDirection="column"
        >
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
        </Center>
    )
}