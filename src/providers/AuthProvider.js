import { createContext } from 'react';
import { useProviderAuth } from '../hooks';

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  loading: true,
  signup: () => {},
  updateUserFriends: () => {},
};
export const AuthContex = createContext(initialState);

export const AuthProvider = ({ children }) => {

    const auth = useProviderAuth();

    return <AuthContex.Provider value={auth}> {children} </AuthContex.Provider>
}
