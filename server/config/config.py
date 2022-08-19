from sqlalchemy import create_engine
from config.settings import (
    PG_SQL_DRIVER,
    PG_SQL_SERVER,
    PG_SQL_USERNAME,
    PG_SQL_PASSWORD,
    PG_SQL_DATABASE,
)

print("Trying to connect to db..\n")
new_con = f"{PG_SQL_DRIVER}://{PG_SQL_USERNAME}:{PG_SQL_PASSWORD}@{PG_SQL_SERVER}/{PG_SQL_DATABASE}"
engine = create_engine(new_con)
print("Connected to db succesfully..", engine)

ENV = "development"
DEBUG = True
SQLALCHEMY_ECHO = True
SQLALCHEMY_DATABASE_URI = new_con
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECURITY_PASSWORD_SALT = ""
