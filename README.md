# Community Roadmap – Gemeente Amsterdam

This is the graduation project for the Amsterdam Design System team at Gemeente Amsterdam.

The Community Roadmap is a digital platform that helps software development teams stay informed about, and contribute to, the Amsterdam Design System. It provides transparency into what is being worked on, what is planned, and provides a way teams can share ideas and feedback.

## Stack

The front-end is built with **Next.js** and the back-end is powered by **Strapi**. Shared UI components live in a separate package and are previewed with **Storybook**.

## Project structure

This is a [pnpm](https://pnpm.io/) workspace with four packages:

```
/
├── web/        # Next.js front-end
├── cms/        # Strapi back-end
├── ui/         # Shared UI component library
└── storybook/  # Storybook for the UI package
```

## Prerequisites

Make sure the following are installed before setting up the project:

- **Node.js** ≥ 20 — [nodejs.org](https://nodejs.org)
- **pnpm** — `npm install -g pnpm`
- **PostgreSQL** ≥ 14 — on macOS: `brew install postgresql@16`

## Local setup

Follow these steps in order for a fresh setup.

### 1. Install dependencies

From the repository root:

```bash
pnpm install
```

### 2. Set up a local PostgreSQL database

Start the PostgreSQL service:

```bash
# macOS (Homebrew)
brew services start postgresql@16
```

Create a database for the project:

```bash
psql postgres -c "CREATE DATABASE community_roadmap;"
```

Note the following for the next step:

- **Host:** `127.0.0.1`
- **Port:** `5432`
- **Database name:** `community_roadmap`
- **Username:** your OS username (run `whoami` to find it)
- **Password:** empty (unless your PostgreSQL installation requires one)

### 3. Configure the CMS environment

Copy the example file:

```bash
cp cms/.env.example cms/.env
```

Open `cms/.env` and fill in all values. The example file contains the Strapi secret fields; you need to add the database variables and generate proper secret values:

```dotenv
HOST=0.0.0.0
PORT=1337

# Generate each of these with: openssl rand -base64 32
# APP_KEYS requires four comma-separated values
APP_KEYS="<base64>,<base64>,<base64>,<base64>"
API_TOKEN_SALT=<base64>
ADMIN_JWT_SECRET=<base64>
TRANSFER_TOKEN_SALT=<base64>
JWT_SECRET=<base64>
ENCRYPTION_KEY=<base64>

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=community_roadmap
DATABASE_USERNAME=<your-os-username>
DATABASE_PASSWORD=
DATABASE_SSL=false
```

Generate each secret value with:

```bash
openssl rand -base64 32
```

### 4. Seed the database

The CMS includes a seed script that populates the database with demo content: users, ideas, roadmap stories, features, and reactions.

Run the seed command — this boots Strapi and runs the seed automatically during startup:

```bash
pnpm --filter ./cms seed
```

Wait until the terminal logs that the server has started. Once seeding is complete, stop the process with `Ctrl+C`.

Re-running this command on an already-seeded database is safe; the seed is skipped if data already exists.

### 5. Generate a Strapi API token

Start the CMS:

```bash
pnpm --filter ./cms dev
```

Visit [http://localhost:1337/admin](http://localhost:1337/admin) and create an admin account. Then:

1. Go to **Settings → API Tokens**
2. Click **Create new API token**
3. Set the token type to **Full access**
4. Save and copy the generated token

### 6. Configure the web environment

Create a `web/.env.local` file:

```bash
touch web/.env.local
```

Add the following, replacing the placeholder with the token from the previous step:

```dotenv
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337/api
STRAPI_API_TOKEN=<your-api-token>
```

### 7. Start the application

Make sure PostgreSQL is running, then start all packages from the repository root:

```bash
pnpm dev
```

This runs the CMS, web app, and Storybook in parallel. You can also start packages individually:

```bash
pnpm --filter ./web dev        # Next.js front-end
pnpm --filter ./cms dev        # Strapi CMS
pnpm --filter ./storybook dev  # Storybook
```

### Ports

| Service   | URL                         |
| --------- | --------------------------- |
| Web app   | http://localhost:3000       |
| CMS admin | http://localhost:1337/admin |
| Storybook | http://localhost:6006       |

## Licence

This project is free and open-source software licenced under the **European Union Public Licence (EUPL) v1.2** or higher.
