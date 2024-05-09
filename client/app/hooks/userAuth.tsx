import useAppSelector from "../../redux/customHooks/useAppSelector";

export default function UserAuth() {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return true;
  } else {
    return false;
  }
}
