sap.ui.define(["sap/fe/core/AppComponent"], function (AppComponent) {
  "use strict";
  return AppComponent.extend("studentclassscoresmgr.Component", {
    metadata: {
      manifest: {
        "_version": "1.8.0",
        "sap.app": {
          "id": "studentclassscoresmgr",
          "type": "application",
          "title": "Manage StudentClassScores",
          "description": "Manage studentclassscores application",
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
                "name": "StudentClassScoresListRoute",
                "target": "StudentClassScoresListTarget",
                "pattern": ":?query:"
              },
              {
                "name": "StudentClassScoresDetailsRoute",
                "target": "StudentClassScoresDetailsTarget",
                "pattern": "StudentClassScores({key}):?query:"
              },
              {
                "name": "classesRoute",
                "target": "classesTarget",
                "pattern": "StudentClassScores({key})/classes({key2}):?query:"
              }
            ],
            "targets": {
              "StudentClassScoresListTarget": {
                "type": "Component",
                "id": "StudentClassScoresListTarget",
                "name": "sap.fe.templates.ListReport",
                "options": {
                  "settings": {
                    "entitySet": "StudentClassScores",
                    "initialLoad": true,
                    "navigation": {
                      "StudentClassScores": {
                        "detail": {
                          "route": "StudentClassScoresDetailsRoute"
                        }
                      }
                    }
                  }
                }
              },
              "StudentClassScoresDetailsTarget": {
                "type": "Component",
                "id": "StudentClassScoresDetailsTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "StudentClassScores",
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