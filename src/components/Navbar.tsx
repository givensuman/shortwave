import { Box, Heading, HStack, Image, Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {

    const { toggleColorMode } = useColorMode()

    return (
        <Box
            width="full"
            display="flex"
            alignItems="center"
            mt={6}
        >
            <HStack spacing={3}>
                <Image
                    src="/logo.svg"
                    alt="Shortwave"
                    h={16}
                    position="relative"
                    bottom={2}
                />
                <Heading>
                    shortwave
                </Heading>
            </HStack>
            <HStack ml="auto">
                <Switch 
                    ml="auto"
                    onChange={toggleColorMode}
                />
            </HStack>
        </Box>
    )
}

export default Navbar