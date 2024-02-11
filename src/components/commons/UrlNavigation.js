import { useSelector } from "react-redux";

export const UrlNavigation = () => {
  const currentUser = useSelector(({ auth }) => auth?.authUser?.roleType);
  if (currentUser) {
    let path =
      currentUser &&
        (currentUser.includes("artist")) ? "/artist" : currentUser.includes("recruiter") ? "/recruiter"
        : "/cip";
    return path;
  }

};
