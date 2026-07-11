# AGENTS.md

## 1. Purpose of This Document

This file defines the operating rules for any AI coding agent, assistant, or automated development workflow that contributes to this repository. Its purpose is to ensure that every generated change is consistent, maintainable, production-ready, and aligned with the project goals.

The project is a **professional law firm website**. The implementation must reflect credibility, trust, clarity, restraint, and high-quality execution. This repository is not a playground for experimental patterns or unnecessary complexity. Every decision must support long-term maintainability, a polished user experience, and clean production deployment.

Any agent working in this repository must treat this document as the highest technical authority unless a more specific file in the repository explicitly overrides it.

---

## 2. Project Identity

### 2.1 Project Type

This is a **professional company profile website** for a law firm.

### 2.2 Primary Goals

The website must:

- present the law firm as credible, experienced, and trustworthy,
- help potential clients understand the firm’s services,
- make it easy for visitors to contact the firm,
- support a professional brand image,
- remain lightweight, responsive, accessible, and SEO-friendly,
- be deployable on Vercel without unnecessary infrastructure overhead.

### 2.3 Target Audience

The intended audience includes:

- individual clients,
- corporate clients,
- business owners,
- institutions,
- prospective clients seeking legal consultation,
- users who expect a polished and authoritative legal website.

### 2.4 Content Style

All product-facing content must feel:

- formal,
- precise,
- professional,
- confident,
- calm,
- structured,
- legally appropriate.

Avoid language that is playful, casual, exaggerated, emotional, or salesy. The website should communicate trust and competence rather than hype.

---

## 3. Core Technology Stack

The project uses the following stack unless explicitly instructed otherwise:

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Forms:** React Hook Form
- **Validation:** Zod
- **Email Service:** Resend (if contact form email delivery is implemented)
- **Package Manager:** pnpm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Deployment:** Vercel

### 3.1 Stack Discipline

Do not introduce additional dependencies unless they provide clear, measurable value. Any dependency must be justified by one of the following:

- improved maintainability,
- reduced implementation risk,
- better accessibility,
- stronger validation,
- better performance,
- better developer experience,
- required integration with production infrastructure.

If a simpler native solution is sufficient, prefer the simpler solution.

---

## 4. High-Level Engineering Principles

Every change must satisfy the following principles:

1. **Maintainability over cleverness**
   - Prefer readable, explicit code over compact but opaque code.
   - Avoid patterns that make future maintenance harder.

2. **Correctness over convenience**
   - Do not shortcut validation, error handling, or data flow just to move faster.
   - Verify assumptions before changing production-relevant code.

3. **Consistency over improvisation**
   - Reuse established conventions.
   - Follow the existing folder structure, naming patterns, and architectural approach.

4. **Modularity over monoliths**
   - Keep components small and focused.
   - Extract reusable logic into appropriate utilities, hooks, or feature modules.

5. **Accessibility and performance by default**
   - Accessibility is not optional.
   - Performance is not an afterthought.
   - Both must be preserved in every change.

6. **Production readiness over prototype behavior**
   - Do not leave temporary hacks in production code.
   - Do not create “quick fixes” that will become technical debt.

---

## 5. AI Operating Rules

Any AI agent contributing to this project must follow these rules.

### 5.1 Read Before Modifying

Before changing any file, the agent must:

- inspect the relevant code,
- understand the current architecture,
- identify the file’s role in the system,
- confirm whether similar logic already exists.

Never rewrite code blindly.

### 5.2 Preserve Existing Intent

When editing code, preserve the original architectural intent unless a change is explicitly requested or clearly necessary. Do not refactor unrelated areas just because they look different from your preferred style.

### 5.3 Minimize Surface Area of Change

Make the smallest change that solves the problem correctly. Avoid broad rewrites when a targeted fix is sufficient.

### 5.4 Avoid Unnecessary Regeneration

Do not regenerate entire files unless there is a strong reason to do so. Prefer surgical edits, especially in mature or shared files.

### 5.5 Ask When Requirements Are Ambiguous

If a requirement is unclear and could materially affect the implementation, ask for clarification instead of guessing.

### 5.6 Do Not Invent Business Facts

Do not fabricate:

- law firm achievements,
- attorney credentials,
- client statistics,
- case outcomes,
- office locations,
- certifications,
- partnerships,
- testimonials,
- legal practice details.

If data is missing, use placeholders only when explicitly permitted, and clearly mark them as placeholders.

### 5.7 Explain Major Decisions

When a decision affects architecture, dependency choices, or app structure, explain why the choice is preferable.

---

## 6. Code Quality Standards

### 6.1 TypeScript Requirements

- Use TypeScript everywhere.
- Avoid `any` unless there is no reasonable alternative and the reason is documented.
- Prefer explicit types for function parameters, return values, and structured data.
- Keep type definitions close to where they are used unless they are shared across the project.

### 6.2 Function Design

- Functions should do one thing.
- Prefer pure functions when possible.
- Avoid deeply nested logic.
- Break complex logic into named helpers.
- Use descriptive names that communicate intent.

### 6.3 Component Design

- Components must be small, composable, and reusable.
- Split UI into meaningful parts instead of building oversized components.
- A component should have one clear responsibility.

### 6.4 Readability

- Favor clarity over micro-optimizations.
- Use early returns when they improve readability.
- Avoid magic values.
- Avoid hidden coupling.
- Keep code self-explanatory through naming and structure.

### 6.5 Imports

- Prefer organized and stable import order.
- Do not create circular dependencies.
- Use absolute imports if they are already established in the project.
- Do not introduce inconsistent import paths.

### 6.6 Error Handling

- Handle errors explicitly.
- Never silently fail when user-facing behavior depends on the result.
- Provide meaningful fallback states for UI and data operations.

### 6.7 Null Safety

- Assume that external data can be missing, malformed, or incomplete.
- Guard against undefined values in UI rendering, form handling, and API interaction.

---

## 7. Next.js Architecture Rules

### 7.1 App Router First

This project uses the Next.js App Router. New pages and layouts must be implemented using App Router conventions.

### 7.2 Server Components by Default

Prefer Server Components unless client-side interactivity is truly required.

Use Client Components only when necessary for:

- forms,
- animations,
- event handlers,
- local UI state,
- browser-only APIs,
- interactive controls.

### 7.3 Server Actions and Route Handlers

Use the simplest correct server boundary:

- Server Actions for form submissions and mutations when appropriate,
- Route Handlers when a dedicated endpoint is necessary,
- avoid duplicating backend logic across multiple layers.

### 7.4 Metadata and SEO

Every route must be able to support proper metadata.
Ensure pages can expose meaningful:

- title,
- description,
- canonical intent,
- Open Graph data,
- Twitter Card data when relevant.

### 7.5 Layout Discipline

- Keep route layouts intentional and minimal.
- Avoid duplicating repeated UI across pages if a layout or shared component is the better choice.
- Use semantic page structure.

---

## 8. Folder and Module Organization

The repository should remain organized by responsibility, not by arbitrary file grouping.

### 8.1 Preferred Logical Structure

Typical areas may include:

- `app/` for routes,
- `components/` for shared UI,
- `features/` for domain-specific modules,
- `lib/` for reusable utilities,
- `hooks/` for reusable client hooks,
- `types/` for shared type definitions,
- `constants/` for stable application constants,
- `utils/` for generic helpers,
- `public/` for static assets.

### 8.2 Organization Rule

When a feature grows beyond a small size, place related logic close together. Do not scatter a single feature across unrelated directories unless there is a strong architectural reason.

### 8.3 Avoid Folder Sprawl

Do not create directories just because a pattern seems possible in the future. Create structure when the project actually needs it.

---

## 9. Reusability and Component Strategy

### 9.1 Reuse Before Recreate

Before creating a new component, check whether an existing one can be extended or composed.

### 9.2 Compositional Design

Prefer composition over duplication. Shared UI patterns should become reusable building blocks.

### 9.3 Avoid Premature Abstraction

Do not create abstractions so early that they obscure the feature being implemented. Reuse should remain practical, not theoretical.

### 9.4 Shared Component Behavior

Shared components must be:

- predictable,
- typed,
- accessible,
- visually consistent,
- easy to reuse across the app.

---

## 10. Data and Content Rules

### 10.1 Source of Truth

Use only approved content for:

- firm name,
- attorney names,
- practice areas,
- office address,
- contact details,
- social links,
- legal descriptions,
- brand statements.

### 10.2 Placeholder Policy

Placeholders may be used only when necessary for development, and they must be obviously temporary. Replace them before final delivery.

### 10.3 Legal Accuracy

Because this is a law firm website, all legal claims, service descriptions, and professional credentials must be accurate and approved by the client.

### 10.4 Tone of Copy

All public copy should be:

- clear,
- polished,
- concise,
- respectful,
- trustworthy,
- free of unnecessary jargon unless legally appropriate.

### 10.5 Avoid Sensational Claims

Do not generate exaggerated claims such as “guaranteed success”, “100% win rate”, or unsupported performance metrics.

---

## 11. Forms and User Input

### 11.1 Validation First

All user input must be validated using Zod or an equivalent typed validation approach.

### 11.2 Form Behavior

Forms must provide:

- proper labels,
- required-field handling,
- clear validation messages,
- accessible focus states,
- graceful success and error states.

### 11.3 Contact Form Standards

If the contact form is implemented to send emails:

- use Resend or a similarly reliable service,
- avoid exposing secrets on the client,
- use environment variables,
- provide safe server-side handling.

### 11.4 No Fake Submission

Do not present a form as functional if it is only a visual mockup. If the form is not wired to a real backend, that must be explicitly acknowledged in development notes.

---

## 12. Styling and UI Implementation Rules

### 12.1 Utility-First Discipline

Use Tailwind CSS consistently and avoid fragmented styling approaches.

### 12.2 shadcn/ui Usage

Use shadcn/ui components where they improve consistency, accessibility, or development speed. Do not over-customize them to the point that maintenance becomes difficult.

### 12.3 Design Fidelity

Implement the approved design closely and cleanly. Avoid improvising visual styles outside of the project direction.

### 12.4 Visual Consistency

Spacing, typography, border radius, shadows, hover states, and motion must remain consistent across the site.

### 12.5 Asset Handling

Use optimized assets. Prefer framework-native image optimization where appropriate.

---

## 13. Motion and Interaction Rules

### 13.1 Purposeful Motion Only

Animation must support comprehension, flow, and polish. It must not distract from the content.

### 13.2 Keep Motion Subtle

Avoid overly flashy or excessive motion. Motion should feel restrained and premium.

### 13.3 Interaction Feedback

All interactive elements must have:

- hover feedback,
- active feedback,
- focus states,
- disabled states where applicable.

### 13.4 Performance Awareness

Do not introduce motion patterns that noticeably degrade rendering performance or usability on lower-end devices.

---

## 14. Accessibility Requirements

Accessibility is mandatory.

### 14.1 Semantic Structure

Use semantic HTML wherever possible.

### 14.2 Keyboard Accessibility

All interactive controls must be usable by keyboard.

### 14.3 Focus Management

Visible focus indicators must never be removed without a justified alternative.

### 14.4 Text Alternatives

Meaningful images must include proper alternative text.

### 14.5 Color Contrast

Text and controls must maintain sufficient contrast for readability.

### 14.6 Screen Reader Compatibility

Assistive technologies must be able to interpret key UI elements correctly.

---

## 15. SEO Requirements

### 15.1 Page Metadata

Every important page must have meaningful metadata.

### 15.2 Discoverability

The site should be structured so that search engines can understand:

- what the firm does,
- which services are offered,
- where the firm is located,
- how to contact the firm.

### 15.3 Content Structure

Use headings in a logical hierarchy. Do not skip heading levels without reason.

### 15.4 Structured Data

If appropriate and approved, use schema markup to strengthen search engine comprehension.

### 15.5 Clean URLs

Routes should remain readable, stable, and consistent.

---

## 16. Performance Requirements

### 16.1 Fast First Load

The site should load quickly and feel responsive.

### 16.2 Avoid Wasteful Rendering

Do not introduce unnecessary client-side rendering or heavy dependencies that harm performance.

### 16.3 Optimize Media

Optimize images and any other static media.

### 16.4 Efficient Bundles

Prefer code-splitting and minimal client bundles where appropriate.

### 16.5 Smooth Interactions

Interactions should feel smooth without sacrificing CPU efficiency.

---

## 17. Security Requirements

Even a company profile site must follow basic security discipline.

### 17.1 Secrets Management

Never commit secrets to the repository.
Use environment variables for sensitive configuration.

### 17.2 Input Safety

Validate all user input on the server side as well as the client side when applicable.

### 17.3 Exposure Discipline

Do not expose internal logic, tokens, or service credentials in client code.

### 17.4 Dependency Discipline

Do not install packages that are unnecessary or untrusted.

### 17.5 Production Safety

Before implementing any server-side behavior, consider logging, abuse prevention, and failure cases.

---

## 18. Environment Variable Rules

- Never hardcode secrets.
- Document required environment variables in a dedicated place if needed.
- Use clear, predictable names.
- Treat production variables as sensitive configuration.

Common variables may include service URLs, API keys, and deployment URLs.

---

## 19. Linting, Formatting, and Consistency

### 19.1 ESLint

Code must remain lint-clean or the reason for exceptions must be clearly justified.

### 19.2 Prettier

Formatting must remain consistent across the codebase.

### 19.3 Consistent Style

Do not mix competing style conventions within the same file or feature.

### 19.4 No Style Drift

When editing a file, match the style of the surrounding code unless there is a justified reason to improve it.

---

## 20. Naming Conventions

### 20.1 Components

Use `PascalCase` for React components.

### 20.2 Functions and Variables

Use clear `camelCase` names.

### 20.3 Constants

Use stable and descriptive constant naming.

### 20.4 Files and Routes

Keep file names predictable and consistent with the project’s existing conventions.

### 20.5 Clarity First

Names should communicate purpose, not just implementation detail.

---

## 21. Git and Version Control Standards

### 21.1 Commit Discipline

Keep commits focused and meaningful.

### 21.2 Conventional Commit Style

Prefer structured commit messages such as:

- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `style:`
- `test:`
- `chore:`
- `perf:`

### 21.3 Avoid Noisy Changes

Do not bundle unrelated changes into one commit or one pull request unless necessary.

### 21.4 Protect Main Work

Avoid destabilizing the main branch with unreviewed experimental changes.

---

## 22. Testing and Verification Discipline

### 22.1 Verify Before Declaring Done

A change is not complete until it has been checked for correctness.

### 22.2 Validate Key Paths

Any change affecting UI, form handling, navigation, or server-side logic must be validated carefully.

### 22.3 Check for Regressions

Do not assume that a localized change has no side effects.

### 22.4 Prefer Practical Testing

Test the paths that matter most to users:

- homepage rendering,
- navigation,
- contact form,
- responsiveness,
- accessibility,
- metadata.

---

## 23. Deployment and Environment Awareness

### 23.1 Vercel Compatibility

The app must remain deployable on Vercel without special infrastructure requirements unless explicitly required.

### 23.2 Production Readiness

Before finalizing a feature, consider whether it behaves properly in production as well as in development.

### 23.3 Environment Differences

Be aware that features may behave differently between local and hosted environments.

### 23.4 Build Safety

Avoid code patterns that break static analysis, server rendering, or deployment pipelines.

---

## 24. Feature Scope Discipline

### 24.1 Stay Within Scope

Do not add major features that were not requested or approved.

### 24.2 Avoid Scope Creep

Do not expand the site into a dashboard, CMS, client portal, or platform unless that is explicitly part of the project scope.

### 24.3 Prefer a Strong Core Site

A small number of well-executed sections is better than a cluttered site full of weak features.

### 24.4 Focus on High-Value Enhancements

When suggesting improvements, prioritize things that increase clarity, trust, usability, and professionalism.

---

## 25. Content Integrity Rules

Because this is a law firm website, content integrity is non-negotiable.

### 25.1 No Fabrication

Never fabricate:

- lawyer biographies,
- degrees,
- certifications,
- awards,
- office history,
- client counts,
- case results,
- testimonials,
- partner names,
- legal affiliations.

### 25.2 No Unapproved Legal Advice

Do not present generic content as individualized legal advice.

### 25.3 No Risky Promises

Avoid wording that suggests guaranteed outcomes, risk-free solutions, or unrealistic legal promises.

### 25.4 Respect Client Approval

Any client-facing claim that could affect legal credibility must be based on approved source material.

---

## 26. Communication Style for AI Output

When producing explanations, summaries, or implementation notes:

- be clear,
- be direct,
- be professional,
- avoid unnecessary verbosity unless detail is requested,
- distinguish facts from assumptions,
- state limitations honestly,
- prefer structured explanation when the topic is complex.

Do not use vague reassurance. Do not present uncertain assumptions as verified truth.

---

## 27. Default Decision-Making Hierarchy

When multiple implementation options exist, choose in this order:

1. The option already used in the repository.
2. The option that is simplest and most maintainable.
3. The option that best fits Next.js 15 and Vercel.
4. The option with the best accessibility and performance characteristics.
5. The option that minimizes future maintenance overhead.

If the trade-off is significant, document the reasoning.

---

## 28. What the AI Should Never Do

The AI must never:

- introduce unnecessary packages without justification,
- break the app architecture for cosmetic preference,
- invent law firm facts,
- ignore TypeScript or ESLint issues,
- ignore accessibility,
- ignore performance regressions,
- hardcode secrets,
- make unrelated refactors without reason,
- delete existing work without confirmation,
- overcomplicate simple features,
- under-document important decisions,
- leave temporary development code in production paths.

---

## 29. Final Quality Bar

A change is acceptable only if it is:

- correct,
- maintainable,
- consistent,
- accessible,
- performant,
- responsive,
- production-ready,
- aligned with the project’s professional law firm identity.

If a proposed implementation does not meet this standard, improve it before considering it done.

---

## 30. Closing Principle

This repository should reflect a serious professional standard. Every code change, every new component, and every architectural decision should help the website feel trustworthy, polished, and reliable. The final result must look and behave like a carefully crafted legal services website, not a generic template.
