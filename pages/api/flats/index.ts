import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {floor}: any = req.query;
    const flats = await prisma.flats.findMany({
        where: {
            floor: +floor
        }
    });
    return res.status(200).json(flats);
}
