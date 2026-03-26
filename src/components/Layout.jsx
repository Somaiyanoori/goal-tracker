import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ isAuth, onLogout }) {
    return (
        <Box sx={{ display: "flex" }}>
            <Navbar isAuth={isAuth} onLogout={onLogout} />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
                <Footer />
            </Box>
        </Box>
    );
}
export default Layout;
