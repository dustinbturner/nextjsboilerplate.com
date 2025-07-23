# NextJS Boilerplate Documentation

This documentation provides comprehensive guidance for building secure, scalable Next.js applications using our opinionated tech stack.

## Documentation Structure

### [00 - Project Setup](./00%20-%20Project%20Setup/)
Getting started with the project, installation, environment setup, and deployment.

### [01 - Security](./01%20-%20Security/)
Security best practices, RLS policies, input validation, and vulnerability management.

### [02 - Design System & UI](./02%20-%20Design_System_UI/)
Design tokens, Tailwind CSS v4, shadcn/ui components, theming, and accessibility.

### [03 - Content Management](./03%20-%20Content%20Management/)
Content architecture, MDX integration, SEO optimization, and editorial workflows.

### [04 - Database](./04%20-%20Database/)
Schema design, Drizzle ORM, Supabase integration, RLS policies, and query optimization.

### [05 - API and Server Actions](./05%20-%20API_and_Server_Actions/)
Server actions, route handlers, API versioning, webhooks, and validation patterns.

### [06 - Authentication](./06%20-%20Authentication/)
Supabase auth setup, session management, RBAC, auth flows, and security practices.

### [07 - Frontend Architecture](./07%20-%20Frontend_Architecture/)
App Router patterns, server vs client components, feature organization, and performance.

### [08 - Testing & CI/CD](./08%20-%20Testing_CI_CD/)
Testing strategies, Vitest setup, CI/CD pipelines, and code quality practices.

### [09 - Observability & Operations](./09%20-%20Observability_Ops/)
Logging, monitoring, error tracking, performance monitoring, and operational practices.

### [99 - Architecture Decision Records](./99%20-%20ADRs/)
Documentation of significant architectural decisions and their rationale.

## Philosophy

This documentation follows the principle of **teachable code**:

- **What it does**: Clear explanations of functionality
- **Why it exists**: Context and reasoning behind decisions
- **How to extend**: Patterns for adding new features safely
- **Security first**: Security considerations in every section

## Getting Started

1. Start with [Project Setup](./00%20-%20Project%20Setup/) for initial configuration
2. Review [Security](./01%20-%20Security/) for security requirements
3. Explore other sections based on your specific needs

## Contributing to Documentation

When adding new documentation:

1. Follow the established structure within each section
2. Include practical examples and code snippets
3. Document security considerations where applicable
4. Update the relevant README.md file in each section
5. Consider creating an ADR for significant decisions

## File Header Convention

Each documentation file should include a header block explaining:

```markdown
<!--
@file: [filename]
@purpose: [what this document covers]
@audience: [who should read this]
@related: [links to related documentation]
-->
```

This ensures documentation remains discoverable and maintainable as the project grows.
