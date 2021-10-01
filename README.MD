Requerimientos
----

* node 12
* npm
* picklify


Entorno de desarrollo
---

Corra npm install para instalar las dependencias. Entre ellas encontrará una en particular que es para persistir su grafo de objetos y que será utilizada indirectamente por su programa.
La documentación de picklify puede encontrarla en https://github.com/lwoites/picklify

tests
----
Para correr los tests use `npm test`

main.js
------
El punto de entrada del programa es el archivo main.js. Para ejecutarlo corra el comando `node main.js`

Comandos
------

| Comando | Argumentos|
| --- | --- |
|`addArtist`|nameArtist countryArtist|
|`addAlbum`|artistId albumName yearAlbum|
|`addTrack`|nombreTrack albumId durationTrack genresTrack|
|`removeAlbum`|artistId albumId|
|`removeArtist`|artistId|
|`removeTrack`|artistId trackId|
|`createPlaylist`|namePlaylist genresToInclude maxDuration|
|`getAlbumsArtist`|artistId |
|`getTracksAlbum`|albumId|
|`getTracksArtist`|artistId|
|`getTracksGenre`|genres|
|`artists`|            |
|`albums`|             |
|`tracks` |            |
|`setUp`|              |
|`addUser`|userName|

UML
------
[uml-unqfy](https://drive.google.com/file/d/1o44EyFFowoRQ8Pm6JN01SOl-NgLTV1QH/view?usp=sharing)

Backlog
--------
[trello-unqfy](https://trello.com/b/uPclPhxf/cloud-tp)


