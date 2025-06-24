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
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Gavel as GavelIcon,
  Description as DescriptionIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowIcon,
  Warning as WarningIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  People as PeopleIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Color constants
const ORANGE = '#FF6F00';
const PURPLE = '#4a148c';
const WHITE = '#ffffff';

// Styled components
const GradientText = styled(Typography)({
  background: `linear-gradient(45deg, ${PURPLE} 30%, ${ORANGE} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px rgba(0,0,0,0.15)`,
    background: theme.palette.mode === 'dark' ? '#1a0a2e' : '#f9f5ff'
  }
}));

const StyledButton = styled(Button)({
  '&:hover': {
    backgroundColor: '#e65100 !important', // Darker orange on hover
    transform: 'scale(1.03)'
  },
  transition: 'transform 0.2s, background 0.3s'
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
          mb: 2
        }}>
          {icon}
        </Avatar>
        <Typography 
          variant={isMobile ? 'h4' : 'h3'} 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: 700, color: PURPLE }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto',
            color: PURPLE,
            opacity: 0.8
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};

const TermsAndConditions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.",
      icon: <CheckIcon style={{ color: WHITE }} />
    },
    {
      title: "User Responsibilities",
      content: "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use of the website.",
      icon: <PeopleIcon style={{ color: WHITE }} />
    },
    {
      title: "Intellectual Property",
      content: "All content included on this website, unless uploaded by users, is the property of our company and is protected by copyright laws.",
      icon: <DescriptionIcon style={{ color: WHITE }} />
    },
    {
      title: "Limitation of Liability",
      content: "We will not be liable for any loss or damage of any nature arising directly or indirectly from the use of, or inability to use, this website or any material contained in it.",
      icon: <WarningIcon style={{ color: WHITE }} />
    },
    {
      title: "Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established.",
      icon: <AccountBalanceIcon style={{ color: WHITE }} />
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.",
      icon: <SecurityIcon style={{ color: WHITE }} />
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: WHITE }}>
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
              sx={{ fontWeight: 800 }}
            >
              Terms and Conditions
            </GradientText>
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                mb: 4,
                color: PURPLE
              }}
            >
              Please read these terms carefully before using our website
            </Typography>
            <StyledButton
              variant="contained" 
              size="large" 
              endIcon={<ArrowIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 4,
                fontWeight: 600,
                bgcolor: ORANGE,
                color: WHITE
              }}
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            >
              View Latest Updates
            </StyledButton>
          </motion.div>
        </Box>

        {/* Effective Date */}
        <Card sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: PURPLE, 
          color: WHITE,
          boxShadow: `0 4px 10px ${PURPLE}33`
        }}>
          <Typography variant="h6" align="center">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Card>

        {/* Introduction */}
        <SectionHeader
          title="Introduction"
          subtitle="Overview of our terms of service"
          icon={<GavelIcon style={{ color: WHITE }} />}
        />

        <Typography variant="body1" paragraph sx={{ mb: 4, color: PURPLE }}>
          Welcome to our website. These terms and conditions outline the rules and regulations for the use of our company's website. By accessing this website we assume you accept these terms and conditions in full.
        </Typography>

        <Divider sx={{ my: 4, bgcolor: ORANGE, height: 2 }} />

        {/* Main Terms Sections */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: ORANGE, 
                      color: WHITE, 
                      mr: 2 
                    }}>
                      {section.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: PURPLE }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: PURPLE }}>
                    {section.content}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Terms */}
        <SectionHeader
          title="Detailed Terms"
          subtitle="Comprehensive breakdown of our terms"
          icon={<DescriptionIcon style={{ color: WHITE }} />}
        />

        <Box sx={{ mb: 8 }}>
          {[
            {
              title: "Account Registration",
              content: "Certain areas of this website may require registration. You must ensure that the details provided are correct and complete."
            },
            {
              title: "Prohibited Uses",
              content: "You may not use our website for any unlawful purpose, to upload malicious content, or in any way that could damage our systems."
            },
            {
              title: "Content Submissions",
              content: "Any material you submit to our website will be considered non-confidential and non-proprietary."
            },
            {
              title: "Links to Other Websites",
              content: "We are not responsible for the content of any linked websites and inclusion does not imply endorsement."
            },
            {
              title: "Termination",
              content: "We may terminate or suspend access to our website immediately, without prior notice, for any breach of these terms."
            },
            {
              title: "Entire Agreement",
              content: "These terms constitute the entire agreement between you and us regarding your use of the website."
            }
          ].map((term, index) => (
            <Accordion 
              key={index} 
              sx={{ 
                mb: 2,
                '&:hover': {
                  boxShadow: `0 0 0 2px ${ORANGE}`,
                  borderLeft: `4px solid ${PURPLE}`
                },
                transition: 'box-shadow 0.3s, border 0.3s'
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: PURPLE }} />}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f0ff'
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600, color: PURPLE }}>
                  {term.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: PURPLE }}>
                  {term.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Information */}
        <SectionHeader
          title="Contact Us"
          subtitle="Questions about our terms?"
          icon={<MailIcon style={{ color: WHITE }} />}
        />

        <Card sx={{ 
          bgcolor: PURPLE, 
          color: WHITE,
          borderRadius: 4,
          p: 6,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)',
          '&:hover': {
            boxShadow: `0 0 25px ${PURPLE}80`
          },
          transition: 'box-shadow 0.5s'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Need Clarification?
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
              Contact our legal team for any questions regarding these terms
            </Typography>
            <StyledButton
              variant="contained"
              size="large"
              endIcon={<ArrowIcon />}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 4,
                fontWeight: 600,
                fontSize: '1.1rem',
                bgcolor: ORANGE
              }}
            >
              Contact Legal Team
            </StyledButton>
          </motion.div>
        </Card>

        {/* Last Updated */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: PURPLE, opacity: 0.7 }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;