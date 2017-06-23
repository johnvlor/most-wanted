"use strict";

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		var person = searchByName(people);
		mainMenu(person, people);
    break;
    case 'no':
		var person = searchByTrait(person, people);
		mainMenu(person, people);
    break;
    default:
    app(people); 
    break;
  }
}

function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people); 
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
		displayPerson(person);
    break;
    
    case "family":
    	var familyInfo = findFamily(people,person);
    	displayFamily(person,familyInfo);
	break;
    
    case "descendants":
		var descendants = [];
		var descendantInfo = findDescendants(person,people,descendants);
		displayDescendants(person,descendantInfo);
    break;
    
    case "restart":
    app(people); 
    break;
    
    case "quit":
    return; 
    default:
    return mainMenu(person, people);
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
	var spouse = findSpouse(people, person);
	var children = findChildren(people, person);
	var siblings = findSiblings(people, person);
	var parents = findParents(people,person);
	var entireFamily = spouse.concat(children,siblings,parents);

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
		return (el.parents.includes (person.parents[0]));
	});

	var siblings = siblings.filter(function (el){
		return (el.id !== person.id);
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
	alert("Let's search with the following options.");

	var findAge	= searchByAge(people);
	var findHeight = searchByHeight(person, findAge);
	var findWeight = searchByWeight(person, findHeight);
	var findOccupation = searchByOccupation(person, findWeight);
	var findEyeColor = searchByEyeColor(person, findOccupation);
	
	if (findEyeColor.length > 1) {
		alert("Here's a list of possible names.  Please try to search again.\n\n"+findEyeColor.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));
		return app(people);
	}
	else {
		return findEyeColor[0];
	}
}

function searchByAge(people) {
	var findAge = [];
	var getAge = promptFor("What is the person's age?\n\nIf you do not know it, please type 'skip' to proceed.", chars);
	
	if (getAge === 'skip') {
		findAge = people;
		
		return findAge;
	}
	
	getAge = parseInt(getAge);	
	if (getAge <= 0 || getAge >= 200) {
		alert("Not found in the system.  Please try again.");
		return searchByAge(people);
	}
	else if (isNaN(getAge)) {
		alert("Not found in the system.  Please try again.");
		return searchByAge(people);
	}
	else {
		findAge = calculateAge(people, getAge);
	}
	
	return findAge;
}

function calculateAge(people, getAge) {
	var findAge = [];
	
	for (var x = 0; x < people.length; x++) {
		var person = people[x];
		
		var todayDate = new Date();
		var todayYear = todayDate.getFullYear();
		var todayMonth = todayDate.getMonth()+1;
		var todayDay = todayDate.getDate();
		
		var dob = person.dob;
		var dob = new Date(dob);
		var dobYear = dob.getFullYear();
		var dobMonth = dob.getMonth()+1;
		var dobDay = dob.getDate();			
		var age = todayYear - dobYear;
		
		if (todayMonth <= dobMonth) {
			age = age -1;
		}
		else if (todayMonth === dobMonth) {
			if (todayDay < dobDay) {
				age = age -1;
			}
		}
		
		if (age === getAge) {
			findAge.push(people[x]);
		}
	}
	alert("Age: "+getAge+("\n")+findAge.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return findAge;
}

function searchByHeight(person, findAge) {
	var findHeight = [];
	var getHeight = promptFor("What is the person's height?  Please enter in inches.\n\nIf you do not know it, please type 'skip' to proceed.", chars);
	
	if (getHeight === 'skip') {
		findHeight = findAge;
		return findHeight;
	}
	
	getHeight = parseInt(getHeight);	
	if (getHeight <= 0 || getHeight >= 100) {
		alert("Not found in the system.  Please try again.");
		return searchByHeight(person, findAge);
	}
	else if (isNaN(getHeight)) {
		alert("Not found in the system.  Please try again.");
		return searchByHeight(person, findAge);
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
		return searchByWeight(person, findHeight);
	}
	else if (isNaN(getWeight)) {
		alert("Not found in the system.  Please try again.");
		return searchByWeight(person, findHeight);
	}
	else {
		findWeight = findHeight.filter(function(person) {
			return (person.weight === getWeight);});

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
	return descendants;
}