# ARCHITECTURAL DIAGRAMS
## Smatch Digital Website - Visual Documentation

---

## 1. SYSTEM OVERVIEW

### Full Stack Architecture

```mermaid
graph TB
    subgraph Client
        Browser[Browser]
        Mobile[Mobile App]
    end

    subgraph CDN
        VercelCDN[Vercel Edge Network]
        Cloudflare[Cloudflare CDN]
    end

    subgraph Application
        NextJS[Next.js 15 App Router]
        Payload[PayloadCMS 3.68]
        GraphQL[GraphQL API]
        REST[REST API]
    end

    subgraph Data
        Postgres[(PostgreSQL)]
        Redis[(Redis Cache)]
        S3[S3 Storage]
    end

    subgraph Monitoring
        Sentry[Sentry Error Tracking]
        VercelAnalytics[Vercel Analytics]
        Uptime[Uptime Monitoring]
    end

    Browser -->|HTTPS| VercelCDN
    Mobile -->|HTTPS| VercelCDN
    VercelCDN -->|Cache HIT| Browser
    VercelCDN -->|Cache MISS| NextJS
    NextJS -->|GraphQL| Payload
    NextJS -->|REST| Payload
    Payload -->|SQL| Postgres
    Payload -->|Cache| Redis
    Payload -->|Upload/Download| S3
    NextJS -->|Errors| Sentry
    NextJS -->|Analytics| VercelAnalytics
    NextJS -->|Health| Uptime

    style Browser fill:#e1f5ff
    style Mobile fill:#e1f5ff
    style VercelCDN fill:#fff4e1
    style Cloudflare fill:#fff4e1
    style NextJS fill:#e8f5e9
    style Payload fill:#f3e5f5
    style Postgres fill:#fce4ec
    style Redis fill:#fce4ec
    style S3 fill:#fff3e0
    style Sentry fill:#ffebee
    style VercelAnalytics fill:#ffebee
    style Uptime fill:#ffebee
```

---

## 2. DATA FLOW DIAGRAMS

### Page Rendering Flow

```mermaid
sequenceDiagram
    participant User
    participant CDN
    participant NextJS
    participant Payload
    participant Postgres
    participant Cache

    User->>CDN: Request /about
    CDN->>CDN: Check Cache

    alt Cache HIT
        CDN->>User: Return Cached HTML
    else Cache MISS
        CDN->>NextJS: Forward Request
        NextJS->>Cache: Check ISR Cache

        alt ISR Cache HIT
            Cache->>NextJS: Return Cached Data
        else ISR Cache MISS
            NextJS->>Payload: GraphQL Query
            Payload->>Postgres: SELECT * FROM pages WHERE slug = 'about'
            Postgres->>Payload: Page Data
            Payload->>NextJS: JSON Response
            NextJS->>Cache: Store in ISR Cache
        end

        NextJS->>NextJS: Render Server Component
        NextJS->>NextJS: Generate HTML
        NextJS->>CDN: Return HTML
        CDN->>Cache: Store in CDN Cache
        CDN->>User: Return HTML
    end

    Note over Payload,Cache: Content Change Triggers Revalidation
```

### Content Creation Flow

```mermaid
sequenceDiagram
    participant Admin
    participant PayloadAdmin
    participant Payload
    participant Postgres
    participant NextJS
    participant CDN

    Admin->>PayloadAdmin: Create/Edit Page
    PayloadAdmin->>Payload: Save Content
    Payload->>Postgres: INSERT/UPDATE pages
    Postgres->>Payload: Success
    Payload->>NextJS: Trigger Revalidation Hook
    NextJS->>NextJS: Invalidate ISR Cache
    NextJS->>CDN: Purge CDN Cache
    PayloadAdmin->>Admin: Success Message

    Note over NextJS,CDN: Next Request Gets Fresh Content
```

### Search Flow

```mermaid
sequenceDiagram
    participant User
    participant NextJS
    participant Payload
    participant SearchPlugin
    participant Postgres

    User->>NextJS: Search Query
    NextJS->>Payload: GraphQL Search Query
    Payload->>SearchPlugin: Execute Search
    SearchPlugin->>Postgres: Full-Text Search
    Postgres->>SearchPlugin: Results
    SearchPlugin->>Payload: Ranked Results
    Payload->>NextJS: JSON Response
    NextJS->>NextJS: Render Results
    NextJS->>User: Display Results
```

---

## 3. COMPONENT ARCHITECTURE

### Block System Architecture

```mermaid
graph TB
    subgraph CMS
        PayloadAdmin[Payload Admin Panel]
        BlockConfig[Block Config]
    end

    subgraph Schema
        PagesSchema[Pages Collection]
        LayoutField[Layout Field]
    end

    subgraph Rendering
        RenderBlocks[RenderBlocks Component]
        BlockComponent[Block Component]
    end

    subgraph Blocks
        About[About Block]
        CTA[CallToAction Block]
        Content[Content Block]
        Media[MediaBlock]
        Form[Form Block]
        Ecosystem[Ecosystem Block]
        Timeline[ActivityTimeline Block]
    end

    PayloadAdmin -->|Configures| BlockConfig
    BlockConfig -->|Defines| PagesSchema
    PagesSchema -->|Contains| LayoutField
    LayoutField -->|References| BlockConfig
    RenderBlocks -->|Renders| BlockComponent
    BlockComponent -->|Maps to| About
    BlockComponent -->|Maps to| CTA
    BlockComponent -->|Maps to| Content
    BlockComponent -->|Maps to| Media
    BlockComponent -->|Maps to| Form
    BlockComponent -->|Maps to| Ecosystem
    BlockComponent -->|Maps to| Timeline

    style PayloadAdmin fill:#f3e5f5
    style BlockConfig fill:#e1f5ff
    style PagesSchema fill:#fff3e0
    style LayoutField fill:#fff3e0
    style RenderBlocks fill:#e8f5e9
    style BlockComponent fill:#e8f5e9
    style About fill:#fce4ec
    style CTA fill:#fce4ec
    style Content fill:#fce4ec
    style Media fill:#fce4ec
    style Form fill:#fce4ec
    style Ecosystem fill:#fce4ec
    style Timeline fill:#fce4ec
```

### Component Hierarchy

```mermaid
graph TB
    RootLayout[Root Layout]
    Providers[Providers]
    ScaleWrapper[ScaleWrapper]
    Header[Header]
    Footer[Footer]
    Page[Page Component]
    Hero[Hero Component]
    Blocks[Blocks Container]
    Block[Individual Block]

    RootLayout --> Providers
    Providers --> ScaleWrapper
    ScaleWrapper --> Header
    ScaleWrapper --> Page
    ScaleWrapper --> Footer
    Page --> Hero
    Page --> Blocks
    Blocks --> Block

    style RootLayout fill:#e1f5ff
    style Providers fill:#fff3e0
    style ScaleWrapper fill:#e8f5e9
    style Header fill:#f3e5f5
    style Footer fill:#f3e5f5
    style Page fill:#e8f5e9
    style Hero fill:#fce4ec
    style Blocks fill:#fce4ec
    style Block fill:#fce4ec
```

---

## 4. DATABASE SCHEMA

### Entity Relationship Diagram

```mermaid
erDiagram
    Pages ||--o{ Blocks : contains
    Pages ||--|| Meta : has
    Pages ||--o| Hero : has
    Posts ||--|| Categories : belongs_to
    Posts ||--|| Users : authored_by
    Posts ||--o{ Tags : has
    Media ||--o{ Pages : featured_in
    Media ||--o{ Posts : featured_in
    Media ||--o{ Solutions : featured_in
    Media ||--o{ Projects : featured_in
    Media ||--o{ Team : featured_in
    Solutions ||--o{ Modules : has
    Solutions ||--o{ Features : has
    Projects ||--o{ Gallery : has
    Projects ||--o{ Metadata : has
    Team ||--o{ Projects : works_on
    Team ||--o{ SocialLinks : has
    Categories ||--o{ Categories : parent_of

    Pages {
        uuid id PK
        string title
        string slug UK
        date publishedAt
        json layout
        json meta
        json hero
        timestamp createdAt
        timestamp updatedAt
    }

    Posts {
        uuid id PK
        string title
        string slug UK
        text excerpt
        richText content
        date publishedAt
        uuid categoryId FK
        uuid authorId FK
        timestamp createdAt
        timestamp updatedAt
    }

    Media {
        uuid id PK
        string filename
        string mimeType
        integer filesize
        integer width
        integer height
        string url
        timestamp createdAt
        timestamp updatedAt
    }

    Solutions {
        uuid id PK
        string title
        string slug UK
        text description
        text icon
        text heroSubtitle
        uuid heroImageId FK
        text problemTitle
        text problemDescription
        json terminalContent
        uuid dashboardImageId FK
        timestamp createdAt
        timestamp updatedAt
    }

    Projects {
        uuid id PK
        string title
        string slug UK
        enum type
        enum status
        date date
        text description
        uuid imageId FK
        text location
        string code
        json metadata
        richText fullDescription
        json gallery
        timestamp createdAt
        timestamp updatedAt
    }

    Team {
        uuid id PK
        string name
        string role
        text bio
        uuid photoId FK
        json socialLinks
        timestamp createdAt
        timestamp updatedAt
    }

    Categories {
        uuid id PK
        string name
        string slug UK
        uuid parentId FK
        timestamp createdAt
        timestamp updatedAt
    }

    Users {
        uuid id PK
        string email UK
        string passwordHash
        string name
        enum role
        timestamp createdAt
        timestamp updatedAt
    }
```

---

## 5. DEPLOYMENT ARCHITECTURE

### Vercel Deployment Flow

```mermaid
graph TB
    subgraph Development
        Dev[Developer]
        Git[Git Repository]
    end

    subgraph CI/CD
        VercelCI[Vercel CI/CD]
        Build[Build Process]
        Test[Test Suite]
    end

    subgraph Production
        VercelEdge[Vercel Edge Network]
        VercelServerless[Vercel Serverless Functions]
        Supabase[Supabase PostgreSQL]
        S3Bucket[S3 Bucket]
    end

    Dev -->|Push| Git
    Git -->|Webhook| VercelCI
    VercelCI -->|Trigger| Build
    Build -->|Run| Test
    Test -->|Pass| VercelEdge
    VercelEdge -->|Deploy| VercelServerless
    VercelServerless -->|Connect| Supabase
    VercelServerless -->|Store| S3Bucket

    style Dev fill:#e1f5ff
    style Git fill:#fff3e0
    style VercelCI fill:#e8f5e9
    style Build fill:#e8f5e9
    style Test fill:#e8f5e9
    style VercelEdge fill:#f3e5f5
    style VercelServerless fill:#f3e5f5
    style Supabase fill:#fce4ec
    style S3Bucket fill:#fff3e0
```

### Environment Configuration

```mermaid
graph LR
    subgraph Local
        LocalEnv[.env.local]
    end

    subgraph Preview
        PreviewEnv[.env.preview]
    end

    subgraph Production
        ProdEnv[.env.production]
    end

    subgraph Vercel
        VercelEnv[Vercel Environment Variables]
    end

    LocalEnv -->|Development| NextJS
    PreviewEnv -->|Preview Deployments| NextJS
    ProdEnv -->|Production| NextJS
    VercelEnv -->|Override| NextJS

    style LocalEnv fill:#e1f5ff
    style PreviewEnv fill:#fff3e0
    style ProdEnv fill:#e8f5e9
    style VercelEnv fill:#f3e5f5
    style NextJS fill:#fce4ec
```

---

## 6. SECURITY ARCHITECTURE

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant NextJS
    participant Payload
    participant Postgres
    participant Session

    User->>NextJS: Login Request
    NextJS->>Payload: Authenticate
    Payload->>Postgres: Verify Credentials
    Postgres->>Payload: User Data
    Payload->>Payload: Generate JWT
    Payload->>Session: Store Session
    Payload->>NextJS: Return JWT
    NextJS->>User: Set Cookie

    Note over User,Session: Subsequent Requests Include JWT

    User->>NextJS: Protected Request
    NextJS->>Payload: Validate JWT
    Payload->>Session: Check Session
    Session->>Payload: Valid
    Payload->>NextJS: Authorized
    NextJS->>User: Return Protected Content
```

### Security Layers

```mermaid
graph TB
    subgraph External
        Internet[Internet]
    end

    subgraph Edge
        WAF[Web Application Firewall]
        DDoS[DDoS Protection]
    end

    subgraph Application
        CSP[Content Security Policy]
        HSTS[Strict Transport Security]
        CSRF[CSRF Protection]
        RateLimit[Rate Limiting]
    end

    subgraph Authentication
        JWT[JWT Authentication]
        Session[Session Management]
        RBAC[Role-Based Access Control]
    end

    subgraph Data
        Encryption[Data Encryption]
        Sanitization[Input Sanitization]
        Validation[Input Validation]
    end

    Internet --> WAF
    WAF --> DDoS
    DDoS --> CSP
    CSP --> HSTS
    HSTS --> CSRF
    CSRF --> RateLimit
    RateLimit --> JWT
    JWT --> Session
    Session --> RBAC
    RBAC --> Encryption
    Encryption --> Sanitization
    Sanitization --> Validation

    style Internet fill:#e1f5ff
    style WAF fill:#fff3e0
    style DDoS fill:#fff3e0
    style CSP fill:#e8f5e9
    style HSTS fill:#e8f5e9
    style CSRF fill:#e8f5e9
    style RateLimit fill:#e8f5e9
    style JWT fill:#f3e5f5
    style Session fill:#f3e5f5
    style RBAC fill:#f3e5f5
    style Encryption fill:#fce4ec
    style Sanitization fill:#fce4ec
    style Validation fill:#fce4ec
```

---

## 7. SCALABILITY ARCHITECTURE

### Horizontal Scaling Strategy

```mermaid
graph TB
    subgraph LoadBalancer
        LB[Load Balancer]
    end

    subgraph ApplicationServers
        Server1[Server 1]
        Server2[Server 2]
        Server3[Server 3]
    end

    subgraph Database
        Primary[Primary DB]
        Replica1[Read Replica 1]
        Replica2[Read Replica 2]
    end

    subgraph Cache
        RedisCluster[Redis Cluster]
    end

    subgraph Storage
        S3[S3 Storage]
        CDN[CDN]
    end

    LB --> Server1
    LB --> Server2
    LB --> Server3
    Server1 --> Primary
    Server2 --> Replica1
    Server3 --> Replica2
    Server1 --> RedisCluster
    Server2 --> RedisCluster
    Server3 --> RedisCluster
    Server1 --> S3
    Server2 --> S3
    Server3 --> S3
    S3 --> CDN

    style LB fill:#e1f5ff
    style Server1 fill:#e8f5e9
    style Server2 fill:#e8f5e9
    style Server3 fill:#e8f5e9
    style Primary fill:#f3e5f5
    style Replica1 fill:#f3e5f5
    style Replica2 fill:#f3e5f5
    style RedisCluster fill:#fff3e0
    style S3 fill:#fce4ec
    style CDN fill:#fce4ec
```

### Caching Strategy

```mermaid
graph TB
    subgraph Client
        BrowserCache[Browser Cache]
    end

    subgraph Edge
        CDNCache[CDN Cache]
    end

    subgraph Application
        ISRCache[ISR Cache]
        ComponentCache[Component Cache]
    end

    subgraph Database
        QueryCache[Query Cache]
        RedisCache[Redis Cache]
    end

    BrowserCache -->|Hit| User
    BrowserCache -->|Miss| CDNCache
    CDNCache -->|Hit| User
    CDNCache -->|Miss| ISRCache
    ISRCache -->|Hit| User
    ISRCache -->|Miss| ComponentCache
    ComponentCache -->|Hit| User
    ComponentCache -->|Miss| QueryCache
    QueryCache -->|Hit| User
    QueryCache -->|Miss| RedisCache
    RedisCache -->|Hit| User
    RedisCache -->|Miss| Database

    style BrowserCache fill:#e1f5ff
    style CDNCache fill:#fff3e0
    style ISRCache fill:#e8f5e9
    style ComponentCache fill:#e8f5e9
    style QueryCache fill:#f3e5f5
    style RedisCache fill:#f3e5f5
    style Database fill:#fce4ec
```

---

## 8. MONITORING & OBSERVABILITY

### Monitoring Stack

```mermaid
graph TB
    subgraph Application
        NextJS[Next.js App]
        Payload[PayloadCMS]
    end

    subgraph ErrorTracking
        Sentry[Sentry]
    end

    subgraph Analytics
        VercelAnalytics[Vercel Analytics]
        GoogleAnalytics[Google Analytics]
    end

    subgraph Performance
        Lighthouse[Lighthouse CI]
        WebVitals[Web Vitals]
    end

    subgraph Uptime
        UptimeRobot[Uptime Robot]
        Pingdom[Pingdom]
    end

    subgraph Logging
        VercelLogs[Vercel Logs]
        CloudWatch[CloudWatch Logs]
    end

    NextJS -->|Errors| Sentry
    Payload -->|Errors| Sentry
    NextJS -->|Page Views| VercelAnalytics
    NextJS -->|Events| GoogleAnalytics
    NextJS -->|Performance| Lighthouse
    NextJS -->|Core Web Vitals| WebVitals
    NextJS -->|Health Checks| UptimeRobot
    NextJS -->|Health Checks| Pingdom
    NextJS -->|Logs| VercelLogs
    Payload -->|Logs| CloudWatch

    style NextJS fill:#e1f5ff
    style Payload fill:#e1f5ff
    style Sentry fill:#fff3e0
    style VercelAnalytics fill:#e8f5e9
    style GoogleAnalytics fill:#e8f5e9
    style Lighthouse fill:#f3e5f5
    style WebVitals fill:#f3e5f5
    style UptimeRobot fill:#fce4ec
    style Pingdom fill:#fce4ec
    style VercelLogs fill:#fff3e0
    style CloudWatch fill:#fff3e0
```

---

*Diagrams created by The Honored One (Architect Mode)*
*Date: 2026-01-10*
