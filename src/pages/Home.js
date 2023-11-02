// import { useEffect, useState } from 'react';
//import PropTypes from 'prop-types'; // PropTypes are a mechanism that ensures that the passed value is of the correct data type,
//here we set the defualt value as an array so in future in the develeoper mode if any one try to passes any other value like 'String' that will send a warning message to the developer.
import styles from '../styles/home.module.css';
// import { getPosts } from '../api';
//import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Loader, FriendsList, CreatePost } from '../components';
//import Comment from '../components';
import { usePosts } from '../hooks';
import Post from '../components/Post';


const Home = () => {
  // instead of this const Home = ({ posts }) => { , now we use that
  // console.log(posts);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState([]);
  const auth = useAuth();
  const posts = usePosts();
  console.log("pppp",auth)

  if (posts.loading) {
    return <Loader />;
  }

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

   return (
//   <div className={styles.home}>
//   <div className={styles.postsList}>
//     <CreatePost />
//     {posts.data.map((post) => (
//       <div className={styles.postWrapper} key={`post-${post._id}`}>
//         <div className={styles.postHeader}>
//           <div className={styles.postAvatar}>
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
//               alt="user-pic"
//             />
//             <div>
//               <Link
//                 to={{
//                   pathname: `/user/${post.user._id}`,
//                   state: {
//                     user: post.user,
//                   },
//                 }}
//                 className={styles.postAuthor}
//               >
//                 {post.user.name}
//               </Link>
//               <span className={styles.postTime}>a minute ago</span>
//             </div>
//           </div>
//           <div className={styles.postContent}>{post.content}</div>

//           <div className={styles.postActions}>
//             <div className={styles.postLike}>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/4926/4926585.png"
//                 alt="likes-icon"
//               />
//               <span>{post.likes.length}</span>
//             </div>

//             <div className={styles.postCommentsIcon}>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png"
//                 alt="comments-icon"
//               />
//               <span>{post.comments.length}</span>
//             </div>
//           </div>
//           <div className={styles.postCommentBox}>
//             <input placeholder="Start typing a comment" />
//           </div>

//           <div className={styles.postCommentsList}>
//             {post.comments.map((comment) => (
//               <Comment comment={comment} />
//             ))}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
//   {auth.user && <FriendsList />}
// </div>
// );
// };

<div className={styles.home}>
<div className={styles.postsList}>
  <CreatePost />
  {posts.data.map((post) => (
    <Post post={post} key={`post-${post._id}`} />
  ))}
</div>
{auth.user && <FriendsList friends={auth.user.friends}/>}
</div>
);
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
