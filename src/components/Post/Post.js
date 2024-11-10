import React, { useRef, useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';

import InsertCommentIcon from '@mui/icons-material/InsertComment';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  boxShadow: "none",

}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? 'rotate(180deg)' : 'rotate(0deg)'),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 800,
  textAlign: 'left',
  margin: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
});

function Post(props) {
  const { title, text, userName, userId, postId } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const[commentList, setcommentList] = useState([]);
  const isInitialMount=useRef(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList)
  };



  const handleLike = () => {

      setLiked(!liked);


  }

  const refreshComments = () => {
    fetch("/comments?postId="+postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setcommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;

    else
    
    refreshComments();
  }, [commentList]); // `postList` bağımlılığı kaldırıldı

  return (
    <StyledCard>
      <CardHeader
        avatar={

          <StyledLink to={`/users/${userId}`}>
          <StyledAvatar aria-label="recipe">

            {userName.charAt(0).toUpperCase()}
          </StyledAvatar>
          </StyledLink>
        }
       
        title={title}
      
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites"
        
        onClick={handleLike}
        >
          <FavoriteIcon style={liked? {color:"red"}: null} />
        </IconButton>
       
     
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
          
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Comments
            
          </Typography>
          
        </CardContent>
        
      </Collapse>
    </StyledCard>
  );
}

export default Post;
