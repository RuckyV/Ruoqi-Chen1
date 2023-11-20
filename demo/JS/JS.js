let allButtons = document.getElementsByClassName("demo-button");
let allDemoAreas = document.getElementsByClassName("demo-box");
let demoAreaColor = ["#FFECEC", "#FFF7FB", "D7FFEE", "C1FFE4","#CAFFFF"];
function showDemo(index) {
	
	for (let i=0; i < allButtons.length; i++) {
		allButtons[i].style.backgroundColor="#FF0080";
		allDemoAreas[i].style.display = "none";
	}
	
	
	allButtons[index].style.background = "#FF79BC";
	allDemoAreas[index].style.display = "block";
	allDemoAreas[index].style.backgroundColor = demoAreaColor[index];
}

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;        
				
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


var db;

const existingInvoices = [
   {id: 1, customer_type: "business", fullname: "David Skelton", phone_number: "06 974 8000", email: "dskelton@eit.ac.nz", courtesy_phone: "none", charger: "none", total_cost: 0.0, GST: 0.0 },
   
   {id: 2, customer_type: "customer", fullname: "Ian Purdon", phone_number: "06 974 8000", email: "ipurdon@eit.ac.nz", courtesy_phone: "iPhone7", charger: "yes", total_cost: 305.00, GST: 45.75 }
];	

var request = window.indexedDB.open("PhoneFixBookingSystem", 1);


request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: " + db);
};		 



request.onupgradeneeded = function(event) {
   
   var db = event.target.result;
   
   var objectStore;
   if (!db.objectStoreNames.contains('invoice')) {
	  
	  objectStore = db.createObjectStore('invoice', {keyPath: "id"});
   }    

   for (var i in existingInvoices) {
	  
	  objectStore.add(existingInvoices[i]);
   }							
}


function addInvoice() {								
   
   let customer_type = document.invoiceForm.customer_type.value;
   let fullname = document.invoiceForm.fullname.value;
   let phone_number = document.invoiceForm.phone_number.value;
   let email = document.invoiceForm.email.value;
   let courtesy_phone = document.invoiceForm.courtesy_phone.value;
   let charger = document.invoiceForm.charger.value;
   let total_cost = document.invoiceForm.total_cost.value;
   let GST = document.invoiceForm.GST.value;
   
   if (customer_type == "" || customer_type == null || fullname =="" || fullname == null ||
	   phone_number == "" || phone_number == null || email == "" || email == null ||
	   courtesy_phone == "" || courtesy_phone == null || charger == "" || charger == null ||
	   total_cost == "" || total_cost == null || GST == "" || GST == null ) {
	   alert("Please fill out all fields!");
	   return;
   }
   
   
   let invoiceID = 0;
   
   
	   
   var tx = db.transaction("invoice", "readwrite");
   //
   tx.objectStore("invoice").openCursor().onsuccess = function(event) {
	  var cursor = event.target.result;
	 
	  if (cursor) {
		   
		   let id = cursor.key;
		   if (id >= invoiceID) {
			   invoiceID = id;
		   }
		  
		   cursor.continue();											  
	  } else {
		
	  }				   
   };
   
   tx.oncomplete = function() {
	   
	   db.transaction("invoice").objectStore("invoice").get(0).onsuccess = function(event) {
		  
		   invoiceID++;
		   alert("invoiceID =" + invoiceID);
		   
		  
		   var request = db.transaction(["invoice"], "readwrite")
				   .objectStore("invoice")
				   .add({ id: invoiceID, customer_type: customer_type, 
						  fullname: fullname, phone_number: phone_number, 
						  email: email,   courtesy_phone:  courtesy_phone, 
						  charger: charger, total_cost: total_cost, GST: GST});
				   
		   
		   request.onsuccess = function(event) {
			  alert("SUCCESSFUL! New invoice = " + invoiceID +  " has been added to your database.");
		   };
		   
		   request.onerror = function(event) {
			  alert("ERROR! Unable to add a new invoice to your database! invoiceID =" + invoiceID);
		   }										
	   }				
   }
}

function displayInvoices() {
   
   var objectStore = db.transaction("invoice").objectStore("invoice");

  
   var invoice_table = document.getElementById("invoice_table");
   var row, cell; 
   var id, customer_type, fullname, phone_number, email, courtesy_phone, charger, total_cost, GST;	
   var allInfo = "";				
				
   objectStore.openCursor().onsuccess = function(event) {
	  var cursor = event.target.result;
	  
	  if (cursor) {
		   
		   id = cursor.key;
		   customer_type = cursor.value.customer_type;
		   fullname = cursor.value.fullname;
		   phone_number = cursor.value.phone_number;
		   email = cursor.value.email;
		   courtesy_phone = cursor.value.courtesy_phone;
		   charger = cursor.value.charger;
		   total_cost = cursor.value.total_cost;
		   GST = cursor.value.GST;
		   //
		   allInfo += "ID: " + id + ". customer_type: " + customer_type + ". Fullname: " 
					  + fullname + ". phone_number: " + phone_number + ". Email: " + email 
					  + ". courtesy_phone: " + courtesy_phone + ". Charger: " + charger 
					  + ". total_cost: " + total_cost + ". GST: " + GST + "<br>";
					   
		   
		   cursor.continue();						
		 
	  } else {
		
	  }
	  
	  //
	  document.getElementById("allInvoices").innerHTML = allInfo;
   };
}

let getStoredColor= localStorage.getItem("bgColor");

if(getStoredColor !=null){
  document.body.style.background= getStoredColor;
}

function changeColor(){
  
let selectColor=document.getElementById("colorPick").value;
document.body.style.background=selectColor;
localStorage.setItem("bgColor",selectColor);
  
};

function addNumbers(a,b){
	  return a+b;
	}
	x= addNumbers(44,55);
	setTimeout(function(){
	  alert('Please wait......');
	
	},1000);
	setTimeout(function(){
	  alert('The value is ' + x);
	
	},1000);