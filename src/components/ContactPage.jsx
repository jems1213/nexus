import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  TextField,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';

// Color constants
const ORANGE = '#FF6F00';
const PURPLE = '#4a148c';
const WHITE = '#ffffff';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styled components
const GradientText = styled(Typography)({
  background: `linear-gradient(45deg, ${PURPLE} 30%, ${ORANGE} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
});

const AnimatedCard = styled(Card)({
  transition: 'all 0.3s ease',
  background: WHITE,
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 25px ${PURPLE}40`,
    animation: `${floatAnimation} 3s ease-in-out infinite`
  }
});

const PulseButton = styled(Button)({
  animation: `${pulseAnimation} 2s infinite`,
  '&:hover': {
    animation: 'none',
    transform: 'translateY(-2px)'
  }
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: PURPLE,
    },
    '&:hover fieldset': {
      borderColor: ORANGE,
      borderWidth: 2
    },
    '&.Mui-focused fieldset': {
      borderColor: ORANGE,
      borderWidth: 2
    }
  },
  '& .MuiInputLabel-root': {
    color: PURPLE,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: ORANGE,
  }
});

const SectionHeader = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar sx={{ 
          bgcolor: PURPLE, 
          color: WHITE, 
          width: 60, 
          height: 60,
          mx: 'auto',
          mb: 2,
          boxShadow: `0 4px 12px ${PURPLE}40`
        }}>
          {icon}
        </Avatar>
        <GradientText 
          variant={isMobile ? 'h4' : 'h3'} 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          {title}
        </GradientText>
        <Typography 
          variant="h6" 
          component="p" 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto',
            letterSpacing: '0.5px',
            color: PURPLE
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({ submitting: false, success: true, error: false });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({ submitting: false, success: false, error: true });
    }
  };

  const contactMethods = [
    {
      icon: <EmailIcon style={{ color: WHITE }} />,
      title: "Email Us",
      value: "contact@nexus.com",
      action: "mailto:contact@nexus.com"
    },
    {
      icon: <PhoneIcon style={{ color: WHITE }} />,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <LocationIcon style={{ color: WHITE }} />,
      title: "Visit Us",
      value: "123 Nexus Avenue Tech City",
      action: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    {
      icon: <FacebookIcon style={{ color: PURPLE }} />,
      name: "Facebook",
      url: "https://facebook.com/nexus"
    },
    {
      icon: <TwitterIcon style={{ color: PURPLE }} />,
      name: "Twitter",
      url: "https://twitter.com/nexus"
    },
    {
      icon: <LinkedInIcon style={{ color: PURPLE }} />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/nexus"
    },
    {
      icon: <InstagramIcon style={{ color: PURPLE }} />,
      name: "Instagram",
      url: "https://instagram.com/nexus"
    }
  ];

  return (
    <Box sx={{ 
      py: 8, 
      background: WHITE,
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8,
          px: isMobile ? 2 : 0
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GradientText 
              variant={isMobile ? 'h3' : 'h2'} 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}
            >
              Contact Nexus
            </GradientText>
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                mb: 4,
                fontStyle: 'italic',
                color: PURPLE
              }}
            >
              We're here to help and answer any questions you might have
            </Typography>
          </motion.div>
        </Box>

        {/* Contact Methods */}
        <SectionHeader
          title="How to Reach Us"
          subtitle="Multiple ways to connect with our team"
          icon={<EmailIcon />}
        />

        <Grid container spacing={4} sx={{ mb: 8, justifyContent: 'center' }}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCard sx={{ height: '100%' }}>
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Avatar sx={{ 
                      bgcolor: PURPLE, 
                      color: WHITE, 
                      width: 80, 
                      height: 80,
                      mb: 3,
                      border: `2px solid ${ORANGE}`,
                      '&:hover': {
                        transform: 'rotate(10deg)',
                        bgcolor: ORANGE
                      },
                      transition: 'transform 0.3s, background 0.3s'
                    }}>
                      {method.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ 
                      fontWeight: 600,
                      color: PURPLE
                    }}>
                      {method.title}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ 
                      mb: 3, 
                      whiteSpace: 'pre-line',
                      color: PURPLE
                    }}>
                      {method.value}
                    </Typography>
                    <Button
                      variant="contained"
                      href={method.action}
                      startIcon={method.icon}
                      sx={{ 
                        borderRadius: '50px',
                        px: 10,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        bgcolor: PURPLE,
                        color: WHITE,
                        '&:hover': {
                          bgcolor: ORANGE
                        }
                      }}
                    >
                      {method.title}
                    </Button>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

    

     

        {/* Social Media */}
        <SectionHeader
          title="Connect With Us"
          subtitle="Follow our social channels for updates"
          icon={<FacebookIcon />}
        />

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          mb: 8
        }}>
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}  
            >
              <Button
                variant="outlined"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={social.icon}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  borderColor: PURPLE,
                  color: PURPLE,
                  '&:hover': {
                    borderColor: ORANGE,
                    color: ORANGE,
                    borderWidth: '2px',
                    bgcolor: `${PURPLE}10`
                  }
                }}
              >
                {social.name}
              </Button>
            </motion.div>
          ))}
        </Box>

        {/* FAQ Section */}
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions"
          icon={<CheckIcon />}
        />

        <Box sx={{ mb: 8 }}>
          {[
            {
              question: "How long does it take to get a response?",
              answer: "We typically respond to all inquiries within 1-2 business days."
            },
            {
              question: "What are your support hours?",
              answer: "Our support team is available Monday through Friday, 9am to 5pm EST."
            },
            {
              question: "Where is your headquarters located?",
              answer: "Our main office is at 123 Nexus Avenue in Tech City."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCard sx={{ mb: 3 }}>
                <CardContent>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        sx={{ 
                          bgcolor: PURPLE,
                          color: WHITE,
                          fontSize: '1rem',
                          width: '36px',
                          height: '36px',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            bgcolor: ORANGE
                          },
                          transition: 'transform 0.2s, background 0.3s'
                        }} 
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600,
                          color: PURPLE
                        }}>
                          {faq.question}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ 
                          color: PURPLE,
                          mt: 1
                        }}>
                          {faq.answer}
                        </Typography>
                      }
                    />
                  </ListItem>
                </CardContent>
              </AnimatedCard>
            </motion.div>
          ))}
        </Box>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ 
            bgcolor: PURPLE,
            color: WHITE,
            borderRadius: '16px',
            p: 6,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${PURPLE} 0%, #6a1b9a 100%)`,
            boxShadow: `0 10px 30px ${PURPLE}50`,
            '&:hover': {
              boxShadow: `0 10px 40px ${PURPLE}70`
            },
            transition: 'box-shadow 0.3s'
          }}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom sx={{ 
                fontWeight: 700,
                mb: 2
              }}>
                Still Have Questions?
              </Typography>
              <Typography variant="h6" component="p" sx={{ 
                mb: 4,
                opacity: 0.9
              }}>
                Our team is ready to help you with any inquiries
              </Typography>
              <PulseButton
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  bgcolor: ORANGE,
                  color: WHITE,
                  '&:hover': {
                    bgcolor: '#e65100'
                  }
                }}
                href="#contact-form"
              >
                Contact Support <ArrowIcon sx={{ ml: 1 }} />
              </PulseButton>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactPage;