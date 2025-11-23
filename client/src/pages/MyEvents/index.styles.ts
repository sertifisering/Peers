import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const MyEventsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const SectionBox = styled(Paper)(({ theme }) => ({
  padding: "24px",
  borderRadius: "12px",
}));
