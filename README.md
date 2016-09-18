# triton-forms
Dynamic Forms Engine, built on Electron

#####Project Keywords: `Electron` `AngularJS` `MongoDB` `Photon` `mongoose`

## Project Setup

`triton-forms` built on [Electron](https://github.com/electron/electron) is a typical `nodeJS` application we assumed that you're familiarized with this technologies, otherwise there are useful link [nodeJS](https://nodejs.org/en/)

> For OSX Users, we suggest install nodeJS through Homebrew

With an nodeJS + Electron Environment installed, use this commands to run `triton-forms`

  ```bash
    git clone https://github.com/lexmartinez/triton-forms.git
    cd triton-forms
    npm start
  ```
And voil&#224; `triton-forms` now should be running as desktop app

![](https://raw.githubusercontent.com/lexmartinez/triton-forms/master/assets/img/capture1.png)

## Form Engine
The `triton-forms` concept, is simple, a basic JSON document stored in MongoDB collection named `forms`, contains all configurations for the form and data that you want to save.

Here is an example of form configuration:

```JSON
{
  "name" : "Contacts",
  "target" : "contacts",
  "config" : [
      {"type" : "text","label" : "Name","model" : "name"},
      {"type" : "text","label" : "Organization","model" : "organization"},
      {"type" : "text","label" : "Phone","model" : "phone"},
      {"type" : "textarea","label" : "Notes","model" : "notes"},
      {"type" : "select","label" : "Group","model" : "group",
          "options" : ["Family",   "Work", "Friends"]
      },
      {"type" : "checkbox","label" : "Favorite","model" : "favorite"}
    ],
  "model" : "{ \"name\": \"String\", \"organization\" : \"String\", \"phone\" : \"String\", \"group\" : \"String\", \"favorite\" : \"Boolean\"}"
}
```

Where..

* `name` is the name and title for your form.
* `target` is collections name when data will be stored.
* `model` is mongoose schema definitions for the object.
* `config` is an array of every input on form (all possible input types can be found there).

## Useful links
+ Mongoose - Object modeling API : [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)
+ Photon Kit - UI Components For Electron : [http://photonkit.com/](http://photonkit.com/)
