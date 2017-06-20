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
		var searchTraitType = prompt("Which option would you like to search by? \nGender\nDate of Birth\nHeight\nWeight\nOccupation\n\nType the option you want or 'restart' or 'quit'").toLowerCase();
		// var info = searchByTrait();
		switch(searchTraitType){
			case 'gender':
				var person = searchByGender(people);
				mainMenu(person, people);
			break;
			case 'date of birth':
			
			break;
			case 'height':
			
			break;
			case 'weight':
			
			break;
			case 'occupation':
			
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
    //////////////////////
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
		displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
  var person;
  // TODO: find the person using the name they entered
 
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

function searchByTrait () {
	
}

function searchByGender (people) {
	var gender = promptFor("What is the person's gender?", chars);
	var person;
	
	for (var x = 0; x < people.length; x++) {
		person = people[x];
			if ((person.gender.toLowerCase() === gender.toLowerCase()) && (person.gender.toLowerCase() === gender.toLowerCase())) {
            return person;
        }
    }
	return;
}

function searchByDob() {
	var dob = promptFor("What is the person's date of birth?", chars);
}

function searchByHeight() {
	var height = promptFor("What is the person's height?", chars);
}

function searchByWeight() {
	var weight = promptFor("What is the person's weight?", chars);
}

function searchByEyeColor() {
	var eyeColor = promptFor("What is the person's eye color?", chars);
}

function searcyByOccupation() {
	var occupation = promptFor("What is the person's occupation?", chars);
}