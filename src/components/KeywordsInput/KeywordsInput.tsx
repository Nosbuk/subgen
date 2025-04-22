import {
  AppBar,
  Button,
  Chip,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSettings } from "../../hooks/useSettings";
import {
  SettingsContextReducerActionTypes,
  SettingsContextStateKeys,
} from "../../contexts/SettingsContext";

const KEYWORDS = "keywords";

export const KeywordsInput = () => {
  const { settingsState, dispatchSettings } = useSettings();

  const addKeywords = (formData: FormData) => {
    const keywords = formData.get(KEYWORDS)?.toString().split(" ");

    if (!keywords) {
      return;
    }

    dispatchSettings({
      type: SettingsContextReducerActionTypes.ADD_KEYWORDS,
      payload: keywords,
    });
  };

  const getOnKeywordDelete = (keyword: string) => {
    return () => {
      dispatchSettings({
        type: SettingsContextReducerActionTypes.REMOVE_KEYWORD,
        payload: keyword,
      });
    };
  };

  const onGenerateClick = () => {
    dispatchSettings({
      type: SettingsContextReducerActionTypes.GENERATE_STRING,
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
        {settingsState[SettingsContextStateKeys.KEYWORDS].length > 0 ? (
          settingsState[SettingsContextStateKeys.KEYWORDS].map((keyword) => (
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
