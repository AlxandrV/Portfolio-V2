// Consts _________________________________________________________
const closeCursor = document.getElementsByClassName("closeCursor")[0];
const linksNav = document.getElementsByClassName("navbar")[0].getElementsByTagName("LI");
const overlaytag = document.getElementsByClassName("overlay")[0];
const response = document.getElementsByClassName("response")[0];
const listSection = [
    'home', 'project', 'contact'
];
const inputsForm = [
    'name', 'email', 'subject', 'message'
];
const form = document.getElementsByTagName("FORM")[0];

// Functions ______________________________________________________
// Return location url
function locationUrl(){
    let location = document.location.href;
    let value = "";
    listSection.forEach(section => {
        if(location.includes('#'+section)){
            value = section;
        }
    });
    return value;
}
        
// Overlay effect
function overlay(sectionName) {
    let sectionTag = document.getElementById(sectionName);
    overlaytag.classList.toggle("active");
    setTimeout(() => {
        closeCursor.classList.toggle("indexCursor");
        sectionTag.classList.toggle("indexOn");
        sectionTag.classList.toggle("indexOff");
        sectionTag.classList.toggle("d-none");
    }, 1000);
}

// Validation
function validate(data){
    let valueName = data.get("name").toString();
    let valueEmail = data.get("email").toString();
    let valueSubject = data.get("subject").toString();
    let valueMessage = document.getElementById("message").value;

    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
    if (valueName === "") { return "name"; }
    if (valueEmail === "" || pattern.test(valueEmail) == false) { return "email"; }
    if (valueSubject === "") { return "subject"; }
    if (valueMessage == "") { return "message"; }

    return true;
}

// Events _________________________________________________________
// Click link navbar
for (let link of linksNav) {
    link.addEventListener("click", () => {
        let attribute = link.childNodes[0].getAttribute("href").substring(1);
        overlay(attribute);
    })
}

// Click closeCursor
closeCursor.addEventListener("click", () => {
    const sectionToHidden = locationUrl();
    overlay(sectionToHidden)
});

// Submit form contact 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputsForm.forEach(idName => {
        document.getElementById(idName).classList.remove("error");
    });
    // console.log(response.children[0]);
    response.classList.remove("animated");

    let data = new FormData(form);

    let conform = validate(data);

    if (conform === true){
        let xhr = new XMLHttpRequest();
    
        xhr.open("POST", "form-contact", true);
        xhr.send(data);
    
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                response.children[0].innerHTML = xhr.responseText;
                response.classList.add("animated");
            }
        }
    } else {
        document.getElementById(conform).classList.add("error");
    }

});