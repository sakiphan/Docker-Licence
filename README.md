


```markdown
# Docker-Licensed Calculator App

This project consists of a license control API and a simple calculator application. The calculator application shuts down when the license period expires.
```
## Project Structure
licensed-calculator/
├── license-api/
│   ├── Dockerfile
│   ├── license-api.js
│   ├── package.json
│   └── start_time.json
└── calculator-app/
    ├── Dockerfile
    ├── calculator-app.js
    ├── package.json
    └── public/
        └── index.html
```

## Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for local development)

## Setup and Running

Follow these steps to set up and run the project.

### Step 1: Clone the Repository

```bash
git clone https://github.com/sakiphan/docker-licensed.git
cd licensed-calculator
```

### Step 2: Start Services with Docker Compose

```bash
docker-compose up --build
```

This command will start both the license control API and the calculator application.

### Step 3: Open the Application in Your Browser

Open your browser and navigate to `http://localhost:3000` to use the calculator application.

## License Control API

The license control API checks the validity of a license for a certain period (in this example, 2 minutes). The API runs at `http://localhost:4000/check-license`.

### API Endpoint

- `GET /check-license`: Checks if the license is still valid. If the license has expired, it returns a 403 status code.

### Example Response

When the license is valid:

```json
{
  "message": "License is valid. Remaining time: 119.99599981307983 seconds"
}
```

When the license has expired:

```json
{
  "message": "License has expired."
}
```

## Calculator Application

The calculator application is integrated with the license control API. When the license period expires, the application will shut down.

### User Interface

The calculator has a simple user interface with buttons for digits and basic arithmetic operations.

### License Check

The application periodically checks the license status every 10 seconds. If the license has expired, it hides the calculator interface and displays an alert message.

## Contributing

1. Fork this repository.
2. Create a new branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

