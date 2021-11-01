export const researchPapers = `CREATE TABLE research_Papers (
  paper_id INT NOT NULL AUTO_INCREMENT,
  paper_title VARCHAR(100),
  conference INT,
  Publish_date DATE,
  author_no INT NOT NULL,
  PRIMARY KEY (paper_id),
  FOREIGN KEY(author_no) REFERENCES authors(author_no)
 );`;

export const mentors = `CREATE TABLE mentors(
  mentor INT NOT NULL AUTO_INCREMENT, 
  mentor_name VARCHAR(100),
  PRIMARY KEY(mentor)
);`;

export const conferences = `CREATE TABLE conferences (conference INT NOT NULL AUTO_INCREMENT, conference_room VARCHAR(50), PRIMARY KEY(conference));`;
