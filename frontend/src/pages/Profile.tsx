import { useParams } from "react-router-dom";
import UserProfile from "../features/users/UserProfile";

const Profile = () => {
  const { id } = useParams<{ id?: string }>();

  // id is optional:
  // - /profile        → id = undefined (own profile)
  // - /users/:id      → id = user id
  return <UserProfile userId={id} />;
};

export default Profile;
