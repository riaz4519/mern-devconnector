import { useSelector } from 'react-redux';
import { Outlet,useNavigate } from 'react-router-dom';
import Login from '../auth/Login';
import { Navigate } from 'react-router-dom';



const PrivateRoute = () => {

    const {isAuthenticated,user} = useSelector((state) => state.auth);

    const useAuth = () =>{

      return user && isAuthenticated 
    }


    return useAuth() ? <Outlet/> : <Navigate to="/login" /> ;
}
 
export default PrivateRoute;
