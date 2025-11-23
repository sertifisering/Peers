import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Drawer } from "@mui/material";

import { LayoutContainer, SidebarContainer, ContentContainer, MobileTopBar } from "./index.styles";
import Sidebar from "@components/common/SideBar";
import TopBar from "@components/common/TopBar";
import Chatbot from "@components/common/Chatbot";

const MainLayout = () => {
    // State
    const [open, setOpen] = useState(false);

    // Initialize
    useEffect(() => {
        console.log("MainLayout");
    }, []);

    // Handlers
    const onHandleOpenMenu = () => setOpen(true);
    const onHandleCloseMenu = () => setOpen(false);

    return (
        <LayoutContainer>
        {/* Desktop Sidebar */}
        <SidebarContainer>
            <Sidebar />
        </SidebarContainer>

        {/* Mobile Top Bar */}
        <MobileTopBar>
            <IconButton onClick={onHandleOpenMenu}>
            <MenuIcon />
            </IconButton>
            <TopBar />
        </MobileTopBar>

        {/* Main Content */}
        <ContentContainer>
            <TopBar hideOnMobile />
            <Outlet />
        </ContentContainer>

        {/* Mobile Drawer */}
            <Drawer anchor="left" open={open} onClose={onHandleCloseMenu}>
            <Box sx={{ width: 240 }}>
                <Sidebar />
            </Box>
            </Drawer>

        {/* Chatbot Component */}
         <Chatbot />
        </LayoutContainer>
    );
};

export default MainLayout;
