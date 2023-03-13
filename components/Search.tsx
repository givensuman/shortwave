import React, { useRef, useState, useEffect } from "react"
import { Input } from "@chakra-ui/react"
import type { InputProps } from "@chakra-ui/react"

import api from "@/utils/api"
import useSearch from "@/hooks/useSearch"

interface Props extends InputProps {}

const Search = ({ ...props }: Props) => {

    const delayRef = useRef<NodeJS.Timeout | null>(null)

    const [ input, setInput ] = useState<string | null>(null)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const { data, mutate, isLoading } = api.searchStations({
        name: input as string,
        limit: 50
    })

    useEffect(() => {
        if (input) {
            setIsLoading(true)
            delayRef.current = setTimeout(mutate, 2000)
        }

        return () => {
            if (delayRef.current) clearTimeout(delayRef.current)
        }
    }, [input])

    const { data: [ _, setSearch ], isLoading: [ __, setIsLoading] } = useSearch()

    useEffect(() => {
        if (data) setSearch(data)
    }, [data])

    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading])

    return (
        <Input 
            type="text"
            size="lg"
            placeholder="Search stations"
            onChange={handleInput}
            {...props}
        />
    )
}

export default Search