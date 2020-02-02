import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import { Places } from '../lib/places'

import React, {Component} from 'react';
import { render } from 'react-dom';

Template.body.helpers({
  places: 
  // [
  // 	{name: 'Istanbul', createdAt: new Date()},
  // 	{name: 'Dubrovnik', ,createdAt: new Date()},
  // ]

  function()
  {
  	console.dir(Places.find({}));
  	return Places.find({});
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

Meteor.startup(() => {
	render(<App />, document.getElementById('render-target'));
});

class App extends Component
{
	render()
	{
		return (
			<h1>hello</h1>
		);
	}
}