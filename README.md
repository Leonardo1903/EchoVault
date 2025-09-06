# EchoVault

<div align="center">

**An anonymous feedback platform designed to foster open and honest communication.**

EchoVault allows anyone to send and receive anonymous messages, enhanced with AI-generated suggestions to promote constructive dialogue. It's built for security, privacy, and a seamless user experience, from secure sign-on to a personalized feedback dashboard.

<p>
  <img src="https://img.shields.io/github/last-commit/Leonardo1903/EchoVault?style=for-the-badge" alt="last commit">
  <img src="https://img.shields.io/github/stars/Leonardo1903/EchoVault?style=for-the-badge" alt="stars">
</p>

[**Live Demo**](https://echovault.leonardo1903.me/)

</div>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0f728ec4-4081-48af-a11d-185c59de6b8f" alt="EchoVault Dashboard Demo" width="80%">
</p>

---

## ✨ Core Features

-   **🤫 True Anonymity**: Send feedback to any registered user without needing to sign up yourself.
-   **🤖 AI-Powered Suggestions**: Get intelligent, context-aware message suggestions from Google Gemini to help you start the conversation.
-   **🔐 Secure Authentication**: Robust and secure user registration and login system powered by NextAuth.
-   **📊 Personal Feedback Dashboard**: A private, personalized dashboard for registered users to view and manage all their received messages.
-   **🗑️ Full Message Control**: Users have complete control to view, manage, and delete the messages they receive.

## 🛠️ Tech Stack

| Category         | Technologies                                                                                                                                                                                                                                                                     |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)                                                                                                                                                                                               |
| **UI/Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white) ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)                                                                                              |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)                                                                                                                                                                                                |
| **Authentication**| ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?logo=nextauth.js&logoColor=white)                                                                                                                                                                                       |
| **AI** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B8?logo=google-gemini&logoColor=white)                                                                                                                                                                              |

## 📸 Screenshots

| Landing Page                                                                                                              | User Dashboard                                                                                                            | Public Profile Page                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/6577536a-5507-4743-bc3b-35b89c46d78f" alt="Landing Page Screenshot"> | <img src="https://github.com/user-attachments/assets/0f728ec4-4081-48af-a11d-185c59de6b8f" alt="Dashboard Screenshot"> | <img src="https://github.com/user-attachments/assets/1bc863d2-f9b6-48ed-9dcd-3bac457d5464" alt="Public Profile Page Screenshot"> |

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A **[MongoDB](https://www.mongodb.com/)** account and a database cluster.
-   A **[Google AI](https://aistudio.google.com/)** account to get a Gemini API key.

### 1. Configure Environment Variables

This project requires several environment variables to function correctly.

1.  Create a file named `.env.local` in the root of your project.
2.  Add the following variables, replacing the placeholder values with your own keys and secrets:

    ```env
    # MongoDB Connection String
    # Get this from your MongoDB Atlas cluster
    MONGODB_URI="your_mongodb_cluster_uri"

    # NextAuth Secret
    # Generate a secret by running: openssl rand -base64 32
    NEXTAUTH_SECRET="your_nextauth_secret"

    # Google Gemini API Key
    # Get this from Google AI Studio
    GEMINI_API_KEY="your_gemini_api_key"

    # Email for sending notifications (using a service like Nodemailer)
    # Use a Gmail "App Password" if using a Gmail account for security
    MY_EMAIL="your_email@example.com"
    MY_PASS="your_email_app_password"
    ```

    **Notes on Environment Variables:**
    * **`NEXTAUTH_SECRET`**: You can generate a suitable secret by running `openssl rand -base64 32` in your terminal.
    * **`MY_EMAIL` / `MY_PASS`**: This is intended for an email service (like Nodemailer) to send messages. If you use Gmail, it's highly recommended to create an **[App Password](https://support.google.com/accounts/answer/185833)** instead of using your regular password.

### 2. Install and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Leonardo1903/EchoVault.git](https://github.com/Leonardo1903/EchoVault.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd EchoVault
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🌟 Key Learnings

This project was a deep dive into modern full-stack development with the Next.js ecosystem. Key takeaways include:

-   Building a full-stack application from scratch with **Next.js App Router** and server components.
-   Integrating **MongoDB** with Mongoose for robust data modeling and management.
-   Creating a beautiful, responsive, and accessible UI with **TailwindCSS** and **ShadCN-UI**.
-   Implementing secure, credential-based authentication using **NextAuth.js**.
-   Leveraging the **Google Generative AI (Gemini)** API to add intelligent, value-added features.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](https://choosealicense.com/licenses/mit/) file for details.
