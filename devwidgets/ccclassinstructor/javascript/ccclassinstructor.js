/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */


// load the master sakai object to access all Sakai OAE API methods
require(["jquery", "sakai/sakai.api.core", "underscore"], function($, sakai, _) {

    /**
     * @name sakai.ccclassinstructor
     *
     * @class ccclassinstructor
     *
     * @description
     * Show set of instructors for a given course offering.
     *
     * @version 0.0.1
     * @param {String} tuid Unique id of the widget
     * @param {Boolean} showSettings Show the settings of the widget or not
     */
    sakai_global.ccclassinstructor = function (tuid, showSettings) {

        /////////////////////////////
        // Configuration variables //
        /////////////////////////////
        var $rootel = $("#" + tuid);  // unique container for each widget instance
        var $mainContainer = $("#cc-classpage-instructorinfo", $rootel);
        var $instrDisplayContainer = $("#cc-classpage-instructorinfo", $rootel);        
        
        ///////////////////////
        // Utility functions //
        ///////////////////////

        /*
        Used for email link obfuscation
        */
        var rotate13 = function(str) {
            return str.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
            });
        };

        /////////////////////////
        // Main View functions //
        /////////////////////////
        
        var renderInstructorSection = function( data ) {
            var instructorHTML = sakai.api.Util.TemplateRenderer( $instrDisplayContainer, {
                instructors: data.instructors,
                numinstrs: _.size(data.instructors)
            });
            $instrDisplayContainer.html( sakai.api.i18n.General.process( instructorHTML ) );
        };

        var showMainView = function() {
            $mainContainer.show();
        };

        ////////////////////
        // Event Handlers //
        ////////////////////
        
        var addBinding = function(){
            
            // De-obfuscates email contact links
            $("a.rotmail").on('click', function(e) {
                var rotmail = $(this).attr('data-rotmail');
                var mailstring = "mailto:" + rotate13(rotmail);
                $(this).attr('href', mailstring);          
            });

        }

        var getInstructors = function(callback){
            var url = "/devwidgets/ccclassinfo/courseinfo.json";
            $.ajax({
                url: url,
                cache: false,
                success: function(data){
                    if (data) {
                        // Render JSON data to HTML
                        renderInstructorSection(data);
                        addBinding();
                    }
                    if ($.isFunction(callback)) {
                        callback();
                    }
                },
                error: function(xhr, textStatus, thrownError){
                    console.log("Error loading data");
                }
            });
        };


        /////////////////////////////
        // Initialization function //
        /////////////////////////////

        /*
         * On load, extract nodes from JSON tree and display
         */
         
        var doInit = function () {
            getInstructors();
            showMainView();
        };

        doInit();
    };

    // inform Sakai OAE that this widget has loaded and is ready to run
    sakai.api.Widgets.widgetLoader.informOnLoad("ccclassinstructor");
});
