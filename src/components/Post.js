import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async () => {
    if (comment.trim() === '') {
      toast.error('Comment cannot be empty');
      return;
    }

    setCreatingComment(true);

    const response = await createComment(comment, post._id);

    if (response.success) {
      setComment('');
      posts.addComment(response.data.comment, post._id);
      toast.success('Comment created successfully!');
    } else {
      toast.error(response.message);
    }

    setCreatingComment(false);
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if(response.success) {
      
      if(response.data.deleted) {
        toast.warning('Like remove successfully!', {
        autoClose: 2000,
        })
      }else {
        toast.success('Like added successfully!', {
          autoClose: 2000,
        })
      }
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4926/4926585.png"
              alt="likes-icon"
            />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={styles.addCommentButton}
            onClick={handleAddComment}
            disabled={creatingComment}
          >
            {creatingComment ? 'Creating...' : 'Create comment'}
          </button>
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
