'use client';
import { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    CssBaseline,
    Toolbar,
    AppBar,
    IconButton,
    Container,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    Dashboard as DashboardIcon,
    Event as EventIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { styled, useTheme, Theme } from '@mui/material/styles';
import DrawerComponent from './drawer';
import EventList from './eventList';
import AttendeeRegistrations from './registrations';
import Transactions from './transactions';
import Statistics from './statistics';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import axios from 'axios';
import { Event } from './types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/features/authSlice';

const drawerWidth = 205;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    marginTop: 0,
    paddingTop: 0,
}));

const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: 27,
    justifyContent: 'space-between',
}));

const getEvents = async (organizer_id: string) => {
    const response = await axios.get(
        `http://localhost:8000/api/events-dashboard/${organizer_id}`,
    );

    return response.data.data;
};

function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState<string>('Statistics');
    const { loginStatus, user } = useAppSelector((state) => state.auth);
    const organizer_id = user?.userId;
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
        handleClose();
    };

    const openMenu = Boolean(anchorEl);
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

    useEffect(() => {
        const checkUserRole = () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role_id !== 2) {
                router.push('/');
            }
        };

        checkUserRole();
    }, [router]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (organizer_id && selectedMenu === 'Events') {
                try {
                    setLoading(true);
                    const events = await getEvents(String(organizer_id));
                    setEvents(events);
                } catch (err) {
                    console.error('Failed to fetch events:', err);
                    if (err instanceof Error) {
                        setError(err);
                    } else {
                        setError(new Error('Unknown error occurred'));
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEvents();
    }, [organizer_id, selectedMenu]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'Events':
                return <EventList events={events} loading={loading} error={error} />;
            case 'Attendee Registrations':
                return <AttendeeRegistrations />;
            case 'Transactions':
                return <Transactions />;
            case 'Statistics':
                return <Statistics organizer_id={organizer_id} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBarStyled
                position="fixed"
                open={open}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
                        DASHBOARD
                    </Typography>
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
                        anchorEl={anchorEl}
                        keepMounted
                        open={openMenu}
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
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                animation: 'fadeIn 0.3s ease-in-out',
                            },
                        }}
                    >
                        {menuItems}
                    </Menu>
                </Toolbar>
            </AppBarStyled>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <DrawerComponent
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        handleDrawerClose={handleDrawerClose}
                        open={open}
                        theme={theme}
                        drawerWidth={drawerWidth}
                        setSelectedMenu={setSelectedMenu}
                    />
                </Box>
                <Main open={open}>
                    <DrawerHeader />
                    <Container sx={{ paddingTop: 0, marginTop: 0 }}>
                        {renderContent()}
                    </Container>
                </Main>
            </Box>
        </Box>
    );
}

export default Dashboard;
