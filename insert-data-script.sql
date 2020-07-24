-- create user: 'user'
INSERT INTO users(username,password,enabled) VALUES('user','$2a$10$TfjwK4p4y2xn5f6RN78gwOz0Le.cMGuhNaz51WDjChGCDF9Z0yqci',true);

-- create user: 'admin'
INSERT INTO users(username,password,enabled) VALUES('admin','$2a$10$lbZgb/zt4jBoPjqF.RfsOOOKyKJMOZjFS8QMyO.5p7Ob/jzf7ASPC',true);



-- create role: 'USER' for the user: 'user'
INSERT INTO users_authorities(user_id,authority) VALUES((select u.id from users u where u.username = 'user'),'USER');

-- create role: 'ADMIN' for the user: 'admin'
INSERT INTO user_authorities(user_id,authority) VALUES((select u.id from users u where u.username = 'admin'),'ADMIN');