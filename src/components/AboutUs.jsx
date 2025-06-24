import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  IconButton
} from '@mui/material';
import {
  Groups as TeamsIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Public as GlobalIcon,
  People as CustomersIcon,
  ArrowForward as ArrowIcon,
  LinkedIn,
  Twitter,
  PlayCircleFilled
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Team Data
const teamMembers = [
  {
    name: 'Jane Doe',
    position: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fHww',
    bio: 'Jane is a visionary leader with a passion for innovation and a track record of building successful companies.'
  },
  {
    name: 'John Smith',
    position: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1496346236646-50e985b31ea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbnxlbnwwfHwwfHx8MA%3D%3D',
    bio: 'John leads our technology strategy, ensuring we leverage the latest advancements to deliver cutting-edge solutions.'
  },
  {
    name: 'Emily White',
    position: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1646802656737-84dd7d50968d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGdpcmwlMjAyMCUyMHllYXJ8ZW58MHx8MHx8fDA%3D',
    bio: 'Emily is responsible for our brand voice and market presence, connecting us with customers worldwide.'
  },
  {
    name: 'David Green',
    position: 'Director of Operations',
    image: 'https://media.istockphoto.com/id/1335023952/photo/man-in-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=2jh2xXVBUV9l6g8xEZBaKyEsO0jFEyPl8A77-4_iiLQ=',
    bio: 'David ensures the smooth execution of all our projects, maintaining efficiency and high standards.'
  }
];

// Theme Definition
const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#4a148c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6F00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#4a148c',
      secondary: '#FF6F00',
    },
    divider: 'rgba(74, 20, 140, 0.2)',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          backgroundColor: '#4a148c',
          '&:hover': { backgroundColor: '#FF6F00' },
        },
        containedSecondary: {
          backgroundColor: '#FF6F00',
          '&:hover': { backgroundColor: '#4a148c' },
        },
        outlined: {
          borderColor: '#4a148c',
          color: '#4a148c',
          '&:hover': {
            backgroundColor: 'rgba(74, 20, 140, 0.05)',
            borderColor: '#FF6F00',
            color: '#FF6F00',
          },
        },
        text: {
          color: '#4a148c',
          '&:hover': {
            backgroundColor: 'rgba(74, 20, 140, 0.05)',
            color: '#FF6F00',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          }
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF6F00',
          color: '#ffffff',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#FF6F00',
            transform: 'scale(1.2)',
          }
        }
      }
    }
  },
});

// Styled Components
const AnimatedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
    '& .member-social': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '& .member-image': {
      transform: 'scale(1.05)'
    }
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = React.useState('story');

  // Company Data
  const stats = [
    { value: '200+', label: 'Employees', icon: <TeamsIcon /> },
    { value: '50+', label: 'Countries', icon: <GlobalIcon /> },
    { value: '1M+', label: 'Customers', icon: <CustomersIcon /> },
    { value: '2015', label: 'Founded', icon: <HistoryIcon /> }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly seek new ideas and embrace change to lead the industry.',
      icon: <StarIcon />
    },
    {
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and a strong moral compass.',
      icon: <StarIcon />
    },
    {
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality in every aspect of our work.',
      icon: <StarIcon />
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster an environment of mutual respect.',
      icon: <StarIcon />
    }
  ];

  const milestones = [
    { year: '2015', event: 'Company Founded', icon: <HistoryIcon /> },
    { year: '2017', event: 'First Product Launch', icon: <StarIcon /> },
    { year: '2019', event: 'Series A Funding', icon: <PlayCircleFilled /> },
    { year: '2021', event: 'Global Expansion', icon: <GlobalIcon /> },
    { year: '2023', event: '1M+ Customers', icon: <CustomersIcon /> }
  ];

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'leadership', label: 'Leadership' }
  ];

  return (
    <ThemeProvider theme={professionalTheme}>
      <Box sx={{ pt: isMobile ? 4 : 8, pb: 8, bgcolor: 'background.default', color: 'text.primary' }}>
        <Container maxWidth="xl">

          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, px: { xs: 2, md: 12 } }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <GradientText
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Building the Future, Together
              </GradientText>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  component="p"
                  sx={{ maxWidth: 800, mx: 'auto', mb: { xs: 3, md: 4 }, color: 'text.primary' }}
                >
                  We're a passionate team dedicated to creating innovative solutions that transform industries and improve lives.
                </Typography>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowIcon />}
                  component="a"
                  href="#our-story"
                >
                  Explore Our Journey
                </Button>
              </motion.div>
            </motion.div>
          </Box>

          {/* Stats Section */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Grid container spacing={isMobile ? 4 : 10} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}> {/* Adjusted xs and sm */}
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card sx={{
                      height: '100%',
                      width: '100%', // Changed from 140% to 100% for responsiveness
                      p: { xs: 2, md: 3 }, // Adjusted padding for smaller screens
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                      }
                    }}>
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Avatar sx={{
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          width: { xs: 50, md: 60 }, // Responsive avatar size
                          height: { xs: 50, md: 60 }, // Responsive avatar size
                          mx: 'auto',
                          mb: { xs: 1.5, md: 2 } // Adjusted margin
                        }}>
                          {stat.icon}
                        </Avatar>
                      </motion.div>
                      <Typography variant={isMobile ? 'h5' : 'h4'} component="div" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant={isMobile ? 'body2' : 'subtitle1'} sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}> {/* Stack direction responsive */}
              {tabs.map((tab) => (
                <motion.div
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeTab === tab.id ? 'contained' : 'text'}
                    onClick={() => setActiveTab(tab.id)}
                    color={activeTab === tab.id ? 'primary' : 'inherit'}
                    sx={{
                      color: activeTab === tab.id ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        color: activeTab === tab.id ? 'primary.contrastText' : 'text.secondary',
                      }
                    }}
                  >
                    {tab.label}
                  </Button>
                </motion.div>
              ))}
            </Stack>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'story' && (
                  <Box id="our-story">
                    <Grid container spacing={6} alignItems="center">
                      <Grid item xs={12} md={6}>
                        <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                        >
                          <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" gutterBottom sx={{ mb: { xs: 2, md: 3 }, color: 'text.primary' }}>
                            Our Humble Beginnings
                          </Typography>
                          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: { xs: 2, md: 3 }, color: 'text.primary' }}>
                            Founded in <strong>2015</strong>, we started as a small team with a big vision. What began as three people working in a garage has grown into an international company serving customers worldwide.
                          </Typography>
                          <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: { xs: 2, md: 3 }, color: 'text.primary' }}>
                            Our first product revolutionized how small businesses manage operations, and we've been pushing boundaries ever since.
                          </Typography>
                        </motion.div>
                      </Grid>
                    
                    </Grid>
                  </Box>
                )}

                {activeTab === 'mission' && (
                  <Box>
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={6}>
                        <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 }}
                        >
                          <Card sx={{ height: '100%', p: { xs: 3, md: 4 } }}>
                            <motion.div
                              whileHover={{ rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, mb: { xs: 2, md: 3 } }}>
                                <StarIcon />
                              </Avatar>
                            </motion.div>
                            <Typography variant={isMobile ? 'h5' : 'h4'} component="h3" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                              Our Mission
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: 'text.primary' }}>
                              To empower businesses and individuals through innovative technology solutions that simplify complexity and drive meaningful progress.
                            </Typography>
                          </Card>
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <motion.div
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.2 }}
                        >
                          <Card sx={{ height: '100%', p: { xs: 3, md: 4 } }}>
                            <motion.div
                              whileHover={{ rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, mb: { xs: 2, md: 3 } }}>
                                <GlobalIcon />
                              </Avatar>
                            </motion.div>
                            <Typography variant={isMobile ? 'h5' : 'h4'} component="h3" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                              Our Vision
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: 'text.primary' }}>
                              To create a world where technology seamlessly enhances every aspect of work and life, making complex tasks simple and enabling people to focus on what truly matters.
                            </Typography>
                          </Card>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeTab === 'leadership' && (
                  <Box>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" gutterBottom sx={{ fontWeight: 700, mb: { xs: 4, md: 6 }, textAlign: 'center', color: 'text.primary' }}>
                        Meet Our Leadership Team
                      </Typography>
                    </motion.div>
                    <Grid container spacing={4} justifyContent="center">
                      {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Adjusted grid distribution */}
                          <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <AnimatedCard sx={{ width: '100%', maxWidth: 340 }}> {/* Added maxWidth for better control on larger screens */}
                              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                <Box sx={{
                                  height: 300,
                                  position: 'relative',
                                  overflow: 'hidden',
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 4
                                }}>
                                  <Box
                                    component="img"
                                    className="member-image"
                                    src={member.image}
                                    alt={member.name}
                                    sx={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      transition: 'transform 0.5s ease',
                                      objectPosition: 'top center'
                                    }}
                                  />
                                  <Box className="member-social" sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    bgcolor: 'rgba(74, 20, 140, 0.7)',
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transform: 'translateY(20px)',
                                    transition: 'all 0.3s ease'
                                  }}>
                                    <IconButton><LinkedIn /></IconButton>
                                    <IconButton><Twitter /></IconButton>
                                  </Box>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'text.primary' }}>
                                    {member.name}
                                  </Typography>
                                  <Typography variant="subtitle1" sx={{ color: 'secondary.main' }} gutterBottom>
                                    {member.position}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                    {isMobile ? member.bio.substring(0, 70) + '...' : member.bio.substring(0, 100) + '...'} {/* Shorter bio on mobile */}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </AnimatedCard>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </Box>


          {/* Milestones Section */}
          <Box sx={{ mb: { xs: 8, md: 10 }, bgcolor: 'rgba(74, 20, 140, 0.03)', py: { xs: 4, md: 6 } }}> {/* Added responsive padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" gutterBottom sx={{ fontWeight: 700, mb: { xs: 4, md: 6 }, textAlign: 'center', color: 'text.primary' }}>
                Our Journey
              </Typography>
            </motion.div>
            <Box sx={{
              position: 'relative',
              px: { xs: 2, sm: 0 }, // Adjust horizontal padding for timeline on mobile

              '&::before': {
                content: '""', position: 'absolute', top: 0,
                left: { xs: 30, sm: '50%' }, // Responsive timeline line position
                transform: { xs: 'none', sm: 'translateX(-50%)' }, // Adjust transform for mobile
                width: 4, height: '100%', bgcolor: 'primary.main',
              }
            }}>
              {milestones.map((milestone, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    pl: { xs: 8, sm: 0 }, // Adjusted padding for mobile text
                    pr: { xs: 2, sm: 0 }, // Adjusted padding for mobile text
                    mb: { xs: 4, md: 6 }, // Responsive margin-bottom
                    textAlign: { xs: 'left', sm: index % 2 === 0 ? 'right' : 'left' }, // Align text left/right on desktop, left on mobile

                    '&::before': {
                      content: '""', position: 'absolute', top: 8, // Adjust dot position
                      left: { xs: 26, sm: '50%' }, // Responsive dot position
                      transform: { xs: 'none', sm: 'translateX(-50%)' }, // Adjust transform for mobile
                      width: 20, height: 20, borderRadius: '50%',
                      bgcolor: 'primary.main', zIndex: 1
                    }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -20 : 20) }} // No horizontal animation on mobile
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }} // Slightly less scale for subtle effect
                  >
                    <Card sx={{
                      maxWidth: { xs: '100%', sm: '45%' }, // Max width for card
                      ml: { xs: 0, sm: index % 2 === 0 ? 0 : 'auto' }, // Adjust margin for alignment
                      mr: { xs: 0, sm: index % 2 === 0 ? 'auto' : 0 }, // Adjust margin for alignment
                      width: '100%' // Ensure card takes full width on mobile
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: { xs: 'flex-start', sm: index % 2 === 0 ? 'flex-end' : 'flex-start' } }}> {/* Align icon/year */}
                          <motion.div
                            whileHover={{ rotate: 10 }}
                          >
                            {milestone.icon}
                          </motion.div>
                          <Typography variant="h6" component="span" sx={{ ml: 1, fontWeight: 700, color: 'primary.main' }}>
                            {milestone.year}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                          {milestone.event}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>
              ))}
            </Box>
          </Box>
          {/* CTA Section */}
          <Box sx={{
            bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 4, p: { xs: 4, md: 6 }, textAlign: 'center',
            backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)',
            position: 'relative', overflow: 'hidden',
            '&::before': { content: '""', position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' },
            '&::after': { content: '""', position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" gutterBottom sx={{ fontWeight: 800, position: 'relative', zIndex: 1, color: 'primary.contrastText' }}>
                Join Us on Our Mission
              </Typography>
              <Typography variant={isMobile ? 'body1' : 'h6'} component="p" sx={{ mb: { xs: 3, md: 4 }, opacity: 0.9, position: 'relative', zIndex: 1, color: 'primary.contrastText' }}>
                We're always looking for talented individuals to join our growing team.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ position: 'relative', zIndex: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    endIcon={<ArrowIcon />}
                  >
                    View Open Positions
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    color="inherit"
                    sx={{ borderColor: 'primary.contrastText', color: 'primary.contrastText', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'secondary.main', color: 'secondary.main' } }}
                  >
                    Contact Our Team
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUsPage;