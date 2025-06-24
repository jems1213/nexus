import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Link,
  useMediaQuery,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  PrivacyTip as PrivacyIcon,
  Cookie as CookieIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowIcon,
  ExpandMore as ExpandMoreIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  People as PeopleIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Create custom theme
const theme = {
  palette: {
    primary: { main: '#4a148c' },
    secondary: { main: '#FF6F00' }
  }
};

// Cookie utility functions
const getCookie = (name) => {
  try {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
    return null;
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return null;
  }
};

const setCookie = (name, value, days = 365) => {
  try {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookieValue = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${name}=${cookieValue};expires=${date.toUTCString()};path=/;SameSite=Lax${window.location.protocol === 'https:' ? ';Secure' : ''}`;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

// Styled components
const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #FF6F00 30%, #4a148c 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
});

const CookieCard = styled(Card)({
  border: '1px solid #4a148c',
  borderRadius: 12,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(74, 20, 140, 0.15)',
    backgroundColor: '#fff'
  }
});

const CookieSettingSwitch = styled(Switch)({
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    border: '1px solid #4a148c'
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'rgba(74, 20, 140, 0.1)'
  },
  '& .Mui-checked': {
    '& .MuiSwitch-thumb': {
      backgroundColor: '#4a148c'
    },
    '& + .MuiSwitch-track': {
      backgroundColor: 'rgba(74, 20, 140, 0.3)'
    }
  }
});

const PrivacyPage = () => {
  const isMobile = useMediaQuery('(max-width:899px)');
  const [openSettings, setOpenSettings] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [expandedCookie, setExpandedCookie] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const savedConsent = getCookie('cookieConsent');
    
    if (savedConsent) {
      setCookieConsent({
        necessary: true,
        analytics: savedConsent.analytics || false,
        marketing: savedConsent.marketing || false,
        preferences: savedConsent.preferences || false
      });
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      date: new Date().toISOString()
    };
    setCookieConsent(newConsent);
    setCookie('cookieConsent', newConsent);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      date: new Date().toISOString()
    };
    setCookieConsent(newConsent);
    setCookie('cookieConsent', newConsent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    const newConsent = {
      ...cookieConsent,
      date: new Date().toISOString()
    };
    setCookie('cookieConsent', newConsent);
    setOpenSettings(false);
    setShowBanner(false);
  };

  const handleSettingChange = (setting) => (event) => {
    setCookieConsent({
      ...cookieConsent,
      [setting]: event.target.checked
    });
  };

  const handleDataRequest = (type) => {
    alert(`Data ${type} request submitted.`);
  };

  const handleCookieExpand = (type) => {
    setExpandedCookie(expandedCookie === type ? null : type);
  };

  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      details: 'These cookies are necessary for core functionality like page navigation and security. They cannot be disabled.',
      icon: <LockIcon sx={{ color: '#4a148c' }} />,
      type: 'necessary',
      alwaysOn: true
    },
    {
      title: 'Performance Cookies',
      description: 'Help us improve website performance and user experience',
      details: 'These cookies collect anonymous data about how visitors use our site. They help us understand which pages are popular and how users navigate through the site.',
      icon: <SettingsIcon sx={{ color: '#4a148c' }} />,
      type: 'analytics',
      alwaysOn: false
    },
    {
      title: 'Marketing Cookies',
      description: 'Used for personalized advertising and content',
      details: 'These cookies track visitors across websites to deliver relevant marketing content. They help us show you ads that are more likely to interest you.',
      icon: <PeopleIcon sx={{ color: '#4a148c' }} />,
      type: 'marketing',
      alwaysOn: false
    },
    {
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      details: 'These cookies remember choices you make (like language or region) to provide enhanced, more personalized features.',
      icon: <CheckIcon sx={{ color: '#4a148c' }} />,
      type: 'preferences',
      alwaysOn: false
    }
  ];

  if (!isClient) return null;

  return (
    <Box sx={{ py: 8, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GradientText 
              variant={isMobile ? 'h3' : 'h2'} 
              component="h1" 
              gutterBottom 
              sx={{ fontWeight: 800 }}
            >
              Your Privacy Controls
            </GradientText>
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ maxWidth: 800, mx: 'auto', mb: 4, color: '#4a148c' }}
            >
              Take control of your personal data and privacy settings
            </Typography>
          </motion.div>
        </Box>

        {/* Main Content with Tabs */}
        <Card sx={{ 
          mb: 8, 
          boxShadow: '0 4px 20px rgba(74, 20, 140, 0.1)', 
          border: '1px solid #4a148c',
          borderRadius: 4
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            sx={{
              borderBottom: '1px solid rgba(74, 20, 140, 0.2)',
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: 2,
                backgroundColor: '#FF6F00'
              }
            }}
          >
            <Tab label="Privacy Policy" icon={<PrivacyIcon sx={{ color: '#4a148c' }} />} iconPosition="start" />
            <Tab label="Cookie Settings" icon={<CookieIcon sx={{ color: '#4a148c' }} />} iconPosition="start" />
            <Tab label="Data Rights" icon={<PeopleIcon sx={{ color: '#4a148c' }} />} iconPosition="start" />
          </Tabs>

          <Box sx={{ p: isMobile ? 2 : 4 }}>
            {activeTab === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#4a148c' }}>
                    Information Collection
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#4a148c' }}>
                    We collect information to provide better services to all our users. 
                    This includes information you provide directly, information we collect 
                    automatically, and information from third parties.
                  </Typography>
                  
                  <Accordion sx={{ mt: 3, border: '1px solid #4a148c', borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#4a148c' }} />}>
                      <Typography sx={{ fontWeight: 600, color: '#4a148c' }}>Data We Collect</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon><InfoIcon sx={{ color: '#4a148c' }} /></ListItemIcon>
                          <ListItemText 
                            primary="Contact information" 
                            secondary="Name, email, phone number" 
                            primaryTypographyProps={{ color: '#4a148c' }}
                            secondaryTypographyProps={{ color: '#4a148c' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon sx={{ color: '#4a148c' }} /></ListItemIcon>
                          <ListItemText 
                            primary="Usage data" 
                            secondary="How you interact with our services" 
                            primaryTypographyProps={{ color: '#4a148c' }}
                            secondaryTypographyProps={{ color: '#4a148c' }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon sx={{ color: '#4a148c' }} /></ListItemIcon>
                          <ListItemText 
                            primary="Device information" 
                            secondary="IP address, browser type, operating system" 
                            primaryTypographyProps={{ color: '#4a148c' }}
                            secondaryTypographyProps={{ color: '#4a148c' }}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#4a148c' }}>
                    Your Privacy Rights
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#4a148c' }}>
                    You have rights regarding your personal information under GDPR, CCPA and other regulations.
                  </Typography>
                  
                  <Alert severity="info" sx={{ mt: 3, bgcolor: 'rgba(255, 111, 0, 0.1)', color: '#4a148c' }}>
                    You can request access to, correction of, or deletion of your personal data at any time.
                  </Alert>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="body1" paragraph sx={{ color: '#4a148c', mb: 3 }}>
                  We use cookies and similar technologies to enhance your experience. 
                  Customize your preferences below:
                </Typography>
                
                <Grid container spacing={3}>
                  {cookieTypes.map((cookie, index) => (
                    <Grid item xs={12} key={index}>
                      <CookieCard>
                        <CardContent>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            pb: 2
                          }} onClick={() => handleCookieExpand(cookie.type)}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ 
                                bgcolor: 'rgba(74, 20, 140, 0.1)', 
                                mr: 2,
                                width: 40,
                                height: 40
                              }}>
                                {cookie.icon}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4a148c' }}>
                                  {cookie.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4a148c' }}>
                                  {cookie.description}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {!cookie.alwaysOn ? (
                                <FormControlLabel
                                  control={
                                    <CookieSettingSwitch
                                      checked={cookieConsent[cookie.type]}
                                      onChange={handleSettingChange(cookie.type)}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  }
                                  label={cookieConsent[cookie.type] ? 'Enabled' : 'Disabled'}
                                  labelPlacement="start"
                                  sx={{ color: '#4a148c', mr: 1 }}
                                />
                              ) : (
                                <Chip 
                                  label="Always on" 
                                  size="small" 
                                  sx={{ 
                                    backgroundColor: '#4a148c', 
                                    color: '#fff',
                                    fontWeight: 600 
                                  }} 
                                />
                              )}
                              <IconButton 
                                onClick={() => handleCookieExpand(cookie.type)}
                                sx={{ 
                                  color: '#4a148c',
                                  transform: expandedCookie === cookie.type ? 'rotate(180deg)' : 'none',
                                  transition: 'transform 0.3s ease'
                                }}
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          {expandedCookie === cookie.type && (
                            <Box sx={{ 
                              pt: 2,
                              borderTop: '1px solid rgba(74, 20, 140, 0.1)',
                              animation: 'fadeIn 0.3s ease'
                            }}>
                              <Typography variant="body2" sx={{ color: '#4a148c' }}>
                                {cookie.details}
                              </Typography>
                              {!cookie.alwaysOn && (
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mt: 2,
                                  p: 2,
                                  bgcolor: 'rgba(74, 20, 140, 0.03)',
                                  borderRadius: 2
                                }}>
                                  <InfoIcon sx={{ color: '#4a148c', mr: 1 }} />
                                  <Typography variant="body2" sx={{ color: '#4a148c', fontSize: '0.85rem' }}>
                                    {cookieConsent[cookie.type] 
                                      ? 'This cookie type is currently enabled'
                                      : 'This cookie type is currently disabled'}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}
                        </CardContent>
                      </CookieCard>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 4,
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="outlined"
                    onClick={handleAcceptNecessary}
                    sx={{ 
                      borderRadius: 4,
                      borderColor: '#4a148c',
                      color: '#4a148c',
                      px: 4,
                      '&:hover': {
                        backgroundColor: 'rgba(74, 20, 140, 0.1)'
                      }
                    }}
                  >
                    Reject Non-Essential
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAcceptAll}
                    sx={{ 
                      borderRadius: 4,
                      backgroundColor: '#FF6F00',
                      color: '#fff',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#e66400'
                      }
                    }}
                  >
                    Accept All Cookies
                  </Button>
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#4a148c' }}>
                  Exercise Your Data Rights
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      height: '100%', 
                      border: '1px solid #4a148c',
                      borderRadius: 2
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MailIcon sx={{ color: '#4a148c', mr: 1 }} />
                          <Typography variant="h6" sx={{ color: '#4a148c' }}>Request Your Data</Typography>
                        </Box>
                        <Typography variant="body2" paragraph sx={{ color: '#4a148c' }}>
                          Download a copy of all personal data we have about you.
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDataRequest('export')}
                          sx={{ 
                            mt: 2,
                            borderColor: '#4a148c',
                            color: '#4a148c',
                            '&:hover': {
                              backgroundColor: 'rgba(74, 20, 140, 0.1)',
                              borderColor: '#4a148c'
                            }
                          }}
                          fullWidth
                        >
                          Request Data Export
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      height: '100%', 
                      border: '1px solid #4a148c',
                      borderRadius: 2
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <DeleteIcon sx={{ color: '#4a148c', mr: 1 }} />
                          <Typography variant="h6" sx={{ color: '#4a148c' }}>Delete Your Data</Typography>
                        </Box>
                        <Typography variant="body2" paragraph sx={{ color: '#4a148c' }}>
                          Request permanent deletion of your personal data from our systems.
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDataRequest('delete')}
                          sx={{ 
                            mt: 2,
                            borderColor: '#FF6F00',
                            color: '#FF6F00',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 111, 0, 0.1)',
                              borderColor: '#FF6F00'
                            }
                          }}
                          fullWidth
                        >
                          Request Data Deletion
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Card>

        {/* Contact Section */}
        <Card sx={{ 
          mb: 8,
          background: 'linear-gradient(135deg, #4a148c 0%, #FF6F00 100%)',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Box sx={{ p: isMobile ? 4 : 6, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#fff' }}>
                Need Privacy Help?
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 4, color: '#fff', opacity: 0.9 }}>
                Our privacy team is available to answer your questions.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowIcon />}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  backgroundColor: '#fff',
                  color: '#4a148c',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Contact Privacy Team
              </Button>
            </motion.div>
          </Box>
        </Card>
      </Container>

      {/* Cookie Consent Banner */}
      {showBanner && (
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#fff',
          boxShadow: 6,
          p: 3,
          zIndex: 1300,
          borderTop: '4px solid #4a148c',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <Container maxWidth="lg">
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" sx={{ color: '#4a148c' }}>
                  We use cookies to enhance your experience. By continuing to browse, 
                  you agree to our use of cookies as described in our{' '}
                  <Link 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setActiveTab(1); 
                      setOpenSettings(true); 
                    }} 
                    sx={{ 
                      color: '#FF6F00',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Cookie Policy
                  </Link>.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ 
                display: 'flex', 
                justifyContent: { md: 'flex-end' }, 
                gap: 2,
                flexWrap: 'wrap',
                mt: isMobile ? 2 : 0
              }}>
                <Button
                  variant="text"
                  onClick={handleAcceptNecessary}
                  sx={{ 
                    borderRadius: 4,
                    color: '#4a148c',
                    '&:hover': {
                      backgroundColor: 'rgba(74, 20, 140, 0.1)'
                    }
                  }}
                >
                  Reject Non-Essential
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAcceptAll}
                  sx={{ 
                    borderRadius: 4,
                    backgroundColor: '#FF6F00',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#e66400'
                    }
                  }}
                >
                  Accept All
                </Button>
                <Tooltip title="Customize settings">
                  <IconButton 
                    onClick={() => setOpenSettings(true)}
                    sx={{ 
                      color: '#4a148c',
                      alignSelf: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 20, 140, 0.1)'
                      }
                    }}
                    aria-label="Cookie settings"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Cookie Settings Dialog */}
      <Dialog 
        open={openSettings} 
        onClose={() => setOpenSettings(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, border: '1px solid #4a148c' } }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(74, 20, 140, 0.2)',
          py: 3,
          bgcolor: '#4a148c',
          color: '#fff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CookieIcon sx={{ mr: 2, color: '#fff' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Cookie Preferences
            </Typography>
          </Box>
          <IconButton 
            onClick={() => setOpenSettings(false)}
            sx={{ color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 4 }}>
          <Typography variant="body1" paragraph sx={{ color: '#4a148c' }}>
            We use different types of cookies to optimize your experience on our website. 
            Click on the different category headings to learn more and change your preferences.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            {cookieTypes.map((cookie, index) => (
              <Box key={index} sx={{ 
                mb: 3,
                p: 3,
                borderRadius: 2,
                bgcolor: 'rgba(74, 20, 140, 0.03)',
                border: '1px solid rgba(74, 20, 140, 0.1)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {cookie.icon}
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1, color: '#4a148c' }}>
                      {cookie.title}
                    </Typography>
                  </Box>
                  {!cookie.alwaysOn ? (
                    <FormControlLabel
                      control={
                        <CookieSettingSwitch
                          checked={cookieConsent[cookie.type]}
                          onChange={handleSettingChange(cookie.type)}
                        />
                      }
                      label={cookieConsent[cookie.type] ? 'Enabled' : 'Disabled'}
                      labelPlacement="start"
                      sx={{ color: '#4a148c' }}
                    />
                  ) : (
                    <Chip 
                      label="Always Enabled" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#4a148c', 
                        color: '#fff',
                        fontWeight: 600 
                      }} 
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: '#4a148c', mt: 2 }}>
                  {cookie.description}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4a148c', mt: 1, fontSize: '0.9rem' }}>
                  {cookie.details}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3, 
          borderTop: '1px solid rgba(74, 20, 140, 0.2)',
          justifyContent: 'space-between'
        }}>
          <Button   
            variant="text" 
            onClick={() => {
              handleAcceptNecessary();
              setOpenSettings(false);
            }}
            sx={{ 
              color: '#4a148c',
              '&:hover': {
                backgroundColor: 'rgba(74, 20, 140, 0.1)'
              }
            }}
          >
            Reject Non-Essential
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenSettings(false)}
              sx={{ 
                borderRadius: 4,
                borderColor: '#4a148c',
                color: '#4a148c',
                '&:hover': {
                  backgroundColor: 'rgba(74, 20, 140, 0.1)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveSettings}
              sx={{ 
                borderRadius: 4,
                backgroundColor: '#FF6F00',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e66400'
                }
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrivacyPage;