import React, { createContext, useContext, useState } from "react"

import type { Station } from "radio-browser-api"

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]

type Context =  {
    data: State<Station[] | null>,
    isLoading: State<boolean>
} | null

const SearchContext = createContext<Context>(null)

interface Props {
    children?: React.ReactNode
}

export const SearchProvider = ({ children }: Props) => {

    const state = useState<Station[] | null>(null)

    const loading = useState(false)

    return (
        <SearchContext.Provider value={{
            data: state,
            isLoading: loading
        }}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => {
    const ctx = useContext(SearchContext)

    if (!ctx) {
        throw new Error("SearchContext not found")
    } 

    return ctx
}

export default useSearch