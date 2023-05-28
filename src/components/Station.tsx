import { Card, CardBody, Divider, Heading, IconButton, Image, Stack, useDisclosure, useColorModeValue } from "@chakra-ui/react"
import type { CardProps } from "@chakra-ui/react"
import type { Station } from "radio-browser-api"
import { Play } from 'phosphor-react'

import Modal from '../components/Modal'
import usePlayer from "../hooks/usePlayer"
import displayTags from "../utils/capitalizeStrings"

interface Props extends CardProps {
    station: Station
}

const Station = ({
    station,
    ...props
}: Props) => {

    const {
        currentStation: [, setCurrentStation],
        isPlaying: [, setIsPlaying]
    } = usePlayer()

    const { onOpen, ...disclosureProps } = useDisclosure()

    const borderColor = useColorModeValue('gray.200', 'gray.700')

    return (
        <>
            <Card 
                direction="row"
                alignItems="center"
                py={8}
                height={50}
                minH="fit-content"
                border="1px"
                borderColor={borderColor}
                overflow="hidden"
                shadow="md"
                rounded="md"
                cursor="pointer"
                onClick={() => {
                    onOpen()
                    console.log(station.name)
                }}
                {...props}
            >
                <Image
                    src={station.favicon}
                    fallbackSrc="/notfound.png"
                    alt={station.name}
                    h={75}
                    w={75}
                    objectFit="cover"
                />
                <Divider orientation="vertical" />
                <Stack>
                    <CardBody>
                        <Heading
                            size="sm"
                            mb={2}
                            noOfLines={1}
                        >
                            {station.name}
                        </Heading>
                        <Heading 
                            size="xs"
                            display="flex"
                            fontWeight="normal"
                            noOfLines={1}
                        >
                            {displayTags(station.tags)}
                        </Heading>
                    </CardBody>
                </Stack>
                <IconButton 
                    aria-label={`Play ${station.name}`}
                    icon={<Play weight="fill" />}
                    ml="auto"
                    mr={2}
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        setCurrentStation(station)
                    }}
                />
            </Card>
            <Modal 
                station={station}
                {...disclosureProps}            
            />
        </>
    )
}

export default Station