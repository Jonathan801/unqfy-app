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
https://drive.google.com/file/d/1o44EyFFowoRQ8Pm6JN01SOl-NgLTV1QH/view?usp=sharing

[uml-unqfy](https://lucid.app/lucidchart/bc7d4b72-5556-4d07-b56f-a030b969601f/edit?viewport_loc=-28%2C-11%2C2200%2C1127%2C0_0&invitationId=inv_b1df06c1-3479-4d63-a7fd-9063d6706a1d)



