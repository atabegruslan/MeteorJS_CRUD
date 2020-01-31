import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

Places = new Mongo.Collection('destinations');

Template.body.helpers({
  places: 
  // [
  // 	{name: 'Istanbul', createdAt: new Date()},
  // 	{name: 'Dubrovnik', ,createdAt: new Date()},
  // ]

  // meteor mongo
  // db.createCollection('destinations')
  // db.destinations.insert({name:'Istanbul',createdAt: new Date()});
  // db.destinations.insert({name:'Dubrovnik',createdAt: new Date()});
  function()
  {
  	return Places.find();
  },

  dump(jsonObject) 
  {
    return JSON.stringify(jsonObject);
  }  
});

Template.body.events({
	'submit .new-place': function(event)
	{
		var name = event.target.name.value;

		console.dir(name);

		Places.insert({
			name: name,
			createdAt: new Date()
		});

		event.target.name.value = '';

		return false;
	}
});

Template.place.events({
	'click .toggle-checked': function()
	{
		Places.update(this._id, {$set: {checked: !this.checked}});
	},
	'click .delete': function()
	{
		Places.remove(this._id);
	}
});