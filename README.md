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

## Getting started

Install dependencies from the repository root:

```bash
pnpm install
```

Run all packages in parallel:

```bash
pnpm dev
```

Or run a single package:

```bash
pnpm --filter ./web dev
pnpm --filter ./cms dev
pnpm --filter ./storybook dev
```

### Seeding the CMS

The CMS includes a seed script that populates the database with demo content: users, ideas, roadmap features and stories, and reactions.

```bash
pnpm --filter ./cms seed
```

This command starts Strapi with the `SEED` environment variable set, so it both boots the CMS and runs the seed script during bootstrap. Use this for the first run on a fresh database. After the seed completes, you can stop the process and run `pnpm --filter ./cms dev` normally. Re-running `pnpm --filter ./cms seed` on an already-seeded database will skip the seed automatically.

## Licence

This project is free and open-source software licenced under the **European Union Public Licence (EUPL) v1.2** or higher.
