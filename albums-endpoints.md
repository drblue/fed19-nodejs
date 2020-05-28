# Albums vs Photos endpoints

## `GET /albums`

Returnerar alla album (exkl. foton).


## `GET /albums/:albumId`

Returnerar ett album, inkl. foton.


## `POST /albums`

Skapar ett nytt, tomt album.


## `PUT /albums/:albumId`

Uppdaterar ett albums attribut.


## `DELETE /albums/:albumId`

Raderar ett album (inkl. albumets kopplingar till foton).


## `POST /albums/:albumId/photos`
```json
{
  "photo_id": 4
}
```

Lägger till foto med ID 4 till albumet.


## `DELETE /albums/:albumId/photos/:photoId`

Tar bort fotot med ID photoId från albumet med ID albumId.


## `POST /albums/4/photos`

```json
{
  "photo_id": 13
}
```

Lägger till foto med ID 13 till albumet med ID 4.


## `DELETE /albums/4/photos/13`

Tar bort fotot med ID 13 från albumet med ID 4.

