let price = 0;
var form_data = {};
var item_list = [];

var bond = 0;
var ServiceFee = 0;
var total = 0;
var gst = 0;
var Totalgst = 0;

function num_computed() {
  var CustomerType = $("input[name='people']:checked").val();
  var warranty = $("#warranty").is(":checked");
  bond = 0;
  ServiceFee = 0;
  total = 0;
  gst = 0;
  Totalgst = 0;

  if (CustomerType == "Business") {
    bond += 0;
  } else {
    for (var i = 0; i < item_list.length; i++) {
      bond += item_list[i].price;
    }
  }
  if (warranty) {
    ServiceFee += 0;
  } else {
    ServiceFee += 85;
  }

  total = bond + ServiceFee;
  gst = total * 0.15;
  Totalgst = total + gst;

  $("#serviceFee").val("$" + ServiceFee);
  $("#subTotal").val("$" + total);
  $("#gst").val("$" + gst);
  $("#bondAmount").val("$" + bond);
  $("#grandTotal").val("$" + Totalgst);
}

$("#warranty").click(function () {
  num_computed();
});

$(".people_radio").click(function () {
  num_computed();
});

$("document").ready(function () {
  $("#addItemBtn").click(function () {
    var id = Math.floor(Math.random() * 1000000);

    switch ($("#itemType").val()) {
      case "Dell XP":
        price = 500;
        var obj = {
          id: id,
          name: "Dell XP",
          price: 500,
        };
        item_list.push(obj);
        break;
      case "HP Pavilion":
        price = 575;
        var obj = {
          id: id,
          name: "HP Pavilion",
          price: 575,
        };
        item_list.push(obj);
        break;
      case "Other laptops":
        price = 400;
        var obj = {
          id: id,
          name: "Other laptops",
          price: 400,
        };
        item_list.push(obj);
        break;
      case "Charger ":
        price = 30;
        var obj = {
          id: id,
          name: "Charger",
          price: 30,
        };
        item_list.push(obj);
        break;
    }

    $("#itemTable").append(
      "<tr " +
        "data-id=" +
        id +
        ">" +
        "<td>" +
        $("#itemType").val() +
        "</td>" +
        "<td>" +
        "$" +
        price +
        "</td>" +
        "<td><button> Remove </button> </td>" +
        "</tr>"
    );
    num_computed();
  });

  $("#itemTable").on("click", "td button", function () {
    var tr = this.parentNode.parentNode;
    var del_id = tr.getAttribute("data-id");
    for (var i = 0; i < item_list.length; i++) {
      if (item_list[i].id == del_id) {
        item_list.splice(i, 1);
      }
    }
    num_computed();
    $(this).closest("tr").remove();
  });

  $("#hideTableBtn").click(function () {
    $("#itemTable").toggle(1000, "linear", function chaneButtonText() {
      $("#hideTableBtn").val(
        $("#hideTableBtn").val() === "Hide Table" ? "Show Table" : "Hide Table"
      );
    });
  });
});

var submit = document.querySelector("#submit");

$("#Submit").click(function () {
  const flag = checkForm();

  form_data = {
    CustomerType: $("input[name='people']:checked").val(),

    Title: $("#Title").val(),

    Firstname: $("#fName").val(),

    Lastname: $("#LName").val(),

    Street: $("#Street").val(),

    Suburb: $("#Suburb").val(),

    City: $("#City").val(),

    PostCode: $("#PostCode").val(),

    PhoneNumber: $("#PhoneNumber").val(),

    Email: $("#Email").val(),

    purchseDate: $("#purchseDate").val(),

    repairDate: $("#repairDate").val(),

    warranty: $("#warranty").is(":checked"),

    SerialNumber: $("#SerialNumber").val(),

    make: $("#Make").val(),

    ModelNumber: $("#ModelNumber").val(),

    FaultCategory: $("#FaultCategory").val(),

    Description: $("#Description").val(),

    itemType: $("#itemType").val(),

    bondAmount: $("#bondAmount").val(),

    serviceFee: $("#serviceFee").val(),

    subTotal: $("#subTotal").val(),

    gst: $("#gst").val(),

    grandTotal: $("#grandTotal").val(),

    item_list: item_list,
  };

  sessionStorage.setItem("form_data", JSON.stringify(form_data));

  if (flag) {
    window.open("./repair job sheet.html");
  }
});

function checkForm() {
  const fNameValue = document.getElementById("fName").value;
  const LNameValue = document.getElementById("LName").value;
  const emailValue = document.getElementById("Email").value;
  const phoneNumberValue = document.getElementById("PhoneNumber").value;
  const streetValue = document.getElementById("Street").value;
  const cityValue = document.getElementById("City").value;
  const serialNumberValue = document.getElementById("SerialNumber").value;
  const purchseDateValue = document.getElementById("purchseDate").value;
  const repairDateValue = document.getElementById("repairDate").value;
  if (!fNameValue) {
    document.getElementById("fName2").innerHTML = "This field cannot be blank and is mandatory";
  }
  if (!LNameValue) {
    document.getElementById("LName2").innerHTML = "This field cannot be blank and is mandatory";
  }
  if (!streetValue) {
    document.getElementById("Street2").innerHTML = "This field cannot be blank and is mandatory";
  }

  if (!cityValue) {
    document.getElementById("City2").innerHTML = "This field cannot be blank and is mandatory";
  }

  if (!phoneNumberValue) {
    document.getElementById("PhoneNumber2").innerHTML = "This field cannot be blank and is mandatory";
  }
  if (!emailValue) {
    document.getElementById("Email2").innerHTML = "This field cannot be blank and is mandatory";
  }
  if (!serialNumberValue) {
    document.getElementById("SerialNumber2").innerHTML = "This field cannot be blank and is mandatory";
  }

  if (!purchseDateValue) {
    document.getElementById("purchseDate2").innerHTML = "This field cannot be blank and is mandatory";
  }

  if (!repairDateValue) {
    document.getElementById("repairDate2").innerHTML = "This field cannot be blank and is mandatory";
  }

  if (
    fNameValue &&
    LNameValue &&
    streetValue &&
    cityValue &&
    phoneNumberValue &&
    emailValue &&
    serialNumberValue &&
    purchseDateValue &&
    repairDateValue
  ) {
    return true;
  } else {
    return false;
  }
}

function checkFirstName() {
  const fNameValue = document.getElementById("fName").value;
  if (!/^[a-zA-Z- ]{1,}$/.test(fNameValue)) {
    document.getElementById("fName2").innerHTML = "only allows for alphabetical characters, spaces and the – symbol";
  } else {
    document.getElementById("fName2").innerHTML = "";
  }
}

function checkLastName() {
  const LNameValue = document.getElementById("LName").value;
  if (!/^[a-zA-Z- ]{1,}$/.test(LNameValue)) {
    document.getElementById("LName2").innerHTML = "only allows for alphabetical characters, spaces and the – symbol";
    return;
  } else {
    document.getElementById("LName2").innerHTML = "";
  }
}

function checckStreet() {
  const streetValue = document.getElementById("Street").value;
  if (!streetValue) {
    document.getElementById("Street2").innerHTML = "This field cannot be blank and is mandatory";
    return;
  } else {
    document.getElementById("Street2").innerHTML = "";
  }
}

function checckCity() {
  const streetValue = document.getElementById("City").value;
  if (!streetValue) {
    document.getElementById("City2").innerHTML = "This field cannot be blank and is mandatory";
    return;
  } else {
    document.getElementById("City2").innerHTML = "";
  }
}

function checkPhoneNumber() {
  const phoneNumberValue = document.getElementById("PhoneNumber").value;
  if (!/^[0-9-+() ]{1,}$/.test(phoneNumberValue)) {
    document.getElementById("PhoneNumber2").innerHTML =
      "Please enter a valid number. This field is mandatory";
  } else {
    document.getElementById("PhoneNumber2").innerHTML = "";
  }
}

function checkPostCode() {
  const postCodeValue = document.getElementById("PostCode").value;
  if (postCodeValue.length !== 4) {
    document.getElementById("PostCode2").innerHTML = "should be a length of 4 numbers";
  } else {
    document.getElementById("PostCode2").innerHTML = "";
  }
}

function checkSuburb() {
  const suburbValue = document.getElementById("Suburb").value;
  if (!/^[0-9a-zA-Z]{1,}$/.test(suburbValue)) {
    document.getElementById("Suburb2").innerHTML = "be a mix of numbers and characters with a maximum length of 10 ";
  } else {
    document.getElementById("Suburb2").innerHTML = "";
  }
}
function checkEmail() {
  const emailValue = document.getElementById("Email").value;
  if (
    !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(emailValue)
  ) {
    document.getElementById("Email2").innerHTML = "The email address is incorrect";
  } else {
    document.getElementById("Email2").innerHTML = "";
  }
}

function checkSerialNumber() {
  const serialNumberValue = document.getElementById("SerialNumber").value;
  if (!serialNumberValue) {
    document.getElementById("SerialNumber2").innerHTML = "This field cannot be blank and is mandatory";
  } else {
    document.getElementById("SerialNumber2").innerHTML = "";
  }
}

function checkPurchseDate() {
  const purchseDateValue = document.getElementById("purchseDate").value;
  if (!purchseDateValue) {
    document.getElementById("purchseDate2").innerHTML = "This field cannot be blank and is mandatory";
  } else {
    document.getElementById("purchseDate2").innerHTML = "";
  }
}

function checkRepairDate() {
  const purchseDateValue = document.getElementById("purchseDate").value;
  const repairDateValue = document.getElementById("repairDate").value;
  if (!repairDateValue) {
    document.getElementById("repairDate2").innerHTML = "This field cannot be blank and is mandatory";
  } else {
    document.getElementById("repairDate2").innerHTML = "";
  }
}
