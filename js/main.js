let Activities_1 = [];
let Activities_2 = [];
getEle("todo").innerHTML = "";
getEle("completed").innerHTML = "";
let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let month = new Date().getMonth();
let monthName = monthsArray[month];
let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = new Date().getDay();
let dayName = daysArray[day];
let year = new Date().getFullYear();

function getEle(id) {
  return document.getElementById(id);
}
getEle('time').innerHTML = dayName + ", " + monthName + " " + day + ", " + year;

let addtoList = () => {
  let My_Activity = getEle("newTask").value;
  if (My_Activity != "") {
    Activities_1.push(My_Activity);
    write_act_1();
    getEle("newTask").value = "";
    setLocalStorage();
  }
}

let check_change = (index) => {
  Activities_2.push(Activities_1[index]);
  Activities_1.splice(index, 1);
  write_act_1();
  write_act_2();
  setLocalStorage();
}
let write_act_1 = () => {
  let content1 = "";
  for (let i = 0; i < Activities_1.length; i++) {
    content1 +=
      `
      <li>
        <span>${Activities_1[i]}</span>
        <div>
          <button style="border:none"  onclick="check_change('${i}')"> <i class="fa fa-check-circle"></i> </button> 
          <button style="border:none"  onclick="delete_change(Activities_1,${i})"> <i class="far fa-trash-alt"></i> </button>
        </div>
      </li>
      `
  }
  getEle("todo").innerHTML = content1;
}
let write_act_2 = () => {
  let content2 = "";
  for (let i = 0; i < Activities_2.length; i++) {
    content2 +=
      `
      <li>
        <span>${Activities_2[i]}</span>
        <div>
          <button style="border:none"  > <i class="fa fa-check-circle" style = "color: green"></i> </button> 
          <button style="border:none"  onclick="delete_change(Activities_2,${i})"> <i class="far fa-trash-alt"></i> </button> 
        </div>
      </li>
      `
  }
  getEle("completed").innerHTML = content2;
}
let delete_change = (arr, index) => {
  arr.splice(index, 1);
  write_act_1();
  write_act_2();
  setLocalStorage()
}

function setLocalStorage() {
  var dataString1 = JSON.stringify(Activities_1);
  var dataString2 = JSON.stringify(Activities_2);
  localStorage.setItem("actList1", dataString1);
  localStorage.setItem("actList2", dataString2);
}

function getLocalStorage() {
  if (localStorage.getItem("actList1")) {
    var dataString = localStorage.getItem("actList1");
    var dataJSON = JSON.parse(dataString);
     Activities_1 = dataJSON;
    write_act_1();
  }
  if (localStorage.getItem("actList2")) {
    var dataString = localStorage.getItem("actList2");
    var dataJSON = JSON.parse(dataString);
     Activities_2 = dataJSON;
    write_act_2();
  }
}
getLocalStorage();

