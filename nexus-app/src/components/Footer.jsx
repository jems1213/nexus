import * as React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

// MUI Social Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AdbIcon from '@mui/icons-material/Adb';

// ✅ Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faTags,
  faNewspaper,
  faInfoCircle,
  faShieldAlt,
  faGavel,
  faPhone
} from '@fortawesome/free-solid-svg-icons';

// Colors
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  textLight: '#f3e5f5',
  textDark: '#212121',
};

// Animations
const slideInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const spinGlow = keyframes`
  0% { transform: rotate(0deg) scale(1); box-shadow: 0 0 5px transparent; }
  50% { transform: rotate(180deg) scale(1.1); box-shadow: 0 0 15px ${colors.secondary}; }
  100% { transform: rotate(360deg) scale(1); box-shadow: 0 0 5px transparent; }
`;

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: colors.primary,
  color: colors.textLight,
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
  animation: `${slideInUp} 0.8s ease-out`,
  width: '100%',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: colors.textLight,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: colors.secondary,
    transform: 'translateX(5px)',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: colors.textLight,
  border: `1px solid ${colors.textLight}`,
  margin: theme.spacing(0, 1),
  transition: 'all 0.4s ease-in-out',
  '&:hover': {
    color: colors.secondary,
    borderColor: colors.secondary,
    animation: `${spinGlow} 0.6s forwards`,
    backgroundColor: 'transparent',
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  borderTop: `1px solid rgba(243, 229, 245, 0.2)`,
  paddingTop: theme.spacing(3),
  marginTop: theme.spacing(4),
  textAlign: 'center',
  color: 'rgba(243, 229, 245, 0.7)',
}));

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <hr style={{
          border: 'none',
          height: '1px',
          backgroundColor: '#ccc',
          transform: 'scaleY(0.3)',
          margin: '1rem 0',
        }} />

        <Grid container spacing={5} justifyContent="space-around">
          {/* Column 1: Brand */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AdbIcon sx={{ mr: 1, fontSize: '2.5rem', color: colors.secondary }} />
              <Typography variant="h4" noWrap fontFamily="monospace" fontWeight={700}>
                NEXUS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(243, 229, 245, 0.8)' }}>
              Connecting the future, one component at a time.
              <br /> We provide modern solutions for modern problems.
            </Typography>
          </Grid>

          {/* Column 2: Pages */}
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Pages
            </Typography>
            <FooterLink href="/products">
              <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: 8 }} />
              Products
            </FooterLink>
            <FooterLink href="/pricing">
              <FontAwesomeIcon icon={faTags} style={{ marginRight: 8 }} />
              Pricing
            </FooterLink>
            <FooterLink href="/blog">
              <FontAwesomeIcon icon={faNewspaper} style={{ marginRight: 8 }} />
              Blog
            </FooterLink>
            <FooterLink href="/about">
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 8 }} />
              About Us
            </FooterLink>
          </Grid>

          {/* Column 3: Legal */}
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Legal
            </Typography>
            <FooterLink href="/privacy">
              <FontAwesomeIcon icon={faShieldAlt} style={{ marginRight: 8 }} />
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms">
              <FontAwesomeIcon icon={faGavel} style={{ marginRight: 8 }} />
              Terms of Service
            </FooterLink>
            <FooterLink href="/contact">
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: 8 }} />
              Contact
            </FooterLink>
          </Grid>

          {/* Column 4: Social */}
          <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'center' }, mt: { xs: 4, sm: 0 } }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Connect With Us
            </Typography>
            <Box>
              <SocialIconButton aria-label="Facebook">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="Instagram">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="YouTube">
                <YouTubeIcon />
              </SocialIconButton>
            </Box>
          </Grid>
        </Grid>

        <CopyrightText variant="body2">
          © {new Date().getFullYear()} NEXUS. All Rights Reserved.
        </CopyrightText>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
