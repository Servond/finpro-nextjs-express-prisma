
'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Divider, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/authSlice';

function Header() {
  const path: string = usePathname();
  const router = useRouter();
  const { loginStatus, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    handleClose();
  };

  const open = Boolean(anchorElement);
  const homeLink = user.roleId === 2 ? '/eo' : '/user';

  const menuItems = [
    <MenuItem
      key="home"
      component={Link}
      href={homeLink}
      onClick={handleClose}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </MenuItem>,
    <Divider key="divider-home" />,
    <MenuItem
      key="profile"
      component={Link}
      href="/user-profile"
      onClick={handleClose}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </MenuItem>,
    <Divider key="divider-profile" />,
  ];

  if (user.roleId === 2) {
    menuItems.push(
      <MenuItem
        key="dashboard"
        component={Link}
        href="/dashboard"
        onClick={handleClose}
        sx={{
          borderRadius: '5px',
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </MenuItem>,
      <Divider key="divider-dashboard" />,
      <MenuItem
        key="create-event"
        component={Link}
        href="/create-event"
        onClick={handleClose}
        sx={{
          borderRadius: '5px',
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
      >
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Create Event" />
      </MenuItem>,
      <Divider key="divider-create-event" />,
    );
  }

  menuItems.push(
    <MenuItem
      key="logout"
      onClick={handleLogout}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </MenuItem>,
  );

  return (
    <AppBar position="static" color="transparent" elevation={6}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <img
                src="/appLogo.svg"
                alt="Logo"
                style={{ height: '30px', marginRight: '10px' }}
              />
            </Link>
            Eventbriter
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {loginStatus.isLogin ? (
            <>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                  textTransform: 'none',
                  border: '1px solid black',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MenuIcon sx={{ color: '#000' }} />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorElement}
                keepMounted
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{
                  '.MuiPaper-root': {
                    borderRadius: '10px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeIn 0.3s ease-in-out',
                  },
                }}
              >
                {menuItems}
              </Menu>
            </>
          ) : (
            <>
              <Button
                href="/login"
                variant={path.startsWith('/login') ? 'contained' : 'outlined'}
              >
                Login
              </Button>
              <Button
                href="/register"
                variant={
                  path.startsWith('/register') ? 'contained' : 'outlined'
                }
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
