## LKMX Test - Next.js + Docker + PostgreSQL

A simple web application for managing users (CRUD), built with Next.js 14/15, TypeScript, Tailwind CSS, Prisma, and Docker. The project includes containers for the PostgreSQL database and the Next.js application.

### Table of Contents

- Tech Stack
- Prerequisites
- Installation & Setup
- Running the Project
- Application Usage
- Available Scripts
- Troubleshooting

### Tech Stack

- Frontend & Backend: Next.js (App Router), TypeScript, Tailwind CSS.
- Database: PostgreSQL.
- ORM: Prisma (Version 5 - Stable).
- Package Manager: pnpm.
- Containers: Docker & Docker Compose.
- Testing: Jest, React Testing Library.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker and Docker Compose.
- Node.js (Version 18 or higher).
- pnpm (Recommended over npm for this project).

### Installation & Setup

Follow these steps to set up your local development environment:

1. Clone the repository (or navigate to the project folder):

        cd my-project-docker

2. Install dependencies:

    We use pnpm for this project. 

        pnpm install

3. Configure environment variables:

    Create a file named .env in the root of the project and paste the following content. These values must match what is configured in docker-compose.yml.

        # .env
        DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
    
   *__Note__: password and mydb are the default values defined in the docker-compose.yml file. You can change them there if you wish.* 

### Running the Project 

This project is designed to run entirely inside Docker. This ensures that the database and the application are isolated and function the same on any environment. 

#### Start containers 

Run the following command to build the application image and start both the database and the app: 

    docker-compose up --build

- The application will be available at: http://localhost:3000 
- The PostgreSQL database will be exposed at: localhost:5432

#### Stop containers

- To stop the services in the background: 

        docker-compose down

- To stop and also remove volumes (delete database data): 

        docker-compose down -v

### Application Usage 

- __Home__: When you visit http://localhost:3000, you will see the welcome page. Click on "Go to User Management". 
- __Create User__: On the table page, click "+ New User", fill in the form, and save. 
- __Edit/Update__: Click the "Edit" button on any row to modify user data via the modal. 
- __View List__: The table updates automatically after every action. 

<!-- #### Testing

The project includes unit tests configured with Jest. 

To run the tests: 
 
    pnpm test

*Note: The tests are configured to mock (simulate) API calls and the database connection, so they do not require Docker to be running to pass successfully.*  -->

### Available Scripts


In the package.json file, you will find the following scripts: 

- __dev__: Runs Next.js in development mode (requires DB running locally outside docker).
- __build__: Creates the production build of the app.
- __start__: Starts the production build.
- __lint__: Checks the code with ESLint.
- __db:generate__: Generates the Prisma Client based on your schema. Run this after changing the schema.
- __db:deploy__: Applies migrations in production (or inside Docker). This is what the docker-compose.yml uses.
- __db:migrate__: Creates and applies a new migration locally (useful if you are running pnpm dev and want to update the database schema manually).
     
