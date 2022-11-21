import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  NumericRange,
  NumericRangeSelect,
} from "../NumericRangeSelect/NumericRangeSelect";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DISPLAY_NAMES: any = {
  price: "Цена",
  rooms: "Количество комнат",
  area_total: "Общая площадь",
  area_live: "Жилая площадь",
  area_kitchen: "Площадь кухни",
  floor: "Этаж",
};

const FLATS_FILTERS_BASE = ["price", "rooms", "area_total"];

const FLATS_FILTERS_EXTRA = ["area_live", "area_kitchen", "floor"];

export interface FlatsFilter {
  [key: string]: NumericRange | undefined;

  price?: NumericRange;
  floor?: NumericRange;
  area_total?: NumericRange;
  area_live?: NumericRange;
  area_kitchen?: NumericRange;
}

const getFilterChipLabel = (field: string, value: NumericRange | undefined) => {
  return `${DISPLAY_NAMES[field]} ${value?.min ? `от ${value.min} ` : ""}${
    value?.max ? `до ${value.max}` : ""
  }`;
};

export default function FlatsFilterMenu({
  filter,
  onChange,
  onSubmit,
  onClear,
}: {
  filter: FlatsFilter;
  onChange: (filterName: string, value: NumericRange | null) => void;
  onSubmit: () => void;
  onClear: () => void;
}) {
  const [showExtraFilter, setShowExtraFilter] = useState<boolean>(false);

  const filterChangeHandler = (field: string, value: NumericRange) => {
    onChange(field, value?.min || value?.max ? value : null);
  };

  const filterClearHandler = () => {
    onClear();
  };

  const showExtraFilterHandler = () => {
    setShowExtraFilter((prevValue) => !prevValue);
  };

  const deleteFilterHandler = (field: string) => {
    onChange(field, null);
  };

  return (
    <>
      <Paper style={{ padding: 24 }}>
        <Box display="flex" flexDirection="column" gap="12px">
          <Box
            display="grid"
            gap="16px"
            gridTemplateColumns="repeat(auto-fit, 300px)"
          >
            {[
              ...FLATS_FILTERS_BASE,
              ...(showExtraFilter ? FLATS_FILTERS_EXTRA : []),
            ].map((field: string) => (
              <Box key={field}>
                <Box mb="4px">
                  <Typography variant="body1">
                    {DISPLAY_NAMES[field]}
                  </Typography>
                </Box>
                <NumericRangeSelect
                  key={field}
                  value={filter[field] ?? {}}
                  onChange={(value: any) => filterChangeHandler(field, value)}
                />
              </Box>
            ))}
          </Box>

          {Object.keys(filter).length > 0 ? (
            <Box display="flex" alignItems="center" gap="8px">
              {Object.keys(filter).map((key, index) => (
                <Chip
                  key={index}
                  label={getFilterChipLabel(key, filter[key])}
                  onDelete={() => deleteFilterHandler(key)}
                />
              ))}
              <IconButton onClick={filterClearHandler}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          ) : null}

          <Box>
            <Button variant="contained" onClick={onSubmit}>
              Применить
            </Button>
            <Button
              style={{ marginRight: "16px" }}
              variant="text"
              onClick={showExtraFilterHandler}
            >
              Дополнительные фильтры
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
