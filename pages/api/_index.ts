import type { NextApiRequest, NextApiResponse } from 'next'

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse
) {
    res.end()
}