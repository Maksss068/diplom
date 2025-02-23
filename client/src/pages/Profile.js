import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Profile = () => {
const { user, logout } = useContext(AuthContext);
return (
<div>
<h2>Профіль</h2>
<p>Email: {user?.email}</p>
<button onClick={logout}>Вийти</button>
</div>
);
};
export default Profile;