import pymysql
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


# Get the database credentials from environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")

# Connect to the MySQL database
mydb = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database,
)

# Create a cursor object
cursor = mydb.cursor()

# Define the SQL query to create the table
sql = """
CREATE TABLE plant (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    botanical_name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255) NOT NULL,
    common_name VARCHAR(255) NOT NULL UNIQUE,
    description LONGTEXT NOT NULL,
    external_images_link LONGTEXT,
    wiki_link LONGTEXT,
    image VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME(6),
    INDEX idx_category (category)
)
"""

print("Table created successfully!")

# Execute the SQL query
cursor.execute(sql)

# Commit the changes
mydb.commit()

# Close the database connection
mydb.close()
