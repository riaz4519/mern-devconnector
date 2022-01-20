import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from "../../actions/profileActions";
import { useEffect} from "react";
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {


    const allStates = useSelector((state) =>{

        return {
            profile : state.profile,
            auth : state.auth
        }

    });

    const dispatch = useDispatch();


    useEffect(() =>{
        

        dispatch(getCurrentProfile());


    },[]);

    const { profile ,loading } = allStates.profile;
    const { user,isAuthenticated } = allStates.auth;

    let dashboardContent;

    if(profile == null || loading){

        dashboardContent = <Spinner />;
     }else{

         if(Object.keys(profile).length > 0){

             dashboardContent = <h4>TODO Display</h4>

         }else{

            dashboardContent = (<div>
                <p className="lead text-muted"> welcome {user.name}</p>
                <p>you have not setup a profile,please add some info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
            </div>)

         }

        
     }
    

    return ( 
        <div className="dashboard">

            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>

                </div>

            </div>

            

        </div>
     );
}
 
export default Dashboard;