DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  view_count INTEGER NOT NULL,
  like_count INTEGER NOT NULL
);
