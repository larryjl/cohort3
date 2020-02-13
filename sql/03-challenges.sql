-- SECTION 3: GROUP BY
-- GROUP BY #1
SELECT
	staff_id,
	COUNT(payment_id),
	SUM(amount)
FROM payment
	WHERE staff_id IN (1, 2)
GROUP BY staff_id;
-- GROUP BY #2
SELECT
	rating,
	AVG(replacement_cost)
FROM film
GROUP BY rating;
-- GROUP BY #3
SELECT
	customer_id,
	SUM(amount)
FROM payment
GROUP BY customer_id
ORDER BY SUM(amount) DESC
LIMIT 5;
-- CHALLENGE #1
SELECT
	customer_id,
	COUNT(payment_id)
FROM payment
GROUP BY customer_id
	HAVING COUNT(payment_id) >= 40;
-- CHALLENGE #2
SELECT
	rating,
	AVG(rental_duration)
FROM film
GROUP BY rating
	HAVING AVG(rental_duration) > 5;