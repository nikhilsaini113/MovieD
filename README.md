Movied is a free online database that contains information about movies, TV shows, video games, and other entertainment

## Getting Started

1. Clone this repository:
   git clone https://github.com/nikhilsaini113/MovieD.git

2. Start the server:
   1. cd server
   2. npm install
   3. npm start
   
3. Start the client:
   1. cd client
   2. npm install
   3. npm run dev

## Environment Variable

    Setup the .env file in server populate with:

- `PORT`: The port number on which the server will run.
- `MONGODB_URL`: MongoDB connection URL.
- `JWT_SECRET`: Secret key for session management.
- `TMDB_BASE_URL`: https://api.themoviedb.org/3/
- `TMDB_API_KEY`: Your TMDB Api Key
