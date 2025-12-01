import { Box, Typography, Paper, Slider } from "@mui/material";

export const RankingSliderPreview = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Score Voting
      </Typography>

      {[1, 2, 3].map((i) => (
        <Paper key={i} elevation={1} sx={{ p: 0.5, mb: 0.5, borderRadius: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Athlete {i}
          </Typography>
          <Slider value={40} disabled />
        </Paper>
      ))}
    </Box>
  );
};
