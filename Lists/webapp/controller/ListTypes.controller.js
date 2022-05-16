   // @ts-ignore
sap.ui.define([
		"sap/ui/core/mvc/Controller",
        "sap/ui/model/Binding"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("logaligroup.Lists.controller.ListTypes", {
			onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
			},

            getGroupHeader: function(oGroup){

                // @ts-ignore
                var groupHeader = new sap.m.GroupHeaderListItem({
                    title : oGroup.key,
                    upperCase : true
                });

                return groupHeader;
            },
            onClickSelectedRow: function(){
                 var stList = this.getView().byId("List01");
                 // @ts-ignore
                 var selectedItems = stList.getSelectedItems();
                 // @ts-ignore
                 var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if(selectedItems.length === 0 ){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {

                    var text_message = i18nModel.getText("selecction");

                    for (var item in selectedItems ) {
                        var context  = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        text_message = text_message + "-" + oContext.Material; 
                        
                    }
                    sap.m.MessageToast.show(text_message);
                }
            },
            onClickDeleteRow: function(){

                var stList = this.getView().byId("List01");
                // @ts-ignore
                var selectedItems = stList.getSelectedItems();
                // @ts-ignore
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");

               if(selectedItems.length === 0 ){
                   sap.m.MessageToast.show(i18nModel.getText("noSelection"));
               } else {

                   var text_message = i18nModel.getText("selecction");
                   var arrayId = []; 
                   for (var item in selectedItems ) {
                       var context  = selectedItems[item].getBindingContext();
                       var oContext = context.getObject();
                       arrayId.push(oContext.Id);
                       text_message = text_message + "-" + oContext.Material; 
                       
                   }
                   // @ts-ignore
                   products = products.filter( function(p){
                        // @ts-ignore
                        return !arrayId.includes(p.Id);
                   });
                   // @ts-ignore
                   model.setProperty("/Products",products);
                   // @ts-ignore
                   stList.removeSelections();
                   sap.m.MessageToast.show(text_message);
               }

            },
            onDeleteRow: function(oEvent){

                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var split = context.getPath().split("/");
                var indexSelectedRow = split[split.length - 1 ];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                // @ts-ignore
                products.splice(indexSelectedRow,1);
                // @ts-ignore
                model.refresh();
            }
		});
	});
