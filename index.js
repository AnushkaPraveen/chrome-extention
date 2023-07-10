let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

//render saved urls
function render(leads) {
    let lisItems = "";
    for (let i = 0; i < leads.length; i++) {
        lisItems += `
      <li>
      <a target='_blank' href='${leads[i]}' >
        ${leads[i]} 
        </a>
      </li>`;
    }
    ulEl.innerHTML = lisItems;
}

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("Leads"));

//if there any data in local storage render data
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

//get values from input area and save local storage
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);

    if (inputEl.value != "") {
        inputEl.value = "";
    }
    localStorage.setItem("Leads", JSON.stringify(myLeads));
    render(myLeads);
});

//get current active window & tab url.then store local storage
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("Leads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

//when click the delete all button delete all saved data
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});