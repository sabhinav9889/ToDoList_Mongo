// document.onclick = function(e){
//     var v = e.path[2].innerText;
//     console.log(v);
// }

exports.getdate = getDate;
exports.getday = getDay;
function getDate(){
    let d = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month: "long"
    };
    d = d.toLocaleDateString("en-US",options);
    return d;
}

function getDay(){
    let d = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month: "long"
    };
    d = d.toLocaleDateString("en-US",options);
    return d;
}