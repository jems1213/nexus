import * as React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Link
} from '@mui/material';
import { keyframes } from '@emotion/react';
import AdbIcon from '@mui/icons-material/Adb';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import AttributionIcon from '@mui/icons-material/Attribution';
import AirplayIcon from '@mui/icons-material/Airplay';
import BalanceIcon from '@mui/icons-material/Balance';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  textLight: '#f3e5f5',
  textDark: '#212121',
  background: '#f5f5f5',
};

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${colors.primary} 0%, #7b1fa2 100%)`,
  color: colors.textLight,
  padding: '4rem 0',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '59px',
    background: colors.background,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  backgroundColor: theme.palette.background.paper,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
    opacity: 0.5,
    transform: 'scaleX(0.5)',
    transformOrigin: 'left',
    transition: 'all 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 15px 30px -5px rgba(0, 0, 0, 0.15)`,
    borderColor: colors.secondary,
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
    opacity: 1,
  },
}));

const FeatureIcon = styled(Box)({
  fontSize: '3.5rem',
  margin: '1.5rem 0',
  color: colors.secondary,
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: `${colors.secondary}15`,
  animation: `${float} 5s ease-in-out infinite`,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: `2px solid ${colors.secondary}30`,
    animation: `${ripple} 3s linear infinite`,
    opacity: 0,
  },
  '& svg': {
    filter: `drop-shadow(0 2px 4px ${colors.secondary}40)`,
  },
});

const CtaButton = styled(Button)({
  padding: '12px 30px',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '50px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px rgba(255, 111, 0, 0.4)`,
  },
});

const PricingCard = styled(Card)(({ theme }) => ({
  padding: '2rem',
  textAlign: 'center',
  border: `2px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&.highlighted': {
    borderColor: colors.secondary,
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${colors.secondary}20`,
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 25px -5px ${colors.secondary}20`,
  },
  '&.highlighted:hover': {
    transform: 'translateY(-10px) scale(1.03)',
  }
}));

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      icon: <RocketLaunchIcon fontSize="inherit" />,
      title: 'Blazing Fast',
      description: 'Our platform is optimized for speed and performance.',
    },
    {
      icon: <SecurityIcon fontSize="inherit" />,
      title: 'Secure',
      description: 'Enterprise-grade security to protect your data.',
    },
    {
      icon: <PeopleAltIcon fontSize="inherit" />,
      title: 'Collaborative',
      description: 'Work seamlessly with your team in real-time.',
    },
    {
      icon: <AttributionIcon fontSize="inherit" />,
      title: 'Attribution',
      description: 'Easily track sources and contributors in your project.',
    },
    {
      icon: <AirplayIcon fontSize="inherit" />,
      title: 'Cross-Platform',
      description: 'Access your work from any device.',
    },
    {
      icon: <BalanceIcon fontSize="inherit" />,
      title: 'Balanced',
      description: 'Perfect workflow balance for all team sizes.',
    },
  ];

  const userTypes = [
    {
      icon: <SchoolIcon fontSize="inherit" />,
      title: 'For Students',
      description: 'Organize projects and collaborate with classmates.',
    },
    {
      icon: <CodeIcon fontSize="inherit" />,
      title: 'For Developers',
      description: 'Build, test, and deploy apps faster.',
    },
    {
      icon: <BusinessIcon fontSize="inherit" />,
      title: 'For Business Owners',
      description: 'Manage your entire operation in one place.',
    },
    {
      icon: <WorkIcon fontSize="inherit" />,
      title: 'For Freelancers',
      description: 'Streamline your workflow and impress clients.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free Plan',
      price: '₹0',
      period: '/month',
      description: 'For personal use',
      features: ['Basic features', 'Limited storage', 'Community support'],
    },
    {
      name: 'Pro Plan',
      price: '₹499',
      period: '/month',
      description: 'For professionals',
      features: ['Advanced features', 'More storage', 'Priority support'],
      highlighted: true,
    },
    {
      name: 'Business Plan',
      price: '₹999',
      period: '/month',
      description: 'For teams',
      features: ['All features', 'Unlimited storage', '24/7 support'],
    },
  ];

  const faqs = [
    {
      question: 'What is Nexus used for?',
      answer: 'Nexus is a versatile platform that helps individuals and teams manage projects, collaborate, and streamline workflows.',
    },
    {
      question: 'Is there a free version?',
      answer: 'Yes, we offer a free plan with basic features perfect for personal use.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team at support@nexus.com or call us at +91-9876543210.',
    },
  ];

  return (
    <Box sx={{ backgroundColor: colors.background }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  animation: `${fadeIn} 1s ease-out`,
                }}
              >
                Welcome to <span style={{ color: colors.secondary }}>Nexus</span>
              </Typography>
              <Typography
                variant="h5"
                component="p"
                gutterBottom
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  animation: `${fadeIn} 1s ease-out`,
                }}
              >
                The next generation platform for your business needs.
                Powerful, flexible, and easy to use.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  animation: `${fadeIn} 1.2s ease-out`,
                  flexWrap: 'wrap',
                }}
              >
                <CtaButton
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: colors.secondary,
                    color: colors.textDark,
                  }}
                  onClick={handlePrimaryAction}
                >
                  {isAuthenticated ? 'Wellcome' : 'Get Started'}
                </CtaButton>
                <CtaButton
                  variant="outlined"
                  size="large"
                  sx={{
                    color: colors.textLight,
                    borderColor: colors.textLight,
                    '&:hover': {
                      borderColor: colors.secondary,
                      color: colors.secondary,
                      
                    },
                  }}
                 
                >
                  Learn More
                </CtaButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <AdbIcon
                sx={{
                  fontSize: '20rem',
                  opacity: 0.3,
                  position: 'absolute',
                  right: '-50px',
                  top: '40%',
                  transform: 'translateY(-80%)',
                  animation: `${float} 2s ease-in-out infinite`,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* About Section */}
      <Box sx={{ py: 8, backgroundColor: colors.background }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary, mb: 4 }}>
            What is Nexus?
          </Typography>
          <Typography variant="h6" component="p" align="center" sx={{ color: colors.textDark, maxWidth: '800px', margin: '0 auto' }}>
            Nexus is a platform that helps you manage and grow your business using smart tools. It's fast, flexible, and easy to use.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: colors.background }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: colors.primary,
              mb: 6,
            }}
          >
            Why Choose Nexus?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      maxWidth: '280px',
                      margin: '0 auto',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* User Types Section */}
      <Box sx={{ py: 8, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary, mb: 6 }}>
            Who Can Use Nexus
          </Typography>
          <Grid container spacing={4}>
            {userTypes.map((user, index) => (
              <Grid item xs={12} md={3} key={index}>
                <FeatureCard>
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      maxWidth: '280px',
                      margin: '0 auto',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    <FeatureIcon>{user.icon}</FeatureIcon>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {user.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {user.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      
      

      {/* FAQ Section */}
      <Box sx={{ py: 8, backgroundColor: '#fff' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary, mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4}>
            {faqs.map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, backgroundColor: colors.background }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary, mb: 6 }}>
            Contact Us
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <form>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    backgroundColor: colors.secondary,
                    color: colors.textDark,
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ mr: 2, color: colors.secondary }} />
                <Typography variant="body1">
                  <Link href="mailto:support@nexus.com" color="inherit">
                    support@nexus.com
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneIcon sx={{ mr: 2, color: colors.secondary }} />
                <Typography variant="body1">
                  <Link href="tel:+919876543210" color="inherit">
                    +91-9876543210
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;