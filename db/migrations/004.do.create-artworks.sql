CREATE TABLE artworks (  
    artwork_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    met_artwork_id INTEGER,     
    department_name VARCHAR(240),
    date_created TIMESTAMP DEFAULT now() NOT NULL
);  