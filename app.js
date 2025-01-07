// function Customer(fullName, password, dob, gender, orderTypes, orderOption, imageUrl, phone) {
//   this.fullName = fullName;
//   this.password = password;
//   this.dob = dob;
//   this.gender = gender;
//   this.orderTypes = orderTypes;
//   this.orderOption = orderOption;
//   this.imageUrl = imageUrl;
//   this.phone = phone;
// }

// document.getElementById("orderForm").addEventListener("submit", function (event) {
//   event.preventDefault();
  

//   function render(){
//   const fullName = document.getElementById("fullname").value;
//   const password = document.getElementById("password").value;
//   const dob = document.getElementById("dob").value;
//   const gender = document.querySelector("input[name='gender']:checked").value;
//   const phone = document.getElementById("phone").value;
//   const orderType = document.querySelectorAll("input[type='checkbox']:checked");
//     let orderTypes = [];
//     for (let i = 0; i < orderType.length; i++) {
//       orderTypes.push(orderType[i].value);
//     }

//   const orderOption = document.querySelector("input[name='mealtype']:checked").value;
//   const order = {
//     fullName,
//     password,
//     dob,
//     gender,
//     phone,
//     orderTypes,
//     orderOption,
//   };
//   return order;
//   }

//   let customerOrders =  [];
//   customerOrders.push(render());

//   localStorage.setItem("Customer Orders", JSON.stringify(customerOrders));
// });



// const newCustomer = new Customer(
//   fullName,
//   password,
//   dob,
//   gender,
//   orderTypes,
//   orderOption,
//   imageUrl,
//   phone
// );


function Customer(fullName, password, dob, gender, orderTypes, orderOption, imageUrl, phone) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.orderTypes = orderTypes;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
  this.phone = phone;
}

document.getElementById("orderForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullname").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const phone = document.getElementById("phone").value;

  const orderTypeElements = document.querySelectorAll("input[type='checkbox']:checked");
  let orderTypes = [];
  for (let i = 0; i < orderTypeElements.length; i++) {
    orderTypes.push(orderTypeElements[i].value);
  }

  const orderOption = document.querySelector("input[name='mealtype']:checked").value;

  // Image URL (can be hardcoded or added as an input field)
  const imageUrl = "./assets/img1.jpg"; // تأكد من أن الصورة موجودة في هذا المسار
 

  // Create a new Customer object
  const newCustomer = new Customer(
    fullName,
    password,
    dob,
    gender,
    orderTypes,
    orderOption,
    imageUrl,
    phone
  );

  
  let customerOrders = [];
  customerOrders.push(newCustomer);
  localStorage.setItem("Customer Orders", JSON.stringify(customerOrders));

  // Render Orders
  render(customerOrders);
});

// Render Function
function render(customers) {
  const ordersContainer = document.getElementById("ordersContainer");
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i]; 
    const orderElement = document.createElement("div");
    orderElement.classList.add("order", "card", "mb-3");
    orderElement.style.maxWidth = "540px";
    orderElement.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${customer.imageUrl}" class="img-fluid rounded-start" alt="Customer Image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p class="card-title"><strong>Full name:</strong> ${customer.fullName}</p>
            <p class="card-text"><strong>Password:</strong> ${customer.password}</p>
            <p class="card-text"><strong>Date of Birth:</strong> ${customer.dob}</p>
            <p class="card-text"><strong>Gender:</strong> ${customer.gender}</p>
            <p class="card-text"><strong>Phone:</strong> ${customer.phone}</p>
            <p class="card-text"><strong>Order Types:</strong> ${customer.orderTypes.join(", ")}</p>
            <p class="card-text"><strong>Order Option:</strong> ${customer.orderOption}</p>
          </div>
        </div>
      </div>
    `;
    ordersContainer.appendChild(orderElement);
  }
}
