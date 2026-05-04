test("calculates total orders and revenue", () => {
  const orders = [
    { total: 20 },
    { total: 30 },
    { total: 15 }
  ];

  const orderCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  expect(orderCount).toBe(3);
  expect(totalRevenue).toBe(65);
});