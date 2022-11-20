import {useRouter} from 'next/router'
import {Flat} from "../../types/Flat";
import FlatInfo from "../../components/FlatInfo/FlatInfo";

export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/flats')
    const flats = await res.json()

    return {
        paths: flats.map((flat: Flat) => ({params: {id: flat.id.toString()}})),
        fallback: true,
    }
}

export async function getStaticProps(context:any) {
    const {params: {id}} = context;
    const res = await fetch(`http://localhost:3000/api/flats/${id}`)
    const flat = await res.json()

    return {
        props: {flat},
    }
}

export default function FlatPage({flat}: { flat: Flat }) {
    const router = useRouter()
    const id = router.query.id as string

    return (
        <FlatInfo flat={flat} />
    )
}