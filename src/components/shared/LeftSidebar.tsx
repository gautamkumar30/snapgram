import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-5">
        <Link to="/">
          <p>Logo</p>
        </Link>
        <a onClick={() => signOut()}>Sign out</a>

        <div className="flex">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div>
            <p className="text-[20px]">{user.name}</p>
            <p className="text-light-3">{user.username}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${
                  isActive && `bg-primary-500`
                } p-4`}
              >
                <NavLink to={link.route}>{link.label}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
