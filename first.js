

const findWord = document.querySelector('#findWord');
const mainBlock = document.querySelector('#field');
const result = document.querySelector('#result');
const btnStart = document.querySelector('#myBtn');


const words = ['hello', 'WoRLd', 'hOuSe', 'dog', 'floor'];
let word = 'hello';
let timerSpeed = 10000;
let arrElemResult;
//let mass;

// wordRendom(mainBlock, word);

// buildWord(mainBlock, result);


function positionBlock(elem,x,y) {
    elem.style.left = `${Math.floor(Math.random()*(x - elem.clientWidth ))}px`;
    elem.style.top = `${Math.floor(Math.random()*(y - elem.clientHeight))}px`
}

function wordRendom(elem, word) {
    const arrWord = word.split('');

    for(let item of arrWord){
        let newElem = document.createElement('div');
        newElem.classList.add('random_word');
        newElem.innerText = `${item}`;
        elem.append(newElem);
        positionBlock(newElem,400,300);
    } 
    
}


function buildWord(elem, elemResult) {
    
    const arrElem = elem.querySelectorAll('div');
   
     arrElemResult = elemResult.querySelectorAll('div');
    
   
    elem.addEventListener('click', (event)=>{
        //console.log(event.target);
        //console.dir(event.target);
        const activElem = event.target;
        for(let item of arrElem ){
            if(activElem === item){
                activElem.classList.remove('random_word');
                elemResult.append(activElem);
                arrElemResult = elemResult.querySelectorAll('div');
                
            }
        }
          
    });

    elemResult.addEventListener('click', function(event){
        
        const activElem = event.target;
        for(let item of arrElemResult ){
            if(activElem === item){
                activElem.classList.add('random_word');
                elem.append(activElem);
                arrElemResult = elemResult.querySelectorAll('div');
                
               
            }

        }
          
    });

    
}

function clearElem(elem) {
  const elems = elem.querySelectorAll('div');
    for( let item of elems){
        item.remove();
    }
      
}

function yourResultWords(elems) {
    const resultMass = [];
    for( let item of elems){
        let divMass = [];
        if (item === undefined || item.length === 0 ) {
           divMass.push('------');
            console.log(divMass);
        }else{
            for(let div of item){
                divMass.push(div.innerText);
                //console.dir(div.innerText);
            } 
            
        }
        resultMass.push(divMass.join('')); 
    }
   return resultMass; 
}

function equalArrAndGetPoint(first, second) {
    let point = 0;
    for (let i = 0; i < first.length; i++) {
        if(first[i] === second[i]){
            point++;
        }
    }
    return  point;
}

function yourFinalViewResult(elem, totalPoint, words, yourWords) {
    elem.classList.add('field_result');
    
    total = document.createElement('div');
    elem.append(total);
    total.classList.add('total_point');
    total.innerText = `Points: ${totalPoint}`;

    blockWords = document.createElement('div');
    elem.append(blockWords);
    blockWords.classList.add('words');

    blockYourWords = document.createElement('div');
    elem.append(blockYourWords);
    blockYourWords.classList.add('yourWords');

    p = document.createElement('p');
            p.innerText = 'Words:';
            p.classList.add('title');
            blockWords.append(p); 

    for(let i = 0; i < words.length; i++){
       p = document.createElement('p');
       p.innerText = `${words[i]}`;
       p.classList.add('p_words');
       blockWords.append(p);
    }

    p = document.createElement('p');
            p.innerText = 'Your words:';
            p.classList.add('title');
            blockYourWords.append(p); 
    for(let i = 0; i < yourWords.length; i++){
       p = document.createElement('p');
       p.innerText = `${yourWords[i]}`;
       p.classList.add('p_words');
       blockYourWords.append(p);
    }

}

let switch1 = true;
function startProgramme(elemBtn, elemBlock ) {
    
    
        elemBtn.addEventListener('click', function (event) {
          if(switch1){
            switch1 = !switch1;  
                btnStart.innerText = '****** ';
                elemBlock.classList.remove('field_result'); //для снятия свойст после рестарта
                elemBlock.innerText = 'Are you ready?';
                elemBlock.classList.add('text_start');
                
                console.dir(elemBlock);
                let counter = 3;
                const timerInterval = setInterval(function () {
                    elemBlock.innerText = `${counter}`;
                    counter--; 
                    if(counter === -1 ){
                        clearInterval(timerInterval);
                        
                        elemBlock.innerText = '';
                        elemBlock.classList.remove('text_start');
                        
                        heart();
                        
                        
                    }
                        
                }, 1000)
            }    
        
        });
    
    

    
}





// function heart() {
//     let totalPoint = 0;
//     let counter = 0;
//     let yorWords = [];
//     const totalMass = [];
   
//    const timerInterval = setInterval(function (){
//         if(counter > 0){
//             totalMass.push(arrElemResult);
//             console.log(arrElemResult)
//             arrElemResult = undefined;
//         }
   
//         clearElem(mainBlock);
//         clearElem(result);

//         if (counter < words.length) {
//             wordRendom(mainBlock, words[counter]);

//             buildWord(mainBlock, result);

//         }else{
//             clearInterval(timerInterval);
//             // console.log('TIME');
//             // console.log(totalMass);
//             // console.log(yourResultWords(totalMass));
//             yorWords = yourResultWords(totalMass);
//             totalPoint = equalArrAndGetPoint(words, yorWords);
//             // console.log(totalPoint);

//             yourFinalViewResult(mainBlock, totalPoint, words, yorWords);
//         }
//         counter++;
     
//     }, timerSpeed) 

// }


function heart() {
    let totalPoint = 0;
    let counter = 0;
    let yorWords = [];
    const totalMass = [];

    function foo(){
        
            if(counter > 0){
                totalMass.push(arrElemResult);
                console.log(arrElemResult)
                arrElemResult = undefined;
            }
       
            clearElem(mainBlock);
            clearElem(result);
    
            if (counter < words.length) {
                wordRendom(mainBlock, words[counter]);
    
                buildWord(mainBlock, result);
    
            } else if(counter === words.length){
                clearInterval(timerInterval);
                switch1 = !switch1;
                yorWords = yourResultWords(totalMass);
                totalPoint = equalArrAndGetPoint(words, yorWords);
                btnStart.innerText = 'RESTART';
    
                yourFinalViewResult(mainBlock, totalPoint, words, yorWords);
            }
            counter++;
    }
   // setTimeout(foo,1);
   foo();
   const timerInterval = setInterval(foo, timerSpeed) 

}


startProgramme(btnStart, mainBlock);



   