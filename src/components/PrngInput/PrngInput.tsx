import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useSettings } from "../../hooks/useSettings";
import {
  PRNG,
  SettingsContextReducerActionTypes,
} from "../../contexts/SettingsContext";

export const PrngInput = () => {
  const { settingsState, dispatchSettings } = useSettings();

  const onChange = (event: SelectChangeEvent) => {
    const { value } = event.target;

    dispatchSettings({
      type: SettingsContextReducerActionTypes.SET_PRNG,
      payload: value,
    });
  };

  return (
    <>
      <Typography variant="body1">Pseudo Random Number Generator:</Typography>
      <Select value={settingsState.prng} onChange={onChange}>
        <MenuItem value={PRNG.MATH_RANDOM}>Math.random</MenuItem>
        <MenuItem value={PRNG.OTHER}>Other</MenuItem>
      </Select>
    </>
  );
};
