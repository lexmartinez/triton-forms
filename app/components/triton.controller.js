(function () {
  'use strict';

  angular.module('triton-forms')
  .controller('tritonController', ['formsService', '$scope', TritonController]);

  function TritonController(formsService,$scope) {
    var self = this;
    self.forms = [];
    self.form = undefined;
    self.tab = "data";

    self.data = [];
    self.object = undefined;
    self.isNew = true;

    self.getForms = function(){
      formsService.getForms(function (err, data) {
        if (err){
          new Notification("triton-forms", {title:"triton-forms", body: "loading forms error"});
          console.log(err);
        }else{
          self.forms = data;
          $scope.$apply();
        }
      });
    };

    self.getItem = function(item){
      self.form = item;
      self.object = undefined;
      self.isAbout = false;
      formsService.getData(self.form.target, self.form.model, function (err, data) {
        if (err){
          new Notification("triton-forms", {title:"triton-forms", body: "loading data error"});
          console.log(err);
        }else{
          self.data = data;
          $scope.$apply();
        }
      });
    };

    self.getObject = function(object){
      self.object = object;
      self.tab = 'form';
      self.isNew = false;
    };

    self.new = function(){
      self.getObject({});
      self.isNew = true;
    }

    self.delete = function(){
      if(!self.isNew){
        formsService.removeData(self.object, self.form.target, self.form.model, function (err, data) {
          if (err){
            new Notification("triton-forms", {title:"triton-forms", body: "deleting data error"});
            console.log(err);
          }else{
            new Notification("triton-forms", {title:"triton-forms", body: "succesfully deleted"});
            self.getItem(self.form);
            self.tab = 'data';
          }
        });
      }
    };

    self.filter = function(){
      if(self.isNew){
        formsService.findData(self.object, self.form.target, self.form.model, function (err, data) {
          if (err){
            new Notification("triton-forms", {title:"triton-forms", body: "filtering data error"});
            console.log(err);
          }else{
            self.data = data;
            self.tab = "data";
            $scope.$apply();
          }
        });
      }
    };

    self.about = function(){
      self.isAbout = !self.isAbout;
      if(self.isAbout){
        self.form = undefined;
      }
    };

    self.save = function(){
      if(!self.isNew){
        formsService.updateData(self.object, self.form.target, self.form.model, function (err, data) {
          if (err){
            new Notification("triton-forms", {title:"triton-forms", body: "updating data error"});
            console.log(err);
          }else{
            new Notification("triton-forms", {title:"triton-forms", body: "succesfully updated"});
            self.getItem(self.form);
            self.tab = 'data';
          }
        });
      }else{
        formsService.saveData(self.object, self.form.target, self.form.model, function (err, data) {
          if (err){
            new Notification("triton-forms", {title:"triton-forms", body: "saving data error"});
            console.log(err);
          }else{
            new Notification("triton-forms", {title:"triton-forms", body: "succesfully stored"});
            self.getItem(self.form);
            self.tab = 'data';
          }
        });
      }
    };

    self.getForms();
  }

})();
