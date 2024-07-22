import {
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Typography,
    ListItemButton,
} from '@mui/material';
import {
    Event,
    People,
    AttachMoney,
    BarChart,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    minHeight: 27,
    justifyContent: 'space-between',
}));

interface DrawerComponentProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    handleDrawerClose: () => void;
    open: boolean;
    theme: any;
    drawerWidth: number;
    setSelectedMenu: (menu: string) => void;
}

const DrawerComponent = ({
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    open,
    theme,
    drawerWidth,
    setSelectedMenu,
}: DrawerComponentProps) => {
    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent(handleDrawerClose, theme, setSelectedMenu)}
            </Drawer>
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent(handleDrawerClose, theme, setSelectedMenu)}
            </Drawer>
        </>
    );
};

const drawerContent = (
    handleDrawerClose: () => void,
    theme: any,
    setSelectedMenu: (menu: string) => void,
) => (
    <div>
        <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <img
                            src="/appLogo.svg"
                            alt="Logo"
                            style={{
                                height: '27px',
                                marginRight: '8px',
                                marginLeft: '7px',
                            }}
                        />
                    </Link>
                    <strong>event</strong>
                </Typography>
            </Box>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 2.5 }}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedMenu('Statistics')}>
                    <ListItemIcon>
                        <BarChart />
                    </ListItemIcon>
                    <ListItemText primary="Statistics" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedMenu('Events')}>
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => setSelectedMenu('Attendee Registrations')}
                >
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="Attendee Registrations" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedMenu('Transactions')}>
                    <ListItemIcon>
                        <AttachMoney />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItemButton>
            </ListItem>
        </List>
    </div>
);

export default DrawerComponent;