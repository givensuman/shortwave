import React from 'react'
import { Avatar, Box, Card, Heading, Image } from '@chakra-ui/react'

import usePlayer from '../hooks/usePlayer'

const Player = () => {

    const { currentStation: [ station ] } = usePlayer()

    if (station) {
        return (
            <Card
                position="fixed"
                bottom={4}
                w="full"
                maxW="inherit"
                h={16}
                rounded="lg"
                shadow="2xl"
                bgColor="gray.300"
                p={4}
            >
                <Image
                    src={station.favicon}
                    fallbackSrc="/notfound.png"
                    w={12}
                    rounded="full"
                />
                <Heading>
                    {station.name}
                </Heading>
            </Card>
        )
    }

    return null
}

export default Player