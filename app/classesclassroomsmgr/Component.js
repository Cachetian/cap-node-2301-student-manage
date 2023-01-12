sap.ui.define(["sap/fe/core/AppComponent"], function (AppComponent) {
  "use strict";
  return AppComponent.extend("classes_classroomsmgr.Component", {
    metadata: {
      manifest: {
        "_version": "1.8.0",
        "sap.app": {
          "id": "classes_classroomsmgr",
          "type": "application",
          "title": "Manage Classes_Classrooms",
          "description": "Manage classes_classrooms application",
          "dataSources": {
            "mainService": {
              "uri": "/admin/",
              "type": "OData",
              "settings": {
                "odataVersion": "4.0"
              }
            }
          }
        },
        "sap.ui5": {
          "flexEnabled": true,
          "dependencies": {
            "minUI5Version": "1.96.0",
            "libs": {
              "sap.ui.core": {},
              "sap.fe.templates": {}
            }
          },
          "models": {
            "": {
              "dataSource": "mainService",
              "settings": {
                "synchronizationMode": "None",
                "operationMode": "Server",
                "autoExpandSelect": true,
                "earlyRequests": true,
                "groupProperties": {
                  "default": {
                    "submit": "Auto"
                  }
                }
              }
            }
          },
          "routing": {
            "routes": [
              {
                "name": "Classes_ClassroomsListRoute",
                "target": "Classes_ClassroomsListTarget",
                "pattern": ":?query:"
              },
              {
                "name": "Classes_ClassroomsDetailsRoute",
                "target": "Classes_ClassroomsDetailsTarget",
                "pattern": "Classes_Classrooms({key}):?query:"
              },
              {
                "name": "classesRoute",
                "target": "classesTarget",
                "pattern": "Classes_Classrooms({key})/classes({key2}):?query:"
              }
            ],
            "targets": {
              "Classes_ClassroomsListTarget": {
                "type": "Component",
                "id": "Classes_ClassroomsListTarget",
                "name": "sap.fe.templates.ListReport",
                "options": {
                  "settings": {
                    "entitySet": "Classes_Classrooms",
                    "initialLoad": true,
                    "navigation": {
                      "Classes_Classrooms": {
                        "detail": {
                          "route": "Classes_ClassroomsDetailsRoute"
                        }
                      }
                    }
                  }
                }
              },
              "Classes_ClassroomsDetailsTarget": {
                "type": "Component",
                "id": "Classes_ClassroomsDetailsTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "Classes_Classrooms",
                    "navigation": {
                      "classes": {
                        "detail": {
                          "route": "classesRoute"
                        }
                      }
                    }
                  }
                }
              },
              "classesTarget": {
                "type": "Component",
                "id": "classesTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "Classes"
                  }
                }
              }
            }
          }
        },
        "contentDensities": {
          "compact": true,
          "cozy": true
        },
        "sap.ui": {
          "technology": "UI5",
          "fullWidth": true,
          "deviceTypes": {
            "desktop": true,
            "tablet": true,
            "phone": true
          }
        },
        "sap.fiori": {
          "registrationIds": [],
          "archeType": "transactional"
        }
      }
    }
  });
});