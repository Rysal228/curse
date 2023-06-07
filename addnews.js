var newList = [];
// СОЗДАНИЕ НОВОСТИ

// }
function createNews() {
  var newsTitle = document.getElementById("newsTitle").value;
  var newsText = document.getElementById("newsText").value;
  var newsImage = document.getElementById("newsImage").files[0];
  var newsContainer = document.getElementById("newsContainer");
  
  // Получение выбранного времени публикации
  var publishTime = document.getElementById("publishTime").value;
  
  // Если время публикации не выбрано, используем текущее время
  if (!publishTime) {
    publishNews(newsTitle, newsText, newsImage);
    return;
  }
  
  // Расчет времени до публикации
  var publishDate = new Date(publishTime);
  var currentDate = new Date();
  var timeToPublish = publishDate.getTime() - currentDate.getTime();

  // Проверка, что выбранное время не прошло
  if (publishDate < currentDate) {
    alert("Выбранное время уже прошло. Пожалуйста, выберите другое время.");
    return;
  }
  // Отложенная публикация новости
  setTimeout(function() {
    publishNews(newsTitle, newsText, newsImage);
  }, timeToPublish);
}

function publishNews(newsTitle, newsText, newsImage) {
  var newsContainer = document.getElementById("newsContainer");
  var newsDiv = document.createElement("div");

  // Создание кнопки для удаления новости
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить новость";
  deleteButton.onclick = function() {
      // Удаление элемента с новостью из контейнера
      newsContainer.removeChild(newsDiv);

      // Удаление новости из localStorage
      var newsArray = JSON.parse(localStorage.getItem("news")) || [];
      for (var i = 0; i < newsArray.length; i++) {
          if (newsArray[i].title === newsTitle && newsArray[i].text === newsText && newsArray[i].date === publishTime) {
              newsArray.splice(i, 1);
              break;
          }
      }
      localStorage.setItem("news", JSON.stringify(newsArray));
  };

  // Создание контейнера для заголовка и времени публикации
  var newsHeaderElement = document.createElement("div");
  newsHeaderElement.className = "news-header";

  var newsTitleElement = document.createElement("h2");
  newsTitleElement.innerHTML = newsTitle;
  var newsTextElement = document.createElement("p");
  newsTextElement.innerHTML = newsText;
  
  // Получение выбранного времени публикации
  var publishTime = document.getElementById("publishTime").value;
  
  // Если время публикации не выбрано, используем текущее время
  if (!publishTime) {
    var date = new Date();
    publishTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
  else {
    var publishDate = new Date(publishTime);
    publishTime = publishDate.toLocaleDateString() + " " + publishDate.toLocaleTimeString();
  }
  
  var newsDateElement = document.createElement("p");
  newsDateElement.innerHTML = publishTime;

  // Добавление заголовка и времени публикации в контейнер
  newsHeaderElement.appendChild(newsTitleElement);
  newsHeaderElement.appendChild(newsDateElement);
  newsDiv.appendChild(newsHeaderElement);
  newsDiv.appendChild(newsTextElement);
  
  // Добавление заголовка и времени публикации в контейнер
  // newsDiv.appendChild(newsTitleElement);
  // newsDiv.appendChild(newsDateElement);
  // newsDiv.appendChild(newsTextElement);

  // Добавление кнопки для удаления новости
  // Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && loggedInUser.role === 'Администратор') {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
  newsDiv.appendChild(deleteButton);
}
  // deleteButton.style.position = "absolute";
  // deleteButton.style.bottom = "0";
  // deleteButton.style.right = "0";
  // deleteButton.style.position = "absolute";
  // deleteButton.style.bottom = "0";
  // deleteButton.style.right = "0";
  // newsDiv.style.position = "relative";
  newsTitleElement.style.margin = "10px";
  newsTitleElement.style.color = "white";
  newsTextElement.style.color = "white";
  newsTextElement.style.margin = "10px";
  newsDateElement = "10px";
  newsDiv.style.border= "0.5px solid #929292";
  newsDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
  
  //ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ
  if (!newsTitle || !newsText) {
    alert ("Проверьте наличие заполнение заполнения заголовка и текста");
    return;
  }
  
  if (newsImage) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var newsImageElement = document.createElement("img");
      newsImageElement.src = e.target.result;
      newsDiv.appendChild(newsImageElement);
      newsImageElement.style.margin = "10px";
      newsImageElement.style.height = "200px";
      // Сохранение новости в localStorage
      var newsArray = JSON.parse(localStorage.getItem("news")) || [];
      newsArray.push({title: newsTitle, text: newsText, date: publishTime, image: e.target.result});
      localStorage.setItem("news", JSON.stringify(newsArray));
    }
    reader.readAsDataURL(newsImage);
    
    } else {
    // Сохранение новости в localStorage без фото
    var newsArray = JSON.parse(localStorage.getItem("news")) || [];
    newsArray.push({title: newsTitle, text: newsText, date: publishTime});
    localStorage.setItem("news", JSON.stringify(newsArray));
    }
    if (newsContainer.firstChild) {
      newsContainer.insertBefore(newsDiv, newsContainer.firstChild);
    } else {
      newsContainer.appendChild(newsDiv);
    }

  }


window.onload = function() {
  var newsArray = JSON.parse(localStorage.getItem("news")) || [];
  for (var i = 0; i < newsArray.length; i++) {
      var newsContainer = document.getElementById("newsContainer");
      var newsDiv = document.createElement("div");

      var newsHeaderElement = document.createElement("div");
      newsHeaderElement.className = "news-header";

  // Создание кнопки для удаления новости
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Удалить новость";

      // Использование замыкания для сохранения текущего значения переменной newsDiv
      (function(newsDiv) {
        deleteButton.onclick = function() {
          // Удаление элемента с новостью из контейнера
          newsContainer.removeChild(newsDiv);

          // Удаление новости из localStorage
          var newsArray = JSON.parse(localStorage.getItem("news")) || [];
          for (var i = 0; i < newsArray.length; i++) {
            if (newsArray[i].title === newsArray[i].title && newsArray[i].text === newsArray[i].text && newsArray[i].date === newsArray[i].date) {
              newsArray.splice(i, 1);
              break;
            }
          }
          localStorage.setItem("news", JSON.stringify(newsArray));
        };
      })(newsDiv);


      var newsTitleElement = document.createElement("h2");
      newsTitleElement.innerHTML = newsArray[i].title;
      newsTitleElement.className = "news-title";
      var newsTextElement = document.createElement("p");
      newsTextElement.innerHTML = newsArray[i].text;
      newsTextElement.className = "news-text";
      var newsDateElement = document.createElement("p");
      newsDateElement.innerHTML = newsArray[i].date;
      // newsDiv.appendChild(newsTitleElement);
      // newsDiv.appendChild(newsDateElement);
      // newsDiv.appendChild(newsTextElement);

      // Добавление заголовка и времени публикации в контейнер
      newsHeaderElement.appendChild(newsTitleElement);
      newsHeaderElement.appendChild(newsDateElement);
      newsDiv.appendChild(newsHeaderElement);
      newsDiv.appendChild(newsTextElement);

      // Добавление кнопки для удаления новости
      // Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && loggedInUser.role === 'Администратор') {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
      newsDiv.appendChild(deleteButton);
    }
  //     deleteButton.style.position = "absolute";
  // deleteButton.style.bottom = "0";
  // deleteButton.style.right = "0";
  // newsDiv.style.position = "relative";
  newsTitleElement.style.margin = "10px";
  newsTextElement.style.margin = "10px";
  newsDateElement = "10px";


      // newsDiv.style.display="flex";
      newsDiv.style.border= "0.5px solid #929292";
      newsDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
      // newsDiv.style.backgroundImage = "url('https://belstroyimport.ru/upload/iblock/3b1/detroyt-ff-1540-12621-30163.jpg')";
      newsDiv.style.margin = "10px";
      if (newsArray[i].image) {
        var newsImageElement = document.createElement("img");
        newsImageElement.src = newsArray[i].image;
        newsImageElement.className = "news-image";
        newsDiv.appendChild(newsImageElement);
      }
      if (newsContainer.firstChild) {
        newsContainer.insertBefore(newsDiv, newsContainer.firstChild);
    } else {
      newsContainer.appendChild(newsDiv);
    }
  }

  newsImageElement.style.margin = "10px";
  loadSections();
  loadTopics();
}

function openForm() {
  document.getElementById("newsForm").style.display = "block";
  var newsContainer = document.getElementById("newsContainer");
  if (newsContainer.style.maxHeight === "915px") {
    newsContainer.style.maxHeight = "715px";
  } else {
    newsContainer.style.maxHeight = "915px";
  }

}
function showCalendar() {
  var publishTime = document.getElementById("publishTime");
  publishTime.style.display = "block";
}

function closePopup(){
  var popup = document.getElementById("newsForm");
  popup.style.display="none";
  var newsContainer = document.getElementById("newsContainer");
  if (newsContainer.style.maxHeight === "715px") {
    newsContainer.style.maxHeight = "915px";
  } else {
    newsContainer.style.maxHeight = "715px";
  }
}

// КОНЕЦ СОЗДАНИЯ НОВОСТИ
//localStorage.clear();


//КОНТАКТНЫЕ ДАННЫЕ СОТРУДНИКОВ



// КОНЕЦ


document.getElementById("registrButton").addEventListener("click", function() {
    let registrationBox = document.querySelector(".registration-box");
    registrationBox.style.display = "block";
    registrationBox.style.position = "fixed";
    registrationBox.style.top = "50%";
    registrationBox.style.left = "50%";
    registrationBox.style.transform = "translate(-50%, -50%)";

    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
});

document.getElementById("loginButton").addEventListener("click", function() {
    let authorizationBox = document.querySelector(".authorization-box");
    authorizationBox.style.display = "block";
    authorizationBox.style.position = "fixed";
    authorizationBox.style.top = "50%";
    authorizationBox.style.left = "50%";
    authorizationBox.style.transform = "translate(-50%, -50%)";

    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
});


document.getElementById("rulesButton").addEventListener("click", function() {
    let rules = document.querySelector(".rules");
    rules.style.display = "flex";
    rules.style.position = "fixed";
    rules.style.top = "50%";
    rules.style.left = "50%";
    rules.style.transform = "translate(-50%, -50%)";

    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
});

document.getElementById("showUsersButton").addEventListener("click", function() {
    let usersTable = document.querySelector(".usersTable");
    usersTable.style.display = "block";
    usersTable.style.position = "fixed";
    usersTable.style.top = "50%";
    usersTable.style.left = "50%";
    usersTable.style.transform = "translate(-50%, -50%)";

    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
});

// document.getElementById("buttonPrivilege").addEventListener("click", function() {
//     let containerPrivilege = document.querySelector(".containerPrivilege");
//     containerPrivilege.style.display = "block";
//     containerPrivilege.style.position = "fixed";
//     containerPrivilege.style.top = "50%";
//     containerPrivilege.style.left = "50%";
//     containerPrivilege.style.transform = "translate(-50%, -50%)";

//     let overlay = document.querySelector(".overlay");
//     overlay.style.display = "block";
// });

document.querySelector(".overlay").addEventListener("click", function() {
    document.querySelector(".registration-box").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
});

document.querySelector(".overlay").addEventListener("click", function() {
    document.querySelector(".authorization-box").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
});

document.querySelector(".overlay").addEventListener("click", function() {
    document.querySelector(".rules").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
});

document.querySelector(".overlay").addEventListener("click", function() {
    document.querySelector(".usersTable").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
});

// document.querySelector(".overlay").addEventListener("click", function() {
//     document.querySelector(".containerPrivilege").style.display = "none";
//     document.querySelector(".overlay").style.display = "none";
// });




// function loadSections() {
//     var sections = JSON.parse(localStorage.getItem("sections")) || [];
//     for (var i = 0; i < sections.length; i++) {
//         var section = sections[i];
//         var newBlock = document.createElement("div");
//         newBlock.style.backgroundImage = "url('" + section.image + "')";
//         newBlock.innerHTML = section.name;
//         document.querySelector("#sections").appendChild(newBlock);
//     }
// }

//----------------------- loadSections();



//КОНЕЦ

// АВТОРИЗАЦИЯ

// // Получаем элемент формы входа
// const loginForm = document.getElementById('loginForm');

// // Добавляем обработчик событий отправки формы
// loginForm.addEventListener('submit', (e) => {
//     // Отменяем стандартное поведение формы (перезагрузку страницы)
//     e.preventDefault();

//     // Получаем значения полей ввода имени пользователя и пароля
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Получаем список всех зарегистрированных пользователей из localstorage
//     let users = JSON.parse(localStorage.getItem('users')) || [];

//     // Проверяем, существует ли пользователь с таким именем и паролем
//     const user = users.find(user => user.username === username && user.password === password);

//     if (user) {
//         // Если пользователь существует, выводим сообщение об успешном входе
//         alert('Вы успешно вошли!');
//     } else {
//         // Если пользователь не существует, выводим сообщение об ошибке
//         alert('Неверное имя пользователя или пароль. Пожалуйста, попробуйте еще раз.');
//     }
// });
  // // Получаем элемент формы входа
  // const loginForm = document.getElementById('loginForm');

  // // Добавляем обработчик событий отправки формы
  // loginForm.addEventListener('submit', (e) => {
  // // Отменяем стандартное поведение формы (перезагрузку страницы)
  // e.preventDefault();

  // // Получаем значения полей ввода имени пользователя и пароля
  // const loginUsername = document.getElementById('login-username').value;
  // const loginPassword = document.getElementById('login-password').value;

  // // Получаем список всех зарегистрированных пользователей из localstorage
  // let users = JSON.parse(localStorage.getItem('users')) || [];

  // // Проверяем, существует ли пользователь с таким именем и паролем
  // const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

  // if (user) {
  // // Если пользователь существует, выводим сообщение об успешном входе
  // // alert('Вы успешно вошли!');
  // // Если пользователь существует, сохраняем информацию о нем в localstorage
  //   localStorage.setItem('loggedInUser', JSON.stringify(user));

  //   // Закрываем окно авторизации

  //   document.querySelector('.authorization-box').style.display = 'none';
  //   document.querySelector('.overlay').style.display = 'none';
  //   // Скрываем кнопки "Войти" и "Регистрация"
  //   // document.getElementById('loginButton').style.display = 'none';
  //   // document.getElementById('registrButton').style.display = 'none';
  //   const loginButton = document.getElementById('loginButton');
  //   loginButton.parentNode.removeChild(loginButton);

  //   const registrButton = document.getElementById('registrButton');
  //   registrButton.parentNode.removeChild(registrButton);


  //   const openWindow = document.getElementById('openWindow');
  //   openWindow.parentNode.removeChild(openWindow);

  //   const openSection = document.getElementById('openSection');
  //   openSection.parentNode.removeChild(openSection);
  //   // Отображаем контейнер с информацией о пользователе
  //   const userContainer = document.querySelector('.user-container');
  //   userContainer.style.display = 'flex';

  //   // Заполняем контейнер информацией о пользователе
  //   userContainer.querySelector('.user-name').textContent = user.username;
  //   userContainer.querySelector('.user-role').textContent = user.role;

  //   //Перенаправляем пользователя на главную страницу сайта
  //   window.location.href = 'index.html';
  // } else {
  // // Если пользователь не существует, выводим сообщение об ошибке
  // alert('Неверное имя пользователя или пароль. Пожалуйста, попробуйте еще раз.');
  // }
  // });




// КОНЕЦ





// ГЛАВНАЯ И ПОИСК ОТОБРАЖЕНИЕ

const searchButton = document.getElementById('searchButton');
const homeButton = document.getElementById('homeButton');
const mainContainer = document.querySelector('.main-container');
const centerContainer = document.querySelector('.center-container');
const rightContainer = document.querySelector('.right-container');


searchButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    centerContainer.style.display = 'block';
    rightContainer.style.display = 'none';
});

homeButton.addEventListener('click', () => {
    mainContainer.style.display = 'block';
    centerContainer.style.display = 'none';
    rightContainer.style.display = 'block';
    location.reload();
});

searchButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    centerContainer.style.display = 'block';
    rightContainer.style.display = 'none';
    localStorage.setItem('currentPage', 'search');
});

homeButton.addEventListener('click', () => {
    mainContainer.style.display = 'block';
    centerContainer.style.display = 'none';
    rightContainer.style.display = 'block';
    localStorage.setItem('currentPage', 'home');
});



searchButton.addEventListener('dblclick', () => {
    location.reload();
});

homeButton.addEventListener('dblclick', () => {
    location.reload();
});

window.addEventListener('load', () => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage === 'search') {
        mainContainer.style.display = 'none';
        centerContainer.style.display = 'block';
        rightContainer.style.display = 'none';
    } else if (currentPage === 'home') {
        mainContainer.style.display = 'block';
        centerContainer.style.display = 'none';
        rightContainer.style.display = 'block';
    }

});
//КОНЕЦ






// РЕГИСТРАЦИЯ 


  const registrationForm = document.getElementById('registrationForm');
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registration-email').value;
    const registrationUsername = document.getElementById('registration-username').value;
    const registrationPassword = document.getElementById('registration-password').value;

    // Получаем список всех зарегистрированных пользователей из localstorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, существует ли пользователь с таким же именем
    const userExists = users.some(user => user.username === registrationUsername);

    if (userExists) {
        // Если пользователь с таким именем уже существует, выводим сообщение об ошибке
        alert('Пользователь с таким именем уже существует. Пожалуйста, выберите другое имя.');
    } else {
        // Если пользователь с таким именем не существует, добавляем его в список пользователей и сохраняем в localstorage
        const user = {
            email: email,
            username: registrationUsername,
            password: registrationPassword,
            role: 'Пользователь'
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Вы успешно зарегистрировались!');
    }
});


//КОНЕЦ




const showUsersButton = document.getElementById('showUsersButton');
const usersTable = document.getElementById('usersTable');
const userCard = document.getElementById('userCard');
const userCardName = document.getElementById('userCardName');
const userCardRole = document.getElementById('userCardRole');
const userCardImage = document.getElementById('userCardImage');
const closeUserCardButton = document.getElementById('closeUserCard');

showUsersButton.addEventListener('click', () => {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Очищаем таблицу
  usersTable.innerHTML = `
    <tr>
      <th>Имя</th>
      <th>Статус</th>
    </tr>
  `;

  // Добавляем строки в таблицу для каждого пользователя
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.role}</td>
    `;
    row.addEventListener('click', () => {
      // Показываем "карточку" пользователя при клике на строку
      userCardName.textContent = user.username;
      userCardRole.textContent = user.role;
      userCard.style.display = 'block';
      selectedUser = user;
    });
    usersTable.appendChild(row);
  });
  closeUserCardButton.addEventListener('click',() => {
    userCard.style.display = 'none';
  });
  // Показываем таблицу
  usersTable.style.display = 'table';
});


document.getElementById('logoutButton').addEventListener('click', () => {
  // Удаляем информацию о текущем пользователе из localstorage
  localStorage.removeItem('loggedInUser');

  // Скрываем контейнер с информацией о пользователе
  // document.querySelector('.user-container').style.display = 'none';

  // // Отображаем кнопки "Войти" и "Регистрация"
  // document.getElementById('loginButton').style.display = 'block';
  // document.getElementById('registrButton').style.display = 'block';

  location.reload();
});



document.getElementById('buttonPrivilege').addEventListener('click',() => {
  const containerPrivilege = document.querySelector('.containerPrivilege');
  containerPrivilege.style.display = "block";
});

document.getElementById('closePrivilege').addEventListener('click',() => {
  const containerPrivilege = document.querySelector('.containerPrivilege');
  containerPrivilege.style.display = "none";
});

// АВТОРИЗАЦИЯ 

  // Получаем элемент формы входа
  const loginForm = document.getElementById('loginForm');

  // Добавляем обработчик событий отправки формы
  loginForm.addEventListener('submit', (e) => {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  e.preventDefault();

  // Получаем значения полей ввода имени пользователя и пароля
  const loginUsername = document.getElementById('login-username').value;
  const loginPassword = document.getElementById('login-password').value;

  // Получаем список всех зарегистрированных пользователей из localstorage
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Проверяем, существует ли пользователь с таким именем и паролем
  const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

  if (user) {
  // Если пользователь существует, выводим сообщение об успешном входе
  // alert('Вы успешно вошли!');
  // Если пользователь существует, сохраняем информацию о нем в localstorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Закрываем окно авторизации

    // document.querySelector('.authorization-box').style.display = 'none';
    // document.querySelector('.overlay').style.display = 'none';
    // // Скрываем кнопки "Войти" и "Регистрация"
    // // document.getElementById('loginButton').style.display = 'none';
    // // document.getElementById('registrButton').style.display = 'none';
    // const loginButton = document.getElementById('loginButton');
    // loginButton.parentNode.removeChild(loginButton);

    // const registrButton = document.getElementById('registrButton');
    // registrButton.parentNode.removeChild(registrButton);


    // // const openWindow = document.getElementById('openWindow');
    // // openWindow.parentNode.removeChild(openWindow);

    // // const openSection = document.getElementById('openSection');
    // // openSection.parentNode.removeChild(openSection);
    // // Отображаем контейнер с информацией о пользователе
    // const userContainer = document.querySelector('.user-container');
    // userContainer.style.display = 'flex';

    // // Заполняем контейнер информацией о пользователе
    // userContainer.querySelector('.user-name').textContent = user.username;
    // userContainer.querySelector('.user-role').textContent = user.role;

    //Перенаправляем пользователя на главную страницу сайта
    window.location.href = 'index.html';
  } else {
  // Если пользователь не существует, выводим сообщение об ошибке
  alert('Неверное имя пользователя или пароль. Пожалуйста, попробуйте еще раз.');
  }
  });





// КОНЕЦ
// Проверяем, есть ли информация о текущем пользователе в localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
// Проверяем, авторизован ли пользователь
if (!loggedInUser) {
    // Если пользователь не авторизован, скрываем кнопки
    const openWindow = document.getElementById('openWindow');
    openWindow.parentNode.removeChild(openWindow);

    const openSection = document.getElementById('openSection');
    openSection.parentNode.removeChild(openSection);

    // const createnewPost = document.getElementById('createnewPost');
    // createnewPost.parentNode.removeChild(createnewPost);

    }



if (loggedInUser.role == 'Администратор') {
    // Если пользователь уже вошел в систему, скрываем кнопки "Войти" и "Регистрация"
    // document.getElementById('loginButton').style.display = 'none';
    // document.getElementById('registrButton').style.display = 'none';

    const loginButton = document.getElementById('loginButton');
    loginButton.parentNode.removeChild(loginButton);

    const registrButton = document.getElementById('registrButton');
    registrButton.parentNode.removeChild(registrButton);

    // const openWindow = document.getElementById('openWindow');
    // openWindow.parentNode.removeChild(openWindow);

    // const openSection = document.getElementById('openSection');
    // openSection.parentNode.removeChild(openSection);

    // Отображаем контейнер с информацией о пользователе
    const userContainer = document.querySelector('.user-container');
    userContainer.style.display = 'flex';

    // Заполняем контейнер информацией о пользователе
    userContainer.querySelector('.user-name').textContent = loggedInUser.username;
    userContainer.querySelector('.user-role').textContent = loggedInUser.role;
}

if (loggedInUser.role == 'Пользователь') {
    // Если пользователь уже вошел в систему, скрываем кнопки "Войти" и "Регистрация"
    // document.getElementById('loginButton').style.display = 'none';
    // document.getElementById('registrButton').style.display = 'none';

    const loginButton = document.getElementById('loginButton');
    loginButton.parentNode.removeChild(loginButton);

    const registrButton = document.getElementById('registrButton');
    registrButton.parentNode.removeChild(registrButton);

    const openWindow = document.getElementById('openWindow');
    openWindow.parentNode.removeChild(openWindow);

    const openSection = document.getElementById('openSection');
    openSection.parentNode.removeChild(openSection);

    // Отображаем контейнер с информацией о пользователе
    const userContainer = document.querySelector('.user-container');
    userContainer.style.display = 'flex';

    // Заполняем контейнер информацией о пользователе
    userContainer.querySelector('.user-name').textContent = loggedInUser.username;
    userContainer.querySelector('.user-role').textContent = loggedInUser.role;
}



if (loggedInUser.role == 'Модератор') {
    // Если пользователь уже вошел в систему, скрываем кнопки "Войти" и "Регистрация"
    // document.getElementById('loginButton').style.display = 'none';
    // document.getElementById('registrButton').style.display = 'none';

    const loginButton = document.getElementById('loginButton');
    loginButton.parentNode.removeChild(loginButton);

    const registrButton = document.getElementById('registrButton');
    registrButton.parentNode.removeChild(registrButton);

    // const openWindow = document.getElementById('openWindow');
    // openWindow.parentNode.removeChild(openWindow);

    // const openSection = document.getElementById('openSection');
    // openSection.parentNode.removeChild(openSection);

    // Отображаем контейнер с информацией о пользователе
    const userContainer = document.querySelector('.user-container');
    userContainer.style.display = 'flex';

    // Заполняем контейнер информацией о пользователе
    userContainer.querySelector('.user-name').textContent = loggedInUser.username;
    userContainer.querySelector('.user-role').textContent = loggedInUser.role;
}
// КОНЕЦ

let currentUser = loggedInUser; // Текущий зарегистрированный пользователь
let selectedUser = null; // Текущий выбранный пользователь



const givePrivilegeButton = document.getElementById('givePrivilegeButton');
const losePrivilegeButton = document.getElementById('losePrivilegeButton');

givePrivilegeButton.addEventListener('click', () => {
  // Проверяем, имеет ли текущий зарегистрированный пользователь права администратора
  if (currentUser && currentUser.role === 'Администратор') {
    // Проверяем, выбран ли пользователь
    if (selectedUser) {
      // Проверяем, является ли выбранный пользователь модератором
      if (selectedUser.role === 'Модератор') {
        alert('Этот пользователь уже является модератором');
      } else {
        // Выдаем права модератора выбранному пользователю
        selectedUser.role = 'Модератор';
        alert('Вы назначили нового модератора');

        // Получаем текущий список пользователей из localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Находим индекс выбранного пользователя в массиве
        const userIndex = users.findIndex(user => user.username === selectedUser.username);

        // Обновляем статус выбранного пользователя в массиве
        users[userIndex].role = selectedUser.role;

        // Сохраняем обновленный массив пользователей в localStorage
        localStorage.setItem('users', JSON.stringify(users));
      }
    } else {
      alert('Пожалуйста, выберите пользователя');
    }
  } else {
    alert('У вас нет прав для выполнения этого действия');
  }
});
losePrivilegeButton.addEventListener('click', () => {
  // Проверяем, имеет ли текущий зарегистрированный пользователь права администратора
  if (currentUser && currentUser.role === 'Администратор') {
    // Проверяем, выбран ли пользователь
    if (selectedUser) {
      // Проверяем, является ли выбранный пользователь модератором
      if (selectedUser.role === 'Модератор') {
        // Отзываем права модератора у выбранного пользователя
        selectedUser.role = 'Пользователь';
        alert('Вы разжаловали модератора');

        // Получаем текущий список пользователей из localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Находим индекс выбранного пользователя в массиве
        const userIndex = users.findIndex(user => user.username === selectedUser.username);

        // Обновляем статус выбранного пользователя в массиве
        users[userIndex].role = selectedUser.role;

        // Сохраняем обновленный массив пользователей в localStorage
        localStorage.setItem('users', JSON.stringify(users));
      } else {
        alert('Этот пользователь не является модератором');
      }
    } else {
      alert('Пожалуйста, выберите пользователя');
    }
  } else {
    alert('У вас нет прав для выполнения этого действия');
  }
});



// ВЕСЬ КОД С ПРОШЛОГО SEARCH 

function openCreate() {
  document.getElementById("sectionForm").style.display = "block";
  var newsContainer = document.getElementById("sections");
  if (newsContainer.style.maxHeight === "915px") {
    newsContainer.style.maxHeight = "765px";
  } else {
    newsContainer.style.maxHeight = "915px";
  }

}


function closeCreate(){
  var popup = document.getElementById("sectionForm");
  popup.style.display="none";
  var newsContainer = document.getElementById("sections");
  if (newsContainer.style.maxHeight === "765px") {
    newsContainer.style.maxHeight = "915px";
  } else {
    newsContainer.style.maxHeight = "765px";
  }
}
function createSection() {
  var sectionTitle = document.getElementById("postTitle").value;
  var sectionImage = document.getElementById("postImage").files[0];

  var existingSections = document.querySelectorAll("#sections a");
  for (var i = 0; i < existingSections.length; i++) {
      if (existingSections[i].innerHTML === sectionTitle) {
          alert("Раздел с таким именем уже существует!");
          return;
      }
  }

  var reader = new FileReader();
  reader.onload = function(e) {
  var section = document.createElement("div");
  section.style.backgroundImage = "url('" + e.target.result + "')";
  var link = document.createElement("a");
  link.href = "#";
  link.innerHTML = sectionTitle;
  link.onclick = function() {
      openSection(sectionTitle);
      return false;
  }

  section.appendChild(link);


  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
    section.remove();
    saveSections();
  }

  link.style.textDecoration = "none";
  link.style.color = "white";
  deleteButton.style.position = "absolute";
  deleteButton.style.bottom = "0";
  deleteButton.style.right = "0";

  section.style.position = "relative";


// }
  section.appendChild(deleteButton);

  document.getElementById("sections").appendChild(section);
  saveSections();
  }
  reader.readAsDataURL(sectionImage);
}

var currentSection = null;

function openSection(title) {

  currentSection = title;
    document.querySelector("h2").innerHTML = currentSection;
    document.getElementById("sections").style.display = "none";
    var createButton = document.querySelector(".center-container .button");
    createButton.innerHTML = "Создать тему";
    createButton.onclick = openCreateTopic;
     loadTopics();
}
function openCreateTopic() {
    var topicForm = document.createElement("div");
    topicForm.classList.add("topic-form");
    topicForm.innerHTML = '<div> <ul style="border: 1.5px solid #929292"> <li><input type="text" id="topicTitle" placeholder="Введите название темы"> </li> </li> <li><button onclick="createTopic()">Создать</button> </li> <li><button onclick="closeCreateTopic()">Закрыть</button> </li> </ul> </div>';
    var createButton = document.querySelector (".center-container .button");
//     document.querySelector(".center-container").appendChild(topicForm);
    createButton.parentNode.insertBefore(topicForm, createButton);
 }

function closeCreateTopic() {
    var topicForm = document.querySelector(".center-container .topic-form");
    topicForm.remove();
}

function closePopup() {
  document.getElementById("sectionForm").style.display = "none";
}

function saveSections() {
  var sectionsHTML = document.getElementById("sections").innerHTML;
  localStorage.setItem("sections", sectionsHTML);
}

function loadSections() {
  var sectionsHTML = localStorage.getItem("sections");
  if (sectionsHTML) {
  document.getElementById("sections").innerHTML = sectionsHTML;
  addEventListeners();
  }
}

function addEventListeners() {
  var links = document.querySelectorAll("#sections a");
  for (var i = 0; i < links.length; i++) {
  links[i].onclick = function() {
      openSection(this.innerHTML);
      return false;
  }
  }

  var buttons = document.querySelectorAll("#sections button");
  for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
      this.parentNode.remove();
      saveSections();
  }
  }
}

// function addEventListeners() {
//   var links = document.querySelectorAll("#sections a");
//   for (var i = 0; i < links.length; i++) {
//     links[i].onclick = function() {
//       openSection(this.innerHTML);
//       return false;
//     }
//   }

//   // Получаем информацию о текущем пользователе из localstorage
//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//   // Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
//   if (loggedInUser && loggedInUser.role === 'Администратор') {
//     var buttons = document.querySelectorAll("#sections button");
//     for (var i = 0; i < buttons.length; i++) {
//       buttons[i].onclick = function() {
//         this.parentNode.remove();
//         saveSections();
//       }
//     }
//   }
// }
// window.onload = function() {
//   loadSections();
//   loadTopics();
// }




function createTopic() {
  var topicTitle = document.getElementById("topicTitle").value;
  var topicDiv = document.createElement("div");
  topicDiv.classList.add("topicDiv");
  var existingTopics = document.querySelectorAll(".topicDiv a");
  for (var i = 0; i < existingTopics.length; i++) {
    if (existingTopics[i].innerHTML === topicTitle) {
        alert("Тема с таким названием уже существует!");
        return;
    }
  }
  var link = document.createElement("a");
  link.href = "#";
  link.innerHTML = topicTitle;
  link.onclick = function() {
  openTopic(topicTitle);
  return false;
  }
  topicDiv.appendChild(link);
  link.style.textDecoration = "underline";
  link.style.color = "white";
  topicDiv.style.margin = "10px";
  topicDiv.style.padding = "5px";
  topicDiv.style.border= "0.5px solid #929292";
  topicDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
// Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && (loggedInUser.role === 'Администратор' || loggedInUser.role === 'Модератор')) {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
  topicDiv.remove();
  saveTopics();
  }
  deleteButton.style.float = "right";
  topicDiv.appendChild(deleteButton);
}
  document.querySelector(".center-container").appendChild(topicDiv);
  saveTopics();
}

  function openCreatePost() {
  var postForm = document.createElement("div");
  postForm.classList.add("post-form");
  postForm.innerHTML = '<div> <ul style="border: 1.5px solid #929292"> <li><input type="text" id="postTitle" placeholder="Введите название темы">  <li> <input type="text" id="topicText" placeholder="Введите основное содержание"> </li> <li> <input type="file" id="topicFile" accept="image/*,audio/*,video/*">  </li> <li><button onclick="createPost()">Создать</button> </li> <li><button onclick="closeCreatePost()">Закрыть</button> </li> </ul> </div>';
  var createButton = document.querySelector (".center-container .button");
  createButton.parentNode.insertBefore(postForm, createButton);
  }

  function closeCreatePost() {
  var topicForm = document.querySelector(".center-container .post-form");
  topicForm.remove();
  }

  var currentTopic = null;

  function openTopic(topicTitle) {
  var topicDivs = document.querySelectorAll(".topicDiv");
  for (var i = 0; i < topicDivs.length; i++) {
  topicDivs[i].remove();
  }

  var postDivs = document.querySelectorAll(".postDiv");
  for (var i = 0; i < postDivs.length; i++) {
  postDivs[i].remove();
  }

   currentTopic = topicTitle;

  document.querySelector(".header h2").innerHTML = currentTopic;
  // var createButton = document.querySelector(".center-container .button");
  // createButton.innerHTML = "Создать пост";
  // createButton.onclick = openCreatePost;
  if (loggedInUser) {
  var oldButton = document.querySelector(".center-container .button");
  oldButton.parentNode.removeChild(oldButton);

  var newButton = document.createElement("button");
  newButton.innerHTML = "Создать пост";
  newButton.classList.add("button");
  newButton.id = "createnewPost";
  newButton.onclick = openCreatePost;
  newButton.style.padding="4px";
  newButton.style.height ="50px";
  var container = document.querySelector(".header");
  container.appendChild(newButton);
  newButton.onclick = openCreatePost;
}

  loadPosts();
  }

  function saveTopics() {
  var currentSectionTitle = document.querySelector("h2").innerHTML;
  var topicTitles = [];
  var links = document.querySelectorAll(".topicDiv a");
  for (var i = 0; i < links.length; i++) {
  topicTitles.push(links[i].innerHTML);
  }
  localStorage.setItem("topics-" + currentSectionTitle, JSON.stringify(topicTitles));
  }

  function loadTopics() {
  var currentSectionTitle = document.querySelector("h2").innerHTML;
  var topicTitles = JSON.parse(localStorage.getItem("topics-" + currentSectionTitle));
  if (topicTitles) {
  for (var i = 0; i < topicTitles.length; i++) {
  var topicTitle = topicTitles[i];
  var topicDiv = document.createElement("div");
  topicDiv.classList.add("topicDiv");
  var link = document.createElement("a");
  link.href = "#";
  link.innerHTML = topicTitle;
  link.onclick = (function(title) {
      return function() {
          openTopic(title);
          return false;
      }
  })(topicTitle);
  topicDiv.appendChild(link);
  link.style.textDecoration = "underline";
  link.style.color = "white";
  topicDiv.style.margin = "10px";
  topicDiv.style.padding = "5px";
  topicDiv.style.border= "0.5px solid #929292";
  topicDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
// Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && (loggedInUser.role === 'Администратор' || loggedInUser.role === 'Модератор')) {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
      topicDiv.remove();
      saveTopics();
  }

  topicDiv.appendChild(deleteButton);
 }  
  document.querySelector(".center-container").appendChild(topicDiv);
  }
  }
  }


  function createPost() {
  var postTitle = document.getElementById("postTitle").value;
  var postText = document.getElementById("topicText").value;
  var postFile = document.getElementById("topicFile").files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
  var postFileData = e.target.result;
  var postDiv = document.createElement("div");
  postDiv.classList.add("postDiv");
  var title = document.createElement("h3");
  title.innerHTML = postTitle;
  postDiv.appendChild(title);
  var text = document.createElement("p");
  text.innerHTML = postText;
  postDiv.appendChild(text);

  if (postFile && postFile.type) {
      var fileElement;
      if (postFile.type.startsWith("image/")) {
          fileElement = document.createElement("img");
          fileElement.src = postFileData;
          fileElement.style.maxWidth = "350px";
          fileElement.style.marginLeft = "10px";
      } else if (postFile.type.startsWith("audio/")) {
          fileElement = document.createElement("audio");
          fileElement.src = postFileData;
          fileElement.controls = true;
          fileElement.style.marginLeft = "10px";
      } else if (postFile.type.startsWith("video/")) {
          fileElement = document.createElement("video");
          fileElement.src = postFileData;
          fileElement.controls = true;
          fileElement.style.maxWidth = "350px";
          fileElement.style.marginLeft = "10px";
      }
      if (fileElement) {
          postDiv.appendChild(fileElement);
      }
  }

  // var userInfo = document.createElement("div");
  // userInfo.style.textAlign = "right";

  // var userImage = document.createElement("img");
  // userImage.src = "images/kot.jpg";
  // userImage.style.width = "50px";
  // userInfo.appendChild(userImage);

  // var usernameElement = document.createElement("p");
  // usernameElement.innerHTML = loggedInUser.username;
  // userInfo.appendChild(usernameElement);

  // var userStatus = document.createElement("p");
  // userStatus.innerHTML = loggedInUser.role;
  // userInfo.appendChild(userStatus);

  // postDiv.appendChild(userInfo);

  text.style.color = "white";
  title.style.color = "white";
  var date = new Date();
  var dateElement = document.createElement("p");
  dateElement.innerHTML = date.toLocaleString();
  dateElement.style.color = "white";
  dateElement.style.marginRight = "10px";
  postDiv.appendChild(dateElement);
  postDiv.style.border= "0.5px solid #929292";
  postDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
  postDiv.style.margin = "10px";
  text.style.marginLeft = "10px";
  title.style.marginLeft = "10px";

// Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && (loggedInUser.role === 'Администратор' || loggedInUser.role === 'Модератор')) {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
  postDiv.remove();
  savePosts();
  }
  dateElement.style.position = "absolute";
  dateElement.style.top = "0";
  dateElement.style.right = "0";

  deleteButton.style.position = "absolute";
  deleteButton.style.bottom = "0";
  deleteButton.style.right = "0";
  postDiv.style.position = "relative";
  postDiv.appendChild(deleteButton);
}

  document.querySelector(".center-container").appendChild(postDiv);
  savePosts();
  }
    if (postFile && postFile.type) {
        reader.readAsDataURL(postFile);
    } else {
        reader.onload({target: {}});
  }
  }

  function savePosts() {
  if (!currentTopic) return;
  var posts = [];
  var postDivs = document.querySelectorAll(".postDiv");
  for (var i = 0; i < postDivs.length; i++) {
  var title = postDivs[i].querySelector("h3").innerHTML;
  var text = postDivs[i].querySelector("p").innerHTML;
  var dateElement = postDivs[i].querySelector(".post-date");
  var date = dateElement ? dateElement.innerHTML : new Date().toLocaleString();
  var fileElement = postDivs[i].querySelector("img, audio, video");
  var fileData = null;
  if (fileElement) {
  fileData = fileElement.src;
  }
  posts.push({title: title, text: text, fileData: fileData, date: date});
  }
  localStorage.setItem("posts-" + currentTopic, JSON.stringify(posts));
  }

  function loadPosts() {
  if (!currentTopic) return;
  var posts = JSON.parse(localStorage.getItem("posts-" + currentTopic));
  if (posts) {
  for (var i = 0; i < posts.length; i++) {
  var postTitle = posts[i].title;
  var postText = posts[i].text;
  var postFileData = posts[i].fileData;
  var postDiv = document.createElement("div");
  postDiv.classList.add("postDiv");
  var title = document.createElement("h3");
  title.innerHTML = postTitle;
  postDiv.appendChild(title);
  var text = document.createElement("p");
  text.innerHTML = postText;
  postDiv.appendChild(text);

  if (postFileData) {
      var fileElement;
      if (postFileData.startsWith("data:image/")) {
          fileElement = document.createElement("img");
          fileElement.src = postFileData;
          fileElement.style.maxWidth = "350px";
          fileElement.style.marginLeft = "10px";
      } else if (postFileData.startsWith("data:audio/")) {
          fileElement = document.createElement("audio");
          fileElement.src = postFileData;
          fileElement.controls = true;
          fileElement.style.maxWidth = "350px";
          fileElement.style.marginLeft = "10px";
      } else if (postFileData.startsWith("data:video/")) {
          fileElement = document.createElement("video");
          fileElement.src = postFileData;
          fileElement.controls = true;
          fileElement.style.maxWidth = "350px";
          fileElement.style.marginLeft = "10px";
      }
      if (fileElement) {
          postDiv.appendChild(fileElement);
      }
  }

  text.style.color = "white";
  title.style.color = "white";
  // var date = new Date();
  var dateElement = document.createElement("p");
  dateElement.innerHTML = posts[i].date;
  dateElement.classList.add("post-date");
  dateElement.style.color = "white";
  dateElement.style.marginRight = "10px";
  postDiv.appendChild(dateElement);
  postDiv.style.border= "0.5px solid #929292";
  postDiv.style.background ="linear-gradient(28deg, rgba(255, 85, 0, 1) 9%, rgba(128, 76, 46, 1) 84%)";
  postDiv.style.margin = "10px";
  text.style.marginLeft = "10px";
  title.style.marginLeft = "10px";

// Получаем информацию о текущем пользователе из localstorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Проверяем, авторизован ли пользователь и имеет ли он статус "Администратор"
if (loggedInUser && (loggedInUser.role === 'Администратор' || loggedInUser.role === 'Модератор')) {
  // Если пользователь авторизован и имеет статус "Администратор", отображаем кнопку "Удалить"
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
      postDiv.remove();
      savePosts();
  }
  dateElement.style.position = "absolute";
  dateElement.style.top = "0";
  dateElement.style.right = "0";

  deleteButton.style.position = "absolute";
  deleteButton.style.bottom = "0";
  deleteButton.style.right = "0";
  postDiv.style.position = "relative";
  postDiv.appendChild(deleteButton);

}

  document.querySelector(".center-container").appendChild(postDiv);
  }
  }
  }



// КОНЕЦ

// function addAdminUser() {
//   // Получаем массив пользователей из localStorage
//   let users = JSON.parse(localStorage.getItem('users')) || [];

//   // Проверяем, есть ли уже пользователь со статусом "Администратор"
//   const adminUser = users.find(user => user.role === 'Администратор');

//   // Если пользователь со статусом "Администратор" отсутствует, добавляем его
//   if (!adminUser) {
//     users.push({
//       username: 'Admin',
//       password: '1',
//       role: 'Администратор'
//     });
//     localStorage.setItem('users', JSON.stringify(users));
//   }
// }

// // Функция для удаления пользователя со статусом "Администратор"
// function removeAdminUser() {
//   // Получаем массив пользователей из localStorage
//   let users = JSON.parse(localStorage.getItem('users')) || [];

//   // Удаляем пользователя со статусом "Администратор" из массива
//   users = users.filter(user => user.role !== 'Администратор');

//   // Сохраняем обновленный массив в localStorage
//   localStorage.setItem('users', JSON.stringify(users));
// }

// Добавляем пользователя со статусом "Администратор" при загрузке страницы
// addAdminUser();
// localStorage.clear();