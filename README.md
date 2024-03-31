
<img height="200" src='https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/eventify-logo.png' />

# Project Description 📝
Eventify is a full-stack Event Management Platform. <br/>
It provides features such as authentication, event management, search, filtering, categories, checkout, and payments. <br/>
Built with modern technologies including Next.js 14, Tailwind CSS, Shadcn, React Hook Form, Zod, Uploadthing, React-Datepicker, Mongoose, Clerk, and Stripe.


<h2>Explanation Video 📺 - [  ]</h2>
<hr/>

<h2>Live link 🌍📡 - [  https://eventify-alpha.vercel.app/  ]</h2>
<hr/>


## Table of Contents


| Section                 | Description                                  |
|-------------------------|----------------------------------------------|
| [StudyNotion Aim](#studynotion-aim-)        | 📚 Overview of StudyNotion's goals            |
| [Tech Stack](#tech-stack-)             | 💻🔧 Technologies used in the project         |
| [Features](#features-)             | 💻🔧 Features of the project         |
| [Schema](#schema-)                  | 🗂 Explanation of data schemas used          |
| [React Hooks](#react-hooks-)            | 🎣 Overview of React Hooks utilized          |
| [React Library](#react-library-)         | ⚛️📚 Overview of React Libraries used        |
| [Screen Preview](#screen-preview-)         | 🖥️ Screen Preview        |





## Tech Stack 💻🔧 


| Logo                 | Technology                                  |
|-------------------------|----------------------------------------------|
| <code title="React.js"><img height="55" src="https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/next.js-logo.png"></code>      |Next.Js |
| <code title="React.js"><img height="40" src="https://github.com/Aniruddha-Gade/Study-Notion-EdTech__MERN-Stack/blob/main/screenshots/Tech%20stack%20logo/nodejs-logo.png"></code>      |Node.Js |
| <code title="React.js"><img height="40" src="https://github.com/Aniruddha-Gade/Study-Notion-EdTech__MERN-Stack/blob/main/screenshots/Tech%20stack%20logo/react%20ogo.png"></code>        |React.Js|
| <code title="React.js"><img height="30" src="https://github.com/Aniruddha-Gade/Study-Notion-EdTech__MERN-Stack/blob/main/screenshots/Tech%20stack%20logo/tailwind%20css%20logo.png"></code>      |Tailwind CSS |
| <code title="React.js"><img height="40" src="https://github.com/Aniruddha-Gade/Study-Notion-EdTech__MERN-Stack/blob/main/screenshots/Tech%20stack%20logo/css%20logo.png"></code>      |CSS |
| <code title="React.js"><img height="55" src="https://github.com/Aniruddha-Gade/Study-Notion-EdTech__MERN-Stack/blob/main/screenshots/Tech%20stack%20logo/mongodb%20logo.png"></code>      |MongoDB |
| <code title="React.js"><img height="40" src="https://clerk.com/_next/image?url=%2Fimages%2Fclerk-logomark-square.svg&w=2048&q=75"></code>      |Clerk |
| <code title="React.js"><img height="40" src="https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/shadcn-logo.png"></code>      |Shadcn UI |
| <code title="React.js"><img height="50" src="https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/Stripe-logo.png"></code>      |Stripe |
| <code title="React.js"><img height="15" src="https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/uploadthing-logo.png"></code>      |UploadThing |
| <code title="React.js"><img height="40" src="https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14/blob/main/screenshots/zod-logo.png"></code>      |Zod |



## Features

- **Authentication**: 🔒 Secure user authentication using Clerk.
- **Event CRUD operation**: ✏️ Create, edit, and delete events with ease.
- **Search and Filtering**: 🔍 Find events based on various criteria like location, date, and category.
- **Categories**: 🗂️ Organize events into different categories for easy discovery.
- **Checkout and Payments**: 💳 Seamless checkout process with Stripe integration for payments.
- **Responsive Design**: 📱 Fully responsive layout ensuring a great user experience across devices.



## Getting Started

### Prerequisites
- NextJS 
- Node.js (version 14 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aniruddha-Gade/Event-Management-Platform__NextJs14.git
   ```

2. Navigate to the project directory:

   ```bash
   cd my-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext

   #CLERK
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   WEBHOOK_SECRET=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   #MONGODB
   MONGODB_URI=

   #UPLOADTHING
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

   #STRIPE
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

   # API Url code
   WEATHER_API_URL=https:
   DISTANCE_API_URL=https:

   ```



5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! 

## License


## Acknowledgements

- **Clerk**: For providing user authentication.
- **Stripe**: For payment processing.
- **Next.js**: For building modern web applications with React.
- **Tailwind CSS**: For fast and responsive UI development.
- **MongoDB**: For flexible and scalable data storage.


