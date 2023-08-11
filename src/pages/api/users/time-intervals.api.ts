import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const authOptions = buildNextAuthOptions(req, res)

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  const promises = intervals.map((interval) => {
    return prisma.userTimeInterval.create({
      data: {
        week_day: interval.weekDay,
        time_end_in_minutes: interval.endTimeInMinutes,
        time_start_in_minutes: interval.startTimeInMinutes,
        user_id: session.user?.id,
      },
    })
  })

  await prisma.$transaction(promises)

  return res.status(201).end()
}
