import type { NextApiRequest, NextApiResponse } from 'next'
import { useMutation } from 'react-query'

import type { Station, AdvancedStationQuery } from 'radio-browser-api'

import radio from "@/utils/radiobrowser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) 

  const data = await radio.searchStations(body as AdvancedStationQuery)

  res.status(200).send(data)
}

export const searchStations = (input: AdvancedStationQuery) => {
  return useMutation<Station[]>("search station", async () => await fetch("/api/searchStations", {
      method: "POST",
      body: JSON.stringify(input)
    }
  ).then(res => res.json()))
}