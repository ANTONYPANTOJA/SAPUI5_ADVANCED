
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
/*
        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit: function () {

            },

            onValidate: function(){

                var objectEmployee = this.byId("Input_01");
                var valueEmployee = objectEmployee.getValue();
                if( valueEmployee.length === 6 ){
                    objectEmployee.setDescription("OK");
                    this.byId("slCountry").setVisible(true);
                    this.byId("labelCountry").setVisible(true);
                }else{
                    objectEmployee.setDescription("Not OK");
                    this.byId("slCountry").setVisible(false);
                    this.byId("labelCountry").setVisible(false);
                }
            }
        });
*/
//Otra forma de devolver el CONTROLLER.extend ( Esto corrige los errores de Typescript)
    
        var Main = Controller.extend("logaligroup.employees.controller.MainView",{});
        Main.prototype.onValidate = function(){

            var objectEmployee = this.byId("Input_01");
            var valueEmployee = objectEmployee.getValue();
            if( valueEmployee.length === 6 ){
                objectEmployee.setDescription("OK");
                this.byId("slCountry").setVisible(true);
                this.byId("labelCountry").setVisible(true);
            }else{
                objectEmployee.setDescription("Not OK");
                this.byId("slCountry").setVisible(false);
                this.byId("labelCountry").setVisible(false);
            }
        };
        return Main;

    });
