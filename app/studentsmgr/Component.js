sap.ui.define(["sap/fe/core/AppComponent"], function (AppComponent) {
  "use strict";
  return AppComponent.extend("studentsmgr.Component", {
    metadata: {
      manifest: {
        "_version": "1.8.0",
        "sap.app": {
          "id": "studentsmgr",
          "type": "application",
          "title": "Manage Students",
          "description": "Manage students application",
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
                "name": "StudentsListRoute",
                "target": "StudentsListTarget",
                "pattern": ":?query:"
              },
              {
                "name": "StudentsDetailsRoute",
                "target": "StudentsDetailsTarget",
                "pattern": "Students({key}):?query:"
              },
              {
                "name": "classesRoute",
                "target": "classesTarget",
                "pattern": "Students({key})/classes({key2}):?query:"
              }
            ],
            "targets": {
              "StudentsListTarget": {
                "type": "Component",
                "id": "StudentsListTarget",
                "name": "sap.fe.templates.ListReport",
                "options": {
                  "settings": {
                    "entitySet": "Students",
                    "initialLoad": true,
                    "navigation": {
                      "Students": {
                        "detail": {
                          "route": "StudentsDetailsRoute"
                        }
                      }
                    }
                  }
                }
              },
              "StudentsDetailsTarget": {
                "type": "Component",
                "id": "StudentsDetailsTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "Students",
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