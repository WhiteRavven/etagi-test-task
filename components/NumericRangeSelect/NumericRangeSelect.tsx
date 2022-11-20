import {Box, TextField, Typography} from "@mui/material";

export interface NumericRange {
    min?: number,
    max?: number,
};

interface NumericRangeSelectProps {
    value: NumericRange,
    onChange: (value: NumericRange) => void
    title?: string,
}

export const NumericRangeSelect = ({value, onChange}: NumericRangeSelectProps) => {

    const filterChangeHandler = (name: 'min' | 'max', changedValue: string) => {
        let newValue = {
            ...value,
        };
        if (changedValue.length > 0) {
            newValue[name] = +changedValue;
        }
        else {
            delete newValue[name];
        }

        onChange(newValue);
    }

    return <Box>
        <Box display="flex" columnGap={1}>
            <TextField style={{maxWidth: 150}} size="small" placeholder="От" value={value.min ?? ''}
                       onChange={(e) => filterChangeHandler('min', e.target.value)}/>
            <TextField style={{maxWidth: 150}} size="small" placeholder="До" value={value.max ?? ''}
                       onChange={(e) => filterChangeHandler('max', e.target.value)}/>
        </Box>
    </Box>
}