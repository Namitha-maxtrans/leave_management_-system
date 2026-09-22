# Leave Management System

A Leave Management System built using NestJS, TypeScript, MySQL, and TypeORM.

## Technologies Used

- NestJS
- TypeScript
- MySQL
- TypeORM
- class-validator
- class-transformer

## Features

- Employee CRUD
- Department CRUD
- Leave Type CRUD
- Leave Balance management
- Leave Request management
- Leave request approval
- Leave request rejection
- Leave request cancellation
- Leave balance validation
- Overlapping leave request validation
- DTO validation
- Error handling

## Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- MySQL

## Installation

1.Clone the repository:


git clone https://github.com/Namitha-maxtrans/leave_management_-system.git


2. Install Dependencies

Install all required dependencies:


3. Configure Environment Variables

   Create a .env file in the root directory of the project.

Add the following configuration:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=company2
PORT=3000

Replace your_mysql_password with your MySQL password.

Do not commit the .env file to GitHub.

4. Create the Database

Open MySQL and create the database:

CREATE DATABASE company2;

Make sure the database name in .env is:

DB_NAME=company2

5. Start the Application

Run the application in development mode:

npm run start:dev

The application will run at:

http://localhost:3000
API Modules

The application contains the following modules:

Department
Employee
Leave Type
Leave Balance
Leave Requests
Leave Request Business Rules
Days Count

The days_count is calculated using the inclusive difference between start_date and end_date.

Example:

Start Date: 2026-09-25
End Date:   2026-09-27

days_count = 3
Leave Balance Check

A leave request can only be approved when:

allocated - used >= days_count
Leave Balance Update

When a leave request is approved:

used = used + days_count

When an approved leave request is cancelled:

used = used - days_count
##Validation

The application uses class-validator and class-transformer for request validation.