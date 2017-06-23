"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		var person = searchByName(people);
		console.log(person);
		mainMenu(person, people);
    break;
    case 'no':
    // TODO: search by traits
		var person = [];
		person = searchByTrait(person, people);
		mainMenu(person, people);
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
		displayPerson(person,people);
    break;
    
    case "family":
    	var familyInfo = findFamily(people,person);
    	displayFamily(person,familyInfo);

    // TODO: get person's family
    break;
    case "descendants":
		var descendants = [];
		var descendantInfo = findDescendants(person,people,descendants);
		displayDescendants(person,descendantInfo);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
 	if(/[0-9]/.test(firstName)){
     	alert("The first name must be alphanumerical");
}	else if(/[0-9]/.test(lastName)){
    	alert("The last name must be alphanumerical");
}
	var person = [];
	for (var x = 0; x < people.length; x++) {
		person = people[x];
			if ((person.firstName.toLowerCase() === firstName.toLowerCase()) && (person.lastName.toLowerCase() === lastName.toLowerCase())) {
            return person;
        }
    }
  return;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function findFamily(people, person){
		var wholeFamily = [];
		var spouse = findSpouse(people, person);
		var children = findChildren(people, person);
		var siblings = findSiblings(people, person);
		var parents = findParents(people,person);
		var newArray = spouse.concat(children);
		var newArray1 = siblings.concat(parents);
		var entireFamily = newArray.concat(newArray1);
////fix .concat to one concat function and fix names/////
		console.log(entireFamily);
	return entireFamily;

}


function findSpouse(people, person){
	var spouse = people.filter(function (el){
		return (el.currentSpouse === person.id);
	});
return (spouse);
}


function findChildren(people, person){
	var children = people.filter(function (el){
		return (el.parents.includes (person.id));
	});
return (children);
}


function findSiblings(people, person){
	var siblings = people.filter(function (el){
		// for(i=0; i < people.length; i++)
			// fix original person.id coming back with siblings
			// if (people === person.id)
		return (el.parents.includes (person.parents[0]));
	});
return (siblings);
}



function findParents(people, person){
	var parents = people.filter(function (el)
	{
		 return (el.id === (person.parents[0]))+(el.id === (person.parents[1]));
	});
return (parents);
}


function displayDescendants(person,descendants){
	if (descendants == 0) {
		alert(person.firstName+ " " + person.lastName+" has no descendants.");
	}
	else {
		alert(person.firstName+ " " + person.lastName+"'s descendants are: \n\n"+descendants.join("\n"));
	}
}

function displayFamily(person,familyInfo){
  alert(person.firstName+ " " + person.lastName+"'s immediate family is:\n\n"+familyInfo.map(function(el) {return el.firstName+ " " + el.lastName}).join("\n"));
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}


function searchByTrait (person, people) {
	alert("Let's start to search by the below options.");

	var findAge	= searchByAge(person, people);
	var findHeight = searchByHeight(person, findAge);
	var findWeight = searchByWeight(person, findHeight);
	var findOccupation = searchByOccupation(person, findWeight);
	var findEyeColor = searchByEyeColor(person, findOccupation);

	console.log(findEyeColor.length);
	console.log(findEyeColor);
	
	// if (findEyeColor.length === 0) {
		// return findEyeColor[0];
	// }
	// else if (findEyeColor > 0) {
		// var result = prompt("Here's a list of possible names.\n"+findEyeColor.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));
	// }
	return findEyeColor[0];
}

function searchByAge(person, people) {
	var findAge = [];
	var getAge = promptFor("What is the person's age?  If you do not know it, please type 'skip' to proceed.", chars);
	
	if (getAge === 'skip') {
		findAge = people;
		return findAge;
	}
	else {
		var todayDate = new Date();
		var todayYear = todayDate.getFullYear();
		var todayMonth = todayDate.getMonth()
		var todayDay = todayDate.getDate();
		console.log(todayDate,todayYear, todayMonth, todayDay);
		

		
		console.log(findAge);
	return findAge;
	}

	else{
    var now = new Date();
    var age = now.getFullYear() - date.getFullYear();
    return age;}
};

}

function searchByHeight(person, findAge) {
	var findHeight = [];
	var getHeight = promptFor("What is the person's height?  Please enter in inches.\n\nIf you do not know it, please type 'skip' to proceed.", chars);
		console.log("height ",getHeight);
	
	if (getHeight === 'skip') {
		findHeight = findAge;
		return findHeight;
	}
	
	getHeight = parseInt(getHeight);
	
	if (getHeight <= 0 || getHeight >= 100) {
		alert("Not found in the system.  Please try again.");
		return searchByHeight();
	}
	else if (isNaN(getHeight)) {
		alert("Not found in the system.  Please try again.");
		return searchByHeight();
	}
	else if (getHeight > 0 && getHeight < 100 ) {
		findHeight = findAge.filter(function(person) {
			return (person.height === getHeight);});
		console.log(findHeight);
		alert("Height: "+getHeight+("\n")+findHeight.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));
		return findHeight;
	}
}

function searchByWeight(person, findHeight) {
	var findWeight = [];
	var getWeight = promptFor("What is the person's weight?\n\nIf you do not know it, please type 'skip' to proceed.", chars);
		
	if (getWeight == 'skip') {
		findWeight = findHeight;
		return findWeight;
	}
	
	getWeight = parseInt(getWeight);
	if (getWeight <= 0 || getWeight >= 1000) {
		alert("Not found in the system.  Please try again.");
		return searchByWeight();
	}
	else if (isNaN(getWeight)) {
		alert("Not found in the system.  Please try again.");
		return searchByWeight();
	}
	else {
		findWeight = findHeight.filter(function(person) {
			return (person.weight === getWeight);});
		console.log(findWeight);
		alert("Weight: "+getWeight+("\n")+findWeight.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

		return findWeight;
	}
}

function searchByOccupation(person, findWeight) {
	var findOccupation = [];
	var getOccupation = promptFor("What is the person's occupation?\n\nIf you do not know it, please type 'skip' to proceed.", chars);
	
	if (getOccupation == 'skip') {
		findOccupation = findWeight;
		return findOccupation;
	}
	else {
		findOccupation = findWeight.filter(function(person) {
			return (person.occupation === getOccupation);});
		console.log(findOccupation);
		alert("Occupation: "+getOccupation+("\n")+findOccupation.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return findOccupation;
	}
}

function searchByEyeColor(person, findOccupation) {
	var findEyeColor = [];
	var getEyeColor = promptFor("What is the person's eye color?\n\nIf you do not know it, please type 'skip' to proceed.", chars);
	
	if (getEyeColor == 'skip') {
		findEyeColor = findOccupation;
		return findEyeColor;
	}
	else {
		findEyeColor = findOccupation.filter(function(person) {
			return (person.eyeColor === getEyeColor);});
		console.log(findEyeColor);
		alert("Eye Color: "+getEyeColor+("\n")+findEyeColor.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return findEyeColor;
	}
}

function findDescendants(person, people, descendants, x=0) {
	var newPerson;
	
	if (x < people.length){
		newPerson = people[x];

		if (newPerson.parents.length != 0) {
			
			for (var i = 0; i < newPerson.parents.length; i++) {
				
				if (newPerson.parents[i] == person.id) {
					descendants.push(newPerson.firstName+" "+newPerson.lastName);
					console.log("descendants = ",descendants);

					for (var y = 0; y < descendants.length; y++) {
						
						for (var z = 0; z < people.length; z++) {
							var newDescendants = people[z];
								
							if (newDescendants.parents[i] == newPerson.id) {
								descendants.push(newDescendants.firstName+" "+newDescendants.lastName);
								newPerson = people[z];
							}
						}
					}
				}	
			}
		}
		return findDescendants(person, people, descendants, x+1);
	}
	else {
		console.log("descendants = ",descendants);
	}
	return descendants;
}