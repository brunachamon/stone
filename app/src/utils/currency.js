const formatCurrency = (number = 0) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
  number,
);

export default formatCurrency;
