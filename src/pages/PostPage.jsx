import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isPostLoading, postError] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (postId) => {
    const response = await PostService.getCommentsByPostId(postId)
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>You opened post page with id = {params.id}.</h1>
      {isPostLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>
      }
      <h1>
        Comments
      </h1>
      {isCommentsLoading
        ? <Loader />
        : <div>
          {comments.map(comment =>
            <div key={comment.id} style={{marginTop: 15}}>
              <h5>{comment.email}</h5>
              <div>{comment.content}</div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default PostPage;
