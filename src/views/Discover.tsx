import { Center, Stack } from "@chakra-ui/react"
import { useQuery } from "react-query"

import Carousel from "../components/Carousel"
import StationBlock from "../components/StationBlock"

import useRadio from "../hooks/useRadio"

export default function Discover() {

    const radio = useRadio()

    const popularQuery = useQuery(['get popular'], async () => {
        return await radio.getStationsByVotes(10)
    })

    const trendingQuery = useQuery(['get trending'], async () => {
        return await radio.getStationsByClicks(10)
    })

    const activeQuery = useQuery(['get active'], async () => {
        return await radio.getStationsByRecentClicks(10)
    })

    return (
        <Center
            w="full"
            flexDirection="column"
        >
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