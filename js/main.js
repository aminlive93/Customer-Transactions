let data = {
  "customers": [
    { "id": 1, "name": "Ahmed Ali" }, { "id": 2, "name": "Aya Elsayed" },
    { "id": 3, "name": "Mina Adel" }, { "id": 4, "name": "Sarah Reda" },
    { "id": 5, "name": "Mohamed Sayed" }],
  "transactions": [{ "id": 1, "customer_id": 1, "date": "2022-01-01", "amount": 1000 },
  { "id": 2, "customer_id": 1, "date": "2022-01-02", "amount": 2000 },
  { "id": 3, "customer_id": 2, "date": "2022-01-01", "amount": 550 },
  { "id": 4, "customer_id": 3, "date": "2022-01-01", "amount": 500 },
  { "id": 5, "customer_id": 2, "date": "2022-01-02", "amount": 1300 },
  { "id": 6, "customer_id": 4, "date": "2022-01-01", "amount": 750 },
  { "id": 7, "customer_id": 3, "date": "2022-01-02", "amount": 1250 },
  { "id": 8, "customer_id": 5, "date": "2022-01-01", "amount": 2500 },
  { "id": 9, "customer_id": 5, "date": "2022-01-02", "amount": 875 }]
}
let customerName = document.querySelector('#sName');
let transaction = document.querySelector('#transaction');
let customers = data.customers;
let transactions = data.transactions;
let arr = [];



function getnames() {    ///getnames function
  cartona = ' ';
  for (let i = 0; i < transactions.length; i++) {
    let x = transactions[i].customer_id
    let y = transactions[i].amount
    let z = transactions[i].id
    let v = transactions[i].date
    for (let i = 0; i < customers.length; i++) {
      if (x == customers[i].id) {
        cartona += `<div class="websiteinfo1 px-1 mb-0 py-2 border-bottom border-secondary-subtle">
<ul class="list-unstyled d-flex justify-content-between mb-0 align-items-center">
  <li class="text-center col-2">${z}</li>
  <li class="text-center col-2">${customers[i].name}</li>
  <li class="text-center col-2">${y} $</li>
  <li class="text-center col-2">${v}</li>
  <li class="text-center col-2">${customers[i].id}</li>
</ul>
</div>`
      }

    }
  }
  $('#siteinfo').html(cartona);
  chartdataonclick()
}

getnames() // call getnames function

function searchbyname(name) { ///searchbyname function
  let cartona = ' '
  for (i = 0; i < customers.length; i++) {
    if (customers[i].name.toLowerCase().includes(name)) {
      let x = customers[i].name
      let y = customers[i].id
      for (let i = 0; i < transactions.length; i++) {
        if (y == transactions[i].customer_id) {
          cartona += `<div class="websiteinfo1 px-1 mb-0 py-2 border-bottom border-secondary-subtle">
  <ul class="list-unstyled d-flex justify-content-between mb-0 align-items-center">
    <li class="text-center col-2">${transactions[i].id}</li>
    <li class="text-center col-2">${x}</li>
    <li class="text-center col-2">${transactions[i].amount} $</li>
    <li class="text-center col-2">${transactions[i].date}</li>
    <li class="text-center col-2">${y}</li>
  </ul>
  </div>`
        }
      }
    }
  }
  $('#siteinfo').html(cartona);
  chartdataonclick()
}

function searchbytransaction(amount) {   //search by transaction 
  cartona = ' ';
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].amount == amount) {
      let x = transactions[i].customer_id
      let y = transactions[i].amount
      let z = transactions[i].id
      let v = transactions[i].date
      for (let i = 0; i < customers.length; i++) {
        if (x == customers[i].id) {
          cartona += `<div class="websiteinfo1 px-1 mb-0 py-2 border-bottom border-secondary-subtle">
<ul class="list-unstyled d-flex justify-content-between mb-0 align-items-center">
  <li class="text-center col-2">${z}</li>
  <li class="text-center col-2">${customers[i].name}</li>
  <li class="text-center col-2">${y} $</li>
  <li class="text-center col-2">${v}</li>
  <li class="text-center col-2">${customers[i].id}</li>
</ul>
</div>`
        }

      }
    }
  }
  $('#siteinfo').html(cartona);
  chartdataonclick()
}

customerName.addEventListener('input', function (e) { //input event for name
  let x = e.target.value.toLowerCase();
  if (x == null || x == "" || x == " ") {
    getnames()
  }
  else {
    searchbyname(x);
  }
})

transaction.addEventListener('input', function (e) {//input event for transaction
  let x = e.target.value;
  if (x == null || x == "" || x == " ") {
    getnames()
  }
  else {
    searchbytransaction(x);
  }
})

function chartdataonclick(){
  $('.websiteinfo1').click(function (e) {
    let transactionDate = $(e.currentTarget).children().children().eq(3).html()
    let customerId = $(e.currentTarget).children().children().eq(4).html()
    let name = $(e.currentTarget).children().children().eq(1).html()
    getchartdata(customerId, transactionDate)
    getchart(name)
  })
}

chartdataonclick()


function getchart(name) {   // Show Chart

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: `Transactions of ${name}`
    },
    axisX: {
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Transactions amount in (USD $)",
      scaleBreaks: {
        autoCalculate: true
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "DD MMM",
      color: "#F08080",
      dataPoints: arr

    }]
  });
  chart.render();
}

function getchartdata(customerId, transactionDate) { //get Customer Data of transactions
  arr = []
  for (let i = 0; i < transactions.length; i++) {
    if (customerId == transactions[i].customer_id) {
      let date = transactions[i].date
      let newDate = new Date(date)
      let month = newDate.getMonth()
      let year = newDate.getFullYear()
      let day = newDate.getDate()
      arr.push({ x: new Date(year, month, day), y: transactions[i].amount })
    }
  }
}