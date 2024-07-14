
# FilmFolio

FilmFolio is a free online database that contains information about movies, TV shows, and other entertainment.

## Getting Started

1. Clone this repository:
   ```sh
   git clone https://github.com/nikhilsaini113/MovieD.git
   ```

2. Start the server:
   1. ```sh
      cd server
      ```
   2. ```sh
      npm install
      ```
   3. ```sh
      npm start
      ```

3. Start the client:
   1. ```sh
      cd client
      ```
   2. ```sh
      npm install
      ```
   3. ```sh
      npm run dev
      ```

## Environment Variable for server

Setup the .env file in `./server` and populate with:

- `PORT`: The port number on which the server will run.
- `MONGODB_URL`: MongoDB connection URL.
- `JWT_SECRET`: Secret key for session management.
- `TMDB_BASE_URL`: https://api.themoviedb.org/3/
- `TMDB_API_KEY`: Your TMDB Api Key

## Environment Variable for client

Setup the .env file in `./client` and populate with:

- `VITE_BASE_URL`: The BaseURL of Server
