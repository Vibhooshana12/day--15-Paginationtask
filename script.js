var div=document.createElement("div")
var container= document.createElement("div")
container.className="container"

var title=document.createElement("h1")
title.id="title";
title.className="text-center"
title.innerText="TABLE PAGINATION";
container.append(title)

var description=document.createElement("p")
description.id="description";
description.className="text-center"
description.innerHTML=`<b>Pagination is the process of dividing a large set of data into smaller, manageable pages, making it easier for users to navigate and consume information.</b><b>Here, a set of data is created in a table with pagination controls including First, Last, Previous, and Next buttons to navigate through the pages, allowing users to access and view the data in an organized and manageable way.</b>`;
container.append(description)

var row=document.createElement("div")
row.className="row"

var col=document.createElement("div")
col.className="col-lg-12 col-md-12"

row.append(col)
container.append(row)
document.body.append(container)

var table_responsive=document.createElement("div")
table_responsive.className="table-responsive"
col.append(table_responsive)

function table(tagname){
    var table=document.createElement(tagname);
    table.className="table table-striped table-bordered";
    table.id="table"
    return table;
}

function thead(tagname,attrname,attrvalue){
    var thead=document.createElement(tagname);
    thead.setAttribute(attrname,attrvalue);
    return thead;
}

function createTbody(tagname) {
    var tbody = document.createElement(tagname);
    return tbody;
}

function tr(tagname){
    var tr=document.createElement(tagname);
    return tr;
}

function th_col(tagname,attrname,attrvalue,content){
    var th_col=document.createElement(tagname);
    th_col.setAttribute(attrname,attrvalue);
    th_col.innerHTML=content
    return th_col;
}

function td(tagname,content){
    var td=document.createElement(tagname);
    td.innerHTML=content
    return td;
}

function button(tagname, attrname, attrvalue, className,content) {
    var button = document.createElement(tagname);
    button.setAttribute(attrname, attrvalue);
    button.setAttribute("class", className);
    button.innerHTML = content;
    return button;
}

var table_parameter=table("table")
var thead_parameter=thead("thead","class","thead-dark")
var tbody_parameter = createTbody("tbody");

var th_tr=tr("tr")
var th_col1=th_col("th","scope","col","Id")
var th_col2=th_col("th","scope","col","Name")
var th_col3=th_col("th","scope","col","Email")



th_tr.append(th_col1,th_col2,th_col3)
thead_parameter.append(th_tr)
table_parameter.append(thead_parameter)
table_parameter.append(tbody_parameter);
table_responsive.append(table_parameter)


//pagination
var div2 = document.createElement("div")
div2.setAttribute("id","buttons")
div2.className="d-flex justify-content-center"

var btnfirst = button("button", "id", "first-page","btn btn-outline-dark", "First");
var btnprev = button("button", "id", "prev-page","btn btn-outline-dark", "Previous");
var btnnext = button("button", "id", "next-page", "btn btn-outline-dark","Next");
var btnlast = button("button", "id", "last-page","btn btn-outline-dark", "Last");

div2.append(btnfirst, btnprev, btnnext, btnlast);
container.append(div2)

var currentpage=1;
var itemsPerpage=10;
var totalPages=0;
let data=[];


async function fetchdata(){
try{
    let res= await fetch(`https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json`)
    data=await res.json()
    totalPages=Math.ceil(data.length / itemsPerpage);
    createPaginationButtons();
    display_data(currentpage);
    pagination_controls();
}
catch(error){
    console.log("error")
}
}
fetchdata();

function display_data(currentpage){
var start=(currentpage-1)*itemsPerpage
var end=start + itemsPerpage
var tabledata=data.slice(start,end)
console.log(tabledata)

tbody_parameter.innerHTML = "";

tabledata.forEach(item => {
var tr_element = tr("tr");
var td_id = td("td", item.id);
var td_name = td("td", item.name);
var td_email = td("td", item.email);

tr_element.append(td_id, td_name, td_email);
tbody_parameter.append(tr_element);

});
}

function pagination_controls(){
     document.getElementById('first-page').disabled = currentpage === 1;
     document.getElementById('prev-page').disabled = currentpage === 1;
     document.getElementById('next-page').disabled = currentpage ===  totalPages;
     document.getElementById('last-page').disabled = currentpage === totalPages;

}
function createPaginationButtons() {
    var paginationContainer = document.getElementById("buttons");
    
    const pageButtons = paginationContainer.querySelectorAll(".page-number");
    pageButtons.forEach(button => button.remove());
    

    for (let i = 1; i <= totalPages; i++) {
        var buttonPage = button("button", "data-page", i,"btn btn-outline-dark page-number", i);
        buttonPage.addEventListener('click', () => {
            currentpage = i;
            display_data(currentpage);
            pagination_controls();
        });
        paginationContainer.insertBefore(buttonPage,btnnext);
    }
}

document.getElementById('first-page').addEventListener('click', () => {
    currentpage = 1;
    display_data(currentpage);
    pagination_controls();
});

document.getElementById('prev-page').addEventListener('click', () => {
    if(currentpage > 1);{
    currentpage--;
    display_data(currentpage);
    pagination_controls();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if(currentpage < totalPages){
    currentpage++;
    display_data(currentpage);
    pagination_controls();
    }
});

document.getElementById('last-page').addEventListener('click', () => {
    currentpage = totalPages;
    display_data(currentpage);
    pagination_controls();
});







