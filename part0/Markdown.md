/*Exercice0.4 new note */  
    
    sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser makes a POST with the data: good morning
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (data:good mornig)
    activate server
    server-->>browser: 302 Found
    deactivate server

    Note right of browser: The browser performs a GET again to obtain the notes file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser:  CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser:  JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
    

/*Exercice0.5 Single Page Application Diagram */  

     sequenceDiagram
     participant browser
     participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser:  CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser:  JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file [{"content": "hi","date": "2024-06-26T09:46:27.896Z"}...]
    deactivate server

 /*Exercice0.6 New note on single page application diagram*/  

    sequenceDiagram
    participant browser
    participant server

    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_sp
    activate server
    server-->>browser:  {"message":"note created"}
    deactivate server


