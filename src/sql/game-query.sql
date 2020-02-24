-- List of players assigned to each teacher (some players have more than one teacher)
SELECT
	t.name_last as teacher,
	p.name_last as last_name,
	p.name_first as first_name,
	p.time_played,
	p.highest_difficulty_attempted,
	p.highest_difficulty_succeeded
FROM teachers as t
	LEFT JOIN teachers_classes as tc
	ON t.teacher_id = tc.teacher_id
	FULL OUTER JOIN (
		SELECT 
			p1.player_id,
			p1.name_last,
			p1.name_first,
			p1.class_id,
			a1.time_played,
			a1.highest_difficulty_attempted,
			a2.highest_difficulty_succeeded
		FROM players as p1
		JOIN (
			SELECT
				a.player_id,
				SUM(a.ended_ts - a.started_ts) as time_played,
				MAX(l.difficulty) as highest_difficulty_attempted
			FROM attempts as a
			JOIN levels as l
			ON a.level_id = l.level_id
			GROUP BY a.player_id
		) as a1
		ON p1.player_id = a1.player_id
		
		LEFT JOIN (
			SELECT 
				a.player_id,
				MAX(l.difficulty) as highest_difficulty_succeeded
			FROM attempts as a
			JOIN levels as l
			ON a.level_id = l.level_id
			WHERE a.success = TRUE
			GROUP BY a.player_id
		) as a2
		ON p1.player_id = a2.player_id
	) as p
	ON tc.class_id = p.class_id
ORDER BY teacher;