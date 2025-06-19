import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  styled,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';

// Custom colors
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  textLight: '#f3e5f5',
  textDark: '#212121',
  background: '#f5f5f5'
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const ProductCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    '& .product-image': {
      transform: 'scale(1.05)'
    }
  }
});

const ProductImage = styled(CardMedia)({
  height: 200,
  transition: 'transform 0.3s ease',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)'
  }
});

const ViewButton = styled(Button)({
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
  }
});

const services = [
  {
    id: 1,
    name: 'Website Development',
    description: 'Custom website development tailored to your business needs with responsive design',
    price: 999.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Web Services'
  },
  {
    id: 2,
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategy including SEO, PPC, and social media',
    price: 799.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Marketing'
  },
  {
    id: 3,
    name: 'Graphic Design',
    description: 'Professional logo design, branding, and marketing materials creation',
    price: 499.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Design'
  },
  {
    id: 4,
    name: 'Content Writing',
    description: 'High-quality content creation for websites, blogs, and marketing materials',
    price: 299.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Writing'
  },
  {
    id: 5,
    name: 'IT Consulting',
    description: 'Expert IT consulting services to optimize your business technology infrastructure',
    price: 1199.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Consulting'
  },
  {
    id: 6,
    name: 'Video Production',
    description: 'Professional video production services for commercials, tutorials, and more',
    price: 899.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Media'
  }
];

function Services() {
  const navigate = useNavigate();

  const handleViewDetails = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Box sx={{ 
      backgroundColor: colors.background,
      py: 8,
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: colors.primary,
            mb: 6,
            textAlign: 'center',
            animation: `${fadeIn} 0.5s ease-out`
          }}
        >
          Our Professional Services
        </Typography>

        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id} sx={{ display: 'flex' }}>
              <ProductCard sx={{ height: '100%' }}>
                <Box sx={{ position: 'relative' }}>
                  <ProductImage
                    className="product-image"
                    image={service.image}
                    title={service.name}
                  />
                  <Chip
                    label={service.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: colors.secondary,
                      color: colors.textDark,
                      fontWeight: 'bold'
                    }}
                  />
                  <Chip
                    label={`${service.rating} ★`}
                    size="small"
                    icon={<FontAwesomeIcon icon={faStar} style={{ color: '#ffd700' }} />}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ 
                    fontSize: '1.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {service.description}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.primary }}>
                    ${service.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <ViewButton
                    variant="contained"
                    sx={{
                      backgroundColor: colors.primary,
                      color: colors.textLight,
                      '&:hover': {
                        backgroundColor: '#5e35b1'
                      }
                    }}
                    onClick={() => handleViewDetails(service.id)}
                    startIcon={<FontAwesomeIcon icon={faEye} />}
                  >
                    View Details
                  </ViewButton>
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
