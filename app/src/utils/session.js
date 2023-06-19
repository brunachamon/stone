import RouteNames from "../routes/RouteNames";
import { setAuthToken } from "../services/axios";
import { clearStore } from "../slices/user";

const logout = (dispatch, navigate) => {
  dispatch(clearStore());
  setAuthToken(null);

  navigate(RouteNames.LOGIN);
};

export default logout;
