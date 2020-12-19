// Consts _________________________________________________________
const closeCursor = document.getElementsByClassName("closeCursor")[0];
const linksNav = document.getElementsByClassName("navbar")[0].getElementsByTagName("LI");
const overlaytag = document.getElementsByClassName("overlay")[0];
const listSection = [
    'home', 'project', 'contact'
];

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
    }, 1000);
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
})