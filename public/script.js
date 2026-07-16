const businessList = document.getElementById("businessList");
const searchBox = document.getElementById("searchBox");

let businesses = [];

fetch("/api/businesses")
.then(response => response.json())
.then(data => {
    businesses = data;
    displayBusinesses(data);
});

function displayBusinesses(data){

    if(!businessList) return;

    businessList.innerHTML="";

    data.forEach(business=>{

        businessList.innerHTML += `
        <div class="card">
            <h3>${business.name}</h3>
            <p><b>Category:</b> ${business.category}</p>
            <p><b>Owner:</b> ${business.owner}</p>
            <p><b>Phone:</b> ${business.phone}</p>
            <p><b>Address:</b> ${business.address}</p>
        </div>
        `;
    });

}

if(searchBox){

searchBox.addEventListener("keyup",()=>{

const text = searchBox.value.toLowerCase();

const filtered = businesses.filter(item =>
item.name.toLowerCase().includes(text)
);

displayBusinesses(filtered);

});

}
const form = document.getElementById("businessForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const business={

name:document.getElementById("name").value,

category:document.getElementById("category").value,

owner:document.getElementById("owner").value,

phone:document.getElementById("phone").value,

address:document.getElementById("address").value

};

const response=await fetch("/api/businesses",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(business)

});

const result=await response.json();

alert(result.message);

form.reset();

});

}