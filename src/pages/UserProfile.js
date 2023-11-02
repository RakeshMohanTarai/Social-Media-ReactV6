import { useState } from 'react';
import styles from '../styles/settings.module.css';
//import { useLocation } from 'react-router-dom'; // here we use the state data which is contain the user info. from we get through by the home.js
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast } from 'react-toastify'; // Import the toast object
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setrequestInProgress] = useState(false);
  const { userId } = useParams();

  const navigate = useNavigate();
  const auth = useAuth();

  //console.log('userId', userId);
  // const location = useLocation();
  // console.log("location", location);
  // const { user = {} } = location.state || {}; // Check if location.state is null or undefined, and provide a default value for user

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        // Using toast here for displaying an error message.
        toast.error(response.message);
        return navigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    if (auth.user && auth.user.friends && auth.user.friends.length > 0) {
      const friends = auth.user.friends;
      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId);

      if (index !== -1) {
        return true;
      }
    }

    return false;
  };

  const handleAddFriendClick = async () => {

    setrequestInProgress(true);

    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend added successfully!');
    } else {
      toast.error(response.message);
    }

    setrequestInProgress(false);
  };

  const handleRemoveFriendClick = async () => {
    setrequestInProgress(true);

    const response = await removeFriend(userId);
    if (response.success) {

      const friendship = auth.user.friends.filter((friend) => {
      return friend.to_user._id === userId; // here we search in the friends array that the userId and the friendId is matched or not
      });
    
      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed successfully!');
    } else {
      toast.error(response.message);
    }

    setrequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
          alt="profileImage"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};


export default UserProfile;
