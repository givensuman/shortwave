import { Box } from '@chakra-ui/react'

import useSearch from '@/src/hooks/useSearch'
import Station from './Station'

const StationList = () => {
    
    const { data: [ data ], isLoading: [ isLoading ] } = useSearch()

    if (isLoading) return (
        <h1>Loading...</h1>
    )

    return (
        <Box>
            {data?.map(station => (
                <Station key={station.id ?? station.name} station={station} />
            ))}
        </Box>
    )
}

export default StationList