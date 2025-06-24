import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Container,
  Chip,
  Rating,
  useMediaQuery,
  useTheme,
  styled,
  Avatar,
  Slide,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faStar, 
  faCheckCircle, 
  faClock, 
  faDollarSign,
  faLaptopCode,
  faBullhorn,
  faPenFancy,
  faPenNib,
  faUserTie,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Custom colors
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  accent: '#7c4dff',
  textLight: '#f3e5f5',
  textDark: '#212121',
  background: '#f5f5f5',
  success: '#4caf50'
};

// Service icons mapping
const serviceIcons = {
  'Web Services': faLaptopCode,
  'Marketing': faBullhorn,
  'Design': faPenFancy,
  'Writing': faPenNib,
  'Consulting': faUserTie,
  'Media': faVideo,
  'Development': faLaptopCode
};

// Styled Components
const ServiceAccordion = styled(Accordion)({
  marginBottom: '16px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: '16px 0',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
  }
});

const CustomAccordionSummary = styled(AccordionSummary)({
  padding: '16px 24px',
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    margin: '12px 0'
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    position: 'absolute',
    right: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'transform 0.3s ease'
  },
  '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
    transform: 'translateY(-50%) rotate(180deg)'
  }
});

const PriceTag = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: colors.primary,
  color: 'white',
  padding: '4px 12px',
  borderRadius: '20px',
  fontWeight: 'bold',
  marginLeft: 'auto',
  marginRight: '40px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const ServiceImage = styled(Avatar)({
  width: 80,
  height: 80,
  marginRight: 16,
  borderRadius: '8px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const services = [
  {
    id: 1,
    name: 'Website Development',
    description: 'Custom website development tailored to your business needs with responsive design',
    detailedDescription: 'Our expert developers create fully responsive, SEO-optimized websites that work perfectly across all devices. We use modern frameworks like React, Next.js, and Vue.js to deliver fast, secure, and scalable web solutions.',
    price: 999.99,
    rating: 4.9,
    reviews: 128,
    deliveryTime: '2-4 weeks',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Web Services',
    features: [
      'Responsive Design',
      'SEO Optimization',
      'CMS Integration',
      'E-commerce Functionality',
      'Performance Optimization'
    ]
  },
  {
    id: 2,
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategy including SEO, PPC, and social media',
    detailedDescription: 'Boost your online presence with our complete digital marketing solutions. We offer SEO optimization, pay-per-click advertising, social media management, and content marketing strategies tailored to your business goals.',
    price: 799.99,
    rating: 4.7,
    reviews: 95,
    deliveryTime: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Marketing',
    features: [
      'SEO Optimization',
      'PPC Campaigns',
      'Social Media Strategy',
      'Content Marketing',
      'Analytics Reporting'
    ]
  },
  {
    id: 3,
    name: 'Graphic Design',
    description: 'Professional logo design, branding, and marketing materials creation professional logo',
    detailedDescription: 'Create a strong brand identity with our professional design services. We specialize in logo design, branding packages, business cards, brochures, and all your marketing collateral needs.',
    price: 499.99,
    rating: 4.8,
    reviews: 76,
    deliveryTime: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Design',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Business Cards',
      'Brochures',
      'Social Media Graphics'
    ]
  },
  {
    id: 4,
    name: 'Content Writing',
    description: 'High-quality content creation for websites, blogs, and marketing materials',
    detailedDescription: 'Engage your audience with compelling content crafted by our professional writers. We offer website copy, blog articles, product descriptions, and marketing content that converts visitors into customers.',
    price: 299.99,
    rating: 4.6,
    reviews: 64,
    deliveryTime: '3-7 days',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Writing',
    features: [
      'Website Copy',
      'Blog Articles',
      'Product Descriptions',
      'SEO Content',
      'Editing & Proofreading'
    ]
  },
  {
    id: 5,
    name: 'IT Consulting',
    description: 'Expert IT consulting services to optimize your business technology infrastructure',
    detailedDescription: 'Optimize your technology stack with our expert IT consulting services. We analyze your current systems, recommend improvements, and help implement solutions that drive efficiency and growth.',
    price: 1199.99,
    rating: 4.9,
    reviews: 112,
    deliveryTime: 'Varies',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Consulting',
    features: [
      'Technology Audit',
      'System Architecture',
      'Cloud Solutions',
      'Security Assessment',
      'Ongoing Support'
    ]
  },
  {
    id: 6,
    name: 'Video Production',
    description: 'Professional video production services for commercials, tutorials, and more',
    detailedDescription: 'Tell your story with our professional video production services. From concept development to final editing, we create compelling videos for commercials, tutorials, social media, and corporate communications.',
    price: 899.99,
    rating: 4.7,
    reviews: 88,
    deliveryTime: '3-5 weeks',
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Media',
    features: [
      'Concept Development',
      'Script Writing',
      'Professional Shooting',
      'Editing & Effects',
      'Multiple Formats'
    ]
  },
   {
    id: 7,
    name: 'Mobile App Development',
    description: 'iOS and Android app development services',
    detailedDescription: 'From idea to launch, we build high-performance mobile apps for iOS and Android platforms. Our apps are user-friendly, fast, and scalable for future growth.',
    price: 1499.99,
    rating: 4.6,
    reviews: 95,
    deliveryTime: '4-6 weeks',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Development',
    features: [
      'iOS & Android Support',
      'Cross-Platform with Flutter/React Native',
      'API Integration',
      'App Store Deployment',
      'Maintenance & Updates'
    ]
  },
  {
    id: 8,
    name: 'Brand Identity Design',
    description: 'Professional branding and logo design services',
    detailedDescription: 'Stand out in the market with a unique brand identity. We design logos, brand guides, and visual elements that communicate your values clearly.',
    price: 299.99,
    rating: 4.9,
    reviews: 110,
    deliveryTime: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Design',
    features: [
      'Logo Design',
      'Color Palette & Typography',
      'Brand Guidelines PDF',
      'Business Card Templates',
      'Social Media Kit'
    ]
  },
  {
    id: 9,
    name: 'E-Commerce Development',
    description: 'Custom online stores with secure payment solutions',
    detailedDescription: 'We build fast, scalable, and feature-rich e-commerce platforms that convert. Includes cart, payment integration, inventory management, and more.',
    price: 1199.99,
    rating: 4.7,
    reviews: 102,
    deliveryTime: '3-5 weeks',
    image: 'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    features: [
      'Custom Storefront Design',
      'Payment Gateway Integration',
      'Product Management',
      'Secure Checkout',
      'Admin Dashboard'
    ]
  },
  {
    id: 10,
    name: 'Video Production',
    description: 'Professional video production services for commercials, tutorials, and more',
    detailedDescription: 'Tell your story with our professional video production services. From concept development to final editing, we create compelling videos for commercials, tutorials, social media, and corporate communications.',
    price: 899.99,
    rating: 4.7,
    reviews: 88,
    deliveryTime: '3-5 weeks',
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Media',
    features: [
      'Concept Development',
      'Script Writing',
      'Professional Shooting',
      'Editing & Effects',
      'Multiple Formats'
    ]
  },
];


function Services() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleOrderNow = (serviceId) => {
    navigate(`/order/${serviceId}`);
  };

  return (
    <Box sx={{ 
      backgroundColor: colors.background,
      py: 8,
      minHeight: 'calc(100vh - 64px)',
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: `linear-gradient(135deg, ${colors.primary} 100%, ${colors.accent} 100%)`,
        zIndex: 0,
       // transform: 'skewY(-4deg)',
        transformOrigin: 'top left',
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Slide direction="down" in={isVisible} timeout={500}>
          <Box textAlign="center" mb={6}>
            <Fade in={isVisible} timeout={800}>
              <Chip 
                label="SERVICES" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 'bold',
                  backgroundColor: colors.secondary,
                  color: 'white',
                  fontSize: '0.9rem',
                  padding: '4px 16px'
                }}
              />
            </Fade>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: 'common.white',
                mb: 3,
                fontSize: isMobile ? '2rem' : '2.5rem'
              }}
            >
              Our Professional Services
            </Typography>
            <Fade in={isVisible} timeout={1000}>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: 'center',
                  maxWidth: '700px',
                  margin: '0 auto',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Discover our range of premium services designed to help your business grow and succeed in the digital world.
              </Typography>
            </Fade>
          </Box>
        </Slide>

        <Box sx={{ mb: 4 }}>
          {services.map((service, index) => (
            <Grow 
              in={isVisible} 
              key={service.id}
              timeout={index * 150 + 500}
              style={{ transformOrigin: 'center top' }}
            >
              <Box mb={2}>
                <ServiceAccordion>
                  <CustomAccordionSummary
                    expandIcon={
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </motion.div>
                    }
                    sx={{
                      backgroundColor: 'white',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceImage 
                        src={service.image} 
                        alt={service.name}
                        variant="square"
                      />
                    </motion.div>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: '600', color: colors.primary }}>
                        {service.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
                        <Rating
                          value={service.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                          sx={{ color: '#ffd700', mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2 }}>
                          {service.rating} ({service.reviews} reviews)
                        </Typography>
                        <Chip
                          label={service.category}
                          size="small"
                          sx={{ 
                            backgroundColor: colors.secondary,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </Box>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PriceTag>
                        <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: 8 }} />
                        {service.price.toFixed(2)}
                      </PriceTag>
                    </motion.div>
                  </CustomAccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: '#f9f9f9', padding: 0 }}>
                    <Box sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" paragraph>
                            {service.detailedDescription}
                          </Typography>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Key Features
                          </Typography>
                          <List dense>
                            {service.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <FontAwesomeIcon 
                                      icon={faCheckCircle} 
                                      style={{ color: colors.success }} 
                                    />
                                  </ListItemIcon>
                                  <ListItemText primary={feature} />
                                </ListItem>
                              </motion.div>
                            ))}
                          </List>
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img 
                              src={service.image} 
                              alt={service.name} 
                              style={{ 
                                maxWidth: '100%', 
                                borderRadius: '8px',
                                maxHeight: '300px',
                                objectFit: 'cover'
                              }} 
                            />
                          </motion.div>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3
                      }}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon 
                              icon={faClock} 
                              style={{ 
                                color: colors.secondary, 
                                marginRight: '8px' 
                              }} 
                            />
                            <Typography variant="body2">
                              Delivery time: {service.deliveryTime}
                            </Typography>
                          </Box>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="contained"
                            size={isMobile ? "medium" : "large"}
                            sx={{
                              backgroundColor: colors.primary,
                              color: colors.textLight,
                              fontWeight: 'bold',
                              '&:hover': {
                                backgroundColor: '#5e35b1',
                              }
                            }}
                            onClick={() => handleOrderNow(service.id)}
                            startIcon={<FontAwesomeIcon icon={faDollarSign} />}
                          >
                            Order Now
                          </Button>
                        </motion.div>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </ServiceAccordion>
              </Box>
            </Grow>
          ))}
        </Box>

        <Zoom in={isVisible} timeout={1000}>
          <Box 
            textAlign="center" 
            mt={6}
            sx={{
              bgcolor: 'white',
              p: 4,
              borderRadius: '12px',
              boxShadow: 3,
              border: `2px solid ${colors.primary}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: colors.primary }}>
              Need a custom service package?
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}>
              Contact us to create a tailored solution for your specific business needs.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: colors.primary,
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
                startIcon={<FontAwesomeIcon icon={faUserTie} />}
                onClick={() => navigate('/contact')}
              >
                Request Custom Quote
              </Button>
            </motion.div>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
}

export default Services;