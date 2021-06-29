CREATE TABLE artworks (  
    artwork_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER,
    game_id INTEGER,
    date_created TIMESTAMP DEFAULT now() NOT NULL
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_game_id FOREIGN KEY (game_id) REFERENCES games (id)
);  