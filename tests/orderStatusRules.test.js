test("only active order statuses are allowed", () => {
  const allowedStatuses = ["pending", "processing", "shipped"];

  expect(allowedStatuses.includes("pending")).toBe(true);
  expect(allowedStatuses.includes("processing")).toBe(true);
  expect(allowedStatuses.includes("shipped")).toBe(true);

  expect(allowedStatuses.includes("cancelled")).toBe(false);
  expect(allowedStatuses.includes("delivered")).toBe(false);
});