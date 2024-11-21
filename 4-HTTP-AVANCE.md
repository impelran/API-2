# API Avancé

#### Cache-Control :
L'en-tête HTTP Cache-Control contient des directives (c'est-à-dire des instructions), dans les requêtes et dans les réponses, pour contrôler la mise en cache dans les navigateurs et caches partagées (par exemple les proxies, CDN).
Les directives pour le cache :

   * private : La donnée peut être stocker dans le cache du navigateur

   * public : La donnée peut être cachée au niveau du proxy ou du cdn (Content - Devlivery - Network)

   * no-cache : Cette directive signifie que les versions mises en cache de la ressource demandée ne peuvent pas être utilisées sans vérifier au préalable s'il existe une version mise à jour. Cela se fait généralement à l'aide d'un ETag.

   * no-store: Une réponse avec une directive « no-store » ne peut jamais être mise en cache, à quelque endroit que ce soit. Cela signifie que chaque fois qu'un utilisateur demande ces données, une requête doit être envoyée au serveur d'origine pour obtenir une nouvelle copie. Cette directive est généralement réservée aux ressources qui contiennent des données extrêmement sensibles, telles que les informations de compte bancaire.

   * max-age : indique que la réponse reste fraîche jusqu'a N secondes après la génération de cette dernière par le serveur


#### Etag

 - Eviter des collisions en vols : A l'aide des    en-têtes ETag et If-Match (en-US), vous pouvez  détecter les collisions d'édition en vol.
  Par exemple, lors de l'édition de MDN, le contenu actuel du wiki est haché et placé dans un Etag dans la réponse :
```
  ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

```
 Lors de la sauvegarde des modifications d'une page wiki ("post" des données), la requête POST contiendra l'en-tête If-Match (en-US) contenant les valeurs ETag par rapport auxquelles vérifier la péremption.

```
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

```
Si les hachages ne correspondent pas, cela signifie que le document a été modifié entre-temps, et une erreur 412 Precondition Failed est déclenchée.

https://fideloper.com/etags-and-optimistic-concurrency-control

 - Mise en cache des ressources inchangées : Un autre cas d'utilisation typique de l'en-tête ETag est de mettre en cache les ressources qui sont inchangées. Si un utilisateur visite à nouveau une URL donnée (qui a un ensemble d'ETag), et qu'elle est périmée, c'est à dire, trop ancienne pour être considérée comme utilisable, le client enverra en même temps la valeur de son ETag dans un champ d'en-tête If-None-Match :
 ```
   If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```
 Le serveur comparera l'ETag du client (envoyé avec If-None-Match) à l'ETag de sa version en cours de la ressource, et si les deux valeurs correspondent (c'est-à-dire que la ressource n'a pas changé), le serveur renverra un statut 304 Not Modified, sans aucun corps, qui indiquera au client que sa version mise en cache de la réponse est toujours bonne à utiliser (actuelle).

#### Streaming Response

 - https://gist.github.com/CMCDragonkai/6bfade6431e9ffb7fe88
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding


#### Jwt
JSON Web Token (JWT) est un standard ouvert défini dans la RFC 75191. Il permet l'échange sécurisé de jetons (tokens) entre plusieurs parties. Cette sécurité de l’échange se traduit par la vérification de l'intégrité et de l'authenticité des données. Elle s’effectue par l'algorithme HMAC ou RSA.

Un jeton se compose de trois parties :

Un en-tête (header), utilisé pour décrire le jeton. Il s'agit d'un objet JSON.
Une charge utile (payload) qui représente les informations embarquées dans le jeton. Il s'agit également d'un objet JSON.
Une signature numérique.
Il existe des outils en ligne permettant de les déchiffrer (https://jwt.io/)

Header
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Body
```
{
  "id": "673ed83af4d39e8c58f65f4d",
  "iat": 1732172206,
  "exp": 1732258606
}
```

Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)
```


IL est recommandé de stocker un jeton jwt dans les cookies pour eviter les vols de token.


![alt text for screen readers](/images/jwt.png)
###  - Ressources additionnelles
- https://technicalsand.com/streaming-data-spring-boot-restful-web-service/
- https://datatracker.ietf.org/doc/html/rfc2616#section-13.4
- https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control
- https://www.cloudflare.com/fr-fr/learning/cdn/glossary/what-is-cache-control/
- https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/ETag#mise_en_cache_des_ressources_inchang%C3%A9es
- https://dzone.com/articles/concurrency-control-in-rest-api-with-spring-framew