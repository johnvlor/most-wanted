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
		// var person = searchByTrait(people);
		// console.log(person);
		// console.log(person.firstName);		
		// mainMenu(person, people);
		
		var searchTraitType = promptFor("Which option would you like to search by? \nGender\nDate of Birth\nHeight\nWeight\nEye Color\nOccupation\n\nType the option you want or 'restart' or 'quit'", chars).toLowerCase();

		switch(searchTraitType){
			case 'gender':
				var person = searchByGender(people);
				console.log(person);
			break;
			case 'dob':
			case 'date of birth':
				var person = searchByDob(people);
				console.log(person);
			break;
			case 'height':
				var person = searchByHeight(people);
				console.log(person);
			break;
			case 'weight':
				var person = searchByWeight(people);
				console.log(person);
			break;
			case 'eye color':
				var person = searchByEyeColor(people);
				console.log(person);
			break;
			case 'occupation':
				var person = searchByOccupation(people);
				console.log(person);
			break;
			case "restart":
				app(people); // restart
			break;
			case "quit":
			return; // stop execution
			default:
			return mainMenu(person, people); // ask again
		}

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

// function searchByGender(people) {
// 	var gender = promptFor("What is the person's gender?",chars);
// 	var person;
// 	var newArray = people.filter(function(person) {
// 		return (person.gender === gender);});
// 	console.log(newArray);
// 	alert("Gender: "+gender+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

// 	return newArray;
// }

function searchByDob(people) {
	var dob = prompt("What is the person's date of birth?\n\nThe date format should be : mm/dd/yyyy");
	
	var newArray = people.filter(function(person) {
		return (person.dob === dob);});
	console.log("first ",newArray);
	alert("Date of Birth: "+dob+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	var newDob = newArray.map(function(person) {return person.dob});
	
	return newDob.join();
}

function searchByHeight(people) {
	var height = promptFor("What is the person's height?", chars);
		height = parseInt(height);
	var newArray = people.filter(function(person) {
		return (person.height === height);});
	console.log(newArray);
	alert("Height: "+height+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return newArray;
}

function searchByWeight(people) {
	var weight = promptFor("What is the person's weight?", chars);
		weight = parseInt(weight);
	var newArray = people.filter(function(person) {
	return (person.weight === weight);});
	console.log(newArray);
	alert("Weight: "+weight+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return newArray;
}

function searchByEyeColor(people) {
	var eyeColor = promptFor("What is the person's eye color?", chars);
	
	var newArray = people.filter(function(person) {
	return (person.eyeColor === eyeColor);});
	console.log(newArray);
	alert("Eye Color: "+eyeColor+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return newArray;
}

function searchByOccupation(people) {
	var occupation = promptFor("What is the person's occupation?", chars);
	
	var newArray = people.filter(function(person) {
	return (person.occupation === occupation);});
	console.log(newArray);
	alert("Occupation: "+occupation+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return newArray;
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

