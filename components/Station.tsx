import { Card, CardBody, Divider, Heading, IconButton, Image, List, ListItem, Stack, Text, useDisclosure, useColorModeValue } from "@chakra-ui/react"
import type { CardProps } from "@chakra-ui/react"
import { FaPlay } from "react-icons/fa"
import type { Station } from "radio-browser-api"

import notfound from "@/assets/notfound.png"
import Link from '@/components/Link'
import Modal from '@/components/Modal'
import displayTags from "@/utils/capitalizeStrings"

interface Props extends CardProps {
    station: Station
}

const Station = ({
    station,
    ...props
}: Props) => {

    const { onOpen, ...disclosureProps } = useDisclosure()

    const borderColor = useColorModeValue('gray.200', 'gray.700')

    return (
        <>
            <Card 
                direction="row"
                alignItems="center"
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
                    objectFit="cover"
                    w={50}
                    h="100%"
                    src={station.favicon}
                    alt={station.name}
                    fallbackSrc={notfound.src}
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
                <Link 
                    href={`/${station.id}`} 
                    ml="auto" 
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <IconButton 
                        aria-label={`Play ${station.name}`}
                        icon={<FaPlay />}
                        ml="auto"
                        mr={2}
                    />
                </Link>
            </Card>
            <Modal 
                station={station}
                {...disclosureProps}            
            />
        </>
    )
}

export default Station