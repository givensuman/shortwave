import React, { useEffect, useState, useRef } from 'react'
import { HStack, Card, Heading, Image, IconButton, Box, Popover, PopoverTrigger, PopoverArrow, PopoverContent, PopoverCloseButton, PopoverBody } from '@chakra-ui/react';

import usePlayer from '../hooks/usePlayer'
import { Pause, Play, ArrowClockwise, SpeakerSimpleHigh, SpeakerSimpleNone, SpeakerSimpleLow } from 'phosphor-react';

const Player = () => {

    const { currentStation: [ station ] } = usePlayer()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play()
                console.log(audioRef.current.volume)
            } else {
                audioRef.current.pause()
            }
        }
    }

    const iconProps = { weight: "fill", size: 25 } as const

    const [ SpeakerIcon, setSpeakerIcon ] = useState(<SpeakerSimpleHigh {...iconProps} />)
    useEffect(() => {
        if (audioRef.current) {
            if (audioRef.current.volume === 0) {
                setSpeakerIcon(<SpeakerSimpleNone {...iconProps} />)
            } else if (audioRef.current.volume < 0.51) {
                setSpeakerIcon(<SpeakerSimpleLow {...iconProps} />)
            } else {
                setSpeakerIcon(<SpeakerSimpleHigh {...iconProps} />)
            }
        }
    }, [audioRef])

    const [ isPaused, setIsPaused ] = useState(true)

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
                border="1px"
                borderColor="gray.400"
                p={4}
                justifyContent="center"
            >
                <HStack
                    spacing={4}
                    position="relative"
                >
                    <Image
                        src={station.favicon}
                        alt={station.name}
                        fallbackSrc="/notfound.png"
                        h={12}
                        w={12}
                        objectFit="cover"
                        rounded="full"
                    />
                    <Heading size="md">
                        {station.name}
                    </Heading>
                <audio 
                    src={station.urlResolved}
                    ref={audioRef}
                    onPlay={() => setIsPaused(false)}
                    onPause={() => setIsPaused(true)}
                    autoPlay
                />
                <Box
                    position="absolute"
                    right={0}
                >
                    <IconButton 
                        icon={isPaused
                            ? <Play {...iconProps} /> 
                            : <Pause {...iconProps} />
                        }
                        aria-label="Play"
                        variant="ghost"
                        onClick={toggleAudio}
                    />
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                icon={SpeakerIcon}
                                aria-label="Volume"
                                variant="ghost"
                                onClick={() => null}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                Hello World
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
                </HStack>
            </Card>
        )
    }

    return null
}

export default Player