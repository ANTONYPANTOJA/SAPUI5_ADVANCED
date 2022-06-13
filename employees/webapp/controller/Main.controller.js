// @ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller'
    /**
     *  @param {typeof sap.ui.core.mvc.Controller} Controller
     */
], function (Controller) {

    return Controller.extend("logaligroup.sapui5.controller.app", {

        onInit: function () {

            var oview        = this.getView();
            //         var i18nBundle   = oview.getModel("i18n").getResourceBundle(); 
           
                       // @ts-ignore
                       var objJsonModelEmpl = new sap.ui.model.json.JSONModel;
                       objJsonModelEmpl.loadData("./localService/mockdata/Employees.json",false);
                       oview.setModel(objJsonModelEmpl,"jsonEmployees");
           
                       var objJsonModelCoun = new sap.ui.model.json.JSONModel;
                       objJsonModelCoun.loadData("./localService/mockdata/Countries.json",false);
                       oview.setModel(objJsonModelCoun,"jsonCountries");

                       var objJsonModelLayout = new sap.ui.model.json.JSONModel;
                       objJsonModelLayout.loadData("./localService/mockdata/Layout.json",false);
                       oview.setModel(objJsonModelLayout,"jsonLayout");
                       
                       var ojsonModelConfig = new sap.ui.model.json.JSONModel({
                               visibleId: true,
                               visibleName: true,
                               visibleCountry: true,
                               visibleCity: false,
                               visibleBtnShowCity: true,
                               visibleBtnHideCity: false,
                       });
           
                       oview.setModel(ojsonModelConfig,"jsonModelConfig");

                       //Add
                       this._bus = sap.ui.getCore().getEventBus();
                       this._bus.subscribe("flexible","showEmployee",this.showEmployeeDetails,this);

        },
        showEmployeeDetails: function(category,nameEvent,path){

            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey","TwoColumnsMidExpanded");

            var incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel,"incidenceModel");
            detailView.byId("tableIncidence").removeAllContent();
            
        }

    });
});