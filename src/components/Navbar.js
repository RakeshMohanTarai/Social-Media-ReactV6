import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useState, useEffect } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const auth = useAuth();
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.data) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  const handleSearchInputKeyPress = () => {
    setResults([]);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt="codeial" style={{height: "50px", width:"100%", borderRadius:"50%"}}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBzLUtjP1plVAd6SDSubdrkPt6P0IA_e-cQ&usqp=CAU"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        {auth.user && (
          <div style={{width: "91.5%"}}>
            <img
              className={styles.searchIcon}
              src="https://cdn-icons-png.flaticon.com/128/954/954591.png"
              alt="search-container"
            />
            <input
              placeholder="Search users"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        )}

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={handleSearchInputKeyPress}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                      alt="user"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://i.ibb.co/gR4Sxr3/My-Picture.jpg"
                alt="user-img"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={handleLogout}>Log Out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
