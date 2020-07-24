--////////////////////////////////////////////////////
CREATE SEQUENCE todos_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE todos
(
    id          integer NOT NULL DEFAULT nextval('todos_id_seq'),
    description character varying(100) NOT NULL,
    done        boolean NOT NULL,
    user_name   character varying(355) NOT NULL,
    target_date timestamp NOT NULL,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
);
--////////////////////////////////////////////////////


CREATE SEQUENCE users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE users (
	id       integer NOT NULL DEFAULT nextval('users_id_seq'),
	username VARCHAR ( 100 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	enabled  boolean NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

--////////////////////////////////////////////////////

CREATE SEQUENCE user_authorities_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE user_authorities
(
    id 		  integer NOT NULL DEFAULT nextval('user_authorities_id_seq'),
    user_id   integer NOT NULL,
    authority varchar(100) not null,
	FOREIGN KEY (user_id) REFERENCES users (id),
	CONSTRAINT user_authorities_pkey PRIMARY KEY (id)
); 


commit;



-- create user: 'user'
INSERT INTO users(username,password,enabled) VALUES('user','$2a$10$TfjwK4p4y2xn5f6RN78gwOz0Le.cMGuhNaz51WDjChGCDF9Z0yqci',true);

-- create user: 'admin'
INSERT INTO users(username,password,enabled) VALUES('admin','$2a$10$lbZgb/zt4jBoPjqF.RfsOOOKyKJMOZjFS8QMyO.5p7Ob/jzf7ASPC',true);



-- create role: 'USER' for the user: 'user'
INSERT INTO user_authorities(user_id,authority) VALUES((select u.id from users u where u.username = 'user'),'USER');

-- create role: 'ADMIN' for the user: 'admin'
INSERT INTO user_authorities(user_id,authority) VALUES((select u.id from users u where u.username = 'admin'),'ADMIN');


commit;
