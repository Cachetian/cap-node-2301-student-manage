using student as db from '../db/schema.cds';

service AdminService {
  entity Students           as projection on db.Students actions {
    action createNew(name : String, number : String);
    action assignClassroom(classroomId : Integer);
  };

  entity Classrooms         as projection on db.Classrooms actions {
    action createNew(name : String);
    action addStudentAssignment(studentId : Integer);
    action addClassAssignment(classId : Integer);
  };

  entity Classes_Classrooms as projection on db.Classes_Classrooms actions {
    action createNew(classId : Integer, classroomId : Integer);
  };

  entity Classes            as projection on db.Classes actions {
    action createNew(name : String);
    action assignTeacher(teacherId : Integer);
    action assignClassroom(classroomId : Integer);
  };

  entity StudentClassScores as projection on db.StudentClassScores actions {
    action createNew(studentId : Integer, classId : Integer, score : Decimal);
  };

  entity Teachers           as projection on db.Teachers actions {
    action createNew(name : String);
  };

}

annotate AdminService.Students actions {
  createNew        @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  );

  assignClassroom  @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (classroomId  @(
    UI.ParameterDefaultValue: _it.classroom_ID,
    Common.ValueListWithFixedValues,
    Common.ValueList        : {
      CollectionPath: 'Classrooms',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classroomId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  )
  )
}

annotate AdminService.Classrooms actions {
  createNew             @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  );

  addStudentAssignment  @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (studentId  @(
    Common.ValueListWithFixedValues: false,
    Common.ValueList               : {
      CollectionPath: 'Students',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'studentId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'classroom_ID'
        }
      ]
    }
  )  );

  addClassAssignment    @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (classId    @(
    Common.ValueListWithFixedValues,
    Common.ValueList: {
      CollectionPath: 'Classes',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  )  )
}

annotate AdminService.Classes_Classrooms actions {
  createNew   @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (classId  @(
    UI.ParameterDefaultValue: _it.class_ID,
    Common.ValueListWithFixedValues,
    Common.ValueList        : {
      CollectionPath: 'Classes',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  ),
  classroomId @(
    UI.ParameterDefaultValue: _it.classroom_ID,
    Common.ValueListWithFixedValues,
    Common.ValueList        : {
      CollectionPath: 'Classrooms',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classroomId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  )
  )
}

annotate AdminService.Classes actions {
  createNew        @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  );

  assignTeacher    @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (teacherId    @(
    UI.ParameterDefaultValue: _it.teacher_ID,
    Common.ValueListWithFixedValues,
    Common.ValueList        : {
      CollectionPath: 'Teachers',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'teacherId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  )  );

  assignClassroom  @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (classroomId  @(
    Common.ValueListWithFixedValues,
    Common.ValueList: {
      CollectionPath: 'Classrooms',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classroomId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  )  )
}

annotate AdminService.StudentClassScores actions {
  createNew  @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  )  (studentId  @(
    Common.ValueListWithFixedValues: false,
    Common.ValueList               : {
      CollectionPath: 'Students',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'studentId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  ),  classId  @(
    UI.ParameterDefaultValue: _it.class_ID,
    Common.ValueListWithFixedValues,
    Common.ValueList        : {
      CollectionPath: 'Classes',
      Parameters    : [
        {
          $Type            : 'Common.ValueListParameterOut',
          LocalDataProperty: 'classId',
          ValueListProperty: 'ID'
        },
        {
          $Type            : 'Common.ValueListParameterDisplayOnly',
          ValueListProperty: 'name'
        }
      ]
    }
  ),  score)
}

annotate AdminService.Teachers actions {
  createNew @(
    cds.odata.bindingparameter.name: '_it',
    cds.odata.bindingparameter.collection,
    Common.SideEffects             : {TargetEntities: [_it]}
  )
}
