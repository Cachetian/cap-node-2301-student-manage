namespace student;

entity Students {
  key ID        : Integer;
      name      : String;
      number    : String;
      classroom : Association to one Classrooms;
      scores    : Association to many StudentClassScores
                    on scores.student = $self;
}

entity Classrooms {
  key ID       : Integer;
      name     : String;
      students : Association to many Students
                   on students.classroom = $self;
      classes  : Association to many Classes_Classrooms
                   on classes.classroom = $self;
}

entity Classes_Classrooms {
  key classroom : Association to Classrooms;
  key class     : Association to Classes;
}

entity Classes {
  key ID         : Integer;
      name       : String;
      teacher    : Association to one Teachers;
      classrooms : Association to many Classes_Classrooms
                     on classrooms.class = $self;
      scores     : Association to many StudentClassScores
                     on scores.class = $self
}

entity StudentClassScores {
  key ID      : Integer;
      student : Association to Students;
      class   : Association to Classes;
      topic   : String;
      score   : Decimal;
}

entity Teachers {
  key ID      : Integer;
      name    : String;
      classes : Association to many Classes
                  on classes.teacher = $self;
}
