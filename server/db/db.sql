CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    stall_id BIGINT NOT NULL REFERENCES stalls(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);