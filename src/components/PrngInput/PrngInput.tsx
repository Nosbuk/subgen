import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useMarkov } from "../../hooks/useSetting";
import {
  PRNG,
  MarkovContextReducerActionTypes,
} from "../../contexts/MarkovContext";

export const PrngInput = () => {
  const { markovState, dispatchMarkov } = useMarkov();

  const onChange = (event: SelectChangeEvent) => {
    const { value } = event.target;

    dispatchMarkov({
      type: MarkovContextReducerActionTypes.SET_PRNG,
      payload: value,
    });
  };

  return (
    <>
      <Typography variant="body1">Pseudo Random Number Generator:</Typography>
      <Select value={markovState.prng} onChange={onChange}>
        <MenuItem value={PRNG.MATH_RANDOM}>Math.random</MenuItem>
        <MenuItem value={PRNG.OTHER}>Other</MenuItem>
      </Select>
    </>
  );
};
