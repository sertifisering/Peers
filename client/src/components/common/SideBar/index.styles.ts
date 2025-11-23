import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const SidebarContainer = styled(Box)(({ }) => ({
  width: "100%",
  height: "100%",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
}));

export const Logo = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "32px",
});
