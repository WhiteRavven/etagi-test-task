import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import formatPrice from "../../utils/formatPrice";
import {Flat} from "../../types/Flat";


export default function FlatCard({
                                     flat,
                                     onCardClick,
                                     onShowClick,
                                     ...props
                                 }: { flat: Flat, onCardClick?: (event: any, flat: Flat) => void, onShowClick?: (event: any, flat: Flat) => void }) {
    return <Card onClick={(e) => onCardClick?.(e, flat)} {...props} style={{cursor: "pointer"}}>
        <CardMedia
            component="img"
            height="140"
            image={flat.layout_image}
            alt="План квартиры"
            sx={{objectFit: "contain"}}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {formatPrice(flat.price)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Этаж: {flat.floor}<br/>
                Количество комнат: {flat.rooms}<br/>
                Общая площадь: {flat.area_total} м²<br/>
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={(e) => onShowClick?.(e, flat)}>Подробнее</Button>
        </CardActions>
    </Card>
}