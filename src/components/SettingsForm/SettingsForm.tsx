import { Divider, Stack, Typography } from "@mui/material";

import { PrngInput } from "../PrngInput/PrngInput";
import { SliderInput } from "../SliderInput/SliderInput";
import { SettingsContextReducerActionTypes } from "../../contexts/SettingsContext";

const stackSx = {
  padding: "10px 20px",
  borderLeft: "1px gray solid",
  height: "100vh",
};

const dividerSx = { margin: "20px 0" };

export const SettingsForm = () => {
  return (
    <Stack direction="column" sx={stackSx}>
      <Typography variant="h5" component="h5">
        Settings
      </Typography>
      <Divider sx={dividerSx} />
      <SliderInput
        actionType={SettingsContextReducerActionTypes.SET_MAX_TRIES}
        title="Max Tries"
        min={1}
        max={1000}
      />
      <Divider sx={dividerSx} />
      <PrngInput />
      <Divider sx={dividerSx} />
      <SliderInput
        actionType={SettingsContextReducerActionTypes.SET_STATE_SIZE}
        title="State Size"
        min={1}
        max={10}
      />
    </Stack>
  );
};
