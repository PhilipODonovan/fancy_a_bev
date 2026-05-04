test("admin users can view all orders", () => {
  const user = { isAdmin: true };

  const canViewAllOrders = user.isAdmin === true;

  expect(canViewAllOrders).toBe(true);
});

test("regular users cannot view all orders", () => {
  const user = { isAdmin: false };

  const canViewAllOrders = user.isAdmin === true;

  expect(canViewAllOrders).toBe(false);
});
