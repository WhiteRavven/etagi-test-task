import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const flats = await prisma.flats.findMany();
    return res.status(200).json(flats);
}
