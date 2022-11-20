import styles from './FlatsList.module.css'
import {Button, Card, CardContent, CardActions, Typography, Box, CardMedia} from "@mui/material";
import {Flat} from "../../types/Flat";

export default function FlatsList({flats, onItemClick}: { flats: Flat[], onItemClick: (flatId:number)=>void }) {

    return <div className={styles.flatsList}>{flats.map(({
                                                             id,
                                                             floor,
                                                             price,
                                                             rooms,
                                                             area_total,
                                                             area_kitchen,
                                                             area_live,
                                                             layout_image
                                                         }: Flat) => (<Card key={id} style={{cursor: "pointer"}}>
        <CardMedia
            component="img"
            height="140"
            image={layout_image}
            alt="План квартиры"
            sx={{objectFit: "contain"}}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {price} ₽
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Этаж: {floor}<br/>
                Количество комнат: {rooms}<br/>
                Общая площадь: {area_total} м²<br/>
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => onItemClick?.(id)}>Подробнее</Button>
        </CardActions>
    </Card>))}</div>
}