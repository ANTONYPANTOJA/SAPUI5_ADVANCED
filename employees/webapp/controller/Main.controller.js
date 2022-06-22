// @ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller'
    /**
     *  @param {typeof sap.ui.core.mvc.Controller} Controller
     */
], function (Controller) {

    return Controller.extend("logaligroup.sapui5.controller.app", {

        onbeforeRendering: function(){

           // this._detailEmployeeView = this.getView().byId("detailEmployeeView");
        },

        onInit: function () {
            this._detailEmployeeView = this.getView().byId("detailEmployeeView");
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
                       this._bus.subscribe("incidence","onSaveIncidence",this.onSaveOdataIncidence,this);

        },
        showEmployeeDetails: function(category,nameEvent,path){

            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("odataNorthwind>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey","TwoColumnsMidExpanded");

            var incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel,"incidenceModel");
            detailView.byId("tableIncidence").removeAllContent();
            
        },

        onSaveOdataIncidence: function(channelID,eventID,data){

            var oresourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var employeeID = this._detailEmployeeView.getBindingContext("odataNorthwind").getObject().EmployeeID;
            var incidenceModel = this._detailEmployeeView.getModel("incidenceModel").getData();

            if (typeof incidenceModel[data.incidenceRow].IncidenceID == 'undefined' ) {
                
          
            var body = {
                SapId: this.getOwnerComponent().SapId,
                EmployeeId: employeeID.toString(),
                CreationDate:incidenceModel[data.incidenceRow].CreationDate,
                Type:incidenceModel[data.incidenceRow].Type,
                Reason: incidenceModel[data.incidenceRow].Reason
            };

            this.getView().getModel("incidenceModel").create( "/IncidentsSet",body,{

                success: function(){
                        sap.m.MessageToast.show(oresourceBundle.getText("odataSaveOK"));
                }.bind(this),
                error: function(e){
                    sap.m.MessageToast.show(oresourceBundle.getText("odataSaveKO"));
                }.bind(this)
            });

        }else{
            sap.m.MessageToast.show(oresourceBundle.getText("odataNoChanges"));  
        }
        
        }

    });
});