import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { SidebarContainer, Logo } from "./index.styles";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>Peers</Logo>

      <List>
        <ListItemButton>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="My Events" />
        </ListItemButton>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
