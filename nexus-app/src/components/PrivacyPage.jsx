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
  useTheme,
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
  IconButton
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

// Robust cookie utility functions with error handling
const getCookie = (name) => {
  try {
    if (typeof document === 'undefined') return null; // SSR safety
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop().split(';').shift();
      if (!cookieValue) return null;
      
      try {
        return JSON.parse(decodeURIComponent(cookieValue));
      } catch (e) {
        console.warn('Failed to parse cookie, returning raw value');
        return cookieValue;
      }
    }
    return null;
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return null;
  }
};

const setCookie = (name, value, days = 365) => {
  try {
    if (typeof document === 'undefined') return; // SSR safety
    
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookieValue = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${name}=${cookieValue};expires=${date.toUTCString()};path=/;SameSite=Lax${
      window.location.protocol === 'https:' ? ';Secure' : ''
    }`;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
}));

const PrivacyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  // Initialize client-side state and check for existing consent
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
    initializeServices(newConsent);
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
    initializeServices(newConsent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    const newConsent = {
      ...cookieConsent,
      date: new Date().toISOString()
    };
    setCookie('cookieConsent', newConsent);
    initializeServices(newConsent);
    setOpenSettings(false);
    setShowBanner(false);
  };

  const initializeServices = (consent) => {
    // Initialize analytics if consented
    if (consent.analytics && isClient) {
      console.log('Initializing analytics services');
      // Example: window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    
    // Initialize marketing if consented
    if (consent.marketing && isClient) {
      console.log('Initializing marketing services');
    }
  };

  const handleSettingChange = (setting) => (event) => {
    const newConsent = {
      ...cookieConsent,
      [setting]: event.target.checked
    };
    setCookieConsent(newConsent);
  };

  const handleDataRequest = (type) => {
    console.log(`Requesting ${type} data`);
    // Implementation would go here
    alert(`Data ${type} request submitted. This would trigger a real process in production.`);
  };

  const cookieTypes = [
    {
      title: 'Essential',
      description: 'Required for basic site functionality',
      icon: <LockIcon color="primary" />,
      type: 'necessary'
    },
    {
      title: 'Performance',
      description: 'Helps us improve website performance',
      icon: <SettingsIcon color="primary" />,
      type: 'analytics'
    },
    {
      title: 'Marketing',
      description: 'Used for personalized advertising',
      icon: <PeopleIcon color="primary" />,
      type: 'marketing'
    },
    {
      title: 'Preferences',
      description: 'Remembers your settings and preferences',
      icon: <CheckIcon color="primary" />,
      type: 'preferences'
    }
  ];

  if (!isClient) {
    return null; // Or a loading state for SSR
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
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
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
            >
              Take control of your personal data and privacy settings
            </Typography>
          </motion.div>
        </Box>

        {/* Main Content with Tabs */}
        <Card sx={{ mb: 8, boxShadow: theme.shadows[4] }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main
              }
            }}
          >
            <Tab label="Privacy Policy" icon={<PrivacyIcon />} iconPosition="start" />
            <Tab label="Cookie Settings" icon={<CookieIcon />} iconPosition="start" />
            <Tab label="Data Rights" icon={<PeopleIcon />} iconPosition="start" />
          </Tabs>

          <Box sx={{ p: 4 }}>
            {activeTab === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Information Collection
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We collect information to provide better services to all our users. 
                    This includes information you provide directly, information we collect 
                    automatically, and information from third parties.
                  </Typography>
                  
                  <Accordion sx={{ mt: 3 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }}>Data We Collect</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Contact information" secondary="Name, email, phone number" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Usage data" secondary="How you interact with our services" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
                          <ListItemText primary="Device information" secondary="IP address, browser type, operating system" />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Your Privacy Rights
                  </Typography>
                  <Typography variant="body1" paragraph>
                    You have rights regarding your personal information under GDPR, CCPA and other regulations.
                  </Typography>
                  
                  <Alert severity="info" sx={{ mt: 3 }}>
                    You can request access to, correction of, or deletion of your personal data at any time.
                  </Alert>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="body1" paragraph>
                  We use cookies and similar technologies to enhance your experience. 
                  Customize your preferences below:
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {cookieTypes.map((cookie, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <AnimatedCard>
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                            {cookie.icon}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {cookie.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {cookie.description}
                            </Typography>
                          </Box>
                          {cookie.type !== 'necessary' ? (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={cookieConsent[cookie.type]}
                                  onChange={handleSettingChange(cookie.type)}
                                  color="primary"
                                />
                              }
                              label={cookieConsent[cookie.type] ? 'Enabled' : 'Disabled'}
                              labelPlacement="start"
                            />
                          ) : (
                            <Chip label="Always on" size="small" color="primary" />
                          )}
                        </CardContent>
                      </AnimatedCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Exercise Your Data Rights
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MailIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Request Your Data</Typography>
                        </Box>
                        <Typography variant="body2" paragraph>
                          Download a copy of all personal data we have about you.
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDataRequest('export')}
                          sx={{ mt: 2 }}
                          fullWidth
                        >
                          Request Data Export
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <DeleteIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Delete Your Data</Typography>
                        </Box>
                        <Typography variant="body2" paragraph>
                          Request permanent deletion of your personal data from our systems.
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDataRequest('delete')}
                          color="error"
                          sx={{ mt: 2 }}
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
          bgcolor: 'primary.main', 
          color: 'white',
          mb: 8,
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)'
        }}>
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Need Privacy Help?
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
                Our privacy team is available to answer your questions.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                endIcon={<ArrowIcon />}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 4,
                  fontWeight: 600,
                  fontSize: '1.1rem'
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
          bgcolor: 'background.paper',
          boxShadow: 6,
          p: 3,
          zIndex: 1300,
          borderTop: `4px solid ${theme.palette.primary.main}`,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <Container maxWidth="lg">
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="body1">
                  We use cookies to enhance your experience. By continuing to browse, 
                  you agree to our use of cookies as described in our{' '}
                  <Link 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setActiveTab(1); 
                      setOpenSettings(true); 
                    }} 
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Cookie Policy
                  </Link>.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ 
                display: 'flex', 
                justifyContent: { md: 'flex-end' }, 
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="text"
                  onClick={handleAcceptNecessary}
                  sx={{ borderRadius: 4 }}
                >
                  Reject Non-Essential
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAcceptAll}
                  sx={{ borderRadius: 4 }}
                >
                  Accept All
                </Button>
                <IconButton 
                  onClick={() => setOpenSettings(true)}
                  color="primary"
                  sx={{ alignSelf: 'center' }}
                  aria-label="Cookie settings"
                >
                  <SettingsIcon />
                </IconButton>
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
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 3,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CookieIcon sx={{ mr: 2, color: theme.palette.primary.contrastText }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Cookie Preferences
            </Typography>
          </Box>
          <IconButton 
            onClick={() => setOpenSettings(false)}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 4 }}>
          <Typography variant="body1" paragraph>
            We use different types of cookies to optimize your experience on our website. 
            Click on the different category headings to learn more and change your preferences.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            {cookieTypes.map((cookie, index) => (
              <Box key={index} sx={{ 
                mb: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: cookie.type === 'necessary' ? 
                  theme.palette.grey[100] : 'transparent'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {cookie.icon}
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                      {cookie.title} Cookies
                    </Typography>
                  </Box>
                  {cookie.type !== 'necessary' ? (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={cookieConsent[cookie.type]}
                          onChange={handleSettingChange(cookie.type)}
                          color="primary"
                        />
                      }
                      label={cookieConsent[cookie.type] ? 'Enabled' : 'Disabled'}
                      labelPlacement="start"
                    />
                  ) : (
                    <Chip 
                      label="Always Enabled" 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {cookie.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3, 
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between'
        }}>
          <Button   
            variant="text" 
            onClick={() => {
              handleAcceptNecessary();
              setOpenSettings(false);
            }}
          >
            Reject Non-Essential
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenSettings(false)}
              sx={{ borderRadius: 4 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveSettings}
              sx={{ borderRadius: 4 }}
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