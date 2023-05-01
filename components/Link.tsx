import React from 'react'
import Link_ from 'next/link'
import type { Url } from 'next/dist/shared/lib/router/router'
import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
    href: Url
}

const Link: React.FC<Props> = ({ href, ...props }: Props) => {
    return (
        <Box {...props}>
            <Link_ href={href}>
                {props.children}
            </Link_>
        </Box>
    )
}

export default Link