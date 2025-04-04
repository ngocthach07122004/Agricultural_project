# Project name

SmartGrow is a software that helps control and automate devices that help care for plants in a greenhouse environment.

# Features

- Security, user authentication, authorization
- Control devices directly from the software
- Set timer functions such as water, light, temperature
- Display parameters such as temperature, soil humidity, light intensity visually with charts
- Log settings and changes from users

# Technology used

-Backend: Language(Java), Framework(Spring)
-Frontend: Language(HTML-CSS,Javacsript), Framework(bootstrap), Library(React)
-Database: mysql

# How to start

## Clone project

-Git clone
https://github.com/ngocthach07122004/Agricultural_project.git

## Run Database

-To build mysql using docker use is command

docker run --name agriculturalDatabase -e MYSQL_ROOT_PASSWORD=12345678 -e MYSQL_DATABASE=agricultural_database -p 3312:3306 -d mysql:latest
