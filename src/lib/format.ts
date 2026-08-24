export const peso = (value: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
export const stockLabel = (stock: string) => ({ in_stock: "Floor stock", low: "Low stock", indent: "By order", out: "Unavailable" }[stock] ?? stock);
