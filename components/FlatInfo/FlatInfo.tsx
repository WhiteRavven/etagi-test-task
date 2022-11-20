import {Flat} from "../../types/Flat";
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";
import Image from "next/image";
import {useState} from "react";
import TabPanel from "../TabPanel/TabPanel";
import FloorLayoutViewer from "../FloorLayoutViewer/FloorLayoutViewer";
import formatPrice from "../../utils/formatPrice";

const FlatSummary = ({title, value}: { title: string, value: string }) => {
    return <Box>
        <Typography variant="h5">{value}</Typography>
        <Typography color="text.secondary" variant="body1">{title}</Typography>
    </Box>
}

export default function FlatInfo({flat}: { flat: Flat }) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <Paper>
        <Box padding="24px" display="flex" flexDirection="column" gap="24px">
            <Typography variant="h5">{`${flat.rooms}-комнатная квартира, ${flat.area_total} м²`}</Typography>
            <Box width="100%">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Планировка квартиры"/>
                    <Tab label="План этажа"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box position="relative" width={300} height={500} margin="0 auto">
                        <Image src={flat.layout_image}
                               fill
                               style={{objectFit: "contain"}}
                               alt="flat layout"/>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box position="relative" width={500} height={500} margin="0 auto">
                        <FloorLayoutViewer floor={flat.floor}/>
                    </Box>
                </TabPanel>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="20px">
                <FlatSummary title="Цена" value={formatPrice(flat.price)}/>
                <FlatSummary title="Общая" value={`${flat.area_total} м²`}/>
                <FlatSummary title="Кухня" value={`${flat.area_kitchen} м²`}/>
                <FlatSummary title="Этаж" value={`${flat.floor} из 4`}/>
            </Box>
        </Box>
    </Paper>
}