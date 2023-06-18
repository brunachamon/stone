import formatCurrency from "./currency";

describe("formatCurrency", () => {
  test("should format the number correctly", () => {
    expect(formatCurrency(1000)).toBe("R$\xa01.000,00");
  });

  test("should format the decimal number correctly", () => {
    expect(formatCurrency(1230.75)).toBe("R$\xa01.230,75");
  });

  test("should format the negative number correctly", () => {
    expect(formatCurrency(-100.99)).toBe("-R$\xa0100,99");
  });

  test("should return R$ 0,00 when no value is provided", () => {
    expect(formatCurrency()).toBe("R$\xa00,00");
  });
});
