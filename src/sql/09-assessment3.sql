CREATE TABLE students(
student_id serial PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
homeroom_number INT,
phone VARCHAR(10) UNIQUE,
email VARCHAR(255) UNIQUE,
graduation_year INT
);
CREATE TABLE teachers(
teacher_id serial PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
homeroom_number INT,
department VARCHAR(255),
phone VARCHAR(10) UNIQUE,
email VARCHAR(255) UNIQUE
);
INSERT INTO students(
	first_name,
	last_name,
	homeroom_number,
	phone,
	graduation_year
) VALUES (
	'Mark',
	'Watney',
	5,
	'7755551234',
	2035
);
INSERT INTO teachers(
	 first_name,
	 last_name, 
	 homeroom_number,
	 department,
	 email,
	 phone
)VALUES (
	'Jonas',
	'Salk',
	5,
	'Biology',
	'jsalk@school.org',
	'7755554321'
);