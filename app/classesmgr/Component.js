sap.ui.define(["sap/fe/core/AppComponent"], function (AppComponent) {
  "use strict";
  return AppComponent.extend("classesmgr.Component", {
    metadata: {
      manifest: {
        "_version": "1.8.0",
        "sap.app": {
          "id": "classesmgr",
          "type": "application",
          "title": "Manage Classes",
          "description": "Manage classes application",
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
                "name": "ClassesListRoute",
                "target": "ClassesListTarget",
                "pattern": ":?query:"
              },
              {
                "name": "ClassesDetailsRoute",
                "target": "ClassesDetailsTarget",
                "pattern": "Classes({key}):?query:"
              },
              {
                "name": "classesRoute",
                "target": "classesTarget",
                "pattern": "Classes({key})/classes({key2}):?query:"
              }
            ],
            "targets": {
              "ClassesListTarget": {
                "type": "Component",
                "id": "ClassesListTarget",
                "name": "sap.fe.templates.ListReport",
                "options": {
                  "settings": {
                    "entitySet": "Classes",
                    "initialLoad": true,
                    "navigation": {
                      "Classes": {
                        "detail": {
                          "route": "ClassesDetailsRoute"
                        }
                      }
                    }
                  }
                }
              },
              "ClassesDetailsTarget": {
                "type": "Component",
                "id": "ClassesDetailsTarget",
                "name": "sap.fe.templates.ObjectPage",
                "options": {
                  "settings": {
                    "entitySet": "Classes",
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