import { Container, CssBaseline, Grid } from "@mui/material";

import { HTML_ELEMENTS } from "../../constants/htmlElements";
import { MarkovContextProvider } from "../../contexts/MarkovContext";
import { SettingsForm } from "../SettingsForm/SettingsForm";
import { KeywordsInput } from "../KeywordsInput/KeywordsInput";
import { MarkovOutput } from "../MarkovOutput/MarkovOutput";

export const App = () => {
  return (
    <MarkovContextProvider>
      <CssBaseline />
      <Container component={HTML_ELEMENTS.MAIN} maxWidth={false}>
        <Grid container spacing={0}>
          <Grid size={9}>
            <MarkovOutput />
            <KeywordsInput />
          </Grid>
          <Grid size={3}>
            <SettingsForm />
          </Grid>
        </Grid>
      </Container>
    </MarkovContextProvider>
  );
};
