import React from "react";
import { fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";
import ValidationMessages from "../utils/validationMessages";
import render from "../../reduxConfigTests";

describe("ProductForm", () => {
  test("should fill the form with the initial values provided", () => {
    const product = {
      name: "Produto A",
      description: "Descrição do Produto A",
      price: 10,
      category: "Categoria A",
      image: "https://example.com/image.jpg",
    };
    const { getByLabelText } = render(<ProductForm product={product} />);

    // Verifica se os valores iniciais são exibidos corretamente nos campos
    expect(getByLabelText("Nome")).toHaveValue("Produto A");
    expect(getByLabelText("Descrição")).toHaveValue("Descrição do Produto A");
    expect(getByLabelText("Preço")).toHaveValue(10);
    expect(getByLabelText("Categoria")).toHaveValue("Categoria A");
    expect(getByLabelText("Url da imagem")).toHaveValue(
      "https://example.com/image.jpg",
    );
  });

  test("should validate fields in form and show all error messages available", async () => {
    const { findByText, getByText } = render(<ProductForm />);

    // Simula a submissão do formulário com valores inválidos
    fireEvent.click(getByText("Salvar"));

    // Verifica se as mensagens de erro são exibidas corretamente
    expect(await findByText(ValidationMessages.name)).toBeInTheDocument();
    expect(
      await findByText(ValidationMessages.description),
    ).toBeInTheDocument();
    expect(await findByText(ValidationMessages.price)).toBeInTheDocument();
    expect(await findByText(ValidationMessages.category)).toBeInTheDocument();
    expect(await findByText(ValidationMessages.image)).toBeInTheDocument();
  });

  test("should call the submit function with all values filled in form", async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductForm onSubmit={handleSubmit} />,
    );

    // Simula a digitação nos campos
    fireEvent.change(getByLabelText("Nome"), {
      target: { value: "Produto A" },
    });
    fireEvent.change(getByLabelText("Descrição"), {
      target: { value: "Descrição do Produto A" },
    });
    fireEvent.change(getByLabelText("Preço"), {
      target: { value: 10 },
    });
    fireEvent.change(getByLabelText("Categoria"), {
      target: { value: "Categoria A" },
    });
    fireEvent.change(getByLabelText("Url da imagem"), {
      target: { value: "https://example.com/image.jpg" },
    });

    // Simula a submissão do formulário
    fireEvent.click(getByText("Salvar"));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verifica se a função onSubmit foi chamada com os valores corretos
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Produto A",
      description: "Descrição do Produto A",
      price: 10,
      category: "Categoria A",
      image: "https://example.com/image.jpg",
    });
  });

  test("should disable save button when form is submitting", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<ProductForm onSubmit={handleSubmit} />);

    const SaveButton = getByText("Salvar");

    // Simula a submissão do formulário
    fireEvent.click(SaveButton);

    // Verifica se o botão de envio está desabilitado
    expect(SaveButton).toBeDisabled();

    // Aguarda um pequeno intervalo de tempo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verifica se o botão de envio está habilitado novamente
    expect(SaveButton).not.toBeDisabled();
  });
});
