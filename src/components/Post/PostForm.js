import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputAdornment } from '@mui/material';
import { Link } from "react-router-dom";

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Styled components
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  boxShadow: "none",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 800,
  textAlign: 'left',
  margin: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
});

function PostForm(props) {
  const { userName, userId, refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent]= useState(false);
  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post successfully created:", data);
        refreshPosts(); // Data başarılı şekilde alındığında yenileme yapılır
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleSubmit = () => {
   // Minimum uzunluk kontrolü
 
  
    if (title.length < 5 || text.length < 10) {
      alert("Title must be at least 5 characters and text must be at least 10 characters long.");
      
      return;
      }
      else {
        savePost();
      setIsSent(true);
      setTitle("");
      setText("");
      handleClick();
      }
    
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
    setIsSent(false);
  };

  const handleText = (event) => {
    setText(event.target.value);
    setIsSent(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  return (
    <div>
  
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Posted
      </Alert>
    </Snackbar>
    <StyledCard>
      
      <CardHeader
        avatar={
          <StyledLink to={`/users/${userId}`}>
            <StyledAvatar aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </StyledAvatar>
          </StyledLink>
        }
        title={
          <OutlinedInput
            id="outlined-adornment-title"
            multiline
            placeholder="title"
            inputProps={{ maxLength: 25 }}
        
            fullWidth
            value={title}
            onChange={handleTitle}
          />
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <OutlinedInput
            id="outlined-adornment-text"
            multiline
            placeholder="Text"
            inputProps={{ maxLength: 2500 }}
            fullWidth
            value={text}
            onChange={handleText}
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSubmit} >
                
                  POST
                </Button>
              </InputAdornment>
            }
          />
        </Typography>
      </CardContent>
    </StyledCard>
  </div>
    
  );
}

export default PostForm;
