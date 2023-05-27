var dataArr = [];
async function fetchData() {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

        dataArr = await response.json();
        console.log(dataArr);
        appendDataonRow(dataArr);
    }
    catch (error) {
        console.log(error);
        console.log("something went wrong!");
    }

}
fetchData().then(() => {
    console.log("data fetching is done");
})
    .catch((error) => {
        console.log(error);
    });



const tbody = document.getElementsByTagName('tbody')[0];
// console.log(tbody.innerHTML);


//row template for adding each row dynamically 
function coinsRow(data) {
    return `<tr>
    <td>
      <img
        src=${data.image}
        alt=${data.id}
      />
    </td>
    <td>${data.name}</td>
    <td id="symbol">${data.symbol.toUpperCase()}</td>
    <td style="text-align: right;">$${data.current_price}</td>
    <td style="text-align: right;">$${data.total_volume}</td>
    <td style="text-align:right;${data.market_cap_change_percentage_24h.toFixed(2) >= 0 ? "color:green;" : "color:red;"}">${data.market_cap_change_percentage_24h.toFixed(2)}%</td>
    <td style="text-align:right;">Mkt Cap: $${data.market_cap} </td>
  </tr>
  `
}


function appendDataonRow(dataArr) {

    for (let data of dataArr) {
        // console.log(data);
        tbody.innerHTML += coinsRow(data);
    }
}



// search data based on input-----------------------

let input = document.getElementsByTagName('input')[0];
input.addEventListener('change', serchData);

function serchData(event) {
    console.log(event.target.value);
    inputValue = event.target.value.toLowerCase();
    tbody.innerHTML = "";
    for (let data of dataArr) {
        if (data.symbol.toLowerCase() === inputValue || data.name.toLowerCase() === inputValue) {
            tbody.innerHTML += coinsRow(data);
        }
    }
    event.target.value = "";
}




// ----------------sort by market cap----------------------------->

let mktCap = document.getElementById('bymktCap');
mktCap.addEventListener('click', sortByMktCap);

function sortByMktCap() {
    // console.log(mktCap);

    dataArr.sort(function (ob1, ob2) {
        return ob1.market_cap > ob2.market_cap;
    })
    tbody.innerHTML = "";
    for (let data of dataArr) {
        tbody.innerHTML += coinsRow(data);
    }
}


//---------------------sort by percentage ---------------------------->
let bypercentage = document.getElementById('bypercentage');
bypercentage.addEventListener('click', sortBypercentage);


function sortBypercentage() {
    // console.log(bypercentage);

    dataArr.sort(function (ob1, ob2) {
        return ob1.market_cap_change_percentage_24h.toFixed(2) > ob2.market_cap_change_percentage_24h.toFixed(2);
    })

    tbody.innerHTML = "";

    for (let data of dataArr) {
        tbody.innerHTML += coinsRow(data);
    }

}