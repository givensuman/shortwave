import React, { useEffect, useMemo } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface Props {
    src: string
}

const Waveform = ({ src }: Props) => {

    const wavesurfer = useMemo(() => {
        return WaveSurfer.create({
            container: '#waveform'
        })
    }, [])

    useEffect(() => {
        wavesurfer.load(src)
        wavesurfer.on('ready', () => {
            wavesurfer.play()
        })
    }, [wavesurfer, src])

    return (
        <div id="waveform" />
    )
}

export default Waveform