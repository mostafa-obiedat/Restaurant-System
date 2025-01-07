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
   
    
    let isValid = true;

    const fullNameRegex = /^\S+$/; 
    if (!fullNameRegex.test(fullName)) {
      alert("Full Name cannot contain spaces.");
      isValid = false;
    }
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      isValid = false;
    }
  
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
      alert("Date of Birth must follow the format YYYY-MM-DD.");
      isValid = false;
    }
  
    const phoneRegex = /^07\d{8}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 10 digits and start with 07.");
      isValid = false;
    }
  
    if (!gender) {
      alert("Please select a gender.");
      isValid = false;
    }
  
    if (!orderTypes.length) {
      alert("Please select at least one order type.");
      isValid = false;
    }
  
    if (!orderOption) {
      alert("Please select an order option.");
      isValid = false;
    }
  
    if (!isValid) {
      return; 
    }



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
  
    
    render(customerOrders);
  });
  
 
  function render(customers) {
    const ordersContainer = document.getElementById("ordersContainer");
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i]; 
      const orderElement = document.getElementById("divCard");
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
  