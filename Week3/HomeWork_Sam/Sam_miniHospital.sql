CREATE DATABASE miniHospital;

USE minihospital;

CREATE TABLE Departments (
    DepartmentName VARCHAR(25) NOT NULL,
    PRIMARY KEY (DepartmentName)
);

CREATE TABLE StaffRoles (
    RoleTitle VARCHAR(35) NOT NULL,
    PRIMARY KEY (RoleTitle)
);

CREATE TABLE StaffSpecialties (
    SpecialtyTitle VARCHAR(35) NOT NULL,
    PRIMARY KEY (SpecialtyTitle)
);

CREATE TABLE Diagnosis (
    DiagnosisID INT NOT NULL,
    DiagnosisName VARCHAR(50) NOT NULL,
    PRIMARY KEY (DiagnosisID)
);

 CREATE TABLE Patients (
    PatientID INT NOT NULL,
    FirstName VARCHAR(25) NOT NULL,
    LastName VARCHAR(25) NOT NULL,
    BirthDate DATE NOT NULL,
    DepartmentName VARCHAR(25) NOT NULL,
    DiagnosisID INT NOT NULL,
    AdmissionDate DATE NOT NULL,
    DischargeDate DATE,
    TreatingPhysician VARCHAR(35),
    PRIMARY KEY (PatientID),
    FOREIGN KEY (DepartmentName) REFERENCES departments(DepartmentName),
    FOREIGN KEY (DiagnosisID) REFERENCES diagnosis(DiagnosisID)
);

CREATE TABLE Staff (
    StaffID INT NOT NULL UNIQUE,
    FirstName VARCHAR(25) NOT NULL,
    LastName VARCHAR(25) NOT NULL,
    RoleTitle VARCHAR(35) NOT NULL,
    SpecialtyTitle VARCHAR(35) NOT NULL,
    EmploymentDate DATE NOT NULL,
    PRIMARY KEY (StaffID),
    FOREIGN KEY (RoleTitle) REFERENCES staffroles(RoleTitle),
    FOREIGN KEY (SpecialtyTitle) REFERENCES staffspecialties(SpecialtyTitle)
);


CREATE TABLE departmentstaff (
    DepartmentName VARCHAR(25) NOT NULL,
    StaffID INT NOT NULL,
    FOREIGN KEY (DepartmentName) REFERENCES departments(DepartmentName),
    FOREIGN KEY (StaffID) REFERENCES staff(StaffID)
);

CREATE TABLE DepartmentPatients (
    DepartmentName VARCHAR(25) NOT NULL,
    PatientID INT NOT NULL,
    FOREIGN KEY (DepartmentName) REFERENCES departments(DepartmentName),
    FOREIGN KEY (PatientID) REFERENCES patients(PatientID)
);

CREATE TABLE PatientDiagnosis (
    PatientID INT NOT NULL,
    DiagnosisID INT NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES patients(PatientID),
    FOREIGN KEY (DiagnosisID) REFERENCES diagnosis(DiagnosisID)
);

INSERT INTO departments (DepartmentName) VALUES
    ('Oncology'), ('Laboratory'), ('Pharmacy'), ('Radiology');


 INSERT INTO staffspecialties
    (SpecialtyTitle) VALUES
    ('Oncologist'), ('Radiologist'), ('Pharmacist'), ('LabTechnician');

INSERT INTO staffroles
    (RoleTitle) VALUES
    ('Physician'), ('Nurse'), ('Radiologist'), ('LabTechnician');


INSERT INTO diagnosis
    (DiagnosisID, DiagnosisName)
    VALUES
    (001, 'Breast Cancer'), (002, 'Lung Cancer'), (003, 'Brain Cancer'), (004, 'Ovarian Cancer');


INSERT INTO staff
    (StaffID, FirstName, LastName, RoleTitle, SpecialtyTitle, EmploymentDate)
    VALUES
    (1234, 'Meera', 'McDonald', 'Physician', 'Oncologist', '2003-10-10');

INSERT INTO staff
    (StaffID, FirstName, LastName, RoleTitle, SpecialtyTitle, EmploymentDate)
    VALUES
    (1235, 'Rita', 'Qwaifa', 'Physician', 'Oncologist', '2003-10-13');


INSERT INTO patients
    (PatientID, FirstName, LastName, BirthDate, DepartmentName, DiagnosisID, AdmissionDate, DischargeDate)
    VALUES
    (66735, 'Mardhan', 'Sakhen', '1978-02-14', 'Oncology', 2, '2017-03-04', '2018-01-05');







