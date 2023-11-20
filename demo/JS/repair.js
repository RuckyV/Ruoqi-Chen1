
var form_data=JSON.parse(sessionStorage.getItem('form_data'));
console.log(form_data,"form_data");

$('#AmountDue').html(form_data.grandTotal) 

$('.user_name').html(form_data.Title+" "+form_data.Firstname+" "+form_data.Lastname);

$('#Street').html(form_data.City+""+form_data.Street);

$('#Suburb').html(form_data.Suburb);

$('#PostCode').html(form_data.PostCode);

$('#PhoneNumber').html(form_data.PhoneNumber)

$('#Email').html(form_data.Email);

$('#repairDate').html(form_data.repairDate);

$('#PaymentDue').html(form_data.serviceFee);

$('#purchseDate').html(form_data.purchseDate);

$('#repairDate').html(form_data.repairDate);

$('#warranty').html(form_data.warranty?'Yes√':'no X')

$('#SerialNumber').html(form_data.SerialNumber)

$('#make').html(form_data.make);

$('#ModelNumber').html(form_data.ModelNumber);

$('#FaultCategory').html(form_data.FaultCategory);

$('#Description').html(form_data.Description)

$('#bondAmount').html(form_data.bondAmount)

$('#serviceFee').html(form_data.serviceFee);

$('#subTotal').html(form_data.subTotal);

$('#gst').html(form_data.gst);

$('#grandTotal').html(form_data.grandTotal)

for(let i=0;i<form_data.item_list.length;i++){
    $('#tbody_').append(`
    <tr>
                                    <td>${form_data.item_list[i].name}</td>
                                    <td>${form_data.item_list[i].price}</td>
                                </tr>
    `)
}