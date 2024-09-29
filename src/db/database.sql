CREATE DATABASE qbtest;

CREATE TABLE test(
    qid SERIAL PRIMARY KEY,
    question TEXT,
    marks INT,
    co VARCHAR(255),
    conum INT,
    module VARCHAR(255),
    yr INT,
    subcode VARCHAR(255),
    sem INT,
    department VARCHAR(255),
    degree VARCHAR(255),
    qtype VARCHAR(255)
);




CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);



INSERT INTO users (user_name, user_password, user_type) VALUES ('sayan', '1234', 'student');




CREATE TABLE teachers(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);



INSERT INTO teachers (user_name, user_password, user_type) VALUES ('teach1', '1234', 'teacher');
INSERT INTO teachers (user_name, user_password, user_type) VALUES ('teach2', '1234', 'student');
INSERT INTO teachers (user_name, user_password, user_type) VALUES ('teach3', '1234', 'student');



CREATE TABLE coe(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(225) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);

INSERT INTO coe (user_name, user_password, user_type) VALUES ('partha_h', 'ph1234', 'coe');






CREATE TABLE degree(
    degid SERIAL PRIMARY KEY,
    ty VARCHAR(50)
);
CREATE TABLE department(
    deptid SERIAL PRIMARY KEY,
    ty VARCHAR(50),
    degid int,
    FOREIGN KEY (degid) REFERENCES degree(degid)
);


INSERT INTO degree (ty) VALUES ('CSE');
INSERT INTO degree (ty) VALUES ('IT');
INSERT INTO degree (ty) VALUES ('CT');



INSERT INTO department (ty,) VALUES ('CSE');
INSERT INTO department (ty) VALUES ('IT');
INSERT INTO department (ty) VALUES ('CT');


CREATE TABLE subjects(
    subid SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    degree VARCHAR(50),
    cs BOOLEAN,
    it BOOLEAN,
    ct BOOLEAN,
    sem VARCHAR(50)
);


INSERT INTO subjects (subject, degree, cs, it, ct, sem) VALUES ('DSA', 'BTech', TRUE, TRUE, FALSE, '3');

CREATE TABLE modules(
    moduleid SERIAL PRIMARY KEY,
    module VARCHAR(255),
    subid INTEGER,
    FOREIGN KEY (subid) REFERENCES subjects(subid)
);

INSERT INTO modules (module, subid) VALUES ('Arrays', 1);


CREATE TABLE questions(
    quid SERIAL PRIMARY KEY,
    question VARCHAR(255),
    marks VARCHAR(50),
    moduleid INTEGER,
    FOREIGN KEY (moduleid) REFERENCES modules(moduleid)
);


ALTER TABLE questions ADD subid INTEGER, FOREIGN KEY (subid) REFERENCES subjects(subid);


SELECT * FROM questions INNER JOIN modules ON questions.moduleid = modules.moduleid INNER JOIN subjects ON modules.subid = subjects.subid;
