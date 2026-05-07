import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountBalanceWallet as WalletIcon,
} from '@mui/icons-material';

const Navbar = ({
  mode,
  toggleMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' },
  ];

  // OPEN/CLOSE SIDEBAR
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // NAVIGATION CLICK
  const handleNavClick = (path) => {
    navigate(path);
    // CLOSE SIDEBAR AFTER CLICK
    setDrawerOpen(false);
  };

  // SIDEBAR CONTENT
  const SidebarContent = () => (
    <Box
      sx={{
        width: 260,
        height: '100%',
        bgcolor: 'background.paper',
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {/* LOGO */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <WalletIcon
          sx={{
            color: 'primary.main',
            fontSize: 30,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          ExpenseIQ
        </Typography>
      </Box>

      {/* NAV LINKS */}
      <List sx={{ px: 1 }}>
        {navLinks.map((link) => (
          <ListItem
            key={link.label}
            disablePadding
          >
            <ListItemButton
              selected={location.pathname === link.path}
              onClick={() => handleNavClick(link.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === link.path ? 700 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* TOP NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {/* MENU BUTTON */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <WalletIcon
              sx={{
                color: 'primary.main',
                mr: 1,
                fontSize: 32,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                background:
                  'linear-gradient(45deg, #5C6BC0 30%, #8E99F3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ExpenseIQ
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {/* DARK MODE */}
            <Tooltip
              title={
                mode === 'dark'
                  ? 'Light Mode'
                  : 'Dark Mode'
              }
            >
              <IconButton
                onClick={toggleMode}
                color="inherit"
              >
                {mode === 'dark'
                  ? <LightModeIcon />
                  : <DarkModeIcon />
                }
              </IconButton>
            </Tooltip>

            {/* PROFILE */}
            <Avatar
              sx={{
                width: 35,
                height: 35,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              K
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Navbar;