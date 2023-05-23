import React, { createContext, useContext, useState } from "react"
import type { Station } from 'radio-browser-api'

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]

type Context =  {
    isPlaying: State<boolean>,
    currentStation: State<Station | null>,
    isHidden: State<boolean>
} | null

const PlayerContext = createContext<Context>(null)

interface Props {
    children?: React.ReactNode
}

export const PlayerProvider = ({ children }: Props) => {

    const isPlaying = useState(false)
    const currentStation = useState<Station | null>(null)
    const isHidden = useState(false)

    return (
        <PlayerContext.Provider value={{
            isPlaying,
            currentStation,
            isHidden
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const usePlayer = () => {
    const ctx = useContext(PlayerContext)

    if (!ctx) {
        throw new Error("SearchContext not found")
    } 

    return ctx
}

export default usePlayer