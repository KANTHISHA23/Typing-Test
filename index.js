const para=[ "The sun peeked through the dense canopy of trees, casting dappled shadows on the forest floor. Birds chirped in the distance, their melodic tunes echoing through the woodland. A gentle breeze rustled the leaves, creating a soothing symphony of nature's orchestra.",

"The old bookstore stood at the corner of the bustling street, its weathered facade adorned with ivy creeping up the walls. Inside, shelves were stacked with books of all shapes and sizes, each holding stories waiting to be discovered. The scent of aged paper lingered in the air, inviting visitors to lose themselves in the magic of words.",

"High above the city skyline, skyscrapers pierced the clouds, reaching for the heavens. The hustle and bustle of urban life painted a vibrant picture below, with cars honking, people rushing, and buildings standing tall as monuments to human endeavor.",

"In the tranquil countryside, fields stretched endlessly, adorned with colorful wildflowers swaying in the gentle breeze. A farmer tended to the crops, his weathered hands working in rhythm with the cycles of nature.",

"A lone figure stood atop the cliff, gazing out at the vast expanse of the ocean. Waves crashed against the rocks below, sending sprays of salty mist into the air. Seagulls soared overhead, riding the currents with effortless grace.",

"The quaint village nestled in the valley seemed frozen in time, with cobblestone streets winding between charming cottages adorned with blooming flower gardens. The sound of laughter and chatter filled the air as villagers went about their day.",

"At the heart of the bustling city, a fountain adorned with intricate sculptures served as a meeting point for locals and tourists alike. Water cascaded down in mesmerizing patterns, reflecting the vibrant energy of the urban landscape.",

"In the distant mountains, a hiker trekked along rugged trails, surrounded by breathtaking vistas of snow-capped peaks and lush valleys. The crisp mountain air filled their lungs as they embraced the serenity of the wilderness.",

"Amidst the desert sands, a caravan of camels traversed the dunes, their silhouettes etched against the fiery hues of the setting sun. The vast emptiness of the desert held an inexplicable allure, drawing adventurers seeking the beauty of solitude.",

"Deep within the tropical rainforest, exotic creatures danced among emerald foliage, their vibrant colors a testament to the wonders of biodiversity. The symphony of chirping insects and rustling leaves created an immersive sensory experience.",];

let textArea= document.querySelector(".para p");
let inputArea=document.querySelector(".wrapper .text-area");
let timeTag= document.querySelector(".time-left span b");
let misTag=document.querySelector(".mistake span b");
let wpmTag=document.querySelector(".wpm span b");
let cpmTag=document.querySelector(".cpm span b");
let btn=document.querySelector(".details button");

function formingPara(){

    let ranIndex= Math.floor(Math.random()*para.length); //random whole numbers to fit within the max words of para 
    textArea.innerHTML="";
    para[ranIndex].split("").forEach(char =>{
      let span= `<span>${char}</span>`; //to target each character separately
      textArea.innerHTML+= span;
     } );
    textArea.querySelectorAll("span")[0].classList.add("active"); //adding active class to the classList of 1st letters

}
let timer;
let maxTime=60;
let timeLeft= 60;
let charIndex= mistakes=0;
let isTyping =false;

function Typing(){

    let characters =textArea.querySelectorAll("span");
    let currChar =inputArea.value.split("")[charIndex]; 
    console.log(currChar);
    if(charIndex< characters.length-1 && timeLeft>0)
    {
        if(!isTyping){
            timer=setInterval(intimer,1000); //timer starts in 1 sec   
            isTyping=true; //typing is in progress
        }
       if(currChar == null)  //in case of deletion
       {
        if(charIndex>0)  
        {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"));// if the character has incorrect class in its classList
              mistakes--; //if it was a mistake then mistake is deleted 
            characters[charIndex].classList.remove("incorrect","correct"); // reseting
        }
       }
        else{
          if(characters[charIndex].innerHTML== currChar)
              characters[charIndex].classList.add("correct");
           else
            {
              mistakes++;
              characters[charIndex].classList.add("incorrect");
            }
        charIndex++;// index not increased while not typing and deletion case
       }
       characters.forEach(span => span.classList.remove("active"));
       characters[charIndex].classList.add("active");
       
       let wpm= Math.round(((charIndex-mistakes)/5)/(maxTime-timeLeft)*60);
       if(wpm<=0 || wpm== Infinity)
          wpm=0;

       misTag.innerText = mistakes;
       wpmTag.innerText = wpm;
       cpmTag.innerText = charIndex-mistakes;
    }
    else{
        clearInterval(timer); //if timeLeft is 0 or less than 0, timer is reset
        inputArea.value="";
    }
  }

function intimer(){
  if(timeLeft>0)
  {
    timeLeft--;
    timeTag.innerText=timeLeft;
    let wpm= Math.round(((charIndex-mistakes)/5)/(maxTime-timeLeft)*60); //dynamic updation
    wpmTag.innerText=wpm;
  }
  else
    clearInterval(timer);
}

function reseting(){
  
    formingPara();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    inputArea.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    misTag.innerText = 0;
    cpmTag.innerText = 0;
}

formingPara();
inputArea.addEventListener("input",Typing);
btn.addEventListener("click",reseting);
