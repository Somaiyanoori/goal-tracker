import { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const navItems = [
  { text: "Dashboard", path: "/" },
  { text: "All Goals", path: "/goals" },
  { text: "Create Goal", path: "/golas/new" },
  { text: "Categories", path: "/categories" },
  { text: "Settings", path: "/settings" },
];
export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return isMobile ? (
    <Drawer open={open} onClose={() => setOpen(false)}>
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": { width: drawerWidth },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
}