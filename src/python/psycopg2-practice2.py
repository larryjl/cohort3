import psycopg2
from psycopg2 import sql
from postgres_config import pg_config


conn = psycopg2.connect(
    host=pg_config["host"],
    user=pg_config["user"],
    password=pg_config["password"],
    dbname=pg_config["maintenance_db"],
)
conn.autocommit = True
cur = conn.cursor()

cur.execute(
    "SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s);",
    (pg_config["dbname"],),
)
if not cur.fetchone()[0]:
    cur.execute(
        sql.SQL("CREATE DATABASE {};").format(sql.Identifier(pg_config["dbname"]))
    )

cur.close()
conn.close()


conn = psycopg2.connect(
    host=pg_config["host"],
    user=pg_config["user"],
    password=pg_config["password"],
    dbname=pg_config["dbname"],
)
conn.autocommit = True
cur = conn.cursor()

cur.execute(
    """SELECT EXISTS(
        SELECT 1 FROM information_schema.tables WHERE table_name = %s
    );""",
    (pg_config["user_table"],),
)
if not cur.fetchone()[0]:
    cur.execute(
        sql.SQL("CREATE TABLE {table} ({columns})").format(
            table=sql.Identifier(pg_config["schema"], pg_config["user_table"]),
            columns=sql.SQL(", ").join(
                [
                    sql.SQL(
                        "{} {} PRIMARY KEY"
                        if (column["constraint"] == "PRIMARY KEY")
                        else (
                            "{} {} NOT NULL"
                            if (column["constraint"] == "NOT NULL UNIQUE")
                            else (
                                "{} {} NOT NULL UNIQUE"
                                if (column["constraint"] == "NOT NULL")
                                else (
                                    "UNIQUE"
                                    if (column["constraint"] == "UNIQUE")
                                    else "{} {}"
                                )
                            )
                        )
                    ).format(
                        sql.Identifier(column["name"]), sql.Identifier(column["type"])
                    )
                    for column in pg_config["user_columns"]
                ]
            ),
        )
    )

cur.execute(
    sql.SQL("INSERT INTO {} ({}) VALUES ({})").format(
        sql.Identifier(pg_config["user_table"]),
        sql.SQL(", ").join(
            [
                sql.Identifier(column["name"])
                for column in pg_config["user_columns"]
                if column["constraint"] != "PRIMARY KEY"
            ]
        ),
        sql.SQL(", ").join(
            [
                sql.Placeholder()
                for column in pg_config["user_columns"]
                if column["constraint"] != "PRIMARY KEY"
            ]
        ),
    ),
    ["lawrence", "pass123"],
)

cur.close()
conn.close()
