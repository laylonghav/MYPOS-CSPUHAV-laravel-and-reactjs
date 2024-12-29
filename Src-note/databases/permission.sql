INSERT INTO permissions (name, `group`, is_menu_web, web_route_key) VALUES
("Dashboard.View", "Dashboard", 1, ""),
("POS.View", "POS", 1, "pos"),
("Order.View", "Order", 1, "order"),
("Report.TopSale", "Report", 1, "report/top_sale"),
("Report.Order", "Report", 1, "report/order"),
("Report.Purchase", "Report", 1, "report/purchase"),
("Report.Expense", "Report", 1, "report/expense"),

("Customer.View", "Customer", 1, "customer"),
("Customer.ViewOne", "Customer", null, null),
("Customer.Create", "Customer", null, null),
("Customer.Update", "Customer", null, null),
("Customer.Remove", "Customer", null, null),
("Customer.ChangeMemberShip", "Customer", null, null),

("CustomerType.View", "CustomerType", 1, "customer_type"),
("CustomerType.ViewOne", "CustomerType", null, null),
("CustomerType.Create", "CustomerType", null, null),
("CustomerType.Update", "CustomerType", null, null),
("CustomerType.Remove", "CustomerType", null, null),

("Product.View", "Product", 1, "product"),
("Product.ViewOne", "Product", null, null),
("Product.Create", "Product", null, null),
("Product.Update", "Product", null, null),
("Product.Remove", "Product", null, null),
("Product.AdjustStock", "Product", null, null),
("Product.Purchase", "Product", null, null),

("Brand.View", "Brand", 1, "brand"),
("Brand.ViewOne", "Brand", null, null),
("Brand.Create", "Brand", null, null),
("Brand.Update", "Brand", null, null),
("Brand.Remove", "Brand", null, null),

("Category.View", "Category", 1, "category"),
("Category.ViewOne", "Category", null, null),
("Category.Create", "Category", null, null),
("Category.Update", "Category", null, null),
("Category.Remove", "Category", null, null),

("Supplier.View", "Supplier", 1, "supplier"),
("Supplier.ViewOne", "Supplier", null, null),
("Supplier.Create", "Supplier", null, null),
("Supplier.Update", "Supplier", null, null),
("Supplier.Remove", "Supplier", null, null),



("Expense.View", "Expense", 1, "expense"),
("Expense.ViewOne", "Expense", null, null),
("Expense.Create", "Expense", null, null),
("Expense.Update", "Expense", null, null),
("Expense.Remove", "Expense", null, null),

("ExpenseType.View", "ExpenseType", 1, "expense_type"),
("ExpenseType.ViewOne", "ExpenseType", null, null),
("ExpenseType.Create", "ExpenseType", null, null),
("ExpenseType.Update", "ExpenseType", null, null),
("ExpenseType.Remove", "ExpenseType", null, null),

("employee.View", "Employee", 1, "employee"),
("Employee.ViewOne", "Employee", null, null),
("Employee.Create", "Employee", null, null),
("Employee.Update", "Employee", null, null),
("Employee.Remove", "Employee", null, null),

("payroll.View", "Payroll", 1, "payroll"),
("Payroll.ViewOne", "Payroll", null, null),
("Payroll.Create", "Payroll", null, null),
("Payroll.Update", "Payroll", null, null),
("Payroll.Remove", "Payroll", null, null),

("User.View", "User", 1, "user"),
("User.ViewOne", "User", null, null),
("User.Create", "User", null, null),
("User.Update", "User", null, null),
("User.Remove", "User", null, null),
("User.ChangePassword", "User", null, null),
("User.ChangeRole", "User", null, null),


("Role.View", "Role", 1, "role"),
("Role.ViewOne", "Role", null, null),
("Role.Create", "Role", null, null),
("Role.Update", "Role", null, null),
("Role.Remove", "Role", null, null),

("Permission.View", "Permission", 1, "permission"),
("Permission.ViewOne", "Permission", null, null),
("Permission.Create", "Permission", null, null),
("Permission.Update", "Permission", null, null),
("Permission.Remove", "Permission", null, null),


("language.View", "Language", 1, "language"),
("Language.ViewOne", "Language", null, null),
("Language.Create", "Language", null, null),
("Language.Update", "Language", null, null),
("Language.Remove", "Language", null, null),

("Currency.View", "Currency", 1, "currency"),
("Currency.ViewOne", "Currency", null, null),
("Currency.Create", "Currency", null, null),
("Currency.Update", "Currency", null, null),
("Currency.Remove", "Currency", null, null),


("PaymentMethod.View", "PaymentMethod", 1, "payment_method"),
("PaymentMethod.ViewOne", "PaymentMethod", null, null),
("PaymentMethod.Create", "PaymentMethod", null, null),
("PaymentMethod.Update", "PaymentMethod", null, null),
("PaymentMethod.Remove", "PaymentMethod", null, null),

("Province.View", "Province", 1, "province"),
("Province.ViewOne", "Province", null, null),
("Province.Create", "Province", null, null),
("Province.Update", "Province", null, null),
("Province.Remove", "Province", null, null);



-- Administrator (role_id = 1) has all permissions
INSERT INTO `permission_roles` (`permission_id`, `role_id`)
SELECT `id`, 1 FROM `permissions`;

-- Cashier (role_id = 2) may only have a subset of permissions
INSERT INTO `permission_roles` (`permission_id`, `role_id`) VALUES
(2, 2), -- POS.View
(3, 2), -- Order.View
(8, 2), -- Customer.View
(9, 2), -- Customer.ViewOne
(19, 2), -- Product.View
(20, 2), -- Product.ViewOne
(41, 2), -- Expense.View
(42, 2), -- Expense.ViewOne
(93, 2), -- Province.View
(94, 2); -- Province.ViewOne

-- Inventory Manager (role_id = 3) may have permissions related to product and inventory
INSERT INTO `permission_roles` (`permission_id`, `role_id`) VALUES
(19, 3), -- Product.View
(20, 3), -- Product.ViewOne
(21, 3), -- Product.Create
(22, 3), -- Product.Update
(23, 3), -- Product.Remove
(24, 3), -- Product.AdjustStock
(25, 3), -- Product.Purchase
(93, 3), -- Province.View
(94, 3); -- Province.ViewOne

-- Supervisor (role_id = 4) may have permissions for both operations and reports
INSERT INTO `permission_roles` (`permission_id`, `role_id`) VALUES
(1, 4), -- Dashboard.View
(2, 4), -- POS.View
(3, 4), -- Order.View
(4, 4), -- Report.TopSale
(5, 4), -- Report.Order
(6, 4), -- Report.Purchase
(7, 4), -- Report.Expense
(8, 4), -- Customer.View
(9, 4), -- Customer.ViewOne
(19, 4), -- Product.View
(20, 4), -- Product.ViewOne
(41, 4), -- Expense.View
(42, 4), -- Expense.ViewOne
(93, 4), -- Province.View
(94, 4); -- Province.ViewOne

-- Technician (role_id = 5) may only have permissions related to technical operations and maintenance
INSERT INTO `permission_roles` (`permission_id`, `role_id`) VALUES
(1, 5), -- Dashboard.View
(19, 5), -- Product.View
(21, 5), -- Product.Create
(22, 5), -- Product.Update
(23, 5), -- Product.Remove
(93, 5); -- Province.View


SELECT
p.*
FROM permissions p
INNER JOIN permission_roles pr ON p.id = pr.permission_id
INNER JOIN roles r ON pr.role_id = r.id
INNER JOIN user_roles ur ON r.id = ur.role_id
WHERE ur.user_id = 1;


INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES ('1', '1'), ('2', '2');
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES ('8', '3'), ('3', '4');
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES ('10', '5');