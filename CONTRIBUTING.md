# Contributing Guide to Scout

Thank you for your interest in contributing to **Scout – Hostel Finder**.

Scout is an MVP designed to provide a centralized and easy-to-browse platform for discovering university-area student accommodation in Ghana. We welcome contributions from all members of the team and future contributors.

This document explains how we collaborate, submit changes, review code, and maintain project quality.

---

## 1. Project Team

Scout is developed by a cross-functional team consisting of:

* **Backend Development**
* **Frontend Development**
* **DevOps**
* **Cybersecurity**
* **Data Analytics**

Each team is responsible for a specific area while collaborating closely with the other teams.

---

## 2. Contribution Areas

### Backend

Backend contributors are responsible for:

* REST API development
* Database integration
* CRUD operations
* Request validation
* Business logic
* API documentation
* Backend testing
* Database migrations
* Error handling

### Frontend

Frontend contributors are responsible for:

* React and TypeScript development
* Responsive UI
* Hostel cards
* Search functionality
* Category filtering
* Hostel details
* Hostel submission form
* Client-side validation
* API integration
* Accessibility

### DevOps

DevOps contributors are responsible for:

* Docker
* CI/CD
* GitHub Actions
* Environment configuration
* Deployment
* Infrastructure
* Monitoring
* Logging
* Container management
* Release processes

### Cybersecurity

Cybersecurity contributors are responsible for:

* Secure coding practices
* Threat modeling
* XSS prevention
* SQL injection prevention
* API security
* Dependency security
* Security testing
* Container security
* Secrets management
* Security reviews

### Data Analytics

Data Analytics contributors are responsible for:

* Data quality
* Data analysis
* Listing statistics
* Rent analysis
* Category analysis
* Location analysis
* Metrics
* Dashboards
* Data-driven recommendations

---

## 3. Development Workflow

We follow a feature-branch workflow.

```text
main
  │
  ├── feature/backend-listings
  ├── feature/frontend-hostel-card
  ├── feature/security-api-validation
  ├── feature/devops-ci
  └── feature/analytics-dashboard
```

Do not commit directly to `main` unless explicitly authorized.

### Recommended workflow

```bash
git checkout main
git pull origin main

git checkout -b feature/your-feature

# Make your changes

git add .
git commit -m "feat: add hostel listing API"

git push origin feature/your-feature
```

Then create a Pull Request.

---

## 4. Branch Naming

Use descriptive branch names.

### Feature

```text
feature/hostel-search
feature/hostel-filter
feature/listing-api
```

### Bug fix

```text
fix/hostel-card-layout
fix/database-connection
```

### Security

```text
security/xss-validation
security/api-rate-limit
```

### DevOps

```text
devops/dockerize-backend
devops/github-actions
devops/deployment
```

### Documentation

```text
docs/update-readme
docs/api-documentation
```

---

## 5. Commit Convention

Use clear and meaningful commit messages.

We recommend Conventional Commits.

### Format

```text
type(scope): description
```

### Examples

```text
feat(backend): add hostel listing endpoint

feat(frontend): add category filter

fix(backend): validate monthly rent

fix(frontend): correct hostel card layout

security(api): add request rate limiting

devops(ci): add backend test workflow

docs: update installation instructions

test(backend): add hostel controller tests
```

### Common types

| Type       | Purpose              |
| ---------- | -------------------- |
| `feat`     | New feature          |
| `fix`      | Bug fix              |
| `docs`     | Documentation        |
| `test`     | Tests                |
| `security` | Security improvement |
| `devops`   | Infrastructure/CI/CD |
| `refactor` | Code restructuring   |
| `chore`    | Maintenance          |

---

## 6. Pull Requests

Every significant change should be submitted through a Pull Request.

A Pull Request should contain:

* Clear title
* Description of the change
* Related issue
* Testing performed
* Screenshots for UI changes
* Security considerations where applicable
* Deployment considerations where applicable

### Example PR title

```text
feat: add hostel category filtering
```

### Before opening a PR

Make sure:

* [ ] Code builds successfully
* [ ] Tests pass
* [ ] Linting passes
* [ ] No secrets are committed
* [ ] Security checks pass
* [ ] Documentation is updated where necessary
* [ ] Changes have been tested locally

---

## 7. Code Review

Reviewers should check:

### Functionality

* Does the implementation solve the intended problem?
* Does it follow the acceptance criteria?

### Code Quality

* Is the code readable?
* Is it maintainable?
* Are unnecessary changes avoided?

### Security

* Is user input validated?
* Could the change introduce XSS or SQL injection?
* Are secrets exposed?
* Are permissions and API boundaries appropriate?

### Testing

* Are appropriate tests included?
* Do existing tests still pass?

### Performance

* Does the change introduce unnecessary database queries?
* Does it negatively affect frontend performance?

---

## 8. Database Changes

Database schema changes must be documented and implemented through migrations.

Do not manually modify the production database without approval.

For example:

```text
migrations/
├── create_room_categories
├── create_listings
└── add_listing_indexes
```

Changes should consider:

* Data integrity
* Foreign keys
* Indexes
* Constraints
* Backward compatibility
* Migration rollback

---

## 9. Security Requirements

Security is a shared responsibility.

Never commit:

```text
.env
API keys
passwords
database credentials
private keys
tokens
cloud credentials
```

User-submitted content must be properly validated and sanitized on the server.

Security issues should **not** be publicly disclosed through normal GitHub issues.

Report sensitive vulnerabilities privately to the project maintainers.

---

## 10. Testing

Contributors should test their changes before submitting a Pull Request.

### Backend

Test:

* API endpoints
* Validation
* Database operations
* Error handling

### Frontend

Test:

* Components
* Forms
* Filtering
* Search
* Responsive behavior
* API integration

### Security

Test:

* XSS
* SQL injection
* Invalid input
* API abuse
* Dependency vulnerabilities

### DevOps

Test:

* Docker builds
* CI pipelines
* Deployment
* Environment configuration

---

## 11. Documentation

Update documentation when introducing:

* New features
* API endpoints
* Environment variables
* Database changes
* Deployment changes
* Security requirements

Documentation should remain understandable to both technical and non-technical team members.

---

## 12. Issues

Before creating an issue:

1. Search existing issues.
2. Confirm that the problem has not already been reported.
3. Provide enough information to reproduce the problem.

A useful bug report should include:

* Description
* Steps to reproduce
* Expected behavior
* Actual behavior
* Environment
* Screenshots/logs where useful

---

## 13. Local Development

Follow the setup instructions in the main `README.md`.

Do not assume that another contributor has the same operating system or development environment.

Environment-specific configuration should be documented.

---

## 14. Contribution Principles

We value:

* Collaboration
* Respect
* Security
* Simplicity
* Maintainability
* Accountability
* Clear communication
* Continuous learning

The goal is not simply to write code. The goal is to build a reliable and useful product together.

---

## 15. Questions

If you are unsure about an implementation, discuss it with the relevant team before making a major architectural change.

Backend, Frontend, DevOps, Cybersecurity and Data Analytics should communicate before changes that affect multiple areas of the system.

Thank you for contributing to Scout.
