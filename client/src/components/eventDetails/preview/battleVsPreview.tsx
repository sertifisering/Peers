import { Box, Typography, Paper } from "@mui/material";

export const BattleVsPreview = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Battle Match
      </Typography>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
          <Paper sx={{ width: 70, height: 70, borderRadius: 2 }} />
          <Typography variant="h5" fontWeight={700}>
            VS
          </Typography>
          <Paper sx={{ width: 70, height: 70, borderRadius: 2 }} />
        </Box>
      </Paper>
    </Box>
  );
};
