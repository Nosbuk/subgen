import { Divider, Stack, Typography } from "@mui/material";

import { PrngInput } from "../PrngInput/PrngInput";
import { SliderInput } from "../SliderInput/SliderInput";
import { MarkovContextReducerActionTypes } from "../../contexts/MarkovContext";

const stackSx = {
  padding: "10px 20px",
  borderLeft: "1px gray solid",
  height: "100vh",
  overflow: "auto",
};

const dividerSx = { margin: "20px 0" };

export const SettingsForm = () => {
  return (
    <Stack direction="column" sx={stackSx}>
      <Typography variant="h5" component="h5">
        Markov Settings
      </Typography>
      <Divider sx={dividerSx} />
      <SliderInput
        actionType={MarkovContextReducerActionTypes.SET_MAX_TRIES}
        title="Max Tries"
        min={1}
        max={1000}
      />
      <Divider sx={dividerSx} />
      <PrngInput />
      <Divider sx={dividerSx} />
      <SliderInput
        actionType={MarkovContextReducerActionTypes.SET_STATE_SIZE}
        title="State Size"
        min={1}
        max={10}
      />
    </Stack>
  );
};
