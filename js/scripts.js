
let cities = [];

let used_cities = [];

let first_name = "";
let second_name = "";

let is_first = true;

let last_city = "";


const load = async () => {
  
  const prev_cities = await fetch(
    "https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json"
  );
  
  const data = await prev_cities.text();
 
  const parsed = JSON.parse(data);
 
  Object.entries(parsed.city).forEach(([_, value]) => {

    
    cities.push(value.name);
  });
};


const set_name = (type) => {
  
  if (type === "first_name") {
    
    first_name = document.getElementById("first_name").value;

    
    if (!first_name) {
      
      document.getElementById("first_name_error").classList.add('display_class');
    }
    
    else {
      
      document.getElementById("first_name").disabled = true;
      document.getElementById("first_name_button").disabled = true;
      
      document.getElementById("first_name_button").classList.add('button_inactive');
      
      document.getElementById("first_name_error").classList.remove('display_class');
    }
  }
  
  else {
    
    second_name = document.getElementById("second_name").value;

    
    if (!second_name) {
      
      document.getElementById("second_name_error").classList.add('display_class');
    }
    
    else {
      
      document.getElementById("second_name").disabled = true;
      document.getElementById("second_name_button").disabled = true;
      
      document.getElementById("second_name_button").classList.add('button_inactive');
      
      document.getElementById("second_name_error").classList.remove('display_class');
    }
  }
  
  if (first_name && second_name) {
    initialize_second_window();
  }
};

//2
const initialize_second_window = () => {
  
  let rand_num = Math.floor(Math.random() * (1 - 0 + 1));

  
  document.getElementById("first_header").classList.add('hide_block');
  document.getElementById("second_header").classList.add('display_block');
  document.getElementById("first_div").classList.add('hide_block');
  document.getElementById("second_div").classList.add('display_block');

  
  is_first = rand_num == 0 ? true : false;

  
  document.getElementById("step_announce").innerText =
    "Ваш ход, " + (is_first ? first_name : second_name);
  document.getElementById("first_name_display").innerText = first_name;
  document.getElementById("second_name_display").innerText = second_name;

  document.getElementById("first_name_count").innerText = "0";
  document.getElementById("second_name_count").innerText = "0";
  document.getElementById("last_city_name").innerText = "";
};


const check_city = () => {
  
  let check_value = document.getElementById("player_answer").value;

  
  let error_field = document.getElementById("player_error");

  
  if (!check_value) {
    
    error_field.innerText = `Игрок ${
      is_first ? first_name : second_name
    } обязан ввести имя города!`;
    error_field.classList.add('display_class');
  }
  
  else {
    
    cities.some((value, _) => {
      if (value.toLowerCase() == check_value.toLowerCase()) {
        check_value = value;
        return true;
      }
    });

    
    let last_letter = "";

    
    if (last_city) {
      
      let step_index = last_city.length - 1;
      
      while (["ы", "ъ", "ь", " ", "-"].includes(last_city[step_index])) {
        step_index--;
      }
      last_letter = last_city[step_index].toLowerCase();
    }

    
    if (last_city && check_value[0].toLowerCase() != last_letter) {
      
      error_field.innerText = `Введенный город должен начинаться на ${last_letter}!`;
      error_field.classList.add('display_class');
    }
    
    else if (!cities.includes(check_value)) {
     
      error_field.innerText = `Города ${check_value} не существует.`;
      error_field.classList.add('display_class');
    }
    
    else if (used_cities.includes(check_value)) {
      
      error_field.innerText = `Город ${check_value} уже был использован.`;
      error_field.classList.add('display_class');
    }
  
    else {
      
      error_field.classList.remove('display_class');
      
      last_city = check_value;
      used_cities.push(check_value);
      
      document.getElementById("last_city_name").innerText = check_value;
      
      if (is_first) {
        
        is_first = false;
        
        document.getElementById("step_announce").innerText =
          "Ваш ход, " + second_name;
        document.getElementById("first_name_count").innerText = String(
          Number(document.getElementById("first_name_count").innerText) + 1
        );
      }
      
      else {
        
        is_first = true;
        
        document.getElementById("step_announce").innerText =
          "Ваш ход, " + first_name;
        document.getElementById("second_name_count").innerText = String(
          Number(document.getElementById("second_name_count").innerText) + 1
        );
      }
      
      document.getElementById("player_answer").value = "";
    }
  }
};



const give_up = (user) => {
  
  if (user == "first") {
    
    document.getElementById(
      "congrats"
    ).innerText = `Поздравляем Вас, ${second_name}! Вы - победитель!`;
    document.getElementById(
      "score"
    ).innerText = `Ваш результат (количество отгаданных городов): ${
      document.getElementById("second_name_count").innerText
    }!`;
  }
  
  else {
    
    document.getElementById(
      "congrats"
    ).innerText = `Поздравляем Вас, ${first_name}! Вы - победитель!`;
    document.getElementById(
      "score"
    ).innerText = `Ваш результат (количество отгаданных городов): ${
      document.getElementById("first_name_count").innerText
    }!`;
  }
  
  document.getElementById("second_header").classList.remove('display_block');
  document.getElementById("second_div").classList.remove('display_block');
  document.getElementById("third_div").classList.add('display_block');
};


//3
const start_new = () => {
 
  used_cities = [];
  first_name = "";
  second_name = "";
  last_city = "";

  
  document.getElementById("first_name").value = "";
  document.getElementById("first_name").disabled = false;
  document.getElementById("second_name").value = "";
  document.getElementById("second_name").disabled = false;

 
  document.getElementById("first_name_button").disabled = false;
  document.getElementById("first_name_button").classList.remove('button_inactive');
  document.getElementById("second_name_button").disabled = false;
  document.getElementById("second_name_button").classList.remove('button_inactive');

  
  document.getElementById("third_div").classList.remove('display_block');
  document.getElementById("first_header").classList.remove('hide_block');
  document.getElementById("first_div").classList.remove('hide_block');
};
