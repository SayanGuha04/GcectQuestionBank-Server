CREATE DATABASE qbtest;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);

CREATE TABLE teachers(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);

CREATE TABLE coe(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);

CREATE TABLE subjects(
    subid SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    degree VARCHAR(50),
    cs BOOLEAN,
    it BOOLEAN,
    ct BOOLEAN,
    sem VARCHAR(50)
);

CREATE TABLE modules(
    moduleid SERIAL PRIMARY KEY,
    module VARCHAR(255),
    subid INTEGER,
    FOREIGN KEY (subid) REFERENCES subjects(subid)
);

CREATE TABLE questions(
    quid SERIAL PRIMARY KEY,
    question VARCHAR(255),
    marks VARCHAR(50),
    moduleid INTEGER,
    FOREIGN KEY (moduleid) REFERENCES modules(moduleid)
);

ALTER TABLE questions ADD subid INTEGER, FOREIGN KEY (subid) REFERENCES subjects(subid);



SELECT * FROM questions INNER JOIN modules ON questions.moduleid = modules.moduleid INNER JOIN subjects ON modules.subid = subjects.subid;
