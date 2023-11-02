import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { deleteComment } from '../api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Comment = ({ comment }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteComment = async () => {
    try {
      setDeleting(true);
      const response = await deleteComment(comment._id);

      if (response.success) {
        setDeleting(false);
        toast.warning('Comment deleted successfully!',{
          autoClose: 2000, // 1 second
        });
      } else {
        setDeleting(false);
        toast.error('Something went wrong', {
        autoClose: 1000,
        });
      }
    } catch (error) {
      setDeleting(false);
      toast.error('An error occurred while deleting the comment');
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
      <button
        className={`commentDeleteButton ${styles.commentDeleteButton}`}
        onClick={handleDeleteComment}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
