sap.ui.define(["sap/fe/core/AppComponent"], function (AppComponent) {
  "use strict";
  return AppComponent.extend("teachersmgr.Component", {
    metadata: {
      manifest: {
        "_version": "1.8.0",
        "sap.app": {
          "id": "teachersmgr",
          "type": "application",
          "title": "Manage Teachers",
          "description": "Manage teachers application",
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
                "name": "TeachersListRoute",
                "target": "TeachersListTarget",
                "pattern": ":?query:"
              },
              {
                "name": "TeachersDetailsRoute",
                "target": "TeachersDetailsTarget",
                "pattern": "Teachers({key}):?query:"
              },
              {
                "name": "classesRoute",
                "target": "classesTarget",
                "pattern": "Teachers({key})/classes({key2}):?query:"
              }
            ],
            "targets": {
              "TeachersListTarget": {
                "type": "Component",
                "id": "TeachersListTarget",
                "name": "sap.fe.templates.ListReport",
                "options": {
                  "settings": {
                    "entitySet": "Teachers",
                    "initialLoad": true,
                    "navigation": {
                      "Teachers": {
                        "detail": {
                          "route": "TeachersDetailsRoute"
                        }
                      }
                    }
                  }
                }
              },
              "TeachersDetailsTarget": {
                "type": "Component",
                "id": "TeachersDetailsTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "Teachers",
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