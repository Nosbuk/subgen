import { Slider, SliderProps, Typography } from "@mui/material";

import { useSettings } from "../../hooks/useSettings";
import { SettingsContextReducerActionTypes } from "../../contexts/SettingsContext";

const sliderDefaultProps: SliderProps = {
  min: 1,
  max: 10,
  step: 1,
  size: "small",
};

export const MaxTriesInput = () => {
  const { settingsState, dispatchSettings } = useSettings();

  const onChange = (_: Event, value: number | number[]) => {
    const stateSize = Array.isArray(value) ? value[0] : value;

    dispatchSettings({
      type: SettingsContextReducerActionTypes.SET_STATE_SIZE,
      payload: Number(stateSize),
    });
  };

  return (
    <>
      <Typography variant="body1">State Size:</Typography>
      <Slider
        {...sliderDefaultProps}
        value={settingsState.stateSize}
        onChange={onChange}
      />
    </>
  );
};
