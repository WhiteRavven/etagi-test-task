import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {query: {id}} = req
    if (!id) {
        return res.status(500);
    }
    const flat = await prisma.flats.findUnique({
        where: {id: +id}
    });
    return res.status(200).json(flat);
}