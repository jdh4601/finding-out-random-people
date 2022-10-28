const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const showBtn = document.getElementById('show');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();
  const user = data.results[0];
  // Create new user obj
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    age: user.dob.age,
    location: `${user.location.country}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data array(newUser -> obj)
const addData = obj => {
  data.push(obj);
  updateDOM(data);
};

// Update DOM
const updateDOM = (proviedData = data) => {
  // Clear the main div
  main.innerHTML = '';

  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  ul.classList.add('standards');
  ul.innerHTML = `<li>Person</li> <li>Age</li> <li>Country</li> <li>Wealth</li>`;
  h2.appendChild(ul);
  main.appendChild(h2);

  proviedData.forEach(item => {
    const element = document.createElement('li');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong><span>${
      item.age
    }</span><span>${item.location}</span><span>${FormatMoney(
      item.money
    )}</span>`;
    main.appendChild(element);
  });
};

// Format number as money
const FormatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Double money by using map method
const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
