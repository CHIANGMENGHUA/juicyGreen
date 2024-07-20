import pymysql

# Connect to the MySQL database
mydb = pymysql.connect(
    host="localhost",
    user="root",
    password="1234",
    database="plants",
)

# Create a cursor object
cursor = mydb.cursor()

# Define the SQL query to create the table
sql = """
CREATE TABLE plant (
    id BIGINT NOT NULL PRIMARY KEY,
    botanical_name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255) NOT NULL,
    common_name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    external_images_link LONGTEXT,
    wiki_link LONGTEXT,
    image VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME(6)
)
"""

# Execute the SQL query
cursor.execute(sql)

# Commit the changes
mydb.commit()

# Close the database connection
mydb.close()
