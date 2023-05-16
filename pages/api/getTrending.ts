import type { NextApiRequest, NextApiResponse } from 'next'
import { useQuery, UseQueryOptions } from 'react-query'

import type { Station } from 'radio-browser-api'

import radio from "@/utils/radiobrowser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {const data = await radio.getStationsByClicks(12)

  res.status(200).send(data)
}

export const getTrending = (options?: UseQueryOptions<Station[]>) => {
  return useQuery<Station[]>("get trending", async () => await fetch("/api/getTrending", {
      method: "GET"
    }
  ).then(res => res.json()), options)
}