ALTER TABLE
  posts
ADD
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id);