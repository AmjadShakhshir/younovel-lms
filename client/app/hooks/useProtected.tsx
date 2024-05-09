import { redirect } from "next/navigation";
import UserAuth from "./userAuth";

type ProtectedProps = {
  children: React.ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect("/");
}
