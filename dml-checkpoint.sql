INSERT INTO products (product_id, product_name, category, price) 
VALUES ('P01', 'Samsung Galaxy S20', 'Smartphone', 3299),
       ('P02', 'ASUS NoteBook', 'PC', 4599);

INSERT INTO customers (customer_id, customer_name, customer_tel)
VALUES ('C01', 'ALI', 71321009),
       ('C02', 'ASMA', 77345823);

INSERT INTO orders (customer_id, product_id, order_date, quantity, total_amount)
VALUES ('C01', 'P02', NULL, 2, 9198),
       ('C02', 'P01', DATE '2020-05-28', 1, 3299);
