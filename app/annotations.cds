using {AdminService} from '../srv/admin-service';

annotate AdminService.Students with @(UI: {
  Identification     : [{
    $Type : 'UI.DataFieldForAction',
    Action: 'AdminService.assignClassroom',
    Label : 'Assign classroom',
  }],
  HeaderInfo         : {
    TypeName      : 'Student',
    TypeNamePlural: 'Students',
    Title         : {
      $Type: 'UI.DataField',
      Value: ID,
    },
    Description   : {
      $Type: 'UI.DataField',
      Value: name,
    },
  },
  Facets             : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'General',
      Target: '@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Classroom',
      Target: 'classroom/@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Classes',
      Target: 'classroom/classes/@UI.LineItem#ClassesByStudent'
    }
  ],
  FieldGroup #General: {Data: [
    {Value: ID},
    {Value: name},
    {Value: number}
  ]},
  LineItem           : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type: 'UI.DataField',
      Value: number,
    },
    {
      $Type: 'UI.DataField',
      Value: classroom.name,
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew',
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Assign Classroom',
      Inline: true,
      Action: 'AdminService.assignClassroom',
    }
  ],
  LineItem #ByClass  : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: number,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    }
  ]
}) {
  ID     @Common.Label: 'Student ID';
  name   @Common.Label: 'Student name';
  number @Common.Label: 'Number';
}

annotate AdminService.Classrooms with @(UI: {
  Identification     : [
    {
      $Type : 'UI.DataFieldForAction', //Action in the RootEntities of the object page next to the edit button
      Label : 'Add student',
      Action: 'AdminService.addStudentAssignment',
    },
    {
      $Type : 'UI.DataFieldForAction', //Action in the RootEntities of the object page next to the edit button
      Label : 'Register class',
      Action: 'AdminService.addClassAssignment',
    }
  ],
  HeaderInfo         : {
    TypeName      : 'Classroom',
    TypeNamePlural: 'Classrooms',
    Title         : {Value: ID}
  },
  Facets             : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'General',
      Target: '@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Students',
      Target: 'students/@UI.LineItem#ByClass'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Classes',
      Target: 'classes/@UI.LineItem#ClassesByClassroom'
    }
  ],
  FieldGroup #General: {Data: [
    {Value: ID},
    {Value: name},
  ]},
  LineItem           : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew',
    }
  ]
}) {
  ID       @Common.Label: 'Classroom ID';
  name     @Common.Label: 'Classroom name';
  students @Common.Label: 'Students';
};

annotate AdminService.Classes_Classrooms with @(UI: {
  HeaderInfo                  : {
    TypeName      : 'Class assignment',
    TypeNamePlural: 'Class assignments'
  },
  Facets                      : [{
    $Type : 'UI.ReferenceFacet',
    Label : 'General',
    Target: '@UI.FieldGroup#General'
  }],
  FieldGroup #General         : {Data: [
    {Value: class_ID},
    {Value: class.name},
    {Value: classroom_ID},
    {Value: classroom.name}
  ]},
  LineItem                    : [
    {
      $Type: 'UI.DataField',
      Value: class.name
    },
    {
      $Type: 'UI.DataField',
      Value: classroom.name
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew'
    }
  ],
  LineItem #ClassesByStudent  : [
    {
      $Type: 'UI.DataField',
      Value: class.ID,
    },
    {
      $Type: 'UI.DataField',
      Value: class.name,
    }
  ],
  LineItem #ClassesByClassroom: [
    {
      $Type: 'UI.DataField',
      Value: class.ID
    },
    {
      $Type: 'UI.DataField',
      Value: class.name
    }
  ],
  LineItem #ClassroomsByClass : [
    {
      $Type: 'UI.DataField',
      Value: classroom.ID
    },
    {
      $Type: 'UI.DataField',
      Value: classroom.name
    },
    {
      $Type: 'UI.DataField',
      Value: classroom.name
    }
  ]
}) {
  class     @Common.Label: 'Class';
  classroom @Common.Label: 'Classroom';
};

annotate AdminService.Classes with @(UI: {
  Identification     : [
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Assign teacher',
      Action: 'AdminService.assignTeacher',
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Assign classroom',
      Action: 'AdminService.assignClassroom',
    }
  ],
  Facets             : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'General',
      Target: '@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Teacher information',
      Target: 'teacher/@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Classrooms',
      Target: 'classrooms/@UI.LineItem#ClassroomsByClass'
    }
  ],
  FieldGroup #General: {Data: [
    {Value: ID},
    {Value: name},
  ]},
  LineItem           : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type: 'UI.DataField',
      Value: teacher.name,
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew',
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Assign teacher',
      Inline: true,
      Action: 'AdminService.assignTeacher',
    }
  ],
  LineItem #ByTeacher: [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type: 'UI.DataField',
      Value: classrooms.classroom.name,
    }
  ]

}) {
  ID   @Common.Label: 'Class ID';
  name @Common.Label: 'Class name';
};

annotate AdminService.StudentClassScores with @(UI: {
  Facets             : [{
    $Type : 'UI.ReferenceFacet',
    Label : 'General',
    Target: '@UI.FieldGroup#General'
  }],
  FieldGroup #General: {Data: [
    {Value: ID},
    {Value: student_ID},
    {Value: student.name},
    {Value: class_ID},
    {Value: class.name},
    {Value: score},
  ]},
  LineItem           : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: topic,
    },
    {
      $Type: 'UI.DataField',
      Value: student.name,
    },
    {
      $Type: 'UI.DataField',
      Value: class.name,
    },
    {
      $Type: 'UI.DataField',
      Value: score,
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew',
    }
  ],
  LineItem #ByStudent: [
    {
      $Type: 'UI.DataField',
      Value: class.name,
    },
    {
      $Type: 'UI.DataField',
      Value: score,
    }
  ],
  LineItem #ByClass  : [
    {
      $Type: 'UI.DataField',
      Value: student.number,
    },
    {
      $Type: 'UI.DataField',
      Value: student.name,
    },
    {
      $Type: 'UI.DataField',
      Value: score,
    }
  ]
}) {
  ID      @Common.Label: 'ID';
  student @Common.Label: 'Student';
  class   @Common.Label: 'Class';
  topic   @Common.Label: 'Topic';
  score   @Common.Label: 'Score';
};

annotate AdminService.Teachers with @(UI: {
  Facets             : [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'General',
      Target: '@UI.FieldGroup#General'
    },
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Classes',
      Target: 'classes/@UI.LineItem#ByTeacher'
    }
  ],
  FieldGroup #General: {Data: [
    {Value: ID},
    {Value: name},
  ]},
  LineItem           : [
    {
      $Type: 'UI.DataField',
      Value: ID,
    },
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type : 'UI.DataFieldForAction',
      Label : 'Create',
      Action: 'AdminService.createNew',
    }
  ]
}) {
  ID   @Common.Label: 'Teacher ID';
  name @Common.Label: 'Teacher name';
};
