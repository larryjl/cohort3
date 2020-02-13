-- 1
SELECT * FROM cd.facilities;
-- 2
SELECT 
	name, 
	membercost
FROM cd.facilities;
-- 3
SELECT
	name
FROM cd.facilities
	WHERE membercost > 0;
-- 4
SELECT
	facid,
	name,
	membercost,
	monthlymaintenance
FROM cd.facilities
	WHERE membercost > 0 AND
		membercost < monthlymaintenance/50;
-- 5
SELECT
	name
FROM cd.facilities
	WHERE name LIKE '%Tennis%';
-- 6
SELECT
	facid,
	name
FROM cd.facilities
	where facid IN (1,5);
-- 7
SELECT
	memid,
	surname,
	firstname,
	joindate
FROM cd.members
	WHERE joindate >= '2012-09-01';
-- 8
SELECT DISTINCT
	surname
FROM cd.members
ORDER BY surname asc;
-- 9
SELECT
	memid,
	joindate
FROM cd.members
ORDER BY joindate desc
LIMIT 1;
-- 10
SELECT
	count(*)
FROM cd.facilities
	WHERE guestcost > 10;
-- 11
-- 12
SELECT
	facid,
	SUM(slots) as totalslots
FROM cd.bookings
	WHERE starttime BETWEEN '2012-09-01' AND '2012-09-30'
GROUP BY facid
ORDER BY totalslots asc;
-- 13
SELECT
	facid,
	SUM(slots) as totalslots
FROM cd.bookings
GROUP BY facid
	HAVING SUM(slots) > 1000
ORDER BY facid asc;
-- 14
SELECT
	b.starttime,
	f.name
FROM cd.bookings b
	JOIN cd.facilities f
	ON b.facid = f.facid
	WHERE f.name like '%Tennis%' AND
		b.starttime >= '2012-09-21' AND b.starttime < '2012-09-22'
ORDER BY b.starttime;
-- 15
SELECT
	b.starttime
FROM cd.bookings b
	JOIN cd.members m
	ON b.memid = m.memid
	WHERE m.surname = 'Farrell' AND firstname ='David';
