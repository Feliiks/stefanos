import React from 'react'
import { Button } from "@mui/material"
import { Link } from "react-router-dom";

import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const UserBtn = ({ user, logoutUser }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user) {
        return (
            <Link to="/auth">
                <Button variant="contained" startIcon={<PersonIcon />}> Me connecter </Button>
            </Link>
        )
    } else {
        return (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Button
                        className="user-btn"
                        variant="outlined"
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <SettingsOutlinedIcon
                            fontSize="small"
                        />
                    </Button>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            bgcolor: "#0A1929",
                            color: "#fff",
                            border: "1px solid rgb(19 47 76)",
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Link to="/mon-compte">
                        <MenuItem>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            Mon compte
                        </MenuItem>
                    </Link>
                    {
                        user && user.user.admin ?
                            <Link to="/admin">
                                <MenuItem>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon fontSize="small" color="primary" />
                                    </ListItemIcon>
                                    Administration
                                </MenuItem>
                            </Link>
                        : null
                    }
                    <Divider style={{ background: "rgb(19 47 76)"}} />
                    <MenuItem onClick={logoutUser}>
                        <ListItemIcon>
                            <Logout fontSize="small" color="primary" />
                        </ListItemIcon>
                        Déconnexion
                    </MenuItem>
                </Menu>
            </>
        )

    }
}

export default UserBtn