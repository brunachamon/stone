import { fireEvent, waitFor } from "@testing-library/react";
import ReactRouter, { useNavigate } from "react-router";
import { useParams } from "react-router";

import render, { store } from "../../reduxConfigTests";
import ProductDetails from "./ProductDetails";
import { handleEditProduct, handleSearchProductById } from "../slices/product";
import axios from "axios";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../slices/product", () => ({
  ...jest.requireActual("../slices/product"),
  handleEditProduct: jest.fn(),
}));

describe("ProductDetails", () => {
  test('should present "Produto não encontrado" message when product is not available', async () => {
    useParams.mockReturnValue({ id: "1" });
    store().dispatch(handleSearchProductById(1));

    const { getByText } = render(<ProductDetails />);

    await waitFor(() =>
      expect(getByText("Produto não encontrado.")).toBeInTheDocument()
    );
  });

  test("should render ProductForm when product is available as well", async () => {
    jest.spyOn(ReactRouter, "useParams").mockResolvedValue({ id: 1 });

    store().dispatch(handleSearchProductById(1));

    await waitFor(async () => {
      const { getByLabelText, getByRole, findByText } = render(
        <ProductDetails />
      );

      await findByText("Produto não encontrado.");

      expect(getByLabelText("Nome")).toBeInTheDocument();
      expect(getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    });
  });

  test.skip("should call handleEditProduct and navigate to PRODUCT page on form submission", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ _id: 1, name: "Produto teste" });

    useParams.mockReturnValue({ id: "1" });

    store().dispatch(handleSearchProductById(1));

    const navigateMock = jest.fn();

    useNavigate.mockReturnValue(navigateMock);

    const { getByRole } = render(<ProductDetails />);

    await waitFor(() => {
      const submitButton = getByRole("button", { name: "Salvar" });

      fireEvent.click(submitButton);

      expect(handleEditProduct).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/products");
    });
  });
});
