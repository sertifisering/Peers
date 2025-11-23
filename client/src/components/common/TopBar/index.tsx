import { Avatar, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { TopBarContainer, UserBox } from "./index.styles";

const TopBar = ({ hideOnMobile = false }: { hideOnMobile?: boolean }) => {
  return (
    <TopBarContainer hideOnMobile={true}>
      <IconButton>
        <NotificationsIcon />
      </IconButton>

      <UserBox>
        <Avatar sx={{ bgcolor: "#333" }}>U</Avatar>
      </UserBox>
    </TopBarContainer>
  );
};

export default TopBar;
