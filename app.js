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
  
    const orderType= document.querySelectorAll("input[type='checkbox']:checked");
    let orderTypes = [];
    for (let i = 0; i < orderType.length; i++) {
      orderTypes.push(orderType[i].value);
    }
  
    const orderOption = document.querySelector("input[name='mealtype']:checked").value;
  
   
    const imageUrl = "./assets/img1.jpg";
   
    let customerOrders = JSON.parse(localStorage.getItem("Customer Orders")) || [];

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

  customerOrders.push(newCustomer);
  localStorage.setItem("Customer Orders", JSON.stringify(customerOrders));
  
    render();
    
  });
  
  
  function render() {
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";
    const customers = JSON.parse(localStorage.getItem("Customer Orders")); 
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i]; 
      const orderElement = document.createElement("divCard");
      orderElement.className = "card mb-3";
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
  document.addEventListener("DOMContentLoaded", render);