import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { toast } from 'react-toastify'; // Import the toast object
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true)

    const response = await addPost(post);
    
    if(response.success) {
      setPost('');
      posts.addPostToState(response.data.post)
      toast.success('Post created successfully!')  
    }else {
     toast.error(response.message)
    }

    setAddingPost(false)
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder='Write the post here...'
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
