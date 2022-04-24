-- CREATE DATABASE my_manga CHARSET=UTF8;

USE my_manga;

DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info(
    u_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    u_name VARCHAR(64) NOT NULL,
    u_password VARCHAR(64) NOT NULL,
    u_nickname VARCHAR(32),
    u_phone VARCHAR(32),
    u_email VARCHAR(32),
    u_gender INT,
    u_birthday DATE,
    u_avator VARCHAR(128)
);

DROP TABLE IF EXISTS user_bookshelf;
CREATE TABLE user_bookshelf(
    m_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    m_uid INT NOT NULL,
    m_path_word VARCHAR(64) NOT NULL,
    m_name VARCHAR(64) NOT NULL,
    m_mid VARCHAR(64) NOT NULL,
    m_lc_id VARCHAR(64),
    m_lc_time DATETIME,
    m_shelf VARCHAR(1),
    m_shelf_time VARCHAR(1)
);

INSERT INTO user_info VALUES(null,'admin123','123456','Alpha','18540254897','abd123@gmail.com',1,19900101,'abc/def.jpg');