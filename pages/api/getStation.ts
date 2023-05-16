import type { NextApiRequest, NextApiResponse } from 'next'
import { useQuery, UseQueryOptions } from 'react-query'

import type { Station, AdvancedStationQuery } from 'radio-browser-api'

import radio from "@/utils/radiobrowser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) 

  console.log(body)

  const [ data ] = await radio.getStationsById([ body as string ])

  res.status(200).send(data)
}

export const getStation = (id: string, options?: UseQueryOptions<Station>) => {
  return useQuery<Station>("get station", async () => await fetch("/api/getStation", {
      method: "POST",
      body: JSON.stringify(id)
    }
  ).then(res => res.json()), options)
}