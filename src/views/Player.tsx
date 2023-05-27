import React, { useEffect, useState, useRef } from 'react'
import { HStack, Card, Heading, Image, IconButton, Box, Popover, PopoverTrigger, PopoverArrow, PopoverContent, PopoverCloseButton, PopoverBody, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import usePlayer from '../hooks/usePlayer'
import { Pause, Play, SpeakerSimpleHigh, SpeakerSimpleNone, SpeakerSimpleLow } from 'phosphor-react';

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

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }

    const iconProps = { weight: "fill", size: 25 } as const

    const [ SpeakerIcon, setSpeakerIcon ] = useState(<SpeakerSimpleHigh {...iconProps} />)

    const [ volume, setVolume ] = useState(1)

    useEffect(() => {
        if (volume === 0) {
            setSpeakerIcon(<SpeakerSimpleNone {...iconProps} />)
        } else if (volume < 0.51) {
            setSpeakerIcon(<SpeakerSimpleLow {...iconProps} />)
        } else {
            setSpeakerIcon(<SpeakerSimpleHigh {...iconProps} />)
        }
    }, [volume])

    const changeVolume = (val: number) => {
        if (audioRef.current) {
            audioRef.current.volume = val
        }
        setVolume(val)
    }

    const [ isPaused, setIsPaused ] = useState(true)

    const borderColor = useColorModeValue("gray.400", "gray.600")

    return (
        <AnimatePresence>
            {station && <>
                <Box 
                    bgColor="transparent"
                    position="fixed"
                    bottom={0}
                    width="100vw"
                    h={20}
                    backdropFilter="auto"
                    backdropBlur="sm"
                />
                <Card
                    position="fixed"
                    bottom={4}
                    w="full"
                    maxW="inherit"
                    h={16}
                    rounded="lg"
                    shadow="2xl"
                    border="1px"
                    borderColor={borderColor}
                    p={4}
                    justifyContent="center"
                    as={motion.div}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
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
                            <PopoverContent
                                maxW={10}
                                display="flex"
                                alignItems="center"
                                p={4}
                            >
                                <PopoverBody h={40}>
                                    <Slider
                                        aria-label="Volume"
                                        defaultValue={1}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        orientation="vertical"
                                        onChange={changeVolume}
                                    >
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb 
                                            shadow="sm"
                                            border="1px"
                                            height={5}
                                            width={5}
                                        />
                                    </Slider>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                    </HStack>
                </Card>
            </>
            }
        </AnimatePresence>
    )
}

export default Player