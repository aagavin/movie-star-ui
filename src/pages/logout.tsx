import { getAuth } from "firebase/auth";
import { Redirect } from 'react-router-dom';

const Logout = () => {getAuth().signOut().then();return <Redirect to="/" />}


export default Logout;