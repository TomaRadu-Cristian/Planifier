CREATE DATABASE weeklyplanner;

CREATE TABLE plans (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(50),
  progress INT,
  date VARCHAR(255)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);