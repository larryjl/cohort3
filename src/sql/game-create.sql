CREATE TABLE "players" (
  "player_id" SERIAL PRIMARY KEY,
  "class_id" int,
  "name_first" varchar,
  "name_last" varchar,
  "grade" int,
  "created_ts" timestamp NOT NULL DEFAULT (now()),
  "login_first_ts" timestamp,
  "login_last_ts" timestamp
);

CREATE TABLE "teachers" (
  "teacher_id" SERIAL PRIMARY KEY,
  "name_first" varchar,
  "name_last" varchar,
  "created_ts" timestamp DEFAULT (now()),
  "login_first_ts" timestamp,
  "login_last_ts" timestamp
);

CREATE TABLE "classes" (
  "class_id" SERIAL PRIMARY KEY,
  "class_name" varchar UNIQUE,
  "created_ts" timestamp DEFAULT (now()),
  "grade" int
);

CREATE TABLE "teachers_classes" (
  "teacher_class_id" SERIAL PRIMARY KEY,
  "teacher_id" int NOT NULL,
  "class_id" int NOT NULL
);

CREATE TABLE "levels" (
  "level_id" SERIAL PRIMARY KEY,
  "level_name" varchar UNIQUE,
  "difficulty" float
);

CREATE TABLE "attempts" (
  "attempt_id" SERIAL PRIMARY KEY,
  "player_id" int,
  "level_id" int,
  "attempt_num" int,
  "started_ts" timestamp DEFAULT (now()),
  "ended_ts" timestamp,
  "success" bool
);

CREATE TABLE "checkpoints" (
  "checkpoint_id" SERIAL PRIMARY KEY,
  "level_id" int,
  "difficulty" float
);

CREATE TABLE "checkpoint_attempts" (
  "checkpoint_attempt_id" SERIAL PRIMARY KEY,
  "attempt_id" int,
  "checkpoint_id" int,
  "started_ts" timestamp DEFAULT (now()),
  "ended_ts" timestamp,
  "success" bool
);

ALTER TABLE "players" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id");

ALTER TABLE "teachers_classes" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id");

ALTER TABLE "teachers_classes" ADD FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("teacher_id");

ALTER TABLE "attempts" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("player_id");

ALTER TABLE "attempts" ADD FOREIGN KEY ("level_id") REFERENCES "levels" ("level_id");

ALTER TABLE "checkpoints" ADD FOREIGN KEY ("level_id") REFERENCES "levels" ("level_id");

ALTER TABLE "checkpoint_attempts" ADD FOREIGN KEY ("checkpoint_id") REFERENCES "checkpoints" ("checkpoint_id");

ALTER TABLE "checkpoint_attempts" ADD FOREIGN KEY ("attempt_id") REFERENCES "attempts" ("attempt_id");
