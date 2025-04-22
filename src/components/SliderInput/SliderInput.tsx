import {
  Slider,
  SliderProps,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSettings } from "../../hooks/useSettings";
import { SettingsContextReducerActionTypes } from "../../contexts/SettingsContext";
import { ChangeEvent } from "react";

const sliderDefaultProps: SliderProps = {
  // TODO: move min max to props and validate
  step: 1,
  size: "small",
};

interface Props {
  actionType:
    | SettingsContextReducerActionTypes.SET_MAX_TRIES
    | SettingsContextReducerActionTypes.SET_STATE_SIZE;
  title: string;
  min: number;
  max: number;
}

export const SliderInput = ({ actionType, title, min, max }: Props) => {
  const { settingsState, dispatchSettings } = useSettings();

  const onSliderChange = (_: Event, value: number | number[]) => {
    const singleValue = Array.isArray(value) ? value[0] : value;

    dispatchSettings({
      type: actionType,
      payload: Number(singleValue),
    });
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberValue = Number(value);

    const isNumberValueNan = Number.isNaN(numberValue);
    const isNumberValueBetweenMinMax = min <= numberValue && numberValue <= max;

    if (isNumberValueNan || !isNumberValueBetweenMinMax) {
      return;
    }

    dispatchSettings({
      type: actionType,
      payload: numberValue,
    });
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{title}</Typography>
        <TextField
          id={actionType}
          variant="outlined"
          type="number"
          onChange={onFieldChange}
          value={settingsState[actionType]}
        />
      </Stack>
      <Slider
        {...sliderDefaultProps}
        min={min}
        max={max}
        value={Number(settingsState[actionType])}
        onChange={onSliderChange}
      />
    </>
  );
};
