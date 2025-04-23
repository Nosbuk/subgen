import { Slider, SliderProps, Typography } from "@mui/material";

import { useMarkov } from "../../hooks/useSetting";
import { MarkovContextReducerActionTypes } from "../../contexts/MarkovContext";

const sliderDefaultProps: SliderProps = {
  min: 1,
  max: 10,
  step: 1,
  size: "small",
};

export const MaxTriesInput = () => {
  const { markovState, dispatchMarkov } = useMarkov();

  const onChange = (_: Event, value: number | number[]) => {
    const stateSize = Array.isArray(value) ? value[0] : value;

    dispatchMarkov({
      type: MarkovContextReducerActionTypes.SET_STATE_SIZE,
      payload: Number(stateSize),
    });
  };

  return (
    <>
      <Typography variant="body1">State Size:</Typography>
      <Slider
        {...sliderDefaultProps}
        value={markovState.stateSize}
        onChange={onChange}
      />
    </>
  );
};
