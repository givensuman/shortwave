import { Card, CardBody, Divider, Heading, IconButton, Image, List, ListItem, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import type { CardProps } from "@chakra-ui/react"
import { FaPlay } from "react-icons/fa"
import type { Station } from "radio-browser-api"

import useCountryCode from "@/hooks/useCountryCode"

import notfound from "@/assets/notfound.png"
import Link from '@/components/Link'

interface Props extends CardProps {
    station: Station
}

const Station = ({
    station,
    ...props
}: Props) => {

    const hasFavicon = station.favicon.length > 0
    const flag = useCountryCode(station.countryCode)

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Card 
                direction="row"
                alignItems="center"
                height={50}
                minH="fit-content"
                border="1px"
                borderColor="gray.100"
                rounded="md"
                cursor="pointer"
                onClick={onOpen}
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
                <Link href={`/${station.id}`} ml="auto" >
                    <IconButton 
                        aria-label={`Play ${station.name}`}
                        icon={<FaPlay />}
                        ml="auto"
                        mr={2}
                    />
                </Link>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        {station.name}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Station