# Employee Management System

## Overview

The Employee Management System is a full-stack web application developed using Angular for the frontend and Spring Boot with Microservices architecture for the backend. The application enables efficient management of employee and address information through separate microservices.

## Technology Stack

### Frontend
* Angular

### Backend
* Spring Boot
* Spring Data JPA
* REST APIs
* Microservices Architecture

## Project Structure
### Backend
The backend consists of two independent microservices:
1. **Employee Service**
   * Manages employee-related operations.
   * Provides APIs for employee creation, retrieval, update, and deletion.
2. **Address Service**
   * Manages employee address information.
   * Communicates with the Employee Service through microservice-based API calls.

These services are connected using a microservices architecture and work together to provide complete employee management functionality.

## Prerequisites
Before running the application, ensure that the following software is installed:
* Java JDK 17 (or compatible version)
* Maven
* Angular CLI
* Node.js and npm

## Running the Backend
Navigate to each microservice folder and run the application separately.

### Employee Service
```bash
cd Employee
mvn spring-boot:run
```

### Address Service
```bash
cd Address
mvn spring-boot:run
```

The required dependencies are already defined in the `pom.xml` files.

## Running the Frontend
Navigate to the Angular project folder and execute:
```bash
npm install
ng serve
```

Open your browser and visit:
```text
http://localhost:4200
```

## Features
* Employee Management
* Address Management
* RESTful APIs
* Microservices Communication
* Angular-Based User Interface
* CRUD Operations

# Author

**Nikhil Bhamare**

Java Full Stack Developer | Frontend Developer

Thank you for visiting this repository. If you have any feedback, suggestions, or questions, feel free to reach out or create an issue.
