import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PostViewMeme from "./PostViewMeme";

import { axiosRes } from "../../api/axiosDefaults";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [ isMeme, setIsMeme ] = useState(false)

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
       
        setPost({ results: [post] });
        setIsMeme(post.is_meme)
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      // // Delete comments
      // await axiosReq.delete(`/comments/?post=${id}`);
  
      // Delete post
       await axiosRes.delete(`/posts/${id}`);
      
      // // Optionally, delete likes associated with the post
      // await axiosReq.delete(`/likes/?post=${id}`);
  
      // Redirect or perform any necessary actions after successful deletion
      // For example, you can redirect the user to the home page
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        { isMeme ? <PostViewMeme  {...post.results[0]} setPosts={setPost} /> :  <Post {...post.results[0]} setPosts={setPost}  /> }
       
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
          {currentUser && currentUser.id === post.results[0]?.author_id && (
          <button onClick={handleDeletePost}>Delete Post</button>
        )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;