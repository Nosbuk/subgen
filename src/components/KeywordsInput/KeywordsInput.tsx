import {
  AppBar,
  Button,
  Chip,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMarkov } from "../../hooks/useMarkov";
import {
  MarkovContextReducerActionTypes,
  MarkovContextStateKeys,
} from "../../contexts/MarkovContext";

const KEYWORDS = "keywords";

export const KeywordsInput = () => {
  const { markovState, dispatchMarkov } = useMarkov();

  const addKeywords = (formData: FormData) => {
    const keywords = formData.get(KEYWORDS)?.toString().split(" ");

    if (!keywords) {
      return;
    }

    dispatchMarkov({
      type: MarkovContextReducerActionTypes.ADD_KEYWORDS,
      payload: keywords,
    });
  };

  const getOnKeywordDelete = (keyword: string) => {
    return () => {
      dispatchMarkov({
        type: MarkovContextReducerActionTypes.REMOVE_KEYWORD,
        payload: keyword,
      });
    };
  };

  const onGenerateClick = () => {
    dispatchMarkov({
      type: MarkovContextReducerActionTypes.GENERATE_RESULT,
      payload: undefined,
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderTop: "1px gray solid",
      }}
    >
      // TODO: Maybe there is better MUI way to handle the form
      <form action={addKeywords}>
        <Toolbar sx={{ gap: "15px" }}>
          <TextField
            autoComplete="off"
            label="Keywords"
            variant="outlined"
            fullWidth
            name={KEYWORDS}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ height: "100%" }}
            type="submit"
          >
            Add
          </Button>
        </Toolbar>
      </form>
      <Toolbar sx={{ gap: "5px" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: "100%", marginRight: "20px" }}
          onClick={onGenerateClick}
        >
          Generate
        </Button>
        {markovState[MarkovContextStateKeys.KEYWORDS].length > 0 ? (
          markovState[MarkovContextStateKeys.KEYWORDS].map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              onDelete={getOnKeywordDelete(keyword)}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "black" }}>
            Add keywords above...
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
