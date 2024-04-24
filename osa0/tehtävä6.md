```mermaid
 sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: Kun lomake lähetetään, selain suorittaa javascript-koodin, joka tekee POST-pyynnön.
    
    activate server
    server-->>browser: statuskoodi 201-created
    Note left of server: Palvelin tarkastaa content-type headerin json-tyyppiseksi.
    Note left of server: Näin uudelleenohjauspyyntöä ei tehdä.
    deactivate server
    Note right of browser: Selain pysyy sivulla ja muita HTTP pyyntöjä ei tehdä.
    
    