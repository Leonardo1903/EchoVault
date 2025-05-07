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
![Landing Page](https://github.com/user-attachments/assets/b614e849-f420-46fd-92c7-797d5af78622)
DashBoard:
![Dashboard](https://github.com/user-attachments/assets/6297f336-dd5c-4dd6-a21a-47199a18f1c0)


## Demo

https://echo-vault.vercel.app/


## License

[MIT](https://choosealicense.com/licenses/mit/)

