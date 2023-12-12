// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UrlShortening from './Components/UrlShortening';
import './styles.css';
import { Button, List, ListItem, Drawer, Typography, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import RedirectUrl from './Components/RedirectUrl';
import CustomURL from './Components/CustomURL';
import MyURLs from './Components/MyURLs';
import MyProfile from './Components/MyProfile';
const drawerWidth = 240;

const Sidebar = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: 'rgb(53, 45, 82)',
    borderRight: '2px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'none',
  },
});

const SidebarList = styled(List)({
  marginTop: '50px',
});

const StyledSidebarItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '97%',
  border: '2px solid rgb(248, 232, 113)',
  padding: '10px',
  margin: '4px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#021733',
    borderColor: '#ffffff',
  },
});

const StyledSidebarText = styled(ListItemText)({
  color: 'rgb(248, 232, 113)',
});

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  const token = localStorage.getItem('authToken');
  return (
    <Router>
      <div className='App'>
        <header className='header'>
          <h1>Authenticated URL Shortener</h1>
          <nav>
            <List className='nav'>
              <ListItem>
                <Button component={Link} to='/' color='inherit' variant='outlined'>
                  Home
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/login' color='inherit' variant='outlined' disabled={token !== null}>
                  Login
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/register' color='inherit' variant='outlined' disabled={token !== null}>
                  Register
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/logout' color='inherit' variant='outlined' onClick={handleLogout} disabled={token === null}>
                  Log out
                </Button>
              </ListItem>
            </List>
          </nav>
        </header>
        
        <Sidebar variant="permanent">
          <Typography variant="h" noWrap className='home-title'>
            HOME
          </Typography>
          <SidebarList>
            <StyledSidebarItem component={Link} to="/url-shortening" button>
              <StyledSidebarText primary="URL Shortening" />
            </StyledSidebarItem>
            <StyledSidebarItem component={Link} to="/redirect-url" button>
              <StyledSidebarText primary="Redirect URL" />
            </StyledSidebarItem>
            <StyledSidebarItem component={Link} to="/custom-url" button>
              <StyledSidebarText primary="Custom URL" />
            </StyledSidebarItem>
            <StyledSidebarItem component={Link} to="/my-urls" button>
              <StyledSidebarText primary="My URLs" />
            </StyledSidebarItem>
            <StyledSidebarItem component={Link} to="/my-profile" button>
              <StyledSidebarText primary="My Profile" />
            </StyledSidebarItem>
          </SidebarList>
        </Sidebar>

        {/* Main Content */}
        <div style={{ marginLeft: drawerWidth, padding: '20px' }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/url-shortening' element={<UrlShortening />} />
            <Route path='/redirect-url' element={<RedirectUrl />} />
            <Route path='/custom-url' element={<CustomURL/>} />
            <Route path='/my-urls' element={<MyURLs/>} />
            <Route path='/my-profile' element={<MyProfile/>} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
