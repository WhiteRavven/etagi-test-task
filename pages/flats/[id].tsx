import {useRouter} from 'next/router'
import {Flat} from "../../types/Flat";
import FlatInfo from "../../components/FlatInfo/FlatInfo";
import prisma from "../../lib/prisma";

export async function getStaticPaths() {
    const flats = await prisma.flats.findMany();

    return {
        paths: flats.map((flat: any) => ({params: {id: flat.id.toString()}})),
        fallback: false,
    }
}

export async function getStaticProps(context:any) {
    const {params: {id}} = context;
    const flat = await prisma.flats.findUnique({
        where: {id: +id}
    });

    return {
        props: {flat},
    }
}

export default function FlatPage({flat}: { flat: Flat }) {
    return (
        <FlatInfo flat={flat} />
    )
}