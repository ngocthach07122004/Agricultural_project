Project name: SmartGrow

# To build mysql using docker use is command

docker run --name agriculturalDatabase -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=agricultural_database -p 3312:3306 -d mysql:latest
