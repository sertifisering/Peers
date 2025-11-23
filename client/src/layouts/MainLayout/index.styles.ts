import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const LayoutContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  minHeight: "100vh",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));


/* Desktop Sidebar */
export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  borderRight: "1px solid #e5e5e5",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

/* Main Content Wrapper */
export const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 48px)",
  overflow: "auto",
  padding: "24px",

  [theme.breakpoints.down("md")]: {
    padding: "16px",
  },
}));

/* Mobile Top Bar */
export const MobileTopBar = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #eee",

  [theme.breakpoints.down("md")]: {
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
}));
