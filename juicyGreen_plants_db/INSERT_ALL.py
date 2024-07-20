import json
import pymysql
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables from .env file
load_dotenv()

# Get the database credentials from environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")

# Connect to MySQL
db_connection = pymysql.connect(
    host=db_host, user=db_user, password=db_password, database=db_database
)
cursor = db_connection.cursor()

# Read JSON data from file
with open("all.json", "r") as json_file:
    data = json.load(json_file)

# Insert data into MySQL
for item in data:
    try:
        sql = """
        INSERT INTO plant (category, common_name, botanical_name, description, image, external_images_link, wiki_link, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            item.get("category"),
            item.get("commonName"),
            item.get("botanicalName"),
            item.get("description"),
            item.get("image"),
            item.get("externalImagesLink"),
            item.get("wikiLink"),
            datetime.now(),
        )
        cursor.execute(sql, values)
    except Exception as e:
        print(f"Error inserting item {item}: {e}")

print("Data inserted successfully!")

# Commit changes and close connection
db_connection.commit()
cursor.close()
db_connection.close()
