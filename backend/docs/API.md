# Worknest — API Documentation

## 1. API Overview

**Base URL**

`http://localhost:5000/api`

**Backend Technology**

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* MySQL
* Zod Validation
* JWT Authentication

### Authentication

Protected APIs require:

`Authorization: Bearer <token>`

The JWT token is returned after successful registration or login.

---

# 2. Authentication APIs

## Register User

**POST** `/auth/register`

### Request Body

```json
{
  "name": "Mahnoor Khan",
  "email": "mahnoor@example.com",
  "password": "password123"
}
```

### Success Response — 201

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "JWT_TOKEN",
  "user": {}
}
```

### Validation

* `name`: 2–50 characters
* `email`: valid email
* `password`: 6–100 characters

---

## Login User

**POST** `/auth/login`

### Request Body

```json
{
  "email": "mahnoor@example.com",
  "password": "password123"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {}
}
```

---

## Get Current User

**GET** `/auth/me`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "user": {}
}
```

---

## Change Password

**PUT** `/auth/change-password`

**Authentication:** Required

### Request Body

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

# 3. Dashboard API

## Get Dashboard

**GET** `/dashboard`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "Dashboard data fetched successfully",
  "stats": {},
  "taskDistribution": {},
  "projects": [],
  "myTasks": [],
  "deadlines": [],
  "activity": []
}
```

The dashboard provides project statistics, task distribution, user tasks, deadlines, projects, and activity information.

---

# 4. Project APIs

## Get All Projects

**GET** `/projects`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "count": 2,
  "data": []
}
```

---

## Get Project by ID

**GET** `/projects/:id`

**Authentication:** Required

### Example

`GET /projects/1`

### Success Response — 200

```json
{
  "success": true,
  "data": {}
}
```

---

## Create Project

**POST** `/projects`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "name": "Worknest Website",
  "description": "Project management system",
  "status": "ACTIVE",
  "teamId": 1
}
```

### Success Response — 201

```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {}
}
```

### Allowed Status

* `ACTIVE`
* `COMPLETED`
* `ARCHIVED`

---

## Update Project

**PUT** `/projects/:id`

**Authentication:** Required

### Request Body

```json
{
  "name": "Updated Project",
  "description": "Updated description",
  "status": "COMPLETED",
  "teamId": 1
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {}
}
```

---

## Delete Project

**DELETE** `/projects/:id`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

# 5. Task APIs

## Get All Tasks

**GET** `/tasks`

**Authentication:** Required

### Optional Query Parameters

```text
status
priority
projectId
assignedToId
```

### Example

`GET /tasks?status=TODO`

### Success Response — 200

```json
{
  "success": true,
  "count": 1,
  "filters": {},
  "tasks": []
}
```

---

## Get Task by ID

**GET** `/tasks/:id`

**Authentication:** Required

### Example

`GET /tasks/1`

### Success Response — 200

```json
{
  "success": true,
  "task": {}
}
```

---

## Create Task

**POST** `/tasks`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "title": "Create Login Page",
  "description": "Design and implement login page",
  "status": "TODO",
  "priority": "HIGH",
  "projectId": 1,
  "assignedToId": 2,
  "dueDate": "2026-10-15T00:00:00.000Z"
}
```

### Success Response — 201

```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {}
}
```

### Allowed Status

* `TODO`
* `IN_PROGRESS`
* `COMPLETED`

### Allowed Priority

* `LOW`
* `MEDIUM`
* `HIGH`

---

## Update Task

**PUT** `/tasks/:id`

**Authentication:** Required

### Request Body

```json
{
  "title": "Updated Login Task",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {}
}
```

---

## Delete Task

**DELETE** `/tasks/:id`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

# 6. Team APIs

## Get All Teams

**GET** `/teams`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": []
}
```

---

## Get My Team Memberships

**GET** `/teams/my-memberships`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": []
}
```

---

## Get Team by ID

**GET** `/teams/:id`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": {}
}
```

---

## Create Team

**POST** `/teams`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "name": "Development Team",
  "description": "Software development team",
  "departmentId": 1
}
```

### Success Response — 201

```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {}
}
```

---

## Update Team

**PUT** `/teams/:id`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "name": "Frontend Development Team",
  "description": "Frontend development team",
  "departmentId": 1
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Team updated successfully",
  "data": {}
}
```

---

## Delete Team

**DELETE** `/teams/:id`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "message": "Team deleted successfully"
}
```

---

## Add Team Member

**POST** `/teams/:id/members`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "userId": 2,
  "role": "MEMBER"
}
```

### Allowed Roles

* `MEMBER`
* `TEAM_LEAD`
* `MANAGER`

### Success Response — 201

```json
{
  "success": true,
  "message": "Member added to team successfully",
  "data": {}
}
```

---

## Update Team Member Role

**PUT** `/teams/:id/members/:userId`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "role": "TEAM_LEAD"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Team member role updated successfully",
  "data": {}
}
```

---

## Remove Team Member

**DELETE** `/teams/:id/members/:userId`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "message": "Member removed from team successfully"
}
```

---

## Get Team Member Details

**GET** `/teams/:id/members/:userId`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": {}
}
```

---

# 7. Department APIs

## Get All Departments

**GET** `/departments`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": []
}
```

---

## Get Department by ID

**GET** `/departments/:id`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": {}
}
```

---

## Create Department

**POST** `/departments`

**Authentication:** Required

### Request Body

```json
{
  "name": "Software Development",
  "description": "Software development department"
}
```

### Success Response — 201

```json
{
  "success": true,
  "message": "Department created successfully",
  "data": {}
}
```

---

## Update Department

**PUT** `/departments/:id`

**Authentication:** Required

### Request Body

```json
{
  "name": "Engineering",
  "description": "Engineering department"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Department updated successfully",
  "data": {}
}
```

---

## Delete Department

**DELETE** `/departments/:id`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "Department deleted successfully"
}
```

---

# 8. User APIs

## Get All Users

**GET** `/users`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "count": 2,
  "users": []
}
```

---

## Get User by ID

**GET** `/users/:id`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "user": {}
}
```

---

## Get User Details

**GET** `/users/:id/details`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "details": {}
}
```

User details may include department, team, tasks, statistics, and projects.

---

## Get My Profile

**GET** `/users/profile`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "user": {}
}
```

---

## Update My Profile

**PUT** `/users/profile`

**Authentication:** Required

### Request Body

```json
{
  "name": "Mahnoor Khan",
  "email": "mahnoor@example.com"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {}
}
```

---

## Change Profile Password

**PATCH** `/users/profile/password`

**Authentication:** Required

### Request Body

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Update User — Admin

**PUT** `/users/:id`

**Authentication:** Required
**Authorization:** Admin

### Request Body

```json
{
  "name": "Updated User",
  "email": "user@example.com",
  "role": "USER"
}
```

### Allowed Roles

* `USER`
* `ADMIN`

### Success Response — 200

```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {}
}
```

---

## Delete User — Admin

**DELETE** `/users/:id`

**Authentication:** Required
**Authorization:** Admin

### Success Response — 200

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

# 9. Settings APIs

## Get Settings

**GET** `/settings`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "data": {}
}
```

---

## Update Settings

**PUT** `/settings`

**Authentication:** Required

### Request Body

```json
{
  "language": "English",
  "timeZone": "Asia/Karachi",
  "dateFormat": "DD/MM/YYYY",
  "taskNotifications": true,
  "projectUpdates": true,
  "teamActivity": false,
  "theme": "light",
  "defaultTaskPriority": "MEDIUM",
  "defaultTaskStatus": "TODO"
}
```

### Success Response — 200

```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": {}
}
```

### Allowed Theme

* `light`
* `dark`

### Default Task Priority

* `LOW`
* `MEDIUM`
* `HIGH`

### Default Task Status

* `TODO`
* `IN_PROGRESS`

---

# 10. Notification APIs

## Get Notifications

**GET** `/notifications`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "notifications": []
}
```

---

## Mark Notification as Read

**PATCH** `/notifications/:id/read`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## Mark All Notifications as Read

**PATCH** `/notifications/read-all`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Delete Notification

**DELETE** `/notifications/:id`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Clear All Notifications

**DELETE** `/notifications`

**Authentication:** Required

### Success Response — 200

```json
{
  "success": true,
  "message": "Notifications cleared"
}
```

---

# 11. Common HTTP Status Codes

| Status | Meaning                                        |
| ------ | ---------------------------------------------- |
| 200    | Request successful                             |
| 201    | Resource created                               |
| 400    | Bad request / validation / business rule error |
| 401    | Authentication required or invalid credentials |
| 403    | Authenticated user does not have permission    |
| 404    | Resource not found                             |
| 409    | Duplicate/conflicting resource                 |
| 500    | Internal server error                          |

---

# 12. Authentication Flow

```text
Register / Login
       ↓
   JWT Token
       ↓
Frontend stores token
       ↓
Authorization Header
       ↓
Bearer <token>
       ↓
authenticate middleware
       ↓
req.user
       ↓
Controller
       ↓
Service
       ↓
Prisma
       ↓
MySQL
```

### Example Authorization Header

http
Authorization: Bearer eyJhbGciOiJIUzI1Ni...


---

# 13. API Architecture

```text
Frontend
   ↓
API Service
   ↓
Axios
   ↓
Express Route
   ↓
Authentication / Authorization
   ↓
Validation
   ↓
Controller
   ↓
Backend Service
   ↓
Prisma ORM
   ↓
MySQL Database
```

### Responsibility

**Route**

* Endpoint define karta hai
* Middleware apply karta hai

**Middleware**

* Authentication
* Authorization
* Validation
* Error handling

**Controller**

* Request receive karta hai
* Service call karta hai
* Response return karta hai

**Service**

* Business logic handle karta hai
* Prisma/database operations perform karta hai

**Prisma**

* Database ke saath interaction

---

# 14. API Endpoint Summary

| Module        | Method | Endpoint                     | Auth  |
| ------------- | ------ | ---------------------------- | ----- |
| Auth          | POST   | `/auth/register`             | No    |
| Auth          | POST   | `/auth/login`                | No    |
| Auth          | GET    | `/auth/me`                   | Yes   |
| Auth          | PUT    | `/auth/change-password`      | Yes   |
| Dashboard     | GET    | `/dashboard`                 | Yes   |
| Projects      | GET    | `/projects`                  | Yes   |
| Projects      | GET    | `/projects/:id`              | Yes   |
| Projects      | POST   | `/projects`                  | Admin |
| Projects      | PUT    | `/projects/:id`              | Yes   |
| Projects      | DELETE | `/projects/:id`              | Admin |
| Tasks         | GET    | `/tasks`                     | Yes   |
| Tasks         | GET    | `/tasks/:id`                 | Yes   |
| Tasks         | POST   | `/tasks`                     | Admin |
| Tasks         | PUT    | `/tasks/:id`                 | Yes   |
| Tasks         | DELETE | `/tasks/:id`                 | Admin |
| Teams         | GET    | `/teams`                     | Yes   |
| Teams         | GET    | `/teams/my-memberships`      | Yes   |
| Teams         | GET    | `/teams/:id`                 | Yes   |
| Teams         | POST   | `/teams`                     | Admin |
| Teams         | PUT    | `/teams/:id`                 | Admin |
| Teams         | DELETE | `/teams/:id`                 | Admin |
| Teams         | POST   | `/teams/:id/members`         | Admin |
| Teams         | PUT    | `/teams/:id/members/:userId` | Admin |
| Teams         | DELETE | `/teams/:id/members/:userId` | Admin |
| Departments   | GET    | `/departments`               | Yes   |
| Departments   | GET    | `/departments/:id`           | Yes   |
| Departments   | POST   | `/departments`               | Yes   |
| Departments   | PUT    | `/departments/:id`           | Yes   |
| Departments   | DELETE | `/departments/:id`           | Yes   |
| Users         | GET    | `/users`                     | Yes   |
| Users         | GET    | `/users/profile`             | Yes   |
| Users         | PUT    | `/users/profile`             | Yes   |
| Users         | PATCH  | `/users/profile/password`    | Yes   |
| Users         | GET    | `/users/:id`                 | Admin |
| Users         | GET    | `/users/:id/details`         | Admin |
| Users         | PUT    | `/users/:id`                 | Admin |
| Users         | DELETE | `/users/:id`                 | Admin |
| Settings      | GET    | `/settings`                  | Yes   |
| Settings      | PUT    | `/settings`                  | Yes   |
| Notifications | GET    | `/notifications`             | Yes   |
| Notifications | PATCH  | `/notifications/read-all`    | Yes   |
| Notifications | PATCH  | `/notifications/:id/read`    | Yes   |
| Notifications | DELETE | `/notifications/:id`         | Yes   |
| Notifications | DELETE | `/notifications`             | Yes   |
