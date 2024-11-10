import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import { makeStyles } from "@mui/styles";
import "./Home.css";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: '#dce3fa',
    minHeight: '100vh',
    justifyContent: 'flex-start',
  },
}));

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const classes = useStyles();

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, []); // `postList` bağımlılığı kaldırıldı

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
        <PostForm userId={1} userName={"selo"} refreshPosts={refreshPosts} />
        {postList.map((post) => (
          <Post postId={post.postId} key={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
        ))}
      </div>
    );
  }
}

export default Home;
