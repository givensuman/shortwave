import type { NextApiRequest, NextApiResponse } from 'next'
import { useQuery, UseQueryOptions } from 'react-query'

import type { Station } from 'radio-browser-api'

import radio from "@/utils/radiobrowser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {const data = await radio.getStationsByRecentClicks(12)

  res.status(200).send(data)
}

export const getActive = (options?: UseQueryOptions<Station[]>) => {
  return useQuery<Station[]>("get active", async () => await fetch("/api/getActive", {
      method: "GET"
    }
  ).then(res => res.json()), options)
}