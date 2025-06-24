import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
  Avatar, Button, Tooltip, MenuItem, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faTags,
  faNewspaper,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faTachometerAlt,
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

// Custom colors
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  textLight: '#f3e5f5',
  textDark: '#212121',
  background: '#f5f5f5'
};

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const AnimatedLogo = styled(AdbIcon)({
  animation: `${pulse} 3s ease-in-out infinite`,
  '&:hover': {
    animation: `${pulse} 1s ease-in-out infinite`,
    color: colors.secondary,
  }
});

const NavButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
});

const AuthButton = styled(Button)({
  marginLeft: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.2)`,
  }
});

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Dashboard', 'AboutUs', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigate = (path) => {
    navigate(path);
    scrollToTop();
  };

  React.useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      const storedUser = localStorage.getItem('userData');
      if (loggedIn && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          setUser(null);
          localStorage.clear();
        }
      } else {
        setUser(null);
        if (!loggedIn) localStorage.removeItem('userData');
      }
    };

    checkLoginStatus();
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogin = () => {
    handleCloseUserMenu();
    handleNavigate('/login');
  };

  const handleSignup = () => {
    handleNavigate('/signup');
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    handleCloseUserMenu();
    setOpenLogoutDialog(false);
    handleNavigate('/');
    window.dispatchEvent(new CustomEvent('loginStatusChanged'));
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    setOpenLogoutDialog(true);
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  const getIcon = (page) => {
    const icons = {
      'Products': faBoxOpen,
      'Pricing': faTags,
      'Blog': faNewspaper
    };
    return icons[page];
  };

  const getSettingIcon = (setting) => {
    const icons = {
      'Profile': faUser,
      'Dashboard': faTachometerAlt,
      'AboutUs': faInfoCircle,
      'Logout': faSignOutAlt
    };
    return icons[setting];
  };

  return (
    <>
      <AppBar position="fixed" sx={{
        backgroundColor: colors.primary,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        animation: `${slideIn} 0.5s ease-out`
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }} onClick={scrollToTop}>
              <AnimatedLogo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: colors.textLight }} />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              onClick={scrollToTop}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colors.textLight,
                textDecoration: 'none',
                '&:hover': { color: colors.secondary }
              }}
            >
              NEXUS 
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu 
                anchorEl={anchorElNav} 
                open={Boolean(anchorElNav)} 
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': { 
                    backgroundColor: colors.primary, 
                    color: colors.textLight,
                    minWidth: '200px'
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page} 
                    onClick={() => { 
                      handleNavigate(`/${page.toLowerCase()}`); 
                      handleCloseNavMenu(); 
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <FontAwesomeIcon icon={getIcon(page)} style={{ marginRight: 12 }} />
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
                {!isLoggedIn && [
                  <MenuItem 
                    key="login"
                    onClick={() => { 
                      handleLogin(); 
                      handleCloseNavMenu(); 
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: 12 }} />
                    <Typography>Login</Typography>
                  </MenuItem>,
                  <MenuItem 
                    key="signup"
                    onClick={() => { 
                      handleSignup(); 
                      handleCloseNavMenu(); 
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 12 }} />
                    <Typography>Sign Up</Typography>
                  </MenuItem>
                ]}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <AnimatedLogo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: colors.textLight }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              onClick={scrollToTop}
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colors.textLight,
                textDecoration: 'none',
                '&:hover': { color: colors.secondary }
              }}
            >
              NEXUS
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              ml: 3,
              gap: 3
            }}>
              {pages.map((page) => (
                <NavButton
                  key={page}
                  onClick={() => handleNavigate(`/${page.toLowerCase()}`)}
                  sx={{
                    my: 2,
                    color: colors.textLight,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 500,
                    '&:hover': { color: colors.secondary }
                  }}
                >
                  <FontAwesomeIcon icon={getIcon(page)} style={{ marginRight: 6 }} />
                  {page}
                </NavButton>
              ))}
            </Box>

            {/* Auth Buttons */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {!isLoggedIn ? (
                <>
                  <AuthButton
                    variant="outlined"
                    onClick={handleLogin}
                    sx={{
                      color: colors.textLight,
                      borderColor: colors.textLight,
                      '&:hover': { borderColor: colors.secondary, color: colors.secondary }
                    }}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: 6 }} />
                    Login
                  </AuthButton>
                  <AuthButton
                    variant="contained"
                    onClick={handleSignup}
                    sx={{
                      backgroundColor: colors.secondary,
                      color: colors.textDark,
                      '&:hover': {
                        backgroundColor: '#ff8f00'
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 6 }} />
                    Sign Up
                  </AuthButton>
                </>
              ) : (
                <Tooltip title={user?.email || 'Open settings'}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name || 'User'}
                      src={user?.avatarUrl || '/static/images/avatar/2.jpg'}
                      sx={{
                        border: `2px solid ${colors.secondary}`,
                        boxShadow: '0 0 10px rgba(255, 111, 0, 0.5)'
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: colors.primary,
                    color: colors.textLight,
                    boxShadow: '0 5px 20px rgba(224, 122, 122, 0.2)',
                    minWidth: '200px'
                  }
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting === 'Logout') {
                        handleLogoutClick();
                      } else if (setting === 'Profile') {
                        handleNavigate('/profile');
                      } else if (setting === 'Dashboard') {
                        handleNavigate('/');
                      } else if (setting === 'AboutUs') {
                        handleNavigate('/about');
                      }
                      handleCloseUserMenu();
                    }}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      },
                      py: 1.5
                    }}
                  >
                    <FontAwesomeIcon icon={getSettingIcon(setting)} style={{ marginRight: 12 }} />
                    <Typography variant="body2">
                      {setting === 'AboutUs' ? 'About Us' : setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: colors.background
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            onClick={handleCancelLogout}
            variant="outlined"
            sx={{
              color: colors.textDark,
              borderColor: colors.textDark,
              '&:hover': {
                borderColor: colors.primary,
                color: colors.primary
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            autoFocus
            sx={{
              backgroundColor: colors.secondary,
              color: colors.textDark,
              '&:hover': {
                backgroundColor: '#ff8f00'
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResponsiveAppBar;  