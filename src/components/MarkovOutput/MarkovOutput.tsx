import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MarkovContextStateKeys } from "../../contexts/MarkovContext";
import { useMarkov } from "../../hooks/useSetting";
import { ContentCopy } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-toastify";

const boxSx = {
  borderTop: "1px gray solid",
  padding: "10px",
};

const stackSx = {
  height: "calc(100vh - 153px)",
  overflow: "auto",
};

const typographySx = { padding: "10px" };

export const MarkovOutput = () => {
  const { markovState } = useMarkov();

  const generatedResults = markovState[MarkovContextStateKeys.GENERATED_RESULT];
  const isGeneratedResultsNotEmpty = generatedResults?.length > 0;
  const errors = markovState[MarkovContextStateKeys.ERRORS];
  const errorsNotEmpty = errors.length > 0;

  useEffect(() => {
    if (errorsNotEmpty) {
      toast.error("Error generating results", {
        position: "top-center",
      });
    }
  }, [errors]);

  const onCopy = () => {
    navigator.clipboard.writeText(generatedResults[0].string);
  };
  return (
    <Stack sx={stackSx}>
      {isGeneratedResultsNotEmpty ? (
        generatedResults.map((result) => (
          <Box sx={boxSx} key={result.string}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{result.string}</Typography>
              <IconButton onClick={onCopy} color="primary">
                <ContentCopy />
              </IconButton>
            </Stack>
          </Box>
        ))
      ) : (
        <>
          <Typography variant="h5" component="h5" sx={typographySx}>
            Welcome to subgen.
          </Typography>
          <Typography variant="h6" component="h6" sx={typographySx}>
            Add keywords, tweak settings and click GENERATE to get subject
            lines.
          </Typography>
        </>
      )}
    </Stack>
  );
};
