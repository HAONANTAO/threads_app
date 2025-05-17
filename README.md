# ***The Mock_Threads_APP***
[![Live Demo](https://img.shields.io/badge/Demo-Visit-1abc9c?style=flat-square)](https://www.taohaonan.com/)
[![Portfolio](https://img.shields.io/badge/Portfolio-aarontao.com-blue?style=flat-square)](https://www.aarontao.com/)

A dynamic, interactive social media platform inspired by real-world threaded discussion apps.  
Built with Next.js 13+, MongoDB, and Clerk authentication, it features SSR/SSG, advanced API routing, nested threads, community management, and direct messaging (in development). Provides a modern, scalable, and performant user experience.
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Clerk-6.11.0-3b82f6)](https://clerk.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.13.0-47A248)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.9.5-880000)](https://mongoosejs.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54.2-EC5990)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3.24.1-2563eb)](https://zod.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.1.3-8B5CF6)](https://www.radix-ui.com/)
[![UploadThing](https://img.shields.io/badge/UploadThing-7.4.4-f97316)](https://uploadthing.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-0.474.0-10b981)](https://lucide.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.0.0-4B32C3)](https://eslint.org/)

<p align="center">
  <img src="Demo1.png" width="300" alt="Mock_Threads Demo 1"/>
  <img src="Demo2.png" width="300" alt="Mock_Threads Demo 2"/>
  <img src="Demo3.png" width="300" alt="Mock_Threads Demo 3"/>
</p>
<p align="center">
  <img src="Demo4.png" width="300" alt="Mock_Threads Demo 4"/>
  <img src="Demo5.png" width="300" alt="Mock_Threads Demo 5"/>
  <img src="Demo6.png" width="300" alt="Mock_Threads Demo 6"/>
</p>

# **Table Of Content**:


- [📝Description](#-description)
- [🏷️ Version](#version)
- [🛠️ Prerequisites](#-prerequisites)
- [🚀Quick Start](#-quick-start)
- [✨Features](#-features)
- [🧠Advanced Features](#-advanced_Features)
- [🏗️Project Architecture](#-project_Architecture)
- [💻Tech Stack](#-tech-stack)
- [⚖️ License](#-license)
- [📬 Contact](#-contact)
- [🙏 Acknowledgements](#-acknowledgements)



## 📝 Description


**Mock Threads App** is a dynamic and interactive social media platform that replicates the core functionalities of real-world social applications.  
Built with Next.js 13+, it delivers a seamless and optimized user experience through server-side rendering (SSR), static site generation (SSG), and efficient API routing for enhanced performance, SEO, and scalability.

Users can create threads to post content, share thoughts, or ask questions. Threads are organized by topics or communities, making it easy for users to discover discussions that match their interests.

Beyond thread creation, users can interact by liking posts, commenting, and reposting content. Sharing posts to external platforms is supported, helping popular discussions reach a broader audience. The threading system supports nested replies for focused, in-depth conversations.

Key social features include following other users, receiving updates on new posts, and (in development) private direct messaging. Users can also personalize their profiles with images and bios for a more engaging and customized experience.

---

## 🏷️ Version


- **Version 1:** Basic functionality for users, threads, and communities.
- **Version 2:** Enhanced features including social media links, repost, share, and more improvements.

---


##🛠️ Prerequisites

- **Node.js** v18.0.0 or higher ([download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn** (`npm install -g yarn`)
- **Clerk API Key** from [Clerk.dev](https://clerk.dev/) (add to `.env.local`)
- **MongoDB** (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- **.env.local** file for environment variables

## 🚀 Quick Start


1. **Clone the repository**

   Open your terminal and run:


- Open your terminal and navigate to the directory where you want to store the project. Then run the following Git command:

  ```
  git clone https://github.com/HAONANTAO/threads_app.git
  cd threads_app
  ```




2. **Install dependencies**

Install all required packages for both frontend and backend (Next.js monorepo, one step is enough):
```
npm install
```

_or, if you use yarn:_

   ```
  yarn install
  ```

3. **Set up environment variables**

Create a `.env.local` file in the project root and add your Clerk API key and MongoDB URI:
  ```
CLERK_API_KEY=your_clerk_api_key
MONGODB_URI=your_mongodb_uri
```

4. **Run the development server**
```
npm run dev
```
_or_

```
yarn dev
```


5. **Access the app**

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

**Notes:**
- All dependencies (frontend and backend) are managed together since this is a Next.js fullstack project.
- Main dependencies include:  
- Backend: `axios`, `bcrypt`, `express`, `mongoose`  
- Frontend: `react`, `@mui/material`, `react-dom`, etc.
- For more details, see the `package.json` file.


## ✨ Features


### 👉 Post & Thread Management

- Fetch posts (threads) with pagination, retrieving only top-level threads for efficient loading.
- Support for nested comments and replies, with recursive fetching of all child threads.
- Create, delete, and fetch individual threads, including all associated replies.

### 👉 User Management

- Fetch, update, and manage user profiles (bio, image, and name).
- Retrieve posts and replies made by a specific user.
- User search with pagination and sorting by creation date.

### 👉 Community Management

- Create communities, manage memberships, and fetch posts within communities (including threads and replies).
- Search for communities by name or username, with pagination support.
- Add or remove users from community memberships.


# 🧠 **Advanced Features**


more features are comming......

(share thread, repost thread, social media......)


# 🏗️ **Project_Architecture**

```
/project-root

│── .next

│── .vercel

│── .env.local

│── .gitignore

│── components.json

│── middleware.ts

│── next-end.d.ts

│── next.config.js       # Next.js configuration file
│── package.json         # Project dependencies and scripts

│── postcss.config.mjg

│── tailwind.config.ts

│── tsconfig.json      

│── package-lockl.json         # Project dependencies and scripts

│── tsconfig.json        # TypeScript configuration
│── .eslintrc.js         # ESLint configuration
│── .prettierrc          # Prettier configuration
│── README.md            # Project documentation

│── /public              # Static assets (images, fonts, etc.)


│── /components   # Reusable React components

│──│──cards

│──│── │──CommunityCard.tsx

│──│── │──ThreadCard.tsx

│──│── │──UserCard.tsx

│──│──forms

│──│── │──AccountProfile.tsx

│──│── │──Comment.tsx

│──│── │──PostThread.tsx

│──│──shared

│──│── │──Bottombar.tsx

│──│── │──DeleteButton.tsx

│──│── │──LeftSidebar.tsx

│──│── │──ProfileHeader.tsx

│──│── │──RightSidebar.tsx

│──│── │──SearchBar.tsx

│──│── │──ThreadsTab.tsx

│──│── │──Topbar.tsx

│──│──ui   

│──│── │──button.tsx

│──│── │──form.tsx

│──│── │──input.tsx

│──│── │──label.tsx

│──│── │──tabs.tsx

│──│── │──textarea.tsx   

│── /app

│──│──(auth)

│──│──(root)

│──│──api

│──│──favicon.ico

│──│──globals.css

│── /constants             # Feature-based modules (business logic, API integration)

│──│──index.js

│── /lib               # Custom actions

│──│──actions

│──│──models

│──│──validations

│──│──mongoose.ts

│──│──uploadthing.ts

│──│──utils.ts
```


## 💻 Tech Stack


This project utilizes the following technologies:

### Frontend

- **Next.js** (`next`): React framework for building fast, scalable, and SEO-friendly web applications with server-side rendering and static generation.
- **React** (`react`, `react-dom`): Component-based JavaScript library for building interactive user interfaces.
- **Tailwind CSS** (`tailwindcss`, `tailwind-merge`, `tailwindcss-animate`): Utility-first CSS framework for rapid UI development, responsive design, and smooth animations.
- **Radix UI** (`@radix-ui/react-label`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`): Accessible, low-level UI primitives for building customizable components.
- **Lucide React** (`lucide-react`): Open-source, customizable icon set for React applications.
- **Zod** (`zod`): TypeScript-first schema declaration and validation library for robust data validation.
- **React Hook Form** (`react-hook-form`, `@hookform/resolvers`): Efficient form library with minimal re-renders, integrated with Zod for schema validation.
- **Clerk** (`@clerk/clerk-sdk-node`, `@clerk/nextjs`, `@clerk/themes`): Comprehensive authentication and user management solution.

### Backend

- **MongoDB** (`mongodb`, `mongoose`): NoSQL database for data storage; Mongoose provides elegant data modeling and interaction.
- **Svix** (`svix`): Webhook management solution for processing and reacting to external service events.

### Development Tools

- **TypeScript** (`typescript`): Strongly typed JavaScript superset for improved code quality and maintainability.
- **PostCSS** (`postcss`): CSS transformation tool with plugin support (e.g., autoprefixing).
- **Autoprefixer** (`autoprefixer`): PostCSS plugin for automatically adding vendor prefixes to CSS.
- **Class Variance Authority** (`class-variance-authority`): Utility for generating dynamic class names based on component state or props.
- **Clsx** (`clsx`): Tiny utility for conditionally constructing `className` strings.


## ⚖️ License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.


## 📬 Contact Information

- **Name:** Aaron TAO
- **Email:** [taoaaron5@gamil.com](mailto:taoaaron5@gamil.com)
- **GitHub:** [HAONANTAO](https://github.com/HAONANTAO)
- **LinkedIn:** [Aaron Tao](https://www.linkedin.com/in/haonan-tao-aaron)

---
## 🙏 Acknowledgements

Special thanks to the amazing open source technologies and libraries that make this project possible:

- [Next.js](https://nextjs.org/) – The React framework for production.
- [React](https://reactjs.org/) – A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/) – A utility-first CSS framework for rapid UI development.
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed programming language that builds on JavaScript.
- [Clerk](https://clerk.com/) – Complete user management and authentication for modern web apps.
- [MongoDB](https://www.mongodb.com/) – A flexible, document-oriented NoSQL database.
- [Mongoose](https://mongoosejs.com/) – Elegant MongoDB object modeling for Node.js.
- [React Hook Form](https://react-hook-form.com/) – Performant, flexible, and extensible forms with easy React integration.
- [Zod](https://zod.dev/) – TypeScript-first schema validation with static type inference.
- [Radix UI](https://www.radix-ui.com/) – Primitives for building high-quality, accessible design systems and web apps.
- [UploadThing](https://uploadthing.com/) – Effortless file uploads for your web apps.
- [Lucide React](https://lucide.dev/) – Beautiful & consistent icon toolkit for React.
- [ESLint](https://eslint.org/) – Pluggable JavaScript linter for code consistency and quality.
- [PostCSS](https://postcss.org/) – Tool for transforming CSS with JavaScript.
- [Autoprefixer](https://github.com/postcss/autoprefixer) – Parse CSS and add vendor prefixes automatically.
- [All open source contributors and the developer community](https://github.com/) – For inspiration, support, and making the ecosystem thrive.

Thank you for visiting my mock-thread web application! 🚀

## License

This project is licensed under the MIT License.

