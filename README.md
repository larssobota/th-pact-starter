# Aufgaben

Du bist Fullstack-Entwickler und arbeitest an einem Webshop. Ziel ist es Consumer Driven Contract Testing für neue Features einzusetzen. Dir wurde folgendes Projekt übergegeben.

- Der `consumer`-Ordner enthält einen API-Client bzw. den `ProductService`, welcher anderen Entwicklern eine einfache Anbindung an die Webshop-API ermöglicht.
- Der `provider`-Ordner enthält einen HTTP-Server bzw. die Implementierung der Webshop-API.
  - Es wurde bereits ein `/status`-Endpunkt vollständig implementiert. 

Folgende UserStories wurden dir zugeteilt.

## Aufgabe 1 - GetProducts

**User Story:** Als Entwickler möchte ich einen API-Client (Consumer) haben, welcher eine Methode `getProducts` bereitstellt, welche mir alle Produkte der Shop-API (Provider) als Array zurückliefert. Dabei sind die Produktmerkmale dem folgenden JSON-Beispiel zu entnehmen:

```json
[
    {
        "id": 1,
        "name": "Clean Code"
    },
    ...
]
```
### Aufgabe 1.1 - Implementierung der Consumer-Seite

**Vorgehensweise:**
1. Ergänze die Klasse `ProductService` in der Datei `consumer/service.js` um die neue Methode.
2. Überlege dir unter welcher HTTP-URL und HTTP-Methode der Server die Produkte anbieten soll (Hinweis: Da wir ja Consumer Driven entwickeln, hast du hier volle Freiheiten, da noch keine Serverimplementierung  vorliegt)
3. Implementiere den HTTP-Aufruf mittels des HTTP-Clients  [Axios](https://axios-http.com/docs/intro) analog zur Statusabfrage (`isServiceAvailable`).
4. Erstelle einen Contract Test ([Beispiel](https://docs.pact.io/implementation_guides/javascript/docs/consumer)) in der Datei `consumer/service.spec.js` analog zu `isServiceAvailable`. Mithilfe des Befehls `npm run test:consumer` kannst du die Tests laufen lassen.
 
> Sind die Tests erfolgreich gelaufen, sollte ein Ordner `pacts` mit einer JSON-Datei bzw. einem Contract existieren.

### Aufgabe 1.2 - Implementierung der Provider-Seite

**Vorgehensweise:**
1. Mithilfe des Skripts `provider/providerVerification.js` wird der in der Datei `provider/server.mjs` implementierte Server lokal gestartet, um den von Consumer erstellten Contract in Aufgabe 1.1 zu verifizieren. Führe das Skript mithilfe des Befehls `npm run test:provider` aus. Was fällt dir auf?
2. Implementiere innerhalb der `server.mjs` analog zum Status-Endpunkt den von dir im Consumer definierten Produkt-Endpunkt. Evtl. hilft dir hierbei die Routing-Dokumentation zu [Express](https://expressjs.com/en/guide/routing.html).
3. Führe das in Schritt 1 ausgeführte Skript erneut aus. Bei richtiger Implementierung sollten nun alle Tests grün sein.

> Glückwunsch zum ersten erfolgreichen Contract-Test!

## Aufgabe 2 - Clientseitiges Filtern von Produkten
**User Story:**  Als Entwickler möchte ich die zurückgegebenen Produkte der Methode `getProducts` nur nach verfügbaren Produkten filtern können. Dafür soll die Methode `getProducts` das zusätzliche Boolean-Argument `onlyAvailableProducts` aufnehmen und im Fall von `true` nur verfügbare Produkte zurückgeben ansonsten alle.

**Vorgehensweise:** 
1. Erweitere zunächst das Produktmodell um das Property `isAvailable` in allen Produkten. Setzte hierbei mindestens bei einem Produkt das Property-Value auf `false`. Implementiere dafür sowohl Consumer- als auch Provider-Seite.

    ```json
    [
        {
            "id": 1,
            "name": "Clean Code",
            "isAvailable": true
        },
        {
            "id": 2,
            "name": "Dirty Code",
            "isAvailable": false
        },
        ...
    ]
    ```

2. Implementiere das Clientseitige-Filtering (also nur Consumer-Seite) auf Basis des neuen Arguments `onlyAvailableProducts`. Hinweis: Hierfür bietet sich die Array-Methode `filter` an. Siehe [dazu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## Aufgabe 3 - Serverseitiges Filtern von Produkten
**User Story:** Als Entwickler möchte ich clientseitiges Filtern von Produkten auf Grund größerer Datenmengen nun Serverseitig umsetzen, damit nur benötigte Produkte an den Client übertragen werden. Daher soll das `onlyAvailableProducts`-Property nun über ein QueryParam an den Server weitergereicht werden.

**Vorgehensweise:** 
1. Erstelle hierfür eine neue Funktion in der Klasse `ProductService` mit dem Namen `getProductServer`, welche als Argument `onlyAvailableProducts` nimmt.
2. Erstelle passende Contract Tests (mind. 2)
3. Verifiziere diese am Provider und falls nötig implementiere fehlende Serverfunktionalität

## Aufgabe 4 - GetProductById
**User Story:** Als Entwickler möchte ich genau ein Produkt mittels ID erhalten, um lediglich ein Produkt zu erhalten.

**Vorgehensweise:** 
1. Erstelle hierfür eine neue Funktion in der Klasse `ProductService`
2. Erstelle passende Contract Tests (mind. 2)
3. Verifiziere diese am Provider und falls nötig implementiere fehlende Serverfunktionalität

## Aufgabe 5 - Matcher (Bonus)
Als Entwickler möchte ich flexibler mit meinen Tests umgehen können, dafür bietet die PACT-Library sogenannte [Matcher](https://docs.pact.io/implementation_guides/javascript/docs/matching#match-based-on-arrays).
Passe deine Tests für die Methode `getProductById` mithilfe der Matcher an.