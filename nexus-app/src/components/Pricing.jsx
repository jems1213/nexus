import React from 'react';
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
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';

const plans = [
  {
    title: 'Basic',
    price: 0,
    description: 'Perfect for individuals just getting started.',
    features: [
      '1 Project',
      'Community Support',
      'Basic Analytics',
    ],
    highlight: false
  },
  {
    title: 'Pro',
    price: 29,
    description: 'Best for professionals and freelancers.',
    features: [
      '10 Projects',
      'Priority Email Support',
      'Advanced Analytics',
      'Custom Domain'
    ],
    highlight: true
  },
  {
    title: 'Enterprise',
    price: 99,
    description: 'For businesses needing advanced features.',
    features: [
      'Unlimited Projects',
      'Dedicated Support',
      'Team Collaboration',
      'White Labeling'
    ],
    highlight: false
  }
];

// Styled card
const StyledCard = styled(Card)(({ theme, highlight }) => ({
  borderRadius: '16px',
  boxShadow: highlight
    ? '0 8px 24px rgba(74, 20, 140, 0.4)'
    : '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: highlight ? `2px solid ${theme.palette.primary.main}` : 'none',
  transform: highlight ? 'scale(1.05)' : 'none',
  transition: '0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    transform: 'translateY(-5px)',
  },
  height: '100%', // Ensure all cards have same height
  display: 'flex',
  flexDirection: 'column'
}));

function Pricing() {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Pricing Plans
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" mb={6}>
          Choose a plan that fits your needs.
        </Typography>

        <Grid 
          container 
          spacing={4}
          justifyContent="center" // Center the grid items
        >
          {plans.map((plan, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <StyledCard highlight={plan.highlight ? 1 : 0}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {plan.title}
                    </Typography>
                    {plan.highlight && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        size="small"
                      />
                    )}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ my: 2, color: 'primary.main' }}
                  >
                    ${plan.price}
                    <Typography variant="subtitle2" component="span">
                      /month
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {plan.description}
                  </Typography>

                  <List dense>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.highlight ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    sx={{ 
                      mt: 2, 
                      borderRadius: '8px', 
                      fontWeight: 'bold',
                      alignSelf: 'flex-end' 
                    }}
                  >
                    {plan.highlight ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Pricing;