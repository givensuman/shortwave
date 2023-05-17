import React from 'react'
import { useRouter } from 'next/router'
import api from '@/utils/api'

export default function Id() {

    const { query: { id } } = useRouter()

    const { data: station, isLoading, isError } = api.getStation(id as string, {
        enabled: !!id
    })

    if (station) return (
        <div>
            {station.name}
            <audio src={station.urlResolved} controls />
        </div>
    )
}