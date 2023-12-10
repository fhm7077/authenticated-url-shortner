// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import './styles.css' ;
import { Button, List, ListItem } from '@mui/material';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='header'>
          <h1>Authenticated URL Shortener</h1>
          <nav>
            <List className='nav' >
              <ListItem>
                <Button component={Link} to='/' color='inherit' variant='outlined'>
                  Home
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/login' color='inherit' variant='outlined'>
                  Login
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/register' color='inherit' variant='outlined'>
                  Register
                </Button>
              </ListItem>
              <ListItem>
                <Button component={Link} to='/logout' color='inherit' variant='outlined'>
                  Log out
                </Button>
              </ListItem>
            </List>
          </nav>
        </header>

        <div className='container'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/logout' element={<Logout />} /> */}
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
