import {Box, Button, Typography} from "@mui/material";

export const RoomsFilter = () => {
    const options = ['1', '2', '3', '4+'];

    return <div>
        <Typography variant="body1">Комнатность:</Typography>
        <Box display="flex">
            {options.map((option, index) => <Button size="medium" key={index} variant="outlined">{option}</Button>)}
        </Box>
    </div>
}