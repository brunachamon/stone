import { waitFor } from "@testing-library/react";
import { clearStore } from "../slices/user";
import logout from "./session";
import RouteNames from "../routes/RouteNames";

describe("logout", () => {
  test("should clear the user store, sets auth token in axios to null and change route to login", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();

    logout(dispatch, navigate);

    await waitFor(() => clearStore());

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(RouteNames.LOGIN);
  });
});
