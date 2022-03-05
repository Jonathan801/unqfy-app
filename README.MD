Proyecto realizado para el Taller de Desarrollo de Servicios Web/Cloud Modernos en la Unq,consiste en una aplicación similar a Spotify con artistas,albums,canciones y playlists
----
El proyecto consistio en 3 Visados:

En la primera parte se tenia el modelo y se usaba la consola de comandos para realizar acciones crud(V1.0)

En la segunda parte se obtienen datos de Spotify(artistas y albums) y MusixMatch(letras de canciones) para usarlos en la aplicacion , ademas de ofrecer un servicio REST para la misma(V2.0).

En la tercera parte se agrega la funcionalidad de un newsletter (Notificar a usuarios por mail sobre las novedades en UNQfy) ,un registro (log) de diferentes sucesos del sistema, para poder auditar y debuggear en caso de ser necesario , tambien un monitoreo sobre estos servicios (Unqfy, newsletter y logger).Finalmente todos estos servicios estan dockerizados(V3.0).

----
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


