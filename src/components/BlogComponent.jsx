import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Chip,
  Avatar,
  IconButton,
  Divider,
  TextField,
  Tabs,
  Tab,
  Fade,
  Grow,
  useTheme,
  Skeleton,
  Stack,
  Modal
} from '@mui/material';
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  Comment as CommentIcon,
  Search,
  FilterList,
  TrendingUp,
  Schedule,
  Visibility,
  ArrowRightAlt,
  MoreHoriz,
  Close
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Style for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: '60%' },
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const BlogComponent = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Sample blog data (same as yours)
  const blogPosts = [
        {
          id: 1,
          title: 'The Future of Web Development in 2024',
          excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.',
          author: {
            name: 'Sarah Johnson',
            avatar: '/avatar1.jpg',
            role: 'Senior Developer'
          },
          image: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          tags: ['Technology', 'Web Dev', 'Trends'],
          date: '2024-03-15',
          readTime: '5 min read',
          views: 1243,
          likes: 56,
          comments: [
            { user: 'DevGuy', text: 'Great insights!', date: '2024-03-16' },
            { user: 'CodeMaster', text: 'Looking forward to trying these technologies.', date: '2024-03-17' }
          ]
        },
        {
          id: 2,
          title: 'Mastering React Hooks: A Comprehensive Guide',
          excerpt: 'Everything you need to know about React Hooks to build better applications.',
          content: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
          author: {
            name: 'Mike Chen',
            avatar: '/avatar2.jpg',
            role: 'React Expert'
          },
          image: 'https://images.unsplash.com/photo-1687603917313-ccae1a289a9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9kZWpzfGVufDB8fDB8fHww',
          tags: ['React', 'JavaScript', 'Frontend'],
          date: '2024-03-10',
          readTime: '8 min read',
          views: 2876,
          likes: 124,
          comments: [
            { user: 'ReactFan', text: 'This helped me so much!', date: '2024-03-11' },
            { user: 'WebDev', text: 'Clear and concise explanations.', date: '2024-03-12' }
          ]
        },
        {
          id: 3,
          title: 'The Power of CSS Grid in Modern Layouts',
          excerpt: 'How CSS Grid can revolutionize your approach to web layouts and design systems.',
          content: 'Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.',
          author: {
            name: 'Emma Davis',
            avatar: '/avatar3.jpg',
            role: 'CSS Specialist'
          },
          image: 'https://images.unsplash.com/photo-1699874944641-c8f5f7c7f8a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFtb3xlbnwwfHwwfHx8MA%3D%3D',
          tags: ['CSS', 'Design', 'Frontend'],
          date: '2024-03-05',
          readTime: '6 min read',
          views: 1892,
          likes: 78,
          comments: [
            { user: 'DesignLover', text: 'Game changer for my projects!', date: '2024-03-06' }
          ]
        },
        {
          id: 4,
          title: 'Building Scalable Backends with Node.js',
          excerpt: 'Best practices and patterns for creating robust and scalable Node.js applications.',
          content: 'Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.',
          author: {
            name: 'David Wilson',
            avatar: '/avatar4.jpg',
            role: 'Backend Architect'
          },
          image: 'https://images.unsplash.com/photo-1727160918058-32db8070aabb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5hbW98ZW58MHx8MHx8fDA%3D',
          tags: ['Node.js', 'Backend', 'Scalability'],
          date: '2024-02-28',
          readTime: '10 min read',
          views: 3421,
          likes: 145,
          comments: []
        },
        {
          id: 5,
          title: 'Mobile-First Design: Why It Matters',
          excerpt: 'Understanding the importance of mobile-first design in today\'s digital landscape.',
          content: 'Mobile-first design is no longer optional - it\'s essential. With over 60% of web traffic coming from mobile devices, designing for smaller screens first ensures your content is accessible to the majority of your audience. This approach forces you to prioritize content and create streamlined user experiences that work well across all devices.',
          author: {
            name: 'Lisa Wong',
            avatar: '/avatar5.jpg',
            role: 'UX Designer'
          },
          image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
          tags: ['UX', 'Mobile', 'Design'],
          date: '2024-02-20',
          readTime: '7 min read',
          views: 2150,
          likes: 92,
          comments: [
            { user: 'UXEnthusiast', text: 'Completely changed my design process!', date: '2024-02-21' }
          ]
        },
        {
          id: 6,
          title: 'The Complete Guide to API Security',
          excerpt: 'Essential security practices every developer should implement for their APIs.',
          content: 'API security is critical in today\'s interconnected applications. This guide covers authentication methods like OAuth 2.0 and JWT, rate limiting to prevent abuse, input validation to stop injection attacks, and proper error handling that doesn\'t leak sensitive information. Implementing these practices will significantly reduce your API\'s vulnerability to common attacks.',
          author: {
            name: 'James Peterson',
            avatar: '/avatar6.jpg',
            role: 'Security Engineer'
          },
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBpfGVufDB8fDB8fHww',
          tags: ['API', 'Security', 'Backend'],
          date: '2024-02-15',
          readTime: '12 min read',
          views: 2987,
          likes: 134,
          comments: [
            { user: 'DevSecOps', text: 'Great comprehensive guide!', date: '2024-02-16' },
            { user: 'BackendDev', text: 'Would love more examples of JWT implementation.', date: '2024-02-17' }
          ]
        }
      ];

 useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleCommentSubmit = (postId) => {
    if (commentText.trim()) {
      console.log(`Comment submitted for post ${postId}: ${commentText}`);
      setCommentText('');
    }
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{
      py: 8,
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header Section with Purple Gradient */}
        <Box sx={{
          mb: 6,
          textAlign: 'center',
          animation: `${fadeIn} 0.5s ease-out`,
          width: '100%',
          background: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)',
          p: 6,
          borderRadius: 3,
          color: 'white',
          boxShadow: 3
        }}>
          <Chip
            label="Blog"
            sx={{
              mb: 2,
              fontWeight: 600,
              px: 1,
              height: 24,
              backgroundColor: '#FF6F00',
              color: 'white'
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              lineHeight: 1.2
            }}
          >
            Insights & Tutorials
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              opacity: 0.9
            }}
          >
            Discover the latest trends, best practices, and expert knowledge in web development
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Box sx={{
          mb: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          width: '100%',
          maxWidth: '1200px'
        }}>
          <TextField
            fullWidth
            placeholder="Search articles, tags, or authors..."
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: '#4a148c' }} />,
              sx: {
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[1],
                '&:hover': {
                  boxShadow: theme.shadows[2]
                }
              }
            }}
          />
          
          <Box sx={{
            display: 'flex',
            gap: 2,
            width: { xs: '100%', md: 'auto' }
          }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderRadius: 3,
                px: 3,
                whiteSpace: 'nowrap',
                borderColor: '#4a148c',
                color: '#4a148c',
                '&:hover': {
                  borderColor: '#4a148c',
                  backgroundColor: 'rgba(74, 20, 140, 0.08)'
                }
              }}
            >
              Filters
            </Button>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FF6F00',
                  height: 3,
                  borderRadius: 3
                },
                '& .MuiTab-root': {
                  minHeight: 'auto',
                  padding: '6px 12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  '&.Mui-selected': {
                    color: '#4a148c'
                  }
                }
              }}
            >
              <Tab label="All" />
              <Tab label="Popular" icon={<TrendingUp sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Recent" icon={<Schedule sx={{ fontSize: 18 }} />} iconPosition="start" />
            </Tabs>
          </Box>
        </Box>

        {/* Blog Posts Grid */}
        {loading ? (
          <Grid container spacing={4} justifyContent="center">
            {/* Skeleton Loading */}
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3,
                  maxWidth: 345
                }}>
                  <Skeleton 
                    variant="rectangular" 
                    height={200} 
                    sx={{ 
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12
                    }} 
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Skeleton width="60%" height={20} />
                        <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                      </Box>
                    </Box>
                    <Skeleton height={28} width="90%" sx={{ mb: 1 }} />
                    <Skeleton height={20} width="100%" sx={{ mb: 1 }} />
                    <Skeleton height={20} width="80%" sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Skeleton width={60} height={24} />
                      <Skeleton width={60} height={24} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Skeleton width={100} height={20} />
                      <Skeleton width={80} height={20} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredPosts.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Grow in timeout={500}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    boxShadow: theme.shadows[1],
                    maxWidth: 345,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                      sx={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        objectFit: 'cover'
                      }}
                    />
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                        <Avatar
                          src={post.author.avatar}
                          alt={post.author.name}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#4a148c',
                            color: 'white'
                          }}
                        >
                          {post.author.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {post.author.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(post.date)}
                          </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          size="small"
                          onClick={() => toggleBookmark(post.id)}
                          sx={{ color: bookmarkedPosts.includes(post.id) ? '#FF6F00' : 'inherit' }}
                        >
                          {bookmarkedPosts.includes(post.id) ? (
                            <Bookmark fontSize="small" />
                          ) : (
                            <BookmarkBorder fontSize="small" />
                          )}
                        </IconButton>
                      </Box>

                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          flex: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#4a148c'
                          }
                        }}
                        onClick={() => handleOpenModal(post)}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ mb: 2 }}
                      >
                        {post.excerpt}
                      </Typography>
                      
                      <Button
                        variant="text"
                        onClick={() => handleOpenModal(post)}
                        endIcon={<ArrowRightAlt />}
                        sx={{
                          fontWeight: 600,
                          alignSelf: 'flex-start',
                          px: 0,
                          mb: 2,
                          color: '#4a148c',
                          '&:hover': { 
                            bgcolor: 'transparent',
                            color: '#FF6F00'
                          }
                        }}
                      >
                        Read More
                      </Button>

                      <Box sx={{ mb: 2, mt: 'auto' }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {post.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderRadius: 1,
                                fontSize: '0.7rem',
                                height: 24,
                                borderColor: '#4a148c',
                                color: '#4a148c',
                                '&:hover': {
                                  bgcolor: '#4a148c',
                                  color: 'white'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => toggleLike(post.id)}
                            sx={{
                              color: likedPosts.includes(post.id) ? '#FF6F00' : 'inherit',
                              p: 0.5
                            }}
                          >
                            {likedPosts.includes(post.id) ? (
                              <Favorite fontSize="small" />
                            ) : (
                              <FavoriteBorder fontSize="small" />
                            )}
                          </IconButton>
                          <Typography variant="caption">
                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                          </Typography>
                          
                          <IconButton size="small" sx={{ p: 0.5, ml: 1 }}>
                            <CommentIcon fontSize="small" sx={{ color: '#4a148c' }} />
                          </IconButton>
                          <Typography variant="caption">
                            {post.comments.length}
                          </Typography>
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            animation: `${fadeIn} 0.5s ease-out`,
            width: '100%'
          }}>
            <Typography variant="h5" gutterBottom>
              No articles found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filters
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setSearchQuery('')}
              sx={{ 
                borderRadius: 3,
                borderColor: '#4a148c',
                color: '#4a148c',
                '&:hover': {
                  borderColor: '#4a148c',
                  backgroundColor: 'rgba(74, 20, 140, 0.08)'
                }
              }}
            >
              Clear search
            </Button>
          </Box>
        )}

        {/* Load More Button */}
        {!loading && filteredPosts.length > 0 && (
          <Box sx={{ mt: 6, textAlign: 'center', width: '100%' }}>
            <Button 
              variant="contained"
              size="large"
              sx={{ 
                px: 6,
                borderRadius: 3,
                fontWeight: 600,
                backgroundColor: '#4a148c',
                '&:hover': {
                  backgroundColor: '#5e35b1',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Load More Articles
            </Button>
          </Box>
        )}
      </Container>
      
      {/* Blog Post Modal */}
      <Modal
        open={!!selectedPost}
        onClose={handleCloseModal}
        aria-labelledby="blog-post-modal-title"
        aria-describedby="blog-post-modal-description"
        closeAfterTransition
      >
        <Fade in={!!selectedPost}>
          <Box sx={modalStyle}>
            {selectedPost && (
              <>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseModal}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: '#4a148c',
                  }}
                >
                  <Close />
                </IconButton>
                <Typography id="blog-post-modal-title" variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2, color: '#4a148c' }}>
                  {selectedPost.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    src={selectedPost.author.avatar} 
                    alt={selectedPost.author.name} 
                    sx={{ 
                      width: 48, 
                      height: 48,
                      bgcolor: '#4a148c'
                    }} 
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedPost.author.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{`${formatDate(selectedPost.date)} · ${selectedPost.readTime}`}</Typography>
                  </Box>
                </Box>

                <CardMedia
                  component="img"
                  height="300"
                  image={selectedPost.image}
                  alt={selectedPost.title}
                  sx={{ 
                    borderRadius: 2, 
                    mb: 3,
                    border: '2px solid #4a148c'
                  }}
                />

                <Typography id="blog-post-modal-description" variant="body1" paragraph sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                  {selectedPost.content}
                </Typography>

                <Divider sx={{ 
                  my: 3,
                  borderColor: '#4a148c',
                  opacity: 0.3
                }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#4a148c' }}>
                  Comments ({selectedPost.comments.length})
                </Typography>
                
                {selectedPost.comments.length > 0 ? (
                  <Stack spacing={2} sx={{ mb: 2 }}>
                    {selectedPost.comments.map((comment, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 1.5, 
                            bgcolor: '#4a148c',
                            color: 'white'
                          }}>
                            {comment.user.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{comment.user}</Typography>
                            <Typography variant="caption" color="text.secondary">{formatDate(comment.date)}</Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ pl: '44px' }}>{comment.text}</Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    No comments yet. Be the first to comment!
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a comment..."
                    size="small"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{ 
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#4a148c',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4a148c',
                        },
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleCommentSubmit(selectedPost.id)}
                    disabled={!commentText.trim()}
                    sx={{ 
                      borderRadius: 2,
                      backgroundColor: '#FF6F00',
                      '&:hover': {
                        backgroundColor: '#FF8F00'
                      }
                    }}
                  >
                    Post Comment
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BlogComponent;