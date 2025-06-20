# EchoVault

An anonymous feedback platform with AI suggested messages


## Features

- Anonymous Sending of Messages (without signing up)
- AI suggested Messages
- Secure Authentication
- Personalised User Dashboard
- CRUD Operations By User on messages 


## Tech Stack

**Client:** NextJS, TailwindCSS, ShadCN-UI

**Server:** NextJS, MongoDB 


## Key Learnings

- Building a full-stack application with Next.js and MongoDB.
- Creating a responsive and accessible UI with TailwindCSS and ShadCN-UI.
- Integration of NextAuth for secure authentication.
- Implementation of Google Generative AI for AI-powered suggestions.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Leonardo1903/EchoVault.git
```

Go to the project directory

```bash
  cd EchoVault
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`= "Your Mongo DB Cluster Path"

`NEXTAUTH_SECRET`= "Your Secret"

`GEMINI_API_KEY`= " Your Gemini API Key" 

`MY_EMAIL`= "Your Email ID"

`MY_PASS`= "Your App Password"
## Screenshots

Landing Page:
![Landing Page](https://github.com/user-attachments/assets/6577536a-5507-4743-bc3b-35b89c46d78f)
DashBoard:
![Dashboard](https://github.com/user-attachments/assets/0f728ec4-4081-48af-a11d-185c59de6b8f)
Public Profile Page:
![Public Profile Page](https://github.com/user-attachments/assets/1bc863d2-f9b6-48ed-9dcd-3bac457d5464)

## Demo

[Live Demo](https://echovault.leonardo1903.me/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

