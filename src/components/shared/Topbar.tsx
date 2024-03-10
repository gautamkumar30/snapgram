import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <div className="topbar">
      <div className="flex flex-between">
        <Link to="/">
          <p>Topbar Logo</p>
        </Link>
        <button onClick={() => signOut()}>
          <img src="assets/react.svg" alt="signout" />
        </button>
        <Link to={`/profile/${user.id}`}>
          <img src={user.imageUrl} className="h-8 w-8 rounded-full"></img>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
