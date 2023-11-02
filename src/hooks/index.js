import { useEffect, useState } from 'react';
import { useContext, createContext } from 'react';
import { PostsContext } from '../providers/PostProvider';
//import { AuthContext } from "../providers";
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFriends,
  getPosts,
} from '../api';
import {
  setItemInLocalStroage,
  LOCALSTROAGE_TOKEN_KEY,
  removeItemFromLocalStroage,
  getItemFromLocalStroage,
} from '../utils';
import jwt from 'jwt-decode';

// Create an AuthContext to provide user authentication data
export const AuthContext = createContext(null);

export const useAuth = () => {
  //useAuth store all the user data like email, name and password
  return useContext(AuthContext);
};

export const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStroage(LOCALSTROAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];

        if (response.success) {
          friends = response.data.friends;
        }

        setUser({
          ...user,
          friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      console.log(response.data); // this will print the token
      setItemInLocalStroage(
        LOCALSTROAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStroage(
        LOCALSTROAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
  
      // After setting the user, fetch and update the user's friends
      const friendsResponse = await fetchUserFriends();
      if (friendsResponse.success) {
        setUser((prevUser) => ({
          ...prevUser,
          friends: friendsResponse.data.friends,
        }));
      }
  
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  
  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    //console.log(response);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStroage(LOCALSTROAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    const newFriends = user.friends.filter((f) => {
    return f.to_user._id !== friend.to_user._id; // here we check if the friend array have the same id or not, if they don't then we push it to the newFriends array
    })
    setUser({
      ...user,
      friends: newFriends
    });
  };

  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [posts]);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
