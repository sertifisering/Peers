import { Paper, Box } from "@mui/material";

export const PreviewFrame = ({ children }: any) => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Paper
        elevation={4}
        sx={{
          width: 360,
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "#fafafa",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box p={3}>{children}</Box>
      </Paper>
    </Box>
  );
};
