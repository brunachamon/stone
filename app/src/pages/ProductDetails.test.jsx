import { waitFor, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import render from "../../reduxConfigTests";
import ProductDetails from "./ProductDetails";
import { handleSearchProductById, handleEditProduct } from "../slices/product";

jest.mock("../slices/product", () => ({
  handleSearchProductById: jest.fn(),
  handleEditProduct: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("ProductDetails", () => {
  beforeEach(() => {
    // Configuração de mocks para cada teste, se necessário
  });

  test("should present \"Produto não encontrado\" message when product is not available", async () => {
    // Mockando o retorno da função handleSearchProductById para simular um produto não encontrado
    handleSearchProductById.mockResolvedValueOnce({ payload: null });

    const { getByText } = render(<ProductDetails />);

    await waitFor(() => {
      expect(getByText("Produto não encontrado.")).toBeInTheDocument();
    });
  });

  test("should render ProductForm when product is available as well", async () => {
    // Mockando o retorno da função handleSearchProductById para simular um produto encontrado
    handleSearchProductById.mockResolvedValueOnce({
      payload: { id: 1, name: "Product 1" },
    });

    const { getByLabelText, getByRole } = render(<ProductDetails />);

    await waitFor(() => {
      expect(getByLabelText("Nome")).toBeInTheDocument();
      expect(getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    });
  });

  test("should call handleEditProduct and navigate to PRODUCT page on form submission", async () => {
    // Mockando o retorno da função handleSearchProductById para simular um produto encontrado
    handleSearchProductById.mockResolvedValueOnce({
      payload: { id: 1, name: "Product 1" },
    });

    // Configurando o mock do useDispatch para capturar a função de dispatch
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Configurando o mock do useNavigate para capturar a função de navegação
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { getByRole } = render(<ProductDetails />);

    await waitFor(() => {
      const submitButton = getByRole("button", { name: "Salvar" });

      fireEvent.click(submitButton);

      expect(handleEditProduct).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/products");
    });
  });
});
