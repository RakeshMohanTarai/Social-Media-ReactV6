import { API_URLS, LOCALSTROAGE_TOKEN_KEY, getFormBody } from '../utils';

// Import necessary constants and modules from 'utils' and other sources.

const customFetch = async (url, { body, ...customConfig }) => {
  // customConfig contain the methods like 'GET' or 'POST' and it also used to contain the headers
  // Define an asynchronous function named 'customFetch' that takes a URL and optional request configuration as parameters.

  // Get the authentication token from local storage
  const token = window.localStorage.getItem(LOCALSTROAGE_TOKEN_KEY);
  // Retrieve the authentication token from the browser's local storage using the 'LOCALSTROAGE_TOKEN_KEY'.

  // Define default headers for the HTTP request
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  // Add the authentication token to the headers if it exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    // If an authentication token exists, add it to the headers with the 'Authorization' field in the format 'Bearer <token>'.
  }

  // Create the request configuration by merging custom options with default headers
  const config = {
    ...customConfig,
    headers: {
      ...headers, // here we add the default header
      ...customConfig.headers, // here we add the costumConfig header to the config
    },
  };

  // Serialize the request body to JSON if it exists
  if (body) {
    config.body = getFormBody(body);
    // If a request body exists, convert it to a JSON string and assign it to the 'body' property of the request configuration.
  }

  try {
    // Send the HTTP request using the provided URL and configuration
    const response = await fetch(url, config);
    // Use the 'fetch' function to send an HTTP request with the specified 'url' and 'config'.

    const data = await response.json();
    // Parse the response data as JSON and store it in the 'data' variable.

    if (data.success) {
      // Check if the response indicates success by inspecting the 'success' property in the response data.
      return {
        data: data.data,
        success: true,
      };
    } else {
      // If the response indicates an error, throw an error with the message from the response data.
      throw new Error(data.message);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation, such as network errors or JSON parsing errors.

    console.log('error in fetching the URL', error);
    // Log an error message to the console, indicating that there was an error in fetching the URL.

    return {
      message: error.message,
      success: false,
    };
    // Return an object with an error message and a 'success' flag set to 'false' to indicate that the request was not successful.
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await customFetch(API_URLS.signup(), {
      method: 'POST',
      body: { name, email, password, confirm_password: confirmPassword },
    });

    if (response.success) {
      // Assuming the user token is returned in the response
      console.log("&&&&", response)
      return {
        success: true,
        data: {
          token: response.data.token,
          // Other user data
        },
        currentUser: response.data.user,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// export const editProfile = async (userId, name, password, confirmPassword) => {

//       return customFetch(API_URLS.editUser(), {
//       method: 'POST',
//       body: { id: userId, name, password, confirm_password: confirmPassword },
//     });
// };

export const editProfile = async (userId, name, password, confirmPassword) => {
  try {
    const response = await customFetch(API_URLS.editUser(), {
      method: 'POST',
      body: { id: userId, name, password, confirm_password: confirmPassword },
    });

    if (response.success) {
      // Assuming the user token is returned in the response
      return {
        success: true,
        data: {
          token: response.data.token,
          // Other user data
        },
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
  });
};

// Delete a comment
export const deleteComment = async (commentId) => {
  return customFetch(API_URLS.deleteComment(commentId), {
    method: 'DELETE',
  });
};

export const toggleLike = async (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
  });
};

export const searchUsers = async (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
  });
};
