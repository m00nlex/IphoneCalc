let curValue = 0;
let memValue = 0;
let actionId;
let longHighlightObj = 0;
let numNum = 1;
let res = 0;

function upTime(){
    let now = new Date();
    document.getElementById('time').innerHTML = (now.getHours() / 10 >= 1 ? now.getHours() : '0' + now.getHours()) + ":" + (now.getMinutes() / 10 >= 1 ? now.getMinutes() : '0' + now.getMinutes());
    setTimeout(upTime, 3000);
}
upTime()

function filter(numberEx){
    // for (let i =  value.toString().length; i>=0; i--){
    //     // 56767890053 len = 11, view = 5676789e4
    //     console.log(value.toString()[i])
    // }
    _eNum = (+numberEx).toExponential(5).toString().split('e') //_enum [0] = 5.676789 , [1] = +10
    if (+_eNum[1] >= 5){ //more than 6 zeros in e
        _eNum[0] = +_eNum[0] * Math.pow(10, 5);
        _eNum[1] -= 5;
        numberEx = _eNum[0].toString() + 'e' + _eNum[1].toString();
    }

    return numberEx;
}

function update(value){
    curValue = value;
    document.getElementById('input').innerHTML = filter(curValue);
}

function clear(){
    document.getElementById('input').innerHTML = '0';
    numNum = 1;
    curValue = 0;
}

function makeSum(...props){
    res = 0;
    actionId = actionId || props;
    switch (actionId){
        case 'button4':
            res = +memValue / +curValue
            break;
        case 'button8':
            res = +memValue * +curValue
            break;
        case 'button12':
            res = +memValue - +curValue
            break;
        case 'button16':
            res = +memValue + +curValue
            break;
    }
    if(isNaN(res)) {
        update("Ошибка")
    } else if (!isFinite(res)){
        update("∞")
    } else {
        if (res.toString().length > 9){
             res = 'Ошибка'
        }
        update(res)
    }
}

function highlightOn(target){
    longHighlightObj = target;
    target.classList.add('highlighted')
}
function highlightOff(){
    if(longHighlightObj !== 0 ){
        longHighlightObj.classList.remove('highlighted')
        longHighlightObj = 0;
    }
}

document.getElementById('buttonHolder').onclick = function(event){
    let target = event.target;

    if(target.classList.contains('grayB')){ // num or comma
        if(numNum < 9){
            highlightOff()
            if(target.id === 'button18'){ // comma
                if(curValue.toString() === '0'){
                    update('0.')
                } else if(!curValue.toString().includes('.')) {
                    update(curValue.toString() + '.')
                }
            } else { //num
                if (actionId && longHighlightObj){ // есть активное подсвеченное действие
                    memValue = curValue;
                    update(target.innerHTML)
                } else {
                    if(curValue === 0){
                        update(target.innerHTML)
                    } else {
                        update(curValue + target.innerHTML)
                        numNum++;
                    }
                }
            }
        }
    }
    else if (target.classList.contains('lightGrayB')){
        if (target.id === 'button1') { // AC
            actionId = false;
            highlightOff()
            numNum = 1;
            clear()
        }
        else if (target.id === 'button2'){ // +/-
            update(-curValue)
        }
        else if (target.id === 'button3'){ // %
            update(+curValue/100)
        }
    }

    else if (target.classList.contains('goldB')) {
        if (target.id === 'button19'){ // =
            makeSum()
            highlightOff()
            actionId = false; //удалить активное действие
        } else { // * / + -
            if (actionId){ //уже есть нажатое действие
                if(longHighlightObj){ // действие еще неактивно, так как подсвечено
                    highlightOff()
                    highlightOn(target)
                } else { //действие активно, уже что-то набрано
                    makeSum()
                    memValue = curValue; //запоминаем значение, чтобы стереть для ввода нового числа
                    curValue = 0;
                    numNum = 1;
                    highlightOff() //переключение подсветки
                    highlightOn(target)
                }
                actionId = target.id //обозначить смену действия
            } else { // нажатого действия нет
                actionId = target.id; //запомнить нажатое действие
                memValue = curValue; //запомнить значение, т.к после оно сотрется
                curValue = 0; //стереть значение, но не обновлять иннер
                numNum = 1; //обновить счетчик цифр
                highlightOn(target)
            }
        }
    }
}
