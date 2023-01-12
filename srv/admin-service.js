const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const {
      Students,
      Classes,
      Classes_Classrooms,
      Classrooms,
      StudentClassScores,
      Teachers
    } = db.entities("student");

    this.on("createNew", "Students", async (req) => {
      await genid(req);
      await cds.tx(req).run(INSERT.into(Students).entries(req.data));
    });

    this.on("assignClassroom", "Students", async (req) => {
      let items = await db.run(req.query);
      let data = items[0];
      data.classroom_ID = req.data.classroomId;
      await cds.tx(req).run(UPDATE(Students, data.ID).with(data));
    });

    this.on("createNew", "Classes", async (req) => {
      let data = {
        name: req.data.name
      };
      await genid(req);
      await cds.tx(req).run(INSERT.into(Classes).entries(req.data));
    });

    this.on("assignTeacher", "Classes", async (req) => {
      let items = await db.run(req.query);
      let data = items[0];
      data.teacher_ID = req.data.teacherId;
      await cds.tx(req).run(UPDATE(Classes, data.ID).with(data));
    });

    this.on("assignClassroom", "Classes", async (req) => {
      let items = await db.run(req.query);
      let data = {
        class_ID: items[0].ID,
        classroom_ID: req.data.classroomId
      };
      await cds.tx(req).run(INSERT.into(Classes_Classrooms).entries(data));
    });

    this.on("createNew", "Classes_Classrooms", async (req) => {
      let data = {
        class_ID: req.data.classId,
        classroom_ID: req.data.classroomId
      };
      await cds.tx(req).run(INSERT.into(Classes_Classrooms).entries(data));
    });

    this.on("createNew", "Classrooms", async (req) => {
      let data = {
        name: req.data.name
      };
      await genid(req);
      await cds.tx(req).run(INSERT.into(Classrooms).entries(req.data));
    });

    this.on("addStudentAssignment", "Classrooms", async (req) => {
      let classrooms = await db.run(req.query);
      let classroom = classrooms[0];
      let classroomId = classroom.ID;
      let students = await SELECT.from(Students).where(
        `ID =`,
        req.data.studentId
      );
      let student = students[0];
      student.classroom_ID = classroomId;
      await cds.tx(req).run(UPDATE(Students, student.ID).with(student));
    });

    this.on("addClassAssignment", "Classrooms", async (req) => {
      let classrooms = await db.run(req.query);
      let data = {
        class_ID: req.data.classId,
        classroom_ID: classrooms[0].ID
      };
      await cds.tx(req).run(INSERT.into(Classes_Classrooms).entries(data));
    });

    this.on("createNew", "StudentClassScores", async (req) => {
      let data = {
        student_ID: req.data.studentId,
        class_ID: req.data.classId,
        score: req.data.score
      };
      await genid(req);
      await cds.tx(req).run(INSERT.into(StudentClassScores).entries(data));
    });

    this.on("createNew", "Teachers", async (req) => {
      let data = {
        name: req.data.name
      };
      await genid(req);
      await cds.tx(req).run(INSERT.into(Teachers).entries(req.data));
    });

    await super.init();
  }
}

/** Generate primary keys for target entity in request */
async function genid(req) {
  const { ID } = await cds
    .tx(req)
    .run(SELECT.one.from(req.target).columns("max(ID) as ID"));
  req.data.ID = ID + 1;
}

module.exports = { AdminService };
