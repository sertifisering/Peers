import { Box, Typography, Paper, IconButton } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export const PollVotePreview = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Poll Voting
      </Typography>

      {[1, 2, 3].map((i) => (
        <Paper key={i} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Choice {i}</Typography>
            <IconButton color="primary">
              <HowToVoteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
