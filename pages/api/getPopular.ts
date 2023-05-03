import type { NextApiRequest, NextApiResponse } from 'next'
import { useQuery } from 'react-query'

import type { Station } from 'radio-browser-api'

import radio from "@/utils/radiobrowser"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {const data = await radio.getStationsByVotes(12)

  res.status(200).send(data)
}

export const getPopular = () => {
  return useQuery<Station[]>("get popular", async () => await fetch("/api/getPopular", {
      method: "GET"
    }
  ).then(res => res.json()))
}