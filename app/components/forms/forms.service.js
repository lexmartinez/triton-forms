

(function () {
   'use strict';

   var mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost/triton-forms');

   var inputSchema = new mongoose.Schema({ type: String, label: String, model: String, options:[String] });
   var FormSchema = new mongoose.Schema({
      name: String,
      target: String,
      config:[inputSchema],
      model: String
    });

   var schemas = {};

   var formDAO = mongoose.model('form', FormSchema);

   angular.module('triton-forms').service('formsService', [FormsService]);

   function FormsService() {
       return {
          getForms: getForms,
          getData: getData,
          removeData: removeData,
          saveData: saveData,
          findData: findData,
          updateData: updateData
       };

       function getForms(callback){
          return formDAO.find(callback);
       }

       function getData(collection, model, callback){
         var generalDAO = mongoose.model(collection,  getSchema(collection,model));
         return generalDAO.find(callback);
       }

       function findData(filter, collection, model, callback){
         var generalDAO = mongoose.model(collection,  getSchema(collection,model));
         return generalDAO.find(filter,callback);
       }

       function removeData(object, collection, model, callback){
         var generalDAO = mongoose.model(collection, getSchema(collection,model));
         return generalDAO.remove(object, callback);
       }

       function saveData(object, collection, model, callback){
         var generalDAO = mongoose.model(collection, getSchema(collection,model));
         var instance = new generalDAO(object);
         return instance.save(object, callback);
       }

       function updateData(object, collection, model, callback){
         var generalDAO = mongoose.model(collection, getSchema(collection,model));
         var instance = new generalDAO(object);
         return instance.update(object, callback);
       }

       function getSchema(collection,model){
          var schema = schemas[collection];
          if(schema){
            return schema;
          }else{
            schema = new mongoose.Schema(JSON.parse(model));
            schemas[collection] = schema;
          }
          return schemas[collection];
       }
   }
})();
