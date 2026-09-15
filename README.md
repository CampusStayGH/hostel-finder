# Scout — Hostel Finder

> A centralized platform for discovering university-area student accommodation in Ghana.

[![Status](https://img.shields.io/badge/status-MVP-blue)](#)
[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-61DAFB)](#)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)](#)
[![Database](https://img.shields.io/badge/database-PostgreSQL-4169E1)](#)
[![DevOps](https://img.shields.io/badge/DevOps-Docker%20%2B%20CI%2FCD-2496ED)](#)

---

## 1. About Scout

Scout is a Hostel Finder MVP designed to make it easier for students to discover available accommodation around universities in Ghana.

Student accommodation information is often scattered across:

* WhatsApp groups
* Facebook groups
* Physical bulletin boards
* Private landlords
* Local accommodation listings
* Other disconnected channels

Scout brings these listings together into a single, easy-to-browse platform.

The MVP focuses on two primary users:

* **Hostel Seekers** — students looking for accommodation.
* **Hostel Providers** — landlords, housing operators, or students with available accommodation.

---

## 2. Problem Statement

Students searching for accommodation often have to search through multiple disconnected sources before finding suitable housing.

This creates problems such as:

* Difficult discovery
* Inconsistent information
* Time-consuming searches
* Poor comparison of accommodation options
* Limited visibility for hostel providers

Scout addresses this problem by providing a centralized platform where accommodation listings can be discovered and published.

---

## 3. MVP Solution

Scout allows users to:

1. Browse available hostel listings.
2. Search listings.
3. Filter listings by room category.
4. View hostel details.
5. Submit a new hostel listing.
6. See the newest active listings first.

---

## 4. MVP Features

### Hostel Discovery

The homepage displays available accommodation as structured hostel cards.

Each card can contain:

* Listing title
* Monthly rent
* Location
* Proximity information
* Room category
* Description

### Room Category Filtering

Users can filter listings by:

* Single Room
* Double Room
* Shared Apartment

### Search

Users can search listings using information such as:

* Hostel/listing title
* Location

### Hostel Details

Users can open a listing to view additional information about the accommodation.

### Hostel Submission

Providers can submit:

* Listing title
* Monthly rent
* Location
* Proximity information
* Description
* Room category
* Provider contact information

### Listing Status

Listings can have one of the following statuses:

```text
active
filled
archived
```

Only active listings should appear on the public listing feed.

---

## 5. MVP Scope

### In Scope

* Responsive homepage
* Hostel listing cards
* Hostel submission form
* Listing categories
* Search
* Filtering
* Hostel details
* REST API
* PostgreSQL database
* Basic security controls
* CI/CD
* Deployment
* Testing

### Out of Scope for the Initial MVP

The following features are reserved for future versions:

* User account registration
* Student profiles
* Provider accounts
* Authentication
* Direct booking
* Deposit payments
* Online rent transactions
* Digital rental agreements
* Public reviews/comments
* Full admin approval workflow
* Bookmarking
* Property image uploads

---

## 6. Architecture

```text
                    ┌──────────────────────┐
                    │       Students       │
                    │     & Providers      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ React + TypeScript   │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         REST / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                         SQL / ORM
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │       Database       │
                    └──────────────────────┘

                         CI/CD
                           │
                           ▼
                    ┌──────────────┐
                    │ GitHub Actions│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Docker    │
                    └──────┬───────┘
                           │
                           ▼
                       Deployment
```

---

## 7. Database

Scout uses a relational database design.

### Main tables

```text
room_categories
       │
       │ 1:N
       ▼
    listings
```

### `room_categories`

```text
id
name
description
created_at
```

### `listings`

```text
id
title
description
monthly_rent
location
proximity_to
category_id
provider_name
provider_phone
status
created_at
updated_at
```

### Listing statuses

```text
active
filled
archived
```

The `category_id` field establishes a relationship between a listing and its room category.

---

## 8. API

The backend exposes RESTful endpoints.

### Listings

```http
GET    /api/hostels
GET    /api/hostels/:id
POST   /api/hostels
PUT    /api/hostels/:id
DELETE /api/hostels/:id
```

### Categories

```http
GET /api/categories
```

### Filtering

```http
GET /api/hostels?category=Single%20Room
```

### Search

```http
GET /api/hostels?search=ucc
```

---

## 9. Technology Stack

### Frontend

* React
* TypeScript
* HTML
* CSS
* REST API integration

### Backend

* Node.js
* Express.js
* REST API

### Database

* PostgreSQL

### DevOps

* Git
* GitHub
* Docker
* GitHub Actions
* CI/CD

### Security

* Input validation
* Server-side sanitization
* Secure API practices
* Dependency scanning
* Container security
* OWASP-aligned testing

### Analytics

* SQL
* Listing metrics
* Rent analysis
* Category analysis
* Location analysis
* Data visualization

---

## 10. Team Responsibilities

Scout is developed by a cross-functional team.

| Team           | Main Responsibility                                               |
| -------------- | ----------------------------------------------------------------- |
| Backend        | API, database, business logic and backend testing                 |
| Frontend       | React UI, forms, search, filtering and API integration            |
| DevOps         | Docker, CI/CD, deployment, monitoring and infrastructure          |
| Cybersecurity  | Security testing, secure development and vulnerability management |
| Data Analytics | Data quality, metrics, analysis and dashboards                    |

### Backend

Responsible for:

* PostgreSQL schema
* REST API
* CRUD
* Validation
* Business logic
* API documentation
* Backend testing

### Frontend

Responsible for:

* React application
* Hostel cards
* Search
* Filters
* Submission form
* Responsive design
* API integration

### DevOps

Responsible for:

* Docker
* GitHub Actions
* CI/CD
* Deployment
* Environment management
* Monitoring
* Logging

### Cybersecurity

Responsible for:

* Threat modeling
* Secure coding
* XSS prevention
* SQL injection prevention
* API security
* Security testing
* Dependency scanning
* Container scanning

### Data Analytics

Responsible for:

* Data quality
* Data analysis
* Metrics
* Rent trends
* Category distribution
* Location analysis
* Analytics dashboards

---

## 11. Getting Started

### Prerequisites

Install the following:

```text
Git
Node.js
npm
PostgreSQL
Docker
```

Check your installations:

```bash
git --version
node --version
npm --version
psql --version
docker --version
```

---

## 12. Clone the Repository

```bash
git clone <repository-url>

cd scout
```

---

## 13. Environment Variables

Create the appropriate environment files for the frontend and backend.

Example backend configuration:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/scout
```

Do not commit real credentials to Git.

Add environment files to `.gitignore`.

---

## 14. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 15. Run the Application

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

The exact ports and commands may vary depending on the final implementation.

---

## 16. Docker

The project can be containerized for consistent development and deployment.

Example:

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

## 17. Testing

Before submitting changes, contributors should run the appropriate tests.

Example:

```bash
npm test
```

Linting:

```bash
npm run lint
```

Build:

```bash
npm run build
```

The CI pipeline should automatically perform appropriate quality and security checks.

---

## 18. Security

Security is integrated into the development lifecycle.

### Key security requirements

* Validate user input.
* Sanitize user-submitted content.
* Prevent XSS.
* Prevent SQL injection.
* Protect secrets.
* Apply appropriate CORS policies.
* Use secure HTTP headers.
* Rate-limit sensitive endpoints.
* Scan dependencies for vulnerabilities.
* Scan container images.
* Avoid exposing sensitive information in API responses.

### Never commit

```text
.env
passwords
API keys
access tokens
private keys
database credentials
cloud credentials
```

For security vulnerabilities, follow the project's responsible disclosure process rather than publishing sensitive exploit details in a public issue.

---

## 19. CI/CD

Pull Requests should go through automated checks before merging.

Recommended pipeline:

```text
Pull Request
     │
     ├── Install dependencies
     ├── Lint
     ├── Unit tests
     ├── Integration tests
     ├── Security/dependency scan
     ├── Docker build
     └── Build verification
              │
              ▼
           Merge
              │
              ▼
          Deployment
              │
              ▼
          Monitoring
```

---

## 20. Project Success Metrics

The MVP aims to achieve:

### Hostel Seeker

A student should be able to locate a viable listing matching their preferred category in **3 clicks or less**.

### Hostel Provider

A provider should be able to successfully publish a listing in **under 2 minutes**.

### Initial Dataset

The MVP should launch with at least **10 active test listings**.

### Performance

The homepage listing collection should target a render time of **under 2 seconds** on normal broadband with an active dataset of approximately 100 entries.

---

## 21. Project Roadmap

### Phase 1 — Backend & Database

* Database schema
* Migrations
* CRUD API
* API testing
* Validation

### Phase 2 — Frontend

* Hostel cards
* Homepage
* Submission form
* API integration
* Search
* Category filtering

### Phase 3 — Security & DevOps

* Security testing
* CI/CD
* Docker
* Deployment
* Monitoring
* Logging

### Phase 4 — Analytics

* Data quality
* Metrics
* Listing analytics
* Rent analysis
* Category analysis
* Dashboard

### Future

Potential future capabilities include:

* User accounts
* Authentication
* Provider profiles
* Admin/moderator approval
* Bookmarks
* Property images
* Booking
* Payment capabilities

---

## 22. Contributing

We welcome contributions.

Please read:

**[CONTRIBUTING.md](CONTRIBUTING.md)**

before submitting a Pull Request.

All contributors are also expected to follow:

**[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**

---

## 23. License

This project is currently an internship/MVP project.

The licensing terms should be added by the project owners before public distribution.

---

## 24. Project Vision

Scout aims to make student accommodation discovery simpler, faster and more accessible.

Instead of searching through multiple disconnected platforms, students should be able to visit one place, compare available accommodation and quickly find a suitable option.

> **Scout — Find the right place, faster.**
