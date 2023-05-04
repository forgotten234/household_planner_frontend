import { useContext } from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

const PrivateRoute = ({ children}: any) => {
  const { auth }: any = useContext(AuthContext);
      
  if (auth.data) {
    return children
  }
    
  return <Navigate to="/" />
}
export default PrivateRoute;