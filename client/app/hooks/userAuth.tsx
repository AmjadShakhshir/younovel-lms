import useAppSelector from "../../redux/customHooks/useAppSelector";
import { User } from "../types/User";

export default function UserAuth() {
  const { user } = useAppSelector((state) => state.auth);
  const objectIsEmpty = (user: User) => Object.keys(user).length === 0;
  if (objectIsEmpty(user)) {
    return false;
  } else {
    return true;
  }
}
