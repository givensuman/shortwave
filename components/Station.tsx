import { Card, CardBody, Divider, Heading, IconButton, Image, List, ListItem, Stack, Text } from "@chakra-ui/react"
import type { CardProps } from "@chakra-ui/react"
import { FaPlay } from "react-icons/fa"
import type { Station } from "radio-browser-api"

import useCountryCode from "@/hooks/useCountryCode"

import notfound from "@/assets/notfound.png"

interface Props extends CardProps {
    station: Station
}

const Station = ({
    station,
    ...props
}: Props) => {

    const hasFavicon = station.favicon.length > 0
    const flag = useCountryCode(station.countryCode)

    return (
        <Card 
            direction="row"
            alignItems="center"
            height={50}
            minH="fit-content"
            {...props}
        >
            <Image 
                objectFit="cover"
                maxW={50}
                h="100%"
                src={hasFavicon ? station.favicon : notfound.src}
                alt={station.name}
                fallbackSrc={notfound.src}
            />
            <Divider orientation="vertical" />
            <Stack>
                <CardBody>
                    <Heading 
                        size="sm"
                        mb={2}
                    >
                        {station.name}
                    </Heading>
                    <Heading 
                        size="xs"
                        display="flex"
                        fontWeight="normal"
                    >
                        <Text mr={2}>
                            {flag}
                        </Text>
                        {station.tags.map(tag => (
                            tag.split(" ")
                                .map(subTag => (
                                    subTag.slice(0, 1).toUpperCase() + subTag.slice(1, tag.length)
                                ))
                                .join(" ")
                        )).join(", ")}
                    </Heading>
                </CardBody>
            </Stack>
            <IconButton 
                aria-label={`Play ${station.name}`}
                icon={<FaPlay />}
                ml="auto"
                mr={2}
            />
        </Card>
    )
}

export default Station