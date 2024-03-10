import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={`bottombar-link ${
              isActive && `bg-primary-500`
            } py-2 px-4 text-[15px]`}
          >
            {link.label}
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
