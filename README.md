<h1 align="center">🌿 SmartGrow</h1>

<p align="center">
  <em>🌱 A smart automation solution for greenhouse plant care</em><br>
  <strong>💡 Device Control – 📊 Environmental Monitoring – 🔒 Secure & Reliable</strong>
</p>

---

## 🚀 Overview

**SmartGrow** is a software platform that helps you control and automate devices designed to care for plants in a greenhouse environment.  
From watering systems to lighting and ventilation, SmartGrow makes it simple and efficient 🌾.

---

## ✨ Key Features

| 🌟 Feature             | 💬 Description                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| 🔐 Security            | User authentication and role-based authorization                  |
| 📲 Device Control      | Control pumps, lights, fans, etc. directly from the software      |
| ⏱️ Timer Functionality | Schedule watering, lighting, temperature control automatically    |
| 📈 Parameter Display   | Visual charts for temperature, soil humidity, and light intensity |
| 📝 Logging             | Record changes and actions made by users                          |

---

## 🧰 Tech Stack

| Layer       | Technology Used                         |
| ----------- | --------------------------------------- |
| 🔙 Backend  | Java, Spring Boot                       |
| 🌐 Frontend | HTML, CSS, JavaScript, Bootstrap, React |
| 🗄️ Database | MySQL                                   |
| ⚙️ Others   | Docker 🐳, WebSocket 🔄                 |

---

# How to start

## To start project

To start the project here are the things to do

1. Clone project
2. Start a mysql server instance

### 1) To clone project

$ git clone https://github.com/ngocthach07122004/Agricultural_project.git

### 2) To Start a mysql server instance

How to use this image
Start a mysql server instance
Starting a MySQL instance is simple:

$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
... where some-mysql is the name you want to assign to your container, my-secret-pw is the password to be set for the MySQL root user and tag is the tag specifying the MySQL version you want. See the list above for relevant tags.

Connect to MySQL from the MySQL command line client
The following command starts another mysql container instance and runs the mysql command line client against your original mysql container, allowing you to execute SQL statements against your database instance:

$ docker run -it --network some-network --rm mysql mysql -hsome-mysql -uexample-user -p
... where some-mysql is the name of your original mysql container (connected to the some-network Docker network).

This image can also be used as a client for non-Docker or remote instances:

$ docker run -it --rm mysql mysql -hsome.mysql.host -usome-mysql-user -p
More information about the MySQL command line client can be found in the MySQL documentation⁠

... via docker-compose⁠ or docker stack deploy⁠
Example docker-compose.yml for mysql:

# Use root/example as user/password credentials

version: '3.1'

services:

db:
image: mysql
restart: always
environment:
MYSQL_ROOT_PASSWORD: example # (this is just an example, not intended to be a production configuration)
Try in PWD

Run docker stack deploy -c stack.yml mysql (or docker compose -f stack.yml up), wait for it to initialize completely, and visit http://swarm-ip:8080, http://localhost:8080, or http://host-ip:8080 (as appropriate).

Container shell access and viewing MySQL logs
The docker exec command allows you to run commands inside a Docker container. The following command line will give you a bash shell inside your mysql container:

$ docker exec -it some-mysql bash
The log is available through Docker's container log:

$ docker logs some-mysql
