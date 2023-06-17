import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RouteNames from "../routes/RouteNames";
import { selectIsLogged } from "../slices/user";
import { logout } from "../utils/session";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(selectIsLogged);

  return (
    <nav className="relative select-none bg-sky-500/75 lg:flex lg:items-stretch w-full px-3">
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
          {isLogged ? (
            <button
              className="text-white"
              onClick={() => logout(dispatch, navigate)}
            >
              Logout
            </button>
          ) : (
            <Link
              to={RouteNames.LOGIN}
              className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
