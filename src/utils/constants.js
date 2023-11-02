const API_ROOT = 'https://codeial.codingninjas.com:8000/api/v2/';

// API URLs for different endpoints
export const API_URLS = {
  login: () => `${API_ROOT}/users/login`, // URL for user login
  signup: () => `${API_ROOT}/users/signup`, // URL for user signup
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`, // URL for fetching posts with pagination
  createPost: () => `${API_ROOT}/posts/create`, // URL for creating a new post
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`, // URL for creating a friendship
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`, // URL for fetching user's friends
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`, // URL for removing a friendship
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // URL for toggling a like on a post or comment
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`, // URL for fetching likes on a post or comment
  comment: () => `${API_ROOT}/comments`, // URL for creating and listing comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`, // URL for deleting a comment
  editUser: () => `${API_ROOT}/users/edit`, // URL for editing user information
  userInfo: (userId) => `${API_ROOT}/users/${userId}`, // URL for fetching user information by ID
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`, // URL for searching users
};

export const LOCALSTROAGE_TOKEN_KEY = '__token_key__'; // Key for storing authentication token in local storage
