# Lousy Movie Database (LMDB) API Endpoints

## Endpoints

| Endpoint    | Model     |
|-------------|-----------|
| /movies     | Movies    |
| /genres     | Genres    |

## `/movies`

### `GET /movies`

Get all movies.

### `GET /movies/:movieId`

Get a movie by ID.

### `POST /movies`

Create a new movie.

### `PUT /movies/:movieId`

Update a movie by ID.

### `DELETE /movies/:movieId`

Delete a movie by ID.

## `/movies/:movieId/actors`

### `POST /movies/:movieId/actors`

```json
{
  "people": ["5ed762fdf18c3253c68c5c21"]
}
```

Add people as actors to a movie. Does **not** overwrite existing actors.

### `DELETE /movies/:movieId/actors/:personId`

Remove a actor from a movie. Does **not** delete the person.

## `/genres`

### `GET /genres`

Get all genres.

### `GET /genres/:genreId`

Get a genre by ID.

### `POST /genres`

Create a new genre.

### `PUT /genres/:genreId`

Update a genre by ID.

### `DELETE /genres/:genreId`

Delete a genre by ID.
