
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "/sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,MessageToast) {
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
// Método onInit
        function showPostalCode(oEvent){

            var itemPressed   = oEvent.getSource();
            var oContext      = itemPressed.getBindingContext();
            var objectContext = oContext.getObject();
            
            MessageToast.show(objectContext.PostalCode);

        }
        function onFilter(){

            var oJSON = this.getView().getModel().getData();
            console.log(oJSON);

            var filters = [];

            if(oJSON.EmployeeId !== ""){
                filters.push( new Filter("EmployeeID",FilterOperator.EQ,oJSON.EmployeeId ));
            }
            if(oJSON.CountryKey !== ""){
                filters.push( new Filter("Country",FilterOperator.EQ,oJSON.CountryKey ));
            }

            var oList = this.getView().byId("_IDGenTable1");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters)

        }
        function onClearFilter(){
            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId","");
            oModel.setProperty("/CountryKey","");
        }
        function onInit(){

            var objJsonModel = new sap.ui.model.json.JSONModel;
            var oview        = this.getView();
            var i18nBundle   = oview.getModel("i18n").getResourceBundle(); 
/*
            var oJson = {

                    employeeId: "123456",
                    countryKey: "UK",
                    listCountry: [
                        {
                            key: "US",
                            text: i18nBundle.getText("countryUS")
                        },
                        {
                            key: "UK",
                            text: i18nBundle.getText("countryUK")
                        },
                        {
                            key: "ES",
                            text: i18nBundle.getText("countryES")
                        },
                        {
                            key: "PO",
                            text: "Portugal"
                        }
                    ]
            };
*/
            // @ts-ignore
            objJsonModel.loadData("./localService/mockdata/Employees.json",false);
            // objJsonModel.attachRequestCompleted( function(oEventModel){
            //     console.log(JSON.stringify(objJsonModel.getData()));
            // });
            
            oview.setModel(objJsonModel);

        }

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

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        
        return Main;

    });
