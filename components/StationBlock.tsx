import React from 'react'
import { Stack, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react'
import type { StackProps } from '@chakra-ui/react'
import type { Station as StationType } from 'radio-browser-api'
import type { UseQueryResult } from 'react-query'
import Station from './Station'

interface Props extends StackProps {
    heading: string,
    query: UseQueryResult<StationType[], unknown>
}

const StationBlock = ({ heading, query, ...props }: Props) => {

    const { data, isLoading, isError } = query

    return (
        <Stack px={3} {...props}>
            <Heading fontSize="xl" mb={2}>
                {heading}
            </Heading>
            <SimpleGrid columns={2} spacing={4}>
                {data?.map((item, index) => (
                    <Skeleton
                        key={item.id ?? index}
                        isLoaded={!isLoading}
                    >
                        <Station station={item} />
                    </Skeleton>
                ))}
            </SimpleGrid>
        </Stack>
    )
}

export default StationBlock