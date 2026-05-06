/**
 * ############################################################################
 * ############################################################################
 * ##                                                                        ##
 * ##                      ECOTRACK TECHNICAL MANIFESTO                      ##
 * ##                "The AI-Driven Sustainability Architect"                ##
 * ##                                                                        ##
 * ############################################################################
 * ############################################################################
 * 
 * This file serves as your complete technical guide for the EcoTrack project.
 * It is designed to prepare you for a high-level technical interview by 
 * explaining the "how" and the "why" behind every architectural decision.
 */

export const ProjectReport = () => {
  return (
    <div className="technical-report">
      {/* 
      1. THE TECHNOLOGY STACK (THE "WHY")
      --------------------------------------------------------------------------
      - FRONTEND: Next.js 14+ (React)
        * Why? Next.js provides Server Components (better performance) and 
          Middleware (global auth gates). We use TypeScript for type safety.
        * Styling: Tailwind CSS for rapid, utility-first design.
        * Animations: Framer Motion for that "premium" glassmorphic feel.

      - BACKEND: Spring Boot 3.x (Java 17+)
        * Why? Spring is the industry standard for secure, scalable backends. 
          It provides high-level abstractions like Spring Security and JPA.
        * Security: Spring Security + JWT (JSON Web Tokens).

      - DATABASES: 
        * PostgreSQL (Primary): Used for structured data (Users, Activities, Achievements).
          Relational DBs are perfect for strict schemas and complex queries.
        * MongoDB (Session Store): Used for UserSession management.
          Why? MongoDB is a Document DB. It's fast for simple Key-Value lookups 
          and handles session data (which is temporary and structured as JSON) beautifully.
      */}

      {/* 
      2. ARCHITECTURE & DESIGN PATTERNS
      --------------------------------------------------------------------------
      - N-TIER ARCHITECTURE (Layered):
        1. Controller: Handles HTTP requests (The API's "Front Desk").
        2. Service: Contains Business Logic (The "Brain").
        3. Repository: Handles Database interaction (The "Librarian").
        4. Entity: Represents the Data Schema (The "Blueprint").

      - DEPENDENCY INJECTION (DI) / Inversion of Control (IoC):
        * Spring automatically "injects" dependencies (like services into controllers).
        * Benefit: Makes code decoupled and testable. You don't "new up" classes manually.

      - DTO (Data Transfer Object) PATTERN:
        * We never expose our raw JPA Entities to the user. We use DTOs (like RegisterRequest).
        * Benefit: Security (hiding passwords) and API stability.

      - SINGLETON PATTERN:
        * All @Service and @Repository classes in Spring are Singletons by default.
        * Benefit: Memory efficiency. Only one instance of a service exists in the app.
      */}

      {/* 
      3. DEEP DIVE: AUTHENTICATION & SESSION SECURITY
      --------------------------------------------------------------------------
      EcoTrack uses a HYBRID security model:

      - JWT (The Key): Stateless. The client sends it in every request. 
      - MONGODB SESSION (The Lock): Stateful. We store the "lastIssuedAt" timestamp.
      
      THE FLOW:
      1. User logs in -> Backend generates JWT and saves "issuedAt" in MongoDB.
      2. User makes request -> JwtAuthenticationFilter intercepts it.
      3. Filter checks:
         a) Is the JWT signature valid? (JwtService)
         b) Is the token expired?
         c) Does the "iat" claim match the one in MongoDB? (SessionService)
      
      CRITICAL INTERVIEW POINT: 
      "Why not just use stateless JWT?" 
      Answer: Stateless JWT cannot be revoked easily. By adding a MongoDB session check, 
      we can instantly logout a user or prevent two people from using the same account 
      simultaneously (Anti-Concurrent Login).
      */}

      {/* 
      4. DEEP DIVE: THE "AI SECRET SAUCE"
      --------------------------------------------------------------------------
      The AI (using NVIDIA/Google APIs) doesn't just chat; it acts as an ORCHESTRATOR.

      - LOGGING ACTIVITIES: When you tell the AI "I planted a tree", it doesn't just reply. 
        It appends a hidden tag: `[LOG:{"type":"Planting","impact":-50}]`.
      - RECOMMENDATIONS: It sends `[REC:{"title":"Solar Panels"}]` which the backend 
        parses to populate your "AI Recommendations" sidebar.
      - ACHIEVEMENTS: It sends `[ACC:{"code":"TREE_HERO"}]` to grant milestones.

      PATTERN: The "Tag-Based Orchestration" pattern. It separates the AI's 
      "Natural Language Processing" from our "Structured Data Processing".
      */}

      {/* 
      5. FRONTEND: MIDDLEWARE & APP ROUTER
      --------------------------------------------------------------------------
      - middleware.ts: This is the global gatekeeper. 
        * It checks the "jwt_token" cookie. 
        * If you hit "/" and have a token -> Redirect to /dashboard.
        * If you hit "/dashboard" and NO token -> Redirect to "/".
      - Dashboard Logic:
        * We use Server-Side Fetching inside our Dashboard Page.
        * Benefit: Data is fetched on the server, meaning the user sees the 
          content instantly without a loading spinner on the first load.
      */}

      {/* 
      6. ALTERNATIVES & SCALABILITY
      --------------------------------------------------------------------------
      - Q: Why Java over Node.js?
        A: Node is great for high-concurrency, but Java (Spring) offers better 
        multi-threading, type safety (less bugs), and a mature ecosystem for 
        security and database management.
      - Q: How would you scale this?
        A: Use Redis for sessions instead of MongoDB for sub-millisecond latency. 
        Use Kubernetes for auto-scaling backend pods based on CPU load.
      */}
    </div>
  );
};

/**
 * ############################################################################
 * ##                          INTERVIEW CHEAT SHEET                         ##
 * ############################################################################
 * 
 * 1. "What is JPA/Hibernate?" 
 *    - Answer: An ORM (Object-Relational Mapping). It maps Java objects to 
 *      Database tables so we don't have to write raw SQL.
 * 
 * 2. "What is @Transactional?" 
 *    - Answer: It ensures that a series of DB operations either all succeed 
 *      or all fail (Atomicity). Very important for logging activities + 
 *      updating achievements.
 * 
 * 3. "How does Spring Security work?" 
 *    - Answer: It uses a "Filter Chain". Every request passes through many 
 *      filters (like our JwtAuthenticationFilter) before reaching the controller.
 * 
 * 4. "What is the benefit of Next.js App Router?" 
 *    - Answer: It uses React Server Components (RSC), which reduces the 
 *      JavaScript bundle size sent to the client and improves SEO.
 */
