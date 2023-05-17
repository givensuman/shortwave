import React, { useState, useRef } from 'react'
import { Box, Button, Center, Icon, Heading, Stack, IconButton, useColorModeValue, HStack } from '@chakra-ui/react'
import type { StackProps, BackgroundProps } from '@chakra-ui/react'
import { Plus, Browser, CaretLeft, CaretRight } from 'phosphor-react'
import { AnimatePresence, motion } from 'framer-motion'

const motionConfig = {
    initial: { x: -500 },
    animate: { x: 0 }
}

const Carousel: React.FC<StackProps> = (props) => {

    const maxIndex = 2
    const [ currentIndex, setCurrentIndex ] = useState(0) 

    const incrementIndex = () => {
        if (currentIndex < maxIndex) {
          setCurrentIndex(state => state + 1)
        } else {
          setCurrentIndex(0)
        }
      }
      
      const decrementIndex = () => {
        if (currentIndex === 0) {
          setCurrentIndex(maxIndex)
        } else {
          setCurrentIndex(state => state - 1)
        }
      }

    const activeIndicatorColor = useColorModeValue('gray.700', 'gray.200')
    const inactiveIndicatorColor = useColorModeValue('gray.200', 'gray.700')

    const bgColor: BackgroundProps["bgColor"] = (["telegram.500", "yellow.300", "green.400"] as const)[currentIndex]
    const colorScheme = bgColor.slice(0, bgColor.length - 4)
    const textColor = (['white', 'black', 'white'] as const)[currentIndex]
    const innerHtml = ([
        <motion.div key={0} {...motionConfig}>
            <Heading color={textColor}>
                Browse over 30,000 stations
            </Heading>
        </motion.div>,
        <motion.div key={1} {...motionConfig}>
            <Stack 
                color={textColor}
                alignItems="center"
            >
                <Heading>
                    Is your favorite station missing?
                </Heading>
                <Button
                    colorScheme={colorScheme}
                    maxW="fit-content"
                    py={0}
                >
                    <Icon 
                        as={Plus}
                        position="relative"
                        bottom={0.5}
                        mr={2}
                        weight="bold"
                    />
                    Add New Station
                </Button>
            </Stack>
        </motion.div>,
        <motion.div key={2} {...motionConfig}>
            <Stack 
                color={textColor} 
                alignItems="center"
            >
                <Heading>
                    Powered by radio-browser.info
                </Heading>
                <Button 
                    colorScheme={colorScheme}
                    maxW="fit-content"
                    py={0}
                    onClick={() => window.open("https://www.radio-browser.info", '_blank')}
                >
                    <Icon
                        as={Browser}
                        position="relative"
                        bottom={0.5}
                        mr={2}
                        weight="bold"
                    />
                    Open Website
                </Button>
            </Stack>
        </motion.div>
    ] as const)[currentIndex]

    return (
        <Stack 
            spacing={4}
            my={8}
            alignItems="center"
            {...props}
        >
            <Center
                bgColor={bgColor}
                height={200}
                borderRadius={10}
                w="full"
                maxW="90vw"
                transitionDuration="200ms"
                transitionProperty="background-color"
                position="relative"
            >
            <IconButton
                icon={<CaretLeft weight="bold" fontSize="1.5em" />}
                onClick={decrementIndex}
                aria-label="Previous"
                variant="ghost"
                rounded="full"
                color={textColor}
                _hover={{
                    bgColor: 'whiteAlpha.200'
                }}
                position="absolute"
                top={75}
                left={2.5}
            />
            <IconButton
                icon={<CaretRight weight="bold" fontSize="1.5em" />}
                onClick={incrementIndex}
                aria-label="Next"
                variant="ghost"
                rounded="full"
                color={textColor}
                _hover={{
                    bgColor: `${textColor}Alpha.200`
                }}
                position="absolute"
                top={75}
                right={2.5}
            />
                <AnimatePresence>
                    {innerHtml}
                </AnimatePresence>
            </Center>
            <Center my={4}>
                <HStack spacing={2}>
                    {[...Array(maxIndex + 1)].map((_, index) => (
                        <Box 
                            key={index}
                            height={1}
                            width={10}
                            borderRadius="lg"
                            bgColor={index === currentIndex ? activeIndicatorColor : inactiveIndicatorColor}
                            transitionDuration="200ms"
                            cursor="pointer"
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </HStack>
            </Center>
        </Stack>
    )
}

export default Carousel