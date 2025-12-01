import { Box, Typography, Paper, Rating } from "@mui/material";

export const RankingStarPreview = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Star Rating
      </Typography>

      {[1, 2, 3].map((i) => (
        <Paper key={i} elevation={1} sx={{ p: 1.5, mb: 1.5, borderRadius: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Athlete {i}
          </Typography>
          <Rating value={4} readOnly color="primary" />
        </Paper>
      ))}
    </Box>
  );
};
