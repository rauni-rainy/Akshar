# AKSHAR

> **A literary publishing and peer review platform for writers who are done with the algorithmic rat race.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

Akshar is a **full-stack literary platform** built to prove that writing spaces don't need to be algorithmically optimised to be useful — they need to be *honest*. No follower counts. No vanity metrics. No engagement farming. Just writers, their craft, and a structured peer review system that demands intellectual effort from every reader.

This repository demonstrates end-to-end full-stack engineering across a Neo-Brutalist design system, a recursive comment architecture, short-polling notifications, a debounced autosave editor, a multi-layer client-side filter pipeline, CSS-native mobile optimisations, and a paginated feed with a creative FM radio dial interface — all in production-ready TypeScript.

---

## TABLE OF CONTENTS

- [Live Features](#-live-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Frontend Deep Dives](#-frontend-deep-dives)
  - [Neo-Brutalist Design System](#1-neo-brutalist-design-system)
  - [Debounced Autosave Editor](#2-quill-rich-text-editor-with-3-second-debounced-autosave)
  - [Recursive Comment Tree](#3-recursive-comment-tree-with-4-level-threading)
  - [Short Polling Notifications](#4-short-polling-notification-system)
  - [Multi-Layer Filter Pipeline](#5-multi-layer-client-side-filter-pipeline)
  - [Prompt Gallery with Router Handoff](#6-ai-generated-prompt-gallery-with-router-handoff)
  - [CSS Line-Clamp Mobile Cards](#7-css-line-clamp-mobile-card-compression)
  - [Pure CSS Annotation Preview](#8-pure-css-inline-annotation-preview)
  - [Radio Frequency Pagination](#9-radio-frequency-pagination-system)
  - [Isomorphic HTML Sanitizer](#10-isomorphic-html-sanitizer-for-safe-rich-text)
- [Backend Architecture](#-backend-architecture)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Design Philosophy](#-design-philosophy)
- [Deliberate Omissions](#-deliberate-omissions)
- [Author](#-author)

---

## 🚀 Live Features

| Feature | Status |
|---|---|
| JWT Authentication (Register / Login) | ✅ Live |
| Rich Text Publishing with Autosave | ✅ Live |
| Public Feed with Search + Filters | ✅ Live |
| Recursive Comment Threading (4 levels) | ✅ Live |
| Peer Review System | ✅ Live |
| Short-Polling Notifications | ✅ Live |
| Follow / Unfollow + Public Profiles | ✅ Live |
| Badge & Level System | ✅ Live |
| 11 Static Information Pages | ✅ Live |
| AI-Generated Prompt Gallery | ✅ Live |
| My Writings Dashboard (Drafts / Published / Reviews) | ✅ Live |
| Radio Frequency Pagination (FM Dial UI) | 🔧 Built — staged for release |
| Inline Annotation System | 🔧 UI designed — backend in progress |

---

## 🛠 Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **Next.js 14** (App Router) | Framework — SSR, CSR, file-system routing |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Vanilla CSS** (`globals.css`) | Design system tokens, brutalist utilities |
| **Quill.js** (`react-quill`) | Rich text editor |
| **isomorphic-dompurify** | SSR-safe HTML sanitisation |
| **Lucide React** | Icon system |

### Backend
| Technology | Role |
|---|---|
| **Node.js + Express** | REST API server |
| **Prisma ORM** | Database layer with type-safe queries |
| **PostgreSQL** | Primary database |
| **`@prisma/adapter-pg`** | Prisma + pg connection pooling |
| **JWT (`jsonwebtoken`)** | Stateless authentication |
| **`bcryptjs`** | Password hashing |

---

## 🏗 Architecture Overview

```
Akshar/
├── client/                    # Next.js 14 App Router frontend
│   ├── src/
│   │   ├── app/               # Pages (file-system routing)
│   │   │   ├── dashboard/     # Main feed + write interface
│   │   │   ├── post/[id]/     # Full post view + comments
│   │   │   ├── user/[id]/     # Public writer profile
│   │   │   ├── peer-review/   # Review protocol page + annotation demo
│   │   │   ├── prompts/       # AI-generated prompt gallery
│   │   │   ├── my-writings/   # Draft & publish management
│   │   │   └── [11 static pages...] # About, FAQ, Contact, etc.
│   │   ├── components/        # Shared UI components
│   │   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   │   ├── Footer.tsx     # Full brutalist footer
│   │   │   ├── Navbar.tsx     # Top nav + notification bell
│   │   │   ├── ContentRenderer.tsx   # Safe HTML renderer
│   │   │   ├── RichTextEditor.tsx    # Quill editor wrapper
│   │   │   ├── FilterModal.tsx       # Multi-criteria filter UI
│   │   │   └── NotificationBell.tsx  # Short-polling bell
│   │   └── app/globals.css    # Brutalist design system
│
└── server/                    # Express REST API
    ├── src/
    │   ├── controllers/       # Route handlers
    │   ├── services/          # Business logic + Prisma queries
    │   ├── routes/            # Express router definitions
    │   └── middlewares/       # JWT auth guard
    └── prisma/
        └── schema.prisma      # Database schema
```

**Key Architectural Decision:** The client and server are intentionally decoupled — the frontend is a standalone Next.js app that consumes the Express API over HTTP. This allows independent deployment (Vercel for client, Railway/Render for server) and keeps concerns cleanly separated.

---

## 🎨 Frontend Deep Dives

### 1. Neo-Brutalist Design System

The entire UI is built on a custom design system defined in `globals.css` and enforced via reusable Tailwind utility composites. The system has four core primitives:

```css
.brutal-box {
  border: 6px solid black;
  box-shadow: 8px 8px 0 0 #000;
  border-radius: 0; /* No rounded corners. Ever. */
}

.brutal-btn {
  @apply brutal-box font-black uppercase tracking-widest
         hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000]
         transition-all active:translate-y-1 active:shadow-none;
}
```

Key design decisions:
- **Hard offset shadows** with zero blur (`shadow-[12px_12px_0_0_#000]`) — mimic physical objects on a desk
- **Intentional micro-rotation** — cards rendered at `rotate-1` / `-rotate-2`, straightening on hover. This single hover interaction creates a "the platform is paying attention" feel
- **High-contrast 4-color palette**: Electric yellow `#ffeb3b` · Coral pink `#ff7d85` · Cobalt blue `#60a5fa` · Pure black/white
- **ALL CAPS headings** with custom display font via CSS variable (`--font-heading`)

Every component — cards, buttons, inputs, modals — derives from these four primitives. New contributors cannot introduce visual inconsistency without violating the utility classes.

---

### 2. Quill Rich Text Editor with 3-Second Debounced Autosave

The writing interface pairs Quill.js with a debounced autosave architecture that ensures **zero draft loss**:

```typescript
// Autosave fires 3 seconds after the user stops typing
useEffect(() => {
  if (activeTab !== "WRITE") return;
  if (!title && !content) return;

  const timeoutId = setTimeout(() => saveDraft(), 3000);
  return () => clearTimeout(timeoutId); // cancel on next keystroke
}, [title, content, type, prompt, tagsInput, authorNote, postId]);
```

The `saveDraft()` function handles both `POST` (new draft) and `PUT` (existing draft) depending on whether a `postId` is in state. On a successful first save, the returned `post.id` is captured and stored — all subsequent saves use `PUT` to the same ID, preventing duplicate drafts.

**Why debounce over interval?** An interval-based autosave fires regardless of user activity — once every N seconds. A debounce fires *only after the user pauses*, preventing saves mid-sentence, eliminating race conditions between keystrokes and API calls, and reducing server load by ~80% on active writing sessions.

The editor UI shows a soft `LAST SAVED: HH:MM:SS` timestamp after each save — non-intrusive, but completely transparent. A manual "SAVE DRAFT" button with distinct loading state (`SAVING...`) covers power users who want explicit control.

---

### 3. Recursive Comment Tree with 4-Level Threading

Comments on Akshar are a **recursive tree**, not a flat list. The architecture spans both layers:

**Backend — single Prisma query fetches the full tree:**
```typescript
comments: {
  where: { parentId: null }, // root comments only
  include: {
    author: { select: { id, displayName, avatar, country } },
    replies: {
      include: {
        author: { ... },
        replies: {
          include: {
            author: { ... },
            replies: { include: { author: { ... } } } // 4 levels deep
          }
        }
      }
    }
  },
  orderBy: { createdAt: 'desc' }
}
```

**Frontend — `CommentNode` is a self-referencing React component:**
```tsx
const CommentNode = ({ comment, depth = 0 }) => {
  const borderColors = ['#ff7d85', '#60a5fa', '#ffeb3b', '#000'];
  return (
    <div style={{ borderLeft: `4px solid ${borderColors[depth % 4]}` }}>
      <CommentContent comment={comment} />
      {comment.replies?.map(reply => (
        <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
};
```

Each depth level uses a different border colour — a visual breadcrumb showing exactly where you are in a conversation. Reply forms open inline beneath each comment (no modals, no page changes) with an optimistic UI update that appends the new comment to local state before API confirmation.

---

### 4. Short Polling Notification System

The `NotificationBell` component implements **short polling** — a `setInterval` that fires every 30 seconds to fetch unread notifications:

```typescript
useEffect(() => {
  const poll = async () => {
    const res = await fetch('/api/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setNotifications(data);
    setUnread(data.filter((n: any) => !n.read).length);
  };

  poll(); // immediate on mount
  const interval = setInterval(poll, 30_000);
  return () => clearInterval(interval); // cleanup on unmount
}, []);
```

A red badge shows the unread count. The dropdown renders notifications as individual cards with type-specific icons (`🔥` for likes, `💬` for comments, `✅` for reviews). Clicking a notification fires `PATCH /api/notifications/:id/read` and routes to the relevant post.

**Engineering rationale for short polling over WebSockets:** WebSocket infrastructure requires a persistent connection server, load-balancing awareness, reconnection handling, and scaling considerations that add meaningful operational complexity. At NIT Durgapur campus scale, a 30-second polling interval delivers *real-time enough* — notifications arrive within half a minute — at zero infrastructure overhead. It's the right tool for the problem's actual scale.

---

### 5. Multi-Layer Client-Side Filter Pipeline

The dashboard filter processes all criteria client-side against the full fetched feed — no secondary API calls, instantaneous feedback:

```typescript
type FilterState = {
  seekingReview: boolean;  likedByMe: boolean;    likedByOthers: boolean;
  following: boolean;      followers: boolean;    peerReviewed: boolean;
  tags: string[];          prompts: string[];     countries: string[];
  sortBy: 'Most Recent' | 'Oldest' | 'Most Liked';
};

const filteredPosts = posts
  .filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.seekingReview && !p.tags?.includes('Seeking Review')) return false;
    if (filters.likedByMe && !p.likes?.some(l => l.userId === user?.id)) return false;
    if (filters.following && !user?.followingIds?.includes(p.author?.id)) return false;
    if (filters.tags.length > 0 && !filters.tags.some(t => p.tags?.includes(t))) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(p.author?.country)) return false;
    return true; // AND logic — all active filters must pass
  })
  .sort((a, b) => {
    if (filters.sortBy === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (filters.sortBy === 'Most Liked') return b.likes.length - a.likes.length;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
```

All filter criteria use **AND logic** (intersection), not OR. Available tags, prompts, and countries are **dynamically derived from the live feed** — not hardcoded — so filter options always reflect what actually exists in the database.

A `!` badge on the FILTERS button appears whenever any filter is active, so users always know the feed is constrained.

---

### 6. AI-Generated Prompt Gallery with Router Handoff

The `/prompts` page hosts 10 writing prompts, each with an AI-generated atmospheric background image. The UX innovation is in the **router handoff pattern**:

```typescript
// On the prompt card — clicking "Respond" passes prompt text via URL
const handleRespond = (promptText: string) => {
  router.push(`/dashboard?action=write&prompt=${encodeURIComponent(promptText)}`);
};

// On dashboard mount — reads URL param and pre-fills the editor
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'write') setActiveTab('WRITE');
  if (params.get('prompt')) setPrompt(params.get('prompt') as string);
}, []);
```

The user clicks "RESPOND TO PROMPT" on any prompt card and lands directly in the Write tab with the prompt pre-filled. No copy-paste. No extra steps. The URL parameter survives navigation and could be shared directly to open the editor with a specific prompt.

---

### 7. CSS Line-Clamp Mobile Card Compression

Each feed post card was ~600px tall on mobile — users couldn't see more than one post at a time. The fix uses a single CSS property — no JavaScript, no resize observers, no re-render cycles:

```tsx
<ContentRenderer
  className={`
    text-sm md:text-2xl
    leading-snug md:leading-relaxed
    p-3 md:p-6
    border-[4px] border-black
    line-clamp-4       /* Mobile: exactly 4 lines, then ellipsis */
    md:line-clamp-none /* Desktop: full 400-character preview */
  `}
/>
```

Every dimension in the post card is responsive:

| Element | Mobile | Desktop |
|---|---|---|
| Card padding | `p-4` | `p-12` |
| Title size | `text-2xl` + `line-clamp-2` | `text-6xl` |
| Avatar | `w-8 h-8` | `w-16 h-16` |
| Content | `text-sm` + `line-clamp-4` | `text-2xl`, 400 chars |
| Prompt | `text-[10px]` + `truncate` | Full text |
| Action buttons | Row layout, compact labels | Stacked, full labels |
| Card gap | `space-y-8` | `space-y-16` |

Result: **3 full post cards visible on mobile viewport without scrolling**, down from fewer than 1.

---

### 8. Pure CSS Inline Annotation Preview

The `/peer-review` page demonstrates the upcoming annotation feature through a **zero-JavaScript interactive demo**. Two passages of sample text show hover-triggered annotation notes:

```tsx
<span className="bg-[#60a5fa]/40 border-b-4 border-[#60a5fa]
                 relative group cursor-pointer px-1">
  consequence
  <span className="hidden group-hover:flex absolute -top-16 left-0
                   bg-black text-white text-sm p-3 z-50
                   border-2 border-[#60a5fa] w-64
                   shadow-[4px_4px_0_0_#60a5fa]">
    <MessageSquareQuote size={14} className="mr-2 text-[#60a5fa]" />
    Powerful word choice — "consequence" does more than "smoke" here.
  </span>
</span>
```

Hovering any highlighted word reveals a floating margin note via CSS `hidden → group-hover:flex`. **No JavaScript. No state. No event listeners.** Just Tailwind's `group` and `group-hover:` pattern.

The demo communicates a complex UX concept — inline text annotation — entirely through standard HTML and CSS. It functions as both user documentation and an interactive feature preview.

---

### 9. Radio Frequency Pagination System

*(Built and tested — currently staged for release)*

A creative solution to feed pagination that replaces "Page 1 of 5" with a **brutalist FM radio console**:

**Backend — parallel count + page query:**
```typescript
export const getAllPublishedPosts = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, skip, take: limit, ... }),
    prisma.post.count({ where: { published: true } })
  ]);
  return { posts, total, page, totalPages: Math.ceil(total / limit), limit };
};
```

`Promise.all` runs both queries in parallel — the response time is the slower of the two, not their sum.

**Frontend — FM dial UI:**
- Frequency band buttons (`FM 01`, `FM 02`...) — active page glows yellow with CSS `box-shadow`
- `◄ PREV` / `NEXT ►` navigation with disabled states at boundaries
- Ellipsis (`···`) for large page ranges
- **Signal strength bar** — a progress bar filling left-to-right labeled `SIGNAL STRENGTH — 40% BAND COVERAGE`
- Smooth scroll to top on each frequency change

The metaphor — "tuning in to a new broadcast" — is consistent with Akshar's "resistance radio" platform voice used throughout the copy.

---

### 10. Isomorphic HTML Sanitizer for Safe Rich Text

Rendering Quill's stored HTML safely in Next.js requires handling both SSR (no `window`) and CSR (full DOM) environments:

```typescript
// SSR path — regex-based, no DOM required
const stripHtml = (html: string) =>
  html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');

// CSR path — native DOMParser
const parseHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};
```

`ContentRenderer` has two modes:
- **`truncate={true}`** — strips HTML to plain text, clips to `maxLength`, used in feed cards for fast safe previews
- **`truncate={false}`** — sanitises full HTML with `DOMPurify.sanitize()` and injects via `dangerouslySetInnerHTML`, used on full post view to preserve formatting

The `isomorphic-dompurify` package provides both a server-safe and browser-native implementation behind a single API, eliminating scattered `typeof window !== 'undefined'` guards.

---

## 🔧 Backend Architecture

### Data Model (Prisma Schema Highlights)

```prisma
model Post {
  id         String    @id @default(cuid())
  title      String
  content    String
  type       String    // ARTICLE | POEM | STORY
  published  Boolean   @default(false)
  prompt     String?
  tags       String[]
  authorNote String?
  author     User      @relation(fields: [authorId], references: [id])
  likes      Like[]
  views      View[]
  comments   Comment[]
  reviews    Review[]
  createdAt  DateTime  @default(now())
}

model Comment {
  id       String    @id @default(cuid())
  content  String
  parentId String?   // Self-referential for tree threading
  parent   Comment?  @relation("CommentReplies", fields: [parentId])
  replies  Comment[] @relation("CommentReplies")
  author   User      @relation(...)
  post     Post      @relation(...)
}

model Notification {
  id      String   @id @default(cuid())
  userId  String
  type    String   // LIKE | COMMENT | REVIEW | FOLLOW
  message String
  link    String
  read    Boolean  @default(false)
}
```

### API Routes

```
POST   /api/auth/register       — Register new user
POST   /api/auth/login          — Login, returns JWT

GET    /api/posts/feed          — Public feed (supports ?page=&limit=)
POST   /api/posts               — Create post (auth)
PUT    /api/posts/:id           — Update post (auth, author only)
DELETE /api/posts/:id           — Delete post (auth, author only)
POST   /api/posts/:id/like      — Toggle like (auth)
POST   /api/posts/:id/view      — Record view (auth)

GET    /api/users/me            — Get own profile (auth)
PATCH  /api/users/me            — Update profile (auth)
GET    /api/users/:id           — Public profile
POST   /api/users/:id/follow    — Follow user (auth)
DELETE /api/users/:id/follow    — Unfollow user (auth)

POST   /api/comments            — Add comment/reply (auth)
DELETE /api/comments/:id        — Delete comment (auth, author only)

POST   /api/reviews             — Submit peer review (auth)

GET    /api/notifications       — Get user notifications (auth)
PATCH  /api/notifications/:id/read — Mark as read (auth)
```

---

## 📄 Pages & Routes

| Route | Type | Description |
|---|---|---|
| `/` | Public | Homepage with manifesto, feed preview, testimonials |
| `/login` `/register` | Public | Auth pages |
| `/dashboard` | Protected | Feed, Write, filter controls |
| `/post/[id]` | Public | Full post with comments and peer reviews |
| `/user/[id]` | Public | Public writer profile |
| `/profile` | Protected | Own profile management |
| `/my-writings` | Protected | Draft and published post management |
| `/prompts` | Public | AI-generated prompt gallery |
| `/peer-review` | Public | Review protocol + annotation demo |
| `/guidelines` | Public | Platform writing guidelines |
| `/about` | Public | Platform story and mission |
| `/newsroom` | Public | Announcements and updates |
| `/programs` | Public | Signal Contest, Anthology, Circles |
| `/resources` | Public | Writing craft resources |
| `/donate` | Public | Support the platform |
| `/get-involved` | Public | Open roles and contribution |
| `/request-group` | Public | Email-based group request |
| `/contact` | Public | Direct email contact |
| `/faq` | Public | 10 Q&A accordion |
| `/privacy-policy` | Public | 8-section privacy policy |
| `/terms-of-use` | Public | 9-section terms |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/rauni-rainy/Akshar.git
cd Akshar
```

### 2. Set Up the Server
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env — set DATABASE_URL and JWT_SECRET

# Run Prisma migrations
npx prisma migrate dev

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

### 3. Set Up the Client
```bash
cd client
npm install

# Start the Next.js dev server
npm run dev
# Client runs on http://localhost:3000
```

### Environment Variables

**Server (`server/.env`):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/akshar"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

---

## 💡 Design Philosophy

Akshar was built around a core conviction: **the platform's UX should enforce its values**.

If the platform believes vanity metrics harm writing culture, then the UI makes likes invisible in the feed. If the platform believes engagement requires effort, then the comment box doesn't accept "great post" — it demands a structured review. If the platform believes writers deserve a distraction-free environment, then the entire design system uses high contrast and bold typography to put the *words* in focus, not the chrome around them.

Every feature is a product decision first, an engineering decision second.

---

## 🚫 Deliberate Omissions

These are not missing features — they are structural choices:

| What's Missing | Why |
|---|---|
| **Redux / Zustand** | Local state is sufficient at this scope. Global state management would add complexity with no benefit. |
| **WebSockets** | Short polling at 30s intervals delivers real-time enough at campus scale with zero infrastructure overhead. |
| **Recommendation algorithm** | The feed is chronological. The platform does not decide what you read. |
| **Public like counts on feed** | You can see if *you* liked something. Aggregate counts are hidden to prevent metric-chasing. |
| **Follower counts on profiles** | The connection exists; the number doesn't. It tracks relationship, not status. |
| **Infinite scroll** | Pagination is explicit. The user controls how much they consume. |

---

## 👤 Author

**Raunak** — [@rauni-rainy](https://github.com/rauni-rainy)

Built at **NIT Durgapur**, West Bengal, India.

For platform inquiries: [writer.raunak@gmail.com](mailto:writer.raunak@gmail.com)

---

*Designed off-grid. Coded in the shadows.*
*© 2026 The Akshar Initiative. All rights reserved.*
