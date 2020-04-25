import psycopg2
from psycopg2 import sql
from postgres_config import pg_config

conn = psycopg2.connect(
    host=pg_config["host"], user=pg_config["user"], password=pg_config["password"]
)
conn.autocommit = True


cur = conn.cursor()

cur.execute(
    "SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s);",
    (pg_config["database"],),
)
db_exists = cur.fetchone()[0]
if not db_exists:
    cur.execute(
        sql.SQL("CREATE DATABASE {db}").format(db=sql.Identifier(pg_config["database"]))
    )

cur.close()
conn.close()
