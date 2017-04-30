jQuery.extend(jQuery.validator.messages, {
    required: "أدخل البيانات من فضلك",
    date: "التاريخ غير صحيح",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("أدخل عنوان مكون من 5 حروف على الأقل"),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    min: jQuery.validator.format("أدخل رقم صحيح"),
    number: jQuery.validator.format("أدخل رقم صحيح")
});

function dateFormate(myDate){
  var date = myDate.toString().substr(4,11);
  var year = date.slice(-4),
      month = ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(date.substr(0,3))+1,
        day = date.substr(4,2);
    var formated_date = year + '-' + (month<10?'0':'') + month + '-' + day;   
  return formated_date;
}

$.validator.addMethod("dateFormat",
    function(value, element) {
        return value.match(/^dddd?-dd?-dd$/);
    },
    "من فضلك أدخل التاريخ على هيئة YYYY-MM-DD");