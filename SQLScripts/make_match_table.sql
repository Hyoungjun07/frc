USE testdb_hyoungjun

CREATE TABLE match_data(
    id                  INT NOT NULL AUTO_INCREMENT,
    match_event         VARCHAR(20) NOT NULL,
    scouter_initials    VARCHAR(4) NOT NULL,
    match_number        SMALLINT NOT NULL,
    climb_successful    TINYINT NOT NULL,
 
    PRIMARY KEY (id)

);