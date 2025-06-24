import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Fade,
  Grow,
  Zoom,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CheckCircle, 
  Star, 
  HelpOutline, 
  ArrowRightAlt,
  Business,
  Person,
  Groups
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    title: 'Basic',
    price: 0,
    annualPrice: 0,
    description: 'Perfect for individuals just getting started.',
    features: [
      '1 Project',
      'Community Support',
      'Basic Analytics',
      'Limited API Access'
    ],
    highlight: false,
    icon: <Person color="action" />,
    cta: 'Start Free'
  },
  {
    title: 'Professional',
    price: 29,
    annualPrice: 25,
    description: 'Best for professionals and freelancers.',
    features: [
      '10 Projects',
      'Priority Email Support',
      'Advanced Analytics',
      'Custom Domain',
      'API Access',
      'Basic Integrations'
    ],
    highlight: true,
    icon: <Star color="warning" />,
    cta: 'Get Started'
  },
  {
    title: 'Enterprise',
    price: 99,
    annualPrice: 85,
    description: 'For businesses needing advanced features.',
    features: [
      'Unlimited Projects',
      '24/7 Dedicated Support',
      'Team Collaboration',
      'White Labeling',
      'Advanced Security',
      'All Integrations',
      'Custom SLAs'
    ],
    highlight: false,
    icon: <Business color="primary" />,
    cta: 'Contact Sales'
  }
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: 'none',
  transform: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    transform: 'translateY(-8px)',
  },
  height: '100%',
  minHeight: '550px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'white',

  '&.highlight': {
    boxShadow: `0 8px 24px ${theme.palette.secondary.light}`,
    border: `2px solid #4a148c`,
    transform: 'scale(1.02)',
    '&:hover': {
      boxShadow: `0 12px 30px rgba(74, 20, 140, 0.3)`,
    }
  }
}));

const Ribbon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '-50px',
  top: '20px',
  width: '200px',
  backgroundColor: '#FF6F00', // Orange color
  color: 'white',
  textAlign: 'center',
  lineHeight: '30px',
  transform: 'rotate(45deg)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  fontWeight: 'bold',
  fontSize: '0.8rem',
}));

const FeatureTooltip = ({ feature }) => (
  <Tooltip 
    title={feature.description} 
    arrow
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
  >
    <Box display="inline-flex" alignItems="center">
      {feature.name}
      <HelpOutline fontSize="small" sx={{ ml: 0.5, opacity: 0.7 }} />
    </Box>
  </Tooltip>
);

function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBillingChange = (event, newValue) => {
    if (newValue !== null) {
      setBillingCycle(newValue);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featureDetails = {
    '1 Project': { description: 'Create and manage one active project' },
    'Community Support': { description: 'Access to community forums and documentation' },
    'Basic Analytics': { description: 'Basic usage statistics and reports' },
    'Limited API Access': { description: '100 API calls per day' },
    '10 Projects': { description: 'Create and manage up to 10 active projects' },
    'Priority Email Support': { description: 'Response within 24 hours' },
    'Advanced Analytics': { description: 'Detailed analytics with export capabilities' },
    'Custom Domain': { description: 'Use your own domain name' },
    'API Access': { description: '1000 API calls per day' },
    'Basic Integrations': { description: 'Connect with 3rd party services' },
    'Unlimited Projects': { description: 'No limit on active projects' },
    '24/7 Dedicated Support': { description: 'Phone and chat support anytime' },
    'Team Collaboration': { description: 'Up to 10 team members' },
    'White Labeling': { description: 'Remove our branding from your dashboard' },
    'Advanced Security': { description: 'SSO, 2FA, and audit logs' },
    'All Integrations': { description: 'Access to all available integrations' },
    'Custom SLAs': { description: 'Guanteed uptime and response times' }
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: 'background.paper', 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: `linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)`, // Purple gradient
          zIndex: 0,
       //   transform: 'skewY(-4deg)',
          transformOrigin: 'top left',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="down" in={isVisible} timeout={500}>
          <Box textAlign="center" mb={6}>
            <Chip 
              label="PRICING" 
              sx={{ 
                mb: 2, 
                fontWeight: 'bold',
                backgroundColor: '#FF6F00', // Orange
                color: 'white'
              }}
            />
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ color: 'common.white' }}
            >
              Flexible Plans for Every Team
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: '700px', mx: 'auto' }}>
              Choose a plan that fits your needs. Start for free, upgrade anytime.
            </Typography>
          </Box>
        </Slide>

        <Fade in={isVisible} timeout={800}>
          <Box display="flex" justifyContent="center" mb={6}>
            <ToggleButtonGroup
              value={billingCycle}
              exclusive
              onChange={handleBillingChange}
              aria-label="billing cycle"
              sx={{
                bgcolor: 'white',
                boxShadow: 1,
                borderRadius: '50px',
                p: 0.5
              }}
            >
              <ToggleButton 
                value="monthly" 
                aria-label="monthly billing"
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  fontWeight: billingCycle === 'monthly' ? 'bold' : 'normal',
                  color: billingCycle === 'monthly' ? 'white' : '#4a148c',
                  backgroundColor: billingCycle === 'monthly' ? '#4a148c' : 'transparent',
                  '&:hover': {
                    backgroundColor: billingCycle === 'monthly' ? '#4a148c' : 'rgba(74, 20, 140, 0.08)'
                  }
                }}
              >
                Monthly
              </ToggleButton>
              <ToggleButton 
                value="annual" 
                aria-label="annual billing"
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  fontWeight: billingCycle === 'annual' ? 'bold' : 'normal',
                  color: billingCycle === 'annual' ? 'white' : '#4a148c',
                  backgroundColor: billingCycle === 'annual' ? '#4a148c' : 'transparent',
                  '&:hover': {
                    backgroundColor: billingCycle === 'annual' ? '#4a148c' : 'rgba(74, 20, 140, 0.08)'
                  }
                }}
              >
                Annual (17% off)
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Fade>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              lg={4} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <Grow in={isVisible} timeout={index * 300 + 500}>
                <Box width="100%">
                  <StyledCard className={plan.highlight ? 'highlight' : ''}>
                    {plan.highlight && (
                      <Ribbon>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                           ----POPULAR CHOICE
                        </motion.div>
                      </Ribbon>
                    )}
                    <CardContent sx={{ 
                      flexGrow: 1,
                      p: 4,
                      pb: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2
                          }}
                        >
                          {plan.icon}
                          <Typography 
                            variant="h5" 
                            fontWeight="bold" 
                            sx={{ ml: 1, color: '#4a148c' }}
                          >
                            {plan.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="h3"
                            sx={{ 
                              color: '#4a148c',
                              display: 'flex',
                              alignItems: 'flex-start'
                            }}
                          >
                            ${billingCycle === 'annual' ? plan.annualPrice : plan.price}
                            <Typography 
                              variant="subtitle2" 
                              component="span"
                              sx={{ 
                                mt: 1,
                                ml: 0.5,
                                color: 'text.secondary'
                              }}
                            >
                              /month
                            </Typography>
                          </Typography>
                          {billingCycle === 'annual' && (
                            <Typography variant="caption" color="text.secondary">
                              Billed annually (${plan.annualPrice * 12})
                            </Typography>
                          )}
                        </Box>
                        
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                          sx={{ mb: 3 }}
                        >
                          {plan.description}
                        </Typography>

                        <List dense sx={{ mb: 2 }}>
                          {plan.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.5 }}
                            >
                              <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: '32px' }}>
                                  <CheckCircle sx={{ color: '#FF6F00' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={
                                    <FeatureTooltip feature={{
                                      name: feature,
                                      description: featureDetails[feature]?.description || ''
                                    }} />
                                  } 
                                  primaryTypographyProps={{ color: 'text.primary' }}
                                />
                              </ListItem>
                            </motion.div>
                          ))}
                        </List>
                      </Box>

                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={plan.highlight ? 'contained' : 'outlined'}
                            sx={{ 
                              backgroundColor: plan.highlight ? '#FF6F00' : 'transparent',
                              color: plan.highlight ? 'white' : '#4a148c',
                              borderColor: '#4a148c',
                              '&:hover': {
                                backgroundColor: plan.highlight ? '#FF8F00' : 'rgba(74, 20, 140, 0.08)',
                                borderColor: '#4a148c'
                              },
                              borderRadius: '50px',
                              fontWeight: 'bold',
                              py: 1.5,
                              fontSize: isMobile ? '0.875rem' : '1rem'
                            }}
                            fullWidth
                            size="large"
                            endIcon={<ArrowRightAlt />}
                            onClick={() => {
                              if (plan.title === 'Enterprise') {
                                handleNavigation('/contact');
                              } else {
                                // Handle other button clicks
                              }
                            }}
                          >
                            {plan.cta}
                          </Button>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Zoom in={isVisible} timeout={1000}>
          <Box 
            textAlign="center" 
            mt={6}
            sx={{
              bgcolor: 'white',
              p: 4,
              borderRadius: '12px',
              boxShadow: 1,
              border: '2px solid #4a148c'
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#4a148c' }}>
              Need a custom solution?
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}>
              Our team can create a plan tailored to your specific requirements.
            </Typography>
            <Button 
              variant="contained"
              sx={{
                backgroundColor: '#4a148c',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#5e35b1'
                },
                borderRadius: '50px',
                fontWeight: 'bold',
                px: 4,
                py: 1.5
              }}
              size="large"
              startIcon={<Groups />}
              onClick={() => handleNavigation('/contact')}
            >
              Contact Our Sales Team
            </Button>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
}

export default Pricing;