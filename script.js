/*


// promise............................................

var ans = new Promise(function (res, rej) {
  return res("Utho....");
});

// Handling the first promise
var p2 = ans
  .then(function (data) {
    console.log(data);

    // Returning a new promise
    return new Promise(function (res, rej) {
      return res("Take tea......");
    });
  })
  .then(function (data) {
    console.log(data);

    // Returning another promise
    return new Promise(function (res, rej) {
      return res("Go to work...");
    });
  })
  .then(function (data) {
    console.log(data);

    // Returning another promise
    return new Promise(function (res, rej) {
      return res("Have lunch...");
    });
  })
  .then(function (data) {
    console.log(data);

    // Returning another promise
    return new Promise(function (res, rej) {
      return res("Come back home...");
    });
  })
  .then(function (data) {
    console.log(data);

    // Returning another promise
    return new Promise(function (res, rej) {
      return res("Go to sleep 😴...");
    });
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error("Error:", error);
  });




// second example.........

let pizza=new Promise((res,rej)=>{
    setTimeout(()=>{
        let isPizza=0;
        if(isPizza==1){
            return res("Done.....");
        }else{
            return rej("Sorry........");
        }
    },2000)
});
pizza
.then((data)=>console.log(data))
.catch((error)=>console.log(error));






  // fetch.......................................................

  fetch("https://jsonplaceholder.typicode.com/posts") 
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); 
  })
  .then(({ userId, id, title, body }) => {
    console.log("User ID:", userId);
    console.log("Post ID:", id);
    console.log("Title:", title);
    console.log("Body:", body);
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
  });





  // Callback function...........

  function orderPizza(callback) {
    console.log("Ordering pizza...");
    setTimeout(() => {
        console.log("Pizza is ready!");
        callback(); 
    }, 2);
}

function eatPizza() {
    console.log("Eating pizza!");
}

orderPizza(eatPizza);





//async / await.....................

async function fetchData() {
    let response = await fetch(`https://randomuser.me/api/`); 
    let data = await response.json(); 
    console.log(data); 
    
}

fetchData();

*/

async function fetchData() {
    try {
        let response = await fetch(`https://randomuser.me/api/`); // Fetch data
        let data = await response.json(); 
        console.log(data);
        let user = data.results[0]; 

        console.log("Name:", user.name.first, user.name.last);
        console.log("Gender:", user.gender);
        console.log("Email:", user.email);
        console.log("Country:", user.location.country);
        console.log("DOB:", user.dob.age);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

