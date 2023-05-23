import React, { useMemo } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, UseDisclosureProps, Image, Stack, Heading, Link, HStack, Button, Table as Table_, Tbody, Tr, Td, TableContainer, TableContainerProps, TableRowProps, Text, Divider, useColorModeValue, Icon } from '@chakra-ui/react'
import type { Station } from "radio-browser-api"
import { Browsers } from 'phosphor-react'

import capitalizeStrings from '../utils/capitalizeStrings';

interface Props extends UseDisclosureProps {
    station: Station,
}

const Modal_ = ({
    station,
    isOpen = false,
    onClose = () => null,
    ...props
}: Props) => {

    const stationUrl = useMemo(() => {
        let url
        try {
            url = new URL(station.homepage).hostname
        } catch {
            url = null
        }
        return url
    }, [station.homepage])

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            {...props}
        >
            <ModalOverlay />
            <ModalContent py={4}>
                <ModalCloseButton />
                <ModalBody>
                    <Stack 
                        spacing={4}
                        alignItems="center"
                    >
                        <Image 
                            src={station.favicon}
                            alt={station.name}
                            fallbackSrc={'/notfound.png'}
                            h={150}
                            rounded="md"
                        />
                        <Stack 
                            spacing={2}
                            alignItems="center"
                        >
                            <Heading size="lg">
                                {station.name}
                            </Heading>
                            <Link>
                                {station.homepage}
                            </Link>
                        </Stack>
                        <HStack>
                            <Button>
                                Play Station
                            </Button>
                            <Button>
                                Remove From Library
                            </Button>
                        </HStack>
                        <Table 
                            heading="Information"
                            showIf={!!(station.language || station.tags || station.votes)}
                        >
                            <Cell
                                label="Language"
                                data={capitalizeStrings(station.language)}
                            />
                            {station.tags.length > 0 && 
                                <Cell
                                    label="Tags"
                                    data={
                                        <Text noOfLines={1} maxW={250}>
                                            {capitalizeStrings(station.tags)}
                                        </Text>
                                    }
                                />
                            }
                            <Cell
                                label="Votes"
                                data={station.votes}
                            />
                        </Table>
                        <Table 
                            heading="Location"
                            showIf={!!(station.country || station.state)}
                        >
                            <Cell 
                                label="Country"
                                data={station.country}
                            />
                            <Cell 
                                label="State"
                                data={station.state}
                            />
                        </Table>
                        <Table 
                            heading="Audio"
                            showIf={!!(station.bitrate || station.codec || station.urlResolved)}
                        >
                            <Cell
                                label="Bitrate"
                                data={station.bitrate}
                            />
                            <Cell 
                                label="Codec"
                                data={station.codec}
                            />
                            <Cell
                                label="Stream"
                                data={
                                    <Button 
                                        as={Link}
                                        href={station.urlResolved}
                                    >
                                        <Icon 
                                            as={Browsers}
                                            mr={1}
                                        />
                                        Visit
                                    </Button>
                                }
                            />
                        </Table>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

interface TableProps extends TableContainerProps {
    heading?: string,
    showIf?: boolean,
}

const Table: React.FC<TableProps> = ({ 
    heading,
    showIf,
    children,
    ...props 
}) => {
    if (showIf) {
        return (
            <Stack
                alignItems="flex-start"
                overflow="hidden"
                flexGrow={1}
            >
                <Heading size="sm">
                    {heading}
                </Heading>
                <TableContainer 
                    shadow="md"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                >
                <Table_ 
                    width={350}
                    {...props}
                >
                    <Tbody>
                        {children}
                    </Tbody>
                </Table_>
                </TableContainer>
                <Divider my={4} />
            </Stack> 
         )
    } else {
        return null
    }
}

interface CellProps extends TableRowProps {
    label: React.ReactNode,
    data?: React.ReactNode
}

const Cell: React.FC<CellProps> = ({
    label,
    data,
    children,
    ...props
}) => {

    const textColor = useColorModeValue('gray.600', 'gray.400')

    if (data) {
        return (
            <Tr {...props}>
                <Td>{label}</Td>
                <Td 
                    color={textColor}
                    isNumeric
                >
                    {data}
                </Td>
                {children}
            </Tr>
        )
    } else {
        return null
    }
}

export default Modal_