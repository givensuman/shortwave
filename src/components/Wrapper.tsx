import React from 'react'
import { Center, CenterProps } from '@chakra-ui/react'

const Wrapper: React.FC<CenterProps> = ({ children, ...props }) => {
    return (
        <Center
            maxWidth="4xl"
            width="100vw"
            mx="auto"
            {...props}
        >
            {children}
        </Center>
    )
}

export default Wrapper