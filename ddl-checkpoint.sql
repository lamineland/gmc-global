# Customer (Customer_id, customer_name, customer_tel)
# Product (Product_id, product_name, price)
# Order (Customer_id, Product_id, quantity, total_amount)

CREATE Table customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(60) NOT NULL,
    customer_tel VARCHAR(15) NOT NULL
);

CREATE Table product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(60) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE Table order (
    customer_id INT,
    product_id INT,
    quantity INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

ALTER TABLE product ADD (category VARCHAR2(20));

ALTER TABLE orders ADD (order_date DATE DEFAULT SYSDATE);