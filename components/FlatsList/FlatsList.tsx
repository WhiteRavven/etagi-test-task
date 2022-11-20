import styles from './FlatsList.module.css'
import {Button, Card, CardContent, CardActions, Typography, Box, CardMedia} from "@mui/material";
import {Flat} from "../../types/Flat";
import formatPrice from "../../utils/formatPrice";
import FlatCard from "../FlatCard/FlatCard";

export default function FlatsList({flats, onItemClick}: { flats: Flat[], onItemClick: (flatId: number) => void }) {
    return <div className={styles.flatsList}>
        {flats.map((flat: Flat) => <FlatCard onClick={onItemClick} key={flat.id} flat={flat}/>)}
    </div>
}