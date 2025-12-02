import { Box, Typography, Paper, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export const RankingLikePreview = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Like / Dislike
      </Typography>

      {[1, 2, 3].map((i) => (
        <Paper key={i} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Athlete {i}</Typography>

            <Box>
              <IconButton color="success">
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="error">
                <ThumbDownIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
