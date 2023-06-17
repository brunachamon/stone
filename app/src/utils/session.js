const { default: RouteNames } = require("../routes/RouteNames");
const { setAuthToken } = require("../services/axios");
const { clearStore } = require("../slices/user");

const logout = (dispatch, navigate) => {
  dispatch(clearStore());
  setAuthToken(null);

  navigate(RouteNames.LOGIN);
};

export { logout };
