import React, { useState } from 'react';
import {
  Box, Button, Divider, IconButton, InputAdornment,
  Stack, TextField, Typography, useMediaQuery, Snackbar, Alert
} from '@mui/material';
import {
  Email as EmailIcon, Lock as LockIcon,
  Visibility, VisibilityOff
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const theme = createTheme({
  palette: {
    primary: { main: '#6366f1' },
    secondary: { main: '#8b5cf6' },
    background: { default: '#f8fafc' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontSize: '2rem',
      '@media (max-width: 900px)': { fontSize: '1.75rem' },
      '@media (max-width: 600px)': { fontSize: '1.5rem' },
    },
  },
  shape: { borderRadius: 8 },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const inputFocusVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  blur: {
    scale: 1,
    transition: { duration: 0.1 }
  }
};

const buttonHoverVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0px 5px 15px rgba(99, 102, 241, 0.4)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  },
  tap: {
    scale: 0.98
  }
};

const CustomSnackbar = ({ open, onClose, severity, message, icon }) => {
  // Auto-close after 5 seconds
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5000ms = 5 seconds
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: open ? 0 : -100, opacity: open ? 1 : 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 500 }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '0',
        right: '0',
        zIndex: 1400,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        boxSizing: 'border-box'
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        icon={icon}
        sx={{
          width: '100%',
          maxWidth: '450px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          fontWeight: '600',
          '& .MuiAlert-message': {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0',
            textAlign: 'center'
          },
          '& .MuiAlert-action': {
            alignItems: 'center',
            paddingLeft: '8px'
          }
        }}
      >
        {message}
      </Alert>
    </motion.div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => () => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => () => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setLoginSuccess(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(data.user));

        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('loginStatusChanged'));
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsSubmitting(true);

      // Decode the JWT to verify it's valid
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google login decoded:', decoded);

      // Send to your backend for verification
      const response = await fetch('http://localhost:5000/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: credentialResponse.credential
        }),
      });

      if (!response.ok) {
        throw new Error(`Google login failed with status: ${response.status}`);
      }

      const data = await response.json();

      setLoginSuccess(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(data.user));

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('loginStatusChanged'));
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Google login error:', err);
      setErrorMessage(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setErrorMessage('Google login failed. Please try again or use email login.');
    console.error('Google login failed');
  };

  const handleCloseSnackbar = () => {
    setLoginSuccess(false);
    setErrorMessage('');
  };

  return (
    <GoogleOAuthProvider clientId="439515091141-jji6nsie0cs27eq2vneoqvfclngjstie.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            minHeight: 'calc(100vh - 64px)',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{ width: '100%', maxWidth: isLargeScreen ? '500px' : '450px' }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: 'background.paper',
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: theme.shape.borderRadius,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background elements */}
              <motion.div
                initial={{ x: -100, y: -100, rotate: 45 }}
                animate={{ x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  position: 'absolute',
                  top: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  zIndex: 0
                }}
              />

              <motion.div
                initial={{ x: 100, y: 100, rotate: -45 }}
                animate={{ x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  zIndex: 0
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    Sign in to your account.
                  </Typography>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Stack spacing={2.5}>
                    <motion.div variants={itemVariants}>
                      <motion.div
                        animate={isFocused.email ? "focus" : "blur"}
                        variants={inputFocusVariants}
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={handleFocus('email')}
                          onBlur={handleBlur('email')}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <motion.div
                                  animate={{
                                    color: isFocused.email ? theme.palette.primary.main : 'action'
                                  }}
                                >
                                  <EmailIcon />
                                </motion.div>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.div
                        animate={isFocused.password ? "focus" : "blur"}
                        variants={inputFocusVariants}
                      >
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={handleFocus('password')}
                          onBlur={handleBlur('password')}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <motion.div
                                  animate={{
                                    color: isFocused.password ? theme.palette.primary.main : 'action'
                                  }}
                                >
                                  <LockIcon />
                                </motion.div>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  <motion.div whileTap={{ scale: 0.9 }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </motion.div>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </Stack>

                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonHoverVariants}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                          mt: 3,
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                          boxShadow: '0 4px 6px rgba(99,102,241,0.3)',
                        }}
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Signing In...
                          </motion.span>
                        ) : 'Sign In'}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Divider sx={{ my: 3 }}>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Typography variant="body2" color="text.secondary">OR</Typography>
                      </motion.div>
                    </Divider>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        shape="pill"
                        size="large"
                        text="continue_with"
                        theme="filled_blue"
                        width="300"
                      />
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" sx={{ mt: 3 }}>
                      Don't have an account?{' '}
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => navigate('/signup')}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        <motion.span
                          whileHover={{
                            textDecoration: 'underline',
                            color: theme.palette.secondary.main
                          }}
                        >
                          Sign Up
                        </motion.span>
                      </Button>
                    </Typography>
                  </motion.div>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

          {/* Custom Snackbars */}
          <CustomSnackbar
            open={loginSuccess}
            onClose={handleCloseSnackbar}
            severity="success"
            message="🎉 Login successful! Redirecting..."
            icon={false}
          />
          
          <CustomSnackbar
            open={!!errorMessage}
            onClose={handleCloseSnackbar}
            severity="error"
            message={errorMessage}
            icon={false}
          />
        </Box>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default Login;