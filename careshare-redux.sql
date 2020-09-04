CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "name" string,
  "password" password
);

CREATE TABLE "shift" (
  "id" int PRIMARY KEY,
  "date" date,
  "user_id" int,
  "child_id" int
);

CREATE TABLE "child" (
  "id" int PRIMARY KEY,
  "name" string,
  "birthday" date,
  "user_id" int
);

CREATE TABLE "diaper" (
  "id" int PRIMARY KEY,
  "wet" boolean,
  "soiled" boolean,
  "time" time,
  "shift_id" int
);

CREATE TABLE "food" (
  "id" int PRIMARY KEY,
  "meal_type" string,
  "description" string,
  "time" time,
  "shift_id" int
);

CREATE TABLE "sleep" (
  "id" int PRIMARY KEY,
  "nap" boolean,
  "bedtime" boolean,
  "start_time" time,
  "end_time" time,
  "shift_id" int
);

CREATE TABLE "notes" (
  "id" int PRIMARY KEY,
  "content" string,
  "shift_id" int
);

ALTER TABLE "diaper" ADD FOREIGN KEY ("shift_id") REFERENCES "shift" ("id");

ALTER TABLE "food" ADD FOREIGN KEY ("shift_id") REFERENCES "shift" ("id");

ALTER TABLE "sleep" ADD FOREIGN KEY ("shift_id") REFERENCES "shift" ("id");

ALTER TABLE "notes" ADD FOREIGN KEY ("shift_id") REFERENCES "shift" ("id");

ALTER TABLE "shift" ADD FOREIGN KEY ("child_id") REFERENCES "child" ("id");

ALTER TABLE "child" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "shift" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
