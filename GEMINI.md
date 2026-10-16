# 🚀 GLOBAL WORKSPACE RULES (FULL-STACK + BACKEND + AI)

## 1. ARABIC & ENGLISH TEXT FLOW (PREVENT BIDI SCRAMBLING)
- Every Arabic paragraph, bullet point, or header MUST begin with a strong Arabic letter. NEVER start an Arabic line with English letters, ASCII numbers, symbols, percentages, exclamation marks, or emojis.
- NO NUMBERED LISTS IN ARABIC: ALWAYS use Arabic words: (`- أولاً: `, `- ثانياً: `) or plain unordered bullets (`- `).
- NEUTRAL PUNCTUATION & COLONS: Always place colons strictly after Arabic words.
- Wrap ALL mixed English technical terms, variable names, and method calls in inline backticks (`int`, `record`, `DTO`).
- PREFER MARKDOWN TABLES FOR TECHNICAL COMPARISONS.

## 2. TWO-PASS CODEBASE PROTOCOL
- Pass 1: Investigate, analyze, and plan. ZERO code modification.
- Pass 2: Apply changes strictly after confirmation in ordered phases (Database -> Domain -> API -> UI -> Tests).

## 3. CORE TECHNICAL STANDARDS
- Backend: Clean Architecture, explicit DTOs, Soft Delete, Unit of Work, RFC 7807 ProblemDetails, CORS policy properly ordered.
- Frontend: Generated SDKs from Swagger (NSwag), strict typing, zero manual API client writing.
- AI: Grounded RAG, Vector DB (Qdrant/pgvector), validated tool schemas, token budgeting, streaming UI.
- Quality: Build passes with 0 errors; Unit & Integration tests verify all business rules.
