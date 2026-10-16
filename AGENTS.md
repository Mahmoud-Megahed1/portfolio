# 🏛️ THE ENTERPRISE AGENT MANIFESTO (FULL-STACK + AI)
# Rules, Constraints & Architectural Guardrails for Autonomous Agents

This document defines the non-negotiable operational constraints and software engineering principles that every AI Agent (including Antigravity, Claude, and Cursor) MUST follow when planning, executing, and maintaining full-stack software systems integrating Artificial Intelligence.

---

## 1. 🛡️ CORE BEHAVIORAL PROTOCOL (TWO-PASS EXECUTION)

### Principle: "Audit & Plan Before You Touch Code"
1. **Pass 1: Investigation & Zero Code Modification**
   - The agent MUST analyze the existing stack, identify project dependencies, and detect architectural patterns before modifying or adding code.
   - When asked to add a feature or refactor, the agent MUST produce an Architectural Implementation Plan first.
   - For existing codebases: NEVER touch business logic, database entities, or UI aesthetics without explicit user confirmation.
2. **Pass 2: Surgical, Confirmed Implementation**
   - Changes must be applied in strict dependency order:
     * Step A: Database Schemas / Migrations & Entities.
     * Step B: Business Logic, Domain Rules & DTOs.
     * Step C: API Endpoints & Contracts (OpenAPI/Swagger).
     * Step D: Frontend Components & State Integration.
     * Step E: Automated Tests & Verification.
3. **No Silent Destruction:**
   - Preserving existing comments, docstrings, and features is mandatory. The agent MUST NOT delete or replace existing functions with empty placeholders (`// TODO: implement later`).

---

## 2. 🏗️ BACKEND ARCHITECTURAL CONSTRAINTS

1. **Separation of Concerns (Clean / Onion / Vertical Slice):**
   - Core Domain Entities MUST NEVER be exposed directly over HTTP (No returning EF Core / ORM entities to the network).
   - All client interaction MUST go through strongly-typed Data Transfer Objects (`DTOs` / `ViewModels`).
   - Use immutable records where supported (`public record ProductDto(...)`).
2. **Database & Data Integrity:**
   - **Soft Delete Mandate:** Production enterprise data is NEVER hard-deleted. Use `IsDeleted` flags and global query filters to prevent cascading deletes on historical transactions.
   - **Atomic Transactions:** Multiple data mutations MUST execute inside a single atomic transaction (`Unit of Work` / `SaveChangesAsync()`).
   - **No N+1 Queries:** Queries with child navigation properties MUST explicitly project or join (`AsNoTracking()`, `Select()`, `Include()`).
3. **Error Handling & API Contracts:**
   - Do NOT wrap every HTTP response in an artificial `ApiResponse<T>` if it hides HTTP semantics. Return clean data on `200 OK`, and strictly use `RFC 7807 (ProblemDetails)` for `4xx` and `5xx` errors.
   - Explicit Model Binding: Annotate controller parameters with `[FromRoute]`, `[FromQuery]`, or `[FromBody]`.
   - Contract Documentation: Annotate every endpoint with `[ProducesResponseType]` for all expected status codes (`200`, `201`, `204`, `400`, `404`).

---

## 3. 🎨 FRONTEND ENGINEERING CONSTRAINTS

1. **Contract-Driven Development:**
   - Frontend developers MUST NOT write HTTP request functions or model interfaces by hand. Generate TypeScript/Dart clients automatically from the backend's `swagger.json` using `NSwag` or `OpenAPI Generator`.
   - Any backend change MUST trigger a compile-time error on the frontend rather than a silent runtime failure.
2. **Component Architecture:**
   - Separate Presentation components (dumb UI) from Container / Hook components (state, side effects, API calls).
   - Strict Null Checking: Never assume properties exist. Use optional chaining (`user?.profile?.avatar`) and default fallbacks to prevent white-screen crashes.
3. **Responsive & Accessible Standards:**
   - Mobile-first CSS layout (Flexbox / CSS Grid / Tailwind).
   - Ensure proper contrast ratios, ARIA labels, and keyboard navigability.

---

## 4. 🧠 AI INTEGRATION CONSTRAINTS (ENTERPRISE LLM / RAG)

1. **RAG (Retrieval-Augmented Generation) Guardrails:**
   - Never pass raw, unranked database dumps directly into an LLM prompt. Chunk documents with semantic overlap (200-500 tokens), generate embeddings, and query via a Vector Database (`pgvector`, `Qdrant`, `Pinecone`).
   - Grounding Mandate: The system prompt MUST instruct the model to cite retrieved chunk IDs and explicitly declare "I do not know" when context does not contain the answer.
2. **Function Calling & Tool Execution Security:**
   - LLMs MUST NOT execute raw SQL or destructive shell commands directly.
   - Tool calling parameters MUST be validated against strict schemas (`Zod` in TypeScript, `Data Annotations` / `FluentValidation` in C#, `Pydantic` in Python).
   - Destructive operations (financial transfers, user deletion, bulk emails) require human-in-the-loop confirmation (`Approval Gate`).
3. **Cost, Latency & Resilience:**
   - Implement streaming (`Server-Sent Events - SSE`) for interactive conversational UI.
   - Cache frequent deterministic queries using Redis or in-memory LRU caches.
   - Implement Circuit Breakers and Retry policies (e.g., `Polly` in .NET) for LLM API calls with exponential backoff.

---

## 5. 🔒 SECURITY & OWASP CONSTRAINTS

1. **Zero Secrets in Code:**
   - API keys, connection strings, and JWT secrets MUST be loaded from environment variables or secret managers (Azure Key Vault, AWS Secrets Manager, User Secrets).
   - Never commit `.env` files or secrets to Git.
2. **Authentication & Authorization:**
   - Use industry-standard protocols: OAuth2 / OIDC with JWT (JSON Web Tokens).
   - Enforce least-privilege role/claims-based access control on every endpoint (`[Authorize(Roles = "...")]`).
   - Secure Cookies: `HttpOnly`, `SameSite=Strict/Lax`, `Secure=Always`.
3. **CORS (Cross-Origin Resource Sharing):**
   - NEVER use `AllowAnyOrigin()` with `AllowCredentials()` in production.
   - Whitelist exact production domain origins explicitly (`WithOrigins("https://app.company.com")`).

---

## 6. 🧪 TESTING & VERIFICATION MANDATE

1. **The Testing Pyramid:**
   - **Unit Tests:** Fast, in-memory, mocking external dependencies (xUnit, Jest, Vitest, PyTest). Target 80%+ coverage on domain business logic.
   - **Integration Tests:** Verify DB queries, repositories, and API endpoints using real or containerized test databases (`Testcontainers`, `WebApplicationFactory`).
   - **End-to-End (E2E) Tests:** Verify critical user journeys (Sign up -> Search -> Checkout -> AI Query) using Playwright.
2. **Rule of Verification:**
   - An agent has NOT completed a task until it runs the test suite or builds the project in the terminal and verifies that compilation passes with **0 Errors**.
