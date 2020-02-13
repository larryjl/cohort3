-- SECTION 2: FUNDAMENTALS
-- SELECT
SELECT
	first_name, 
	last_name,
	email
FROM customer;
-- DISTINCT
SELECT DISTINCT
	rating
FROM film;
-- WHERE #1
SELECT
	email
FROM customer
	WHERE first_name = 'Nancy' AND last_name = 'Thomas';
-- WHERE #2
SELECT
	description
FROM film
	WHERE title = 'Outlaw Hanky';
-- WHERE #3
SELECT
	phone
FROM address
	WHERE address = '259 Ipoh Drive';
-- ORDER BY #1
SELECT
	customer_id, 
	amount
FROM payment
ORDER BY amount DESC
LIMIT 10;
-- ORDER BY #2
SELECT
	film_id,
	title
FROM film
ORDER BY film_id
LIMIT 5;
-- GENERAL CHALLENGE #1
SELECT
	count(*)
FROM payment
WHERE amount > 5;
-- GENERAL CHALLENGE #2
SELECT
	count(*)
FROM actor
WHERE first_name LIKE 'P%';
-- GENERAL CHALLENGE #3
SELECT
	COUNT(DISTINCT(district))
FROM address;
-- GENERAL CHALLENGE #4
SELECT 
	DISTINCT(district)
FROM address;
-- GENERAL CHALLENGE #5
SELECT
	COUNT(*)
FROM film
WHERE rating = 'R' AND replacement_cost BETWEEN 5 AND 15;
-- GENERAL CHALLENGE #6
SELECT
	COUNT(*)
FROM film
WHERE title LIKE '%Truman%'