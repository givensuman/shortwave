import { Box, Heading, HStack, Image, Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {

    const { toggleColorMode } = useColorMode()

    return (
        <Box
            width="full"
            display="flex"
            alignItems="center"
        >
            <HStack spacing={3}>
                <Image
                    src="/logo.svg"
                    alt="Shortwave"
                    h={16}
                />
                <Heading
                    position="relative"
                    top={2}
                >
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