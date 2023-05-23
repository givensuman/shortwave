import React, { createContext, useContext } from "react"
import { RadioBrowserApi } from "radio-browser-api"

const radio = new RadioBrowserApi("shortwave.given.rocks")

type Context = RadioBrowserApi | null

const RadioContext = createContext<Context>(null)

interface Props {
    children?: React.ReactNode
}

export const RadioProvider = ({ children }: Props) => {
    return (
        <RadioContext.Provider value={radio}>
            {children}
        </RadioContext.Provider>
    )
}

const useRadio = () => {
    const ctx = useContext(RadioContext)

    if (!ctx) {
        throw new Error("RadioContext not found")
    } 

    return ctx
}

export default useRadio