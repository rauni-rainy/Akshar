# 🖋️ Akshar

<img width="1918" height="962" alt="Screenshot 2026-05-16 143036" src="https://github.com/user-attachments/assets/0fd5da59-0046-4450-aad3-e36826585bc5" />


> **Empowering writers to share, review, and elevate each other's words.**

Akshar is a dedicated social publishing platform built from the ground up for writers, poets, and storytellers. Moving beyond standard blogging, Akshar fosters a deep, constructive community where users don't just "like" a post—they engage with it through structured, analytical reviews. Whether you are sharing a fleeting poem, a comprehensive article, or a captivating story, Akshar provides the tools to receive meaningful feedback and build a dedicated audience.

---

## ✨ Unique Features & Highlights

### 🔍 Structured & Deep Peer-Review System
Unlike traditional platforms that rely on generic comments, Akshar introduces a proprietary **Structured Review Engine**. Readers can leave nuanced feedback broken down into:
- **Observe:** Highlighting what stands out and the emotional impact.
- **Interrogate:** Asking critical questions about the plot, flow, or characters.
- **Elevate:** Providing actionable, constructive feedback to refine the piece.
- **Creative:** Offering alternative perspectives or stylistic choices.
- **In-Line Annotations:** Reviewers can highlight specific quotes from the text and attach targeted comments directly to those lines.

### 🎭 Multi-Format Content Publishing
Tailored support for different literary formats:
- **Articles:** For essays, opinions, and non-fiction.
- **Stories:** For short stories, chapters, and fiction.
- **Poems:** Optimized formatting for stanzas and verses.

### 💡 Prompt-Driven Creation & Author Notes
- **Writing Prompts:** Overcome writer's block by linking your posts to specific creative prompts.
- **Author's Note:** Writers can share the "behind-the-scenes" thought process, context, or inspiration without cluttering the main content.

### 🤝 Robust Social Ecosystem
- **Following/Follower Network:** Build your audience and follow your favorite creators.
- **Threaded Discussions:** Nested comment sections allow for organized, flowing conversations.
- **Engagement Tracking:** Integrated view counts (Read History), likes, and personalized notifications for user actions.

### 🛡️ Enterprise-Grade Security & Editor
- **Rich Text Experience:** Full-featured writing environment powered by React Quill.
- **XSS Protection:** All user-generated content is rigorously sanitized using DOMPurify before rendering.
- **Hybrid Authentication:** Secure login using traditional credentials or seamless Google OAuth integration.

---

## 💻 Technical Stack

### **Frontend (Client)**
- **Framework:** Next.js 16 (App Router) & React 19
- **Styling:** Tailwind CSS v4 & Framer Motion
- **Typography & Icons:** Vercel Geist Font, Lucide React
- **Editor & Sanitization:** React Quill, DOMPurify / Isomorphic DOMPurify

### **Backend (Server)**
- **Architecture:** Node.js with Express.js (RESTful API)
- **Language:** TypeScript for end-to-end type safety
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens), bcrypt (password hashing), Google Auth Library

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v20+)
- PostgreSQL (Running locally or via a cloud provider like Neon/Supabase)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/akshar.git
cd akshar
```

### 2. Backend Setup
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/akshar"
  JWT_SECRET="your_jwt_secret_here"
  GOOGLE_CLIENT_ID="your_google_client_id"
  ```
- Run database migrations:
  ```bash
  npx prisma migrate dev
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
- Create a `.env.local` file in the `client` directory:
  ```env
  NEXT_PUBLIC_API_URL="http://localhost:5000/api" # Adjust to your backend port
  NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
  ```
- Start the Next.js development server:
  ```bash
  npm run dev
  ```

Visit `http://localhost:3000` in your browser to see the application running.

---

## 📈 Future Roadmap
- [ ] Real-time collaborative editing.
- [ ] Daily writing streaks and gamification.
- [ ] Exporting stories to PDF/EPUB.
- [ ] AI-assisted grammar and tone suggestions.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/akshar/issues).

## 📄 License
This project is licensed under the [MIT License](LICENSE).
