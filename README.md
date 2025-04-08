# Art Collection

A modern and responsive web application built with Next.js that lets users search, browse, and manage their favorite artworks.

##Hosted on Vercel
https://art-collection.vercel.app/

## Features

- 🔍 Search for artworks
- 🖼 View detailed artwork information
- ❤️ Add and remove artworks from favourites
- 🕓 Track search and view history
- 🔐 Secure user authentication (Login/Register)
- ⚡ Fast and responsive UI with Bootstrap

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: CSS Modules, Bootstrap
- **Auth & Data**: JWT Authentication with external API
- **State Handling**: Client-side state (history & favourites)

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sppardesi75/art-collection.git
cd art-collection
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=https://user-api-sanskarpardesi-gmailcoms-projects.vercel.app/api/user
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
components/         # Reusable UI components
lib/                # Utility logic (auth, user data)
pages/              # Next.js pages and routing
public/             # Static assets and icons
styles/             # Global and module CSS files
```

## Deployment

This project can be deployed on [Vercel](https://vercel.com/) with no additional setup.

## License

This project is licensed under the [MIT License](LICENSE).

## API

The app uses an external User API deployed at:

```
https://user-api-sanskarpardesi-gmailcoms-projects.vercel.app/api/user
```
