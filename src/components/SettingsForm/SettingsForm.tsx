import { Box, Stack, Typography } from "@mui/material";

import { PrngInput } from "../PrngInput/PrngInput";
import { SliderInput } from "../SliderInput/SliderInput";
import { MarkovContextReducerActionTypes } from "../../contexts/MarkovContext";

const stackSx = {
  padding: "10px 0",
  borderLeft: "1px gray solid",
  height: "calc(100vh - 153px)",
  overflow: "auto",
};

const boxSx = { padding: "20px 30px 10px 30px", borderTop: "1px gray solid" };

const titleSx = {
  margin: "20px 0 20px 30px",
};

export const SettingsForm = () => {
  return (
    <Stack direction="column" sx={stackSx}>
      <Typography variant="h5" component="h5" sx={titleSx}>
        Markov Settings
      </Typography>
      <Box sx={boxSx}>
        <SliderInput
          actionType={MarkovContextReducerActionTypes.SET_MAX_TRIES}
          title="Max Tries"
          min={1}
          max={1000}
        />
      </Box>
      <Box sx={boxSx}>
        <SliderInput
          actionType={MarkovContextReducerActionTypes.SET_AMOUNT}
          title="Results Amount"
          min={1}
          max={20}
        />
      </Box>
      <Box sx={boxSx}>
        <SliderInput
          actionType={MarkovContextReducerActionTypes.SET_STATE_SIZE}
          title="State Size"
          min={1}
          max={10}
        />
      </Box>
      <Box sx={boxSx}>
        <PrngInput />
      </Box>
    </Stack>
  );
};
