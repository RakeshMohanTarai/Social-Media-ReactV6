// Import necessary modules and styles
import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom'; //here get the browser history
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { toast } from 'react-toastify'; // Import the toast object
import { useAuth } from '../hooks';

const Login = () => {
  // Initialize state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const auth = useAuth();
  //console.log(auth);

    // const history = useHistory();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Define the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log('handleSubmit called'); // Debugging: Check if the function is being called

    setLoggingIn(true);

    if (!email || !password) {
      toast.error('Please enter both email and password');
      setLoggingIn(false);
      return;
    }

    // Simulate a successful login for debugging
    // Replace this with your actual login logic using `auth.login`
    // const response = { success: true };

    try {
      const response = await auth.login(email, password);

      if (response.success) {
        //  console.log('Successfully logged in'); // Debugging: Check if this part is reached
        toast.success('Successfully logged in'); // Use toast.success for success message
      } else {
        toast.error('Invalid username and password');
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      toast.error('An error occurred during login.');
    }

    setLoggingIn(false);
  };

  if(auth.user) {
    //return <Redirect ="/" /> // this is the old version
    return  navigate('/'); // this is the latest version
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
