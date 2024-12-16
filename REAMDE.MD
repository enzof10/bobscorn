# 🛠 **Bob's Corn Project**

The **Bob's Corn Project** is a full-stack web application for managing corn purchases, consisting of a **frontend** built with **React** and a **backend** using **Express** and **Prisma** with a **PostgreSQL** database. This project is containerized using **Docker** for easy deployment and scalability.

---

## 🖥 **Technologies Used**

* **Docker** : For containerizing the application for easy deployment and scaling.
* **PostgreSQL** : Relational database for storing purchase data.
* **Express.js** : Web framework for the backend API.
* **Prisma** : ORM for interacting with the PostgreSQL database.
* **React** : Frontend framework for building the user interface.
* **Vite** : A fast and modern build tool for React.

---

## 🚀 **Getting Started**

To get the project up and running locally using **Docker** and  **Docker Compose** , follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/bobscorn.git
cd bobscorn
```

### 2. Navigate to the `auto-run` directory:

```bash
cd auto-run
```

### 3. Run Docker Compose:

Make sure Docker is installed and running on your machine. Then, execute the following command to start all containers:

```bash
sudo docker-compose up
```

This will:

* Build the Docker images for the frontend, backend, and database.
* Start the **PostgreSQL** database container, the **Express** API container, and the **React** frontend container.

Once Docker Compose finishes starting the containers, the project will be accessible locally.

### 4. Access the project:

* **Frontend (React)** : Open `http://localhost:3000` in your browser.
* **Backend (Express API)** : The backend will be available at `http://localhost:3001/api/v1/api-docs`.
* **PostgreSQL Database** : The database will be available for connections within the Docker network.
