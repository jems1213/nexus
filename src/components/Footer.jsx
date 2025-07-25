import * as React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Keep useNavigate
import { Link } from 'react-router-dom'; // Keep Link from react-router-dom

// MUI Social Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AdbIcon from '@mui/icons-material/Adb';

// Font Awesome Icons (no change needed here)
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

// Modified FooterLink to use react-router-dom's Link
// We will add an onClick handler to these links instead of a separate navigate call
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
    // You don't actually need useNavigate if you're using <Link> components with onClick
    // const navigate = useNavigate(); // Removed as we're handling scroll directly on Link onClick

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Scroll to top on any internal link click
    };

    return (
        <FooterContainer>
            <Container maxWidth="xl">
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
                        {/* Add onClick handler to each FooterLink */}
                        <FooterLink to="/products" onClick={handleLinkClick}>
                            Products
                        </FooterLink>
                        <FooterLink to="/pricing" onClick={handleLinkClick}>
                            Pricing
                        </FooterLink>
                        <FooterLink to="/blog" onClick={handleLinkClick}>
                            Blog
                        </FooterLink>
                        <FooterLink to="/about" onClick={handleLinkClick}>
                            About Us
                        </FooterLink>
                    </Grid>

                    {/* Column 3: Legal */}
                    <Grid item xs={6} sm={2}>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                            Legal
                        </Typography>
                        <FooterLink to="/privacy" onClick={handleLinkClick}>
                            Privacy Policy
                        </FooterLink>
                        <FooterLink to="/terms" onClick={handleLinkClick}>
                            Terms of Service
                        </FooterLink>
                        <FooterLink to="/contact" onClick={handleLinkClick}>
                            Contact
                        </FooterLink>
                    </Grid>

                    {/* Column 4: Social (external links, no change needed) */}
                    <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'center' }, mt: { xs: 4, sm: 0 } }}>
                        <Typography variant="h4" gutterBottom fontWeight={600}>
                            Connect With Us
                        </Typography>
                        <Box>
                            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                                <SocialIconButton aria-label="Facebook">
                                    <FacebookIcon />
                                </SocialIconButton>
                            </a>
                            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                                <SocialIconButton aria-label="Twitter">
                                    <TwitterIcon />
                                </SocialIconButton>
                            </a>
                            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <SocialIconButton aria-label="Instagram">
                                    <InstagramIcon />
                                </SocialIconButton>
                            </a>
                            <a href="https://www.linkedin.com/in/jems-javiya-58421634a/" target="_blank" rel="noopener noreferrer">
                                <SocialIconButton aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </SocialIconButton>
                            </a>
                            <a href="https://www.youtube.com/@TheStoryTeller-n3g/shorts" target="_blank" rel="noopener noreferrer">
                                <SocialIconButton aria-label="YouTube">
                                    <YouTubeIcon />
                                </SocialIconButton>
                            </a>
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