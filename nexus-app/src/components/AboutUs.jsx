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
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Groups as GroupsIcon,           // Corrected import
  LocationOn as LocationIcon,
  History as HistoryIcon,
  Star as StarIcon,
  EmojiEvents as AchievementsIcon,
    Star as ValuesIcon,  // This is the ValuesIcon definition

  ArrowForward as ArrowIcon,
  TrendingUp as TrendingUpIcon,
  Public as PublicIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
// Team member data


// Company milestones
const milestones = [
  { year: '2015', event: 'Company Founded', icon: <HistoryIcon color="primary" /> },
  { year: '2017', event: 'First Product Launch', icon: <StarIcon color="primary" /> },
  { year: '2019', event: 'Series A Funding', icon: <TrendingUpIcon color="primary" /> },
  { year: '2021', event: 'Global Expansion', icon: <PublicIcon color="primary" /> },
  { year: '2023', event: '1M+ Customers', icon: <PeopleIcon color="primary" /> }
];

// Custom styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

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
          bgcolor: theme.palette.primary.main, 
          color: 'white', 
          width: 60, 
          height: 60,
          mx: 'auto',
          mb: 2
        }}>
          {icon}
        </Avatar>
        <Typography 
          variant={isMobile ? 'h4' : 'h3'} 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
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
            <Typography 
              variant={isMobile ? 'h3' : 'h2'} 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              About Our Company
            </Typography>
            <Typography 
              variant="h5" 
              component="p" 
              color="text.secondary"
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                mb: 4
              }}
            >
              Building innovative solutions to transform your digital experience
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 4,
                fontWeight: 600
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </Box>

        {/* Our Story Section */}
        <SectionHeader
          title="Our Story"
          subtitle="How we started and where we're going"
          icon={<HistoryIcon />}
        />

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="body1" paragraph>
                Founded in 2015, our company began as a small startup with a big vision. 
                What started as three people working in a garage has grown into an 
                international team of over 200 professionals.
              </Typography>
              <Typography variant="body1" paragraph>
                We've always believed that technology should solve real problems for 
                real people. Our first product revolutionized the way small businesses 
                manage their operations, and we haven't looked back since.
              </Typography>
              <Typography variant="body1" paragraph>
                Today, we serve customers in over 50 countries and continue to push 
                boundaries in our industry. Our journey is just beginning, and we're 
                excited for what the future holds.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our team"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: 3
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Our Team Section */}
      
        {/* Our Values Section */}
        <SectionHeader
          title="Our Values"
          subtitle="The principles that guide everything we do"
          icon={<ValuesIcon />}
        />

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              title: 'Innovation',
              description: 'We constantly push boundaries to create groundbreaking solutions.'
            },
            {
              title: 'Integrity',
              description: 'We do what\'s right, even when no one is watching.'
            },
            {
              title: 'Customer Focus',
              description: 'Our customers are at the heart of every decision we make.'
            },
            {
              title: 'Collaboration',
              description: 'We believe the best results come from working together.'
            }
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCard>
                  <CardContent sx={{ textAlign: 'center', minHeight: 200 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      bgcolor: 'primary.light', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <StarIcon color="primary" />
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Milestones Section */}
        <SectionHeader
          title="Our Journey"
          subtitle="Key milestones in our company history"
          icon={<AchievementsIcon />}
        />

        <Box sx={{ 
          position: 'relative',
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: '100%',
            bgcolor: 'primary.main',
            [theme.breakpoints.down('sm')]: {
              left: 30
            }
          }
        }}>
          {milestones.map((milestone, index) => (
            <Box 
              key={index} 
              sx={{ 
                position: 'relative',
                pl: { xs: 8, sm: 12 },
                pr: { xs: 2, sm: 0 },
                mb: 4,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: { xs: 26, sm: '50%' },
                  transform: { sm: 'translateX(-50%)' },
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  zIndex: 1
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  maxWidth: { sm: '45%' },
                  ml: { sm: index % 2 === 0 ? 0 : 'auto' },
                  mr: { sm: index % 2 === 0 ? 'auto' : 0 }
                }}>
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      {milestone.icon}
                      <Typography 
                        variant="h6" 
                        component="span" 
                        sx={{ 
                          ml: 1,
                          fontWeight: 700,
                          color: 'primary.main'
                        }}
                      >
                        {milestone.year}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {milestone.event}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        {/* CTA Section */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: 4,
          p: 6,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to join our journey?
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
              We're always looking for talented individuals to join our team.
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
              View Open Positions
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;