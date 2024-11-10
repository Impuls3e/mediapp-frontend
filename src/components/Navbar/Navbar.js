import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
  marginRight: theme.spacing(2), // İsteğe bağlı: sağ boşluk ekleyebilirsiniz
}));

const Title = styled('div')(({ theme }) => ({
  flexGrow: 1,
  textAlign:"left",
  color: 'white',
  fontSize: theme.typography.h6.fontSize, // H6 stilini uygulamak için
  fontWeight: theme.typography.fontWeightBold, // Kalın font
}));

function Navbar() {
  let userId = 5;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Title>
              <StyledLink to="/">Home</StyledLink>
            </Title>
            <StyledLink to={`/users/${userId}`}>User</StyledLink>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
