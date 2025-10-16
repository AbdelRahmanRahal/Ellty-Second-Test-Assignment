-- users table
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        password_hash TEXT NOT NULL
    );

-- posts table
CREATE TABLE
    posts (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        parent_id INT REFERENCES posts (id) ON DELETE CASCADE,
        base_number FLOAT,
        operation VARCHAR(1) CHECK (operation IN ('+', '-', '*', '/')),
        operand FLOAT,
        created_at TIMESTAMPTZ DEFAULT NOW (),
        CONSTRAINT post_type_check CHECK (
            (
                parent_id IS NULL
                AND base_number IS NOT NULL
                AND operation IS NULL
                AND operand IS NULL
            )
            OR (
                parent_id IS NOT NULL
                AND base_number IS NULL
                AND operation IS NOT NULL
                AND operand IS NOT NULL
            )
        )
    );

-- Index to quickly fetch replies for a given post (hopefully)
CREATE INDEX idx_posts_parent_id ON posts (parent_id);

-- === SAMPLE DATA ===
INSERT INTO
    users (username, full_name, password_hash)
VALUES
    ('abdelrahman', 'AbdelRahman Rahal', 'hashed_pw_1'),
    ('iuliia', 'Iuliia', 'hashed_pw_2'),
    ('goku', 'Goku', 'hashed_pw_3'),
    ('walter', 'Walter White', 'hashed_pw_4'),
    ('anon', 'Anonymous Hacker!!!', 'hashed_pw_5');

-- Root post (starting number)
INSERT INTO
    posts (author_id, base_number)
VALUES
    (1, 3); -- id = 1

-- Replies
INSERT INTO
    posts (author_id, parent_id, operation, operand)
VALUES
    (2, 1, '+', 6), -- id = 2
    (4, 1, '-', 2), -- id = 3
    (5, 1, '/', 3); -- id = 4

-- Nested reply
INSERT INTO
    posts (author_id, parent_id, operation, operand)
VALUES
    (3, 2, '*', 10); -- id = 5
