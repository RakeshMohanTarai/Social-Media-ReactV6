import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom'; //here get the browser history
import { useNavigate } from 'react-router-dom'; // The useNavigate() hook is introduced in the React Router v6 to replace the useHistory() hook.
import { toast } from 'react-toastify'; // Import the toast object
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';
import { db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  // const history = useHistory();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields');
      setSigningUp(false); // Reset signingUp to false
    }

    if (password !== confirmPassword) {
      toast.error('Make sure password and confirm password matches');
      setSigningUp(false); // Reset signingUp to false
    }

    if (error) {
      setSigningUp(false);
      return;
    }

    const response = await auth.signup(name, email, password, confirmPassword);
    // console.log(name, email, password, confirmPassword)
    // console.log('response',response);

    if (response.success) {
      // history.push('/login');
      // console.log('###', response.currentUser);

      //use addDoc to store the data of user in the fireStore
      await addDoc(collection(db, "users"), {
      name: name,
      email:email})

      navigate('/login'); // Use navigate instead of history.push
      setSigningUp(false);

      toast.success('User registered successfully, please login now');
    } else {
      toast.error(response.message);
    }

    setSigningUp(false); // Reset signingUp to false
  };

  if (auth.user) {
    //return <Redirect ="/" /> // this is the old version
    return navigate('/'); // this is the latest version
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
