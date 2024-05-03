import json
import mysql.connector
from datetime import datetime

# Get the current date and time
created_at = datetime.now()

# Connect to MySQL
db_connection = mysql.connector.connect(
    host="localhost", user="root", password="1234", database="plants"
)
cursor = db_connection.cursor()

# Read JSON data from file
with open("succulents.json", "r") as json_file:
    data = json.load(json_file)

# Insert data into MySQL
for item in data:
    sql = "INSERT INTO plant (id, category, common_name, botanical_name, description, image, external_images_link, wiki_link, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        item["id"],
        item["category"],
        item["commonName"],
        item["botanicalName"],
        item["description"],
        item["image"],
        item["externalImagesLink"],
        item["wikiLink"],
        created_at,
    )
    cursor.execute(sql, values)

# Commit changes and close connection
db_connection.commit()
cursor.close()
db_connection.close()
