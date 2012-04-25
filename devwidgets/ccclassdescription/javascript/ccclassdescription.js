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
require(["jquery", "sakai/sakai.api.core"], function($, sakai) {

    /**
     * @name sakai.ccclassdescription
     *
     * @class ccclassdescription
     *
     * @description
     * Show text-only description for a course offering.
     *
     * @version 0.0.1
     * @param {String} tuid Unique id of the widget
     * @param {Boolean} showSettings Show the settings of the widget or not
     */
    sakai_global.ccclassdescription = function (tuid, showSettings) {

        /////////////////////////////
        // Configuration variables //
        /////////////////////////////
        var $rootel = $("#" + tuid);  // unique container for each widget instance
        var $mainContainer = $("#cc-classpage-description", $rootel);
        var $descriptionDisplayContainer = $("#cc-classpage-description", $rootel);
        

        /////////////////////////
        // Main View functions //
        /////////////////////////

        var renderDescription = function( data ) {
            var descriptionHTML = sakai.api.Util.TemplateRenderer( $descriptionDisplayContainer, {
                description: data.description
            });
            $descriptionDisplayContainer.html( sakai.api.i18n.General.process( descriptionHTML ) );
        };

        var showMainView = function() {
            $mainContainer.show();
        };

        ////////////////////
        // Event Handlers //
        ////////////////////
        
        var getDescription = function(callback){
            var url = "/devwidgets/ccclassinfo/courseinfo.json";
            $.ajax({
                url: url,
                cache: false,
                success: function(data){
                    if (data) {
                        // Render the data
                        renderDescription(data);
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

        /**
         * On page load, extract relevant node from JSON tree and display on screen
         */
         
        var doInit = function () {
            getDescription();
            showMainView();
        };

        // run the initialization function when the widget object loads
        doInit();
    };

    // inform Sakai OAE that this widget has loaded and is ready to run
    sakai.api.Widgets.widgetLoader.informOnLoad("ccclassdescription");
});
