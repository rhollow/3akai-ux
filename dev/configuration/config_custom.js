define(["/dev/configuration/config.js", "/dev/configuration/env.js"], function(config) {

    // Insert custom configuration here

    // myberkeley custom begin

    // This is our custom CAS log in information.
    config.Authentication.internal = config.isDev;
    config.Authentication.external = [
        {
          label: "Login using your CalNet ID",
          login_btn: "LOGIN_BTN",
          url: "/system/sling/cas/login?resource=/dev/me.html",
          description: "CAS_NOTE"
        }
    ];
    config.Authentication.allowInternalAccountCreation = false;
    config.Authentication.hideLoginOn = [
        "/dev/create_new_account.html"
    ];
    config.allowPasswordChange = false;

    // Page titles for myB-unique pages
    config.PageTitles.pages["/dev/inboxnotifier.html"] = "NOTIFICATIONS";
    config.PageTitles.pages["/dev/listpage.html"] = "DYNAMIC_LISTS";

    // set our own default widget arrangement
    config.defaultprivstructure.id546341435.dashboard.columns.column1[1] = {
      "uid": "id7813904133752",
      "visible": "block",
      "name": "mytasks"
    };

    config.defaultprivstructure.id546341435.dashboard.columns.column2[1] = {
        "uid": "id12893445620912",
        "visible": "block",
        "name": "myevents"
    };

    config.defaultprivstructure.id546341435.dashboard.columns.column3[1] = {
        "uid": "id63754673110789",
        "visible": "block",
        "name": "mylinks"
    };

    // Overriding Sakai profile
    // Basic Information --------------
    config.Profile.configuration.defaultConfig.basic.elements = {
        "firstName": {
            "label": "__MSG__PROFILE_BASIC_FIRSTNAME_LABEL__",
            "required": true,
            "display": true,
            "editable": false,
            "limitDisplayLength": 50
        },
        "lastName": {
            "label": "__MSG__PROFILE_BASIC_LASTNAME_LABEL__",
            "required": true,
            "display": true,
            "editable": false,
            "limitDisplayLength": 50
        },
        "picture": {
            "label": "__MSG__PROFILE_BASIC_PICTURE_LABEL__",
            "required": false,
            "display": false
        },
        "preferredName": {
            "label": "__MSG__PROFILE_BASIC_PREFERREDNAME_LABEL__",
            "required": false,
            "display": true
        },
        "email": {
            "label": "__MSG__PROFILE_BASIC_EMAIL_LABEL__",
            "required": false,
            "display": true,
            "editable": false,
            "type": "email"
        },
        "status": {
            "label": "__MSG__PROFILE_BASIC_STATUS_LABEL__",
            "required": false,
            "display": false
        },
        "role": {
            "label": "__MSG__PROFILE_BASIC_ROLE_LABEL__",
            "required": false,
            "display": true,
            "editable": false
        },
        "department": {
            "label": "__MSG__PROFILE_BASIC_DEPARTMENT_LABEL__",
            "required": false,
            "display": true
        },
        "college": {
            "label": "__MSG__PROFILE_BASIC_COLLEGE_LABEL__",
            "required": false,
            "display": true,
            "editable": false
        },
        "major": {
            "label": "__MSG__PROFILE_MAJORORPROGRAM_LABEL__",
            "required": false,
            "display": true,
            "editable": false
        }
    };
	
	 /*
     * Institution contact details are displayed in the footer
     */
	config.Institution = {
        helpLinkText: "Contact Us",
        helpLinkUrl: "https://confluence.media.berkeley.edu/confluence/display/MYB/Portal+Help",
        helpPhone: ""
    };

    /*
     * These links are displayed in the 403 and 404 error pages.
     */
    config.ErrorPage = {
        Links: {
            whatToDo: [
                {
                    "title": "EXPLORE_MYBERKELEY",
                    "url": "/dev/explore.html"
                },
                {
                    "title": "BROWSE_MYBERKELEY_CATEGORIES",
                    "url": "/dev/allcategories.html"
                },
                {
                    "title": "GO_TO_BERKELEY_EDU",
                    "url": "http://berkeley.edu/"
                },
                {
                    "title": "VISIT_THE_SUPPORT_FORUM",
                    "url": "http://sakaiproject.org/"
                }
            ],
            getInTouch: [
                {
                    "title": "SEND_US_YOUR_FEEDBACK",
                    "url": "mailto:portal@berkeley.edu"
                },
                {
                    "title": "CONTACT_SUPPORT",
                    "url": "mailto:portal@berkeley.edu"
                }
            ]
        }
    };

    // so that user gets redirected to CAS logout
    config.followLogoutRedirects = true;

    // remove the SIGN UP feature for anonymous users
    delete(config.Navigation[4]);

    config.Navigation[0].label = "ME";

    // Add My Notification and My Dynamic Lists to Navigation
    config.Navigation[0].subnav.splice(2,0,
        {
            "url": "/dev/me.html#l=notifications/drafts",
            "id": "subnavigation_notifications_link",
            "label": "MY_NOTIFICATIONS",
            "requiresAdviserMembership": true
        }
    );
    config.Navigation[0].subnav.splice(3,0,
        {
            "url": "/dev/me.html#l=dynlists",
            "id": "subnavigation_dynlists_link",
            "label": "MY_DYNAMIC_LISTS",
            "requiresAdviserMembership": true
        }
    );

	config.Directory = {
		ced: {
			title: "Environmental Design",
			children: {
				architecture: {
					title: "Architecture"
				},
				cityregionalplanning: {
					title: "City &amp; Regional Planning"
				},
				landscapearchitecture: {
					title: "Landscape Architecture & Environmental Planning"
				},
				urbandesign: {
					title: "Urban Design"
				}
			}
		},
		cnr: {
			title: "Natural Resources",
			children: {
				agriculturaleconomics: {
					title: "Agricultural and Resource Economics"
				},
				environmentalscience: {
					title: "Environmental Science, Policy, &amp; Management"
				},
				nutritionalscience: {
					title: "Nutritional Science &amp; Toxicology"
				},
				plantmicrobialbiology: {
					title: "Plant &amp; Microbial Biology"
				}
			}
		},
		studentservices: {
			title: "Student Groups",
			children: {
				stg_academic: {
					title: "Academic"
				},
				stg_arts: {
					title: "Arts"
				},
				stg_cultural: {
					title: "Cultural"
				},
				stg_political: {
					title: "Political"
				},
				stg_professional: {
					title: "Professional"
				},
				stg_sport: {
					title: "Sport"
				},
				stg_religious: {
					title: "Religious"
				},
				stg_service: {
					title: "Service"
				},
				stg_other: {
					title: "Other"
				}
			}
		},
		studentgroups: {
			title: "Student Services",
			children: {
				ss_academic: {
					title: "Academic"
				},
				sd_career: {
					title: "Career"
				},
				ss_financial: {
					title: "Financial"
				},
				ss_campuslife: {
					title: "Campus Life"
				}
			}
		}
	};
		
    return config;

});
