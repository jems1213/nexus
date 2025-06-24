import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  Tabs,
  Tab,
  Badge,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import {
  Edit,
  CameraAlt,
  Check,
  Close,
  Lock,
  Email,
  Person,
  Phone,
  LocationOn,
  Work,
  Event,
  Star,
  Favorite,
  Share
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Custom styled components with new color scheme
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF6F00',
    color: '#FF6F00',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(74, 20, 140, 0.15)',
  backdropFilter: 'blur(8px)',
  background: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(74, 20, 140, 0.25)'
  }
}));

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle file selection for avatar
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setTempUser({ ...user });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedUser = {
        ...tempUser,
        avatar: preview || user.avatar
      };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setEditMode(false);
      setSelectedFile(null);
      setPreview(null);
      setIsLoading(false);
      showSnackbar('Profile updated successfully!', 'success');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files?.length) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Render different profile sections based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Overview
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={editMode ? 'edit' : 'view'}
              initial={{ opacity: 0, x: editMode ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: editMode ? -20 : 20 }}
              transition={{ duration: 0.3 }}
            >
              {editMode ? (
                <Box component="form" sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={tempUser.name}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ startAdornment: <Person sx={{ mr: 1, color: '#4a148c' }} /> }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={tempUser.email}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ startAdornment: <Email sx={{ mr: 1, color: '#4a148c' }} /> }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={tempUser.phone}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: '#4a148c' }} /> }}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={tempUser.location}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, color: '#4a148c' }} /> }}
                  />
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="jobTitle"
                    value={tempUser.jobTitle}
                    onChange={handleChange}
                    margin="normal"
                    InputProps={{ startAdornment: <Work sx={{ mr: 1, color: '#4a148c' }} /> }}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={tempUser.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Box>
              ) : (
                <>
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    {user.bio}
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <InfoItem icon={<Email />} label="Email" value={user.email} />
                    <InfoItem icon={<Phone />} label="Phone" value={user.phone} />
                    <InfoItem icon={<LocationOn />} label="Location" value={user.location} />
                    <InfoItem icon={<Work />} label="Job Title" value={user.jobTitle} />
                    <InfoItem icon={<Event />} label="Member Since" value={user.joinDate} />
                  </Box>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        );
      
      case 1: // Settings
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4a148c' }}>
              Account Settings
            </Typography>
            <Button
              startIcon={<Lock sx={{ color: '#4a148c' }} />}
              variant="outlined"
              sx={{ 
                mt: 2,
                color: '#4a148c',
                borderColor: '#4a148c',
                '&:hover': {
                  backgroundColor: 'rgba(74, 20, 140, 0.08)',
                  borderColor: '#4a148c'
                }
              }}
              onClick={() => navigate('/change-password')}
            >
              Change Password
            </Button>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileCard>
          <CardHeader
            title="My Profile"
            titleTypographyProps={{ 
              variant: 'h4',
              color: '#4a148c',
              fontWeight: 700
            }}
            action={
              !editMode ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    startIcon={<Edit sx={{ color: '#4a148c' }} />}
                    onClick={handleEdit}
                    sx={{
                      color: '#4a148c',
                      borderColor: '#4a148c',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 20, 140, 0.08)',
                        borderColor: '#4a148c'
                      }
                    }}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                </motion.div>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      startIcon={<Close />}
                      onClick={handleCancel}
                      color="error"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      startIcon={<Check />}
                      onClick={handleSave}
                      sx={{
                        backgroundColor: '#FF6F00',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#FF8F00'
                        }
                      }}
                      variant="contained"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </motion.div>
                </Box>
              )
            }
          />
          
          <Divider sx={{ borderColor: 'rgba(74, 20, 140, 0.12)' }} />
          
          <CardContent>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress sx={{ color: '#FF6F00' }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  minWidth: 200,
                  position: 'relative'
                }}>
                  <motion.div
                    whileHover={{ scale: editMode ? 1.03 : 1 }}
                    style={{ position: 'relative' }}
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar
                        src={preview || user.avatar}
                        sx={{ 
                          width: 150, 
                          height: 150, 
                          mb: 2,
                          border: '3px solid #4a148c',
                          boxShadow: '0 4px 12px rgba(74, 20, 140, 0.3)'
                        }}
                      />
                    </StyledBadge>
                    
                    {editMode && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                        }}
                      >
                        <IconButton
                          sx={{ 
                            bgcolor: 'white', 
                            boxShadow: 2,
                            color: '#FF6F00',
                            '&:hover': {
                              bgcolor: '#FF6F00',
                              color: 'white'
                            }
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <CameraAlt />
                        </IconButton>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <Typography variant="h6" sx={{ mt: 1, textAlign: 'center', color: '#4a148c' }}>
                    {user.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                    {user.jobTitle}
                  </Typography>
                  
                  {!editMode && (
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      mt: 2,
                      width: '100%',
                      justifyContent: 'center'
                    }}>
                      <IconButton sx={{ color: '#FF6F00' }}>
                        <Favorite />
                      </IconButton>
                      <IconButton sx={{ color: '#4a148c' }}>
                        <Share />
                      </IconButton>
                      <IconButton sx={{ color: '#4a148c' }}>
                        <Star />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    sx={{ mb: 3 }}
                    variant={isMobile ? 'fullWidth' : 'standard'}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: '#FF6F00'
                      }
                    }}
                  >
                    <Tab label="Overview" sx={{ color: activeTab === 0 ? '#4a148c' : 'inherit' }} />
                    <Tab label="Settings" sx={{ color: activeTab === 1 ? '#4a148c' : 'inherit' }} />
                  </Tabs>
                  
                  <Divider sx={{ 
                    mb: 3,
                    borderColor: 'rgba(74, 20, 140, 0.12)'
                  }} />
                  
                  {renderTabContent()}
                </Box>
              </Box>
            )}
          </CardContent>
        </ProfileCard>
      </motion.div>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? '#4a148c' : '#FF6F00'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    p: 2, 
    borderRadius: 2,
    bgcolor: 'rgba(74, 20, 140, 0.05)',
    border: '1px solid rgba(74, 20, 140, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(74, 20, 140, 0.1)'
    }
  }}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: '50%',
      bgcolor: 'rgba(255, 111, 0, 0.1)',
      color: '#FF6F00',
      mr: 2
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body1" fontWeight="500" color="#4a148c">
        {value || 'Not provided'}
      </Typography>
    </Box>
  </Box>
);

export default Profile;