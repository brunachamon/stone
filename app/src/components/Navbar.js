import { Link } from "react-router-dom";

import RouteNames from "../routes/RouteNames";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../slices/user";

const Navbar = () => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <nav className="relative select-none bg-sky-500/75 lg:flex lg:items-stretch w-full">
      <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
        <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
          {isLogged && (
            <>
              <Link
                to={RouteNames.ROOT}
                className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
              >
                Home
              </Link>
              <Link
                to={RouteNames.PRODUCTS}
                className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
              >
                Produtos
              </Link>
            </>
          )}

          <Link
            to={RouteNames.REGISTER}
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Novo usuário
          </Link>
          <Link
            to={RouteNames.LOGIN}
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
