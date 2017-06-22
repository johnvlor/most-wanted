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
    findFamily();
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
 	// if(/[0-9]/.test(firstName)){
     	// alert("The first name must be alphanumerical");
// }	else if(/[0-9]/.test(lastName)){
    	// alert("The last name must be alphanumerical");
// }

  // TODO: find the person using the name they entered
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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function findFamily(person, people) {
    var family = [];
    var newPerson;
    
    for (var x = 0; x < people.length; x++) {
        newPerson = people[x];
        console.log(newPerson.parents);
        console.log("length = ", newPerson.parents.length);
        
    while (i < newPerson.parents.length) {
        console.log(i,"new person parents ",newPerson.parents[i], person.id);
    if (newPerson.parents[i] == person.id) {
                descendants.push(newPerson.firstName+" "+newPerson.lastName);
        }
            i++;
        }
        	i = 0;
    
}}

function displayDescendants(person,descendants){
	if (descendants == 0) {
		alert(person.firstName+ " " + person.lastName+" has no descendants.");
	}
	else {
		alert(person.firstName+ " " + person.lastName+"'s descendants are: \n\n"+descendants.join("\n"));
	}
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function searchByTrait (people) {
	var gender = searchByGender(people);
	var dob = searchByDob(people);
	console.log("dob ",dob);
	
	var newArray = people.filter(function(person) {
		return (person.dob === dob);});

	console.log("new array ",newArray[0]);
	newArray = newArray[0];
	return newArray;
}

function searchByGender(people) {
	var gender = promptFor("What is the person's gender?",chars);
	var person;
	
	var newArray = people.filter(function(person) {
		return (person.gender === gender);});
	console.log(newArray);
	alert("Gender: "+gender+("\n")+newArray.map(function(person) {return person.firstName + " " + person.lastName}).join("\n"));

	return newArray;
}

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
		//console.log(newPerson);
		//console.log(newPerson.firstName);

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

