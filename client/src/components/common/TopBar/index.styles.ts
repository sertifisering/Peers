import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const TopBarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hideOnMobile",
})<{ hideOnMobile?: boolean }>(({ theme, hideOnMobile }) => ({
  height: 56,
  display: hideOnMobile ? "none" : "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 16px",
  backgroundColor: "#fff",

  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
});
