let curValue = '0';
let memValue = '0';

function upTime(){
    let now = new Date();
    document.getElementById('time').innerHTML = (now.getHours() / 10 >= 1 ? now.getHours() : '0' + now.getHours()) + ":" + (now.getMinutes() / 10 >= 1 ? now.getMinutes() : '0' + now.getMinutes());
    setTimeout(upTime, 1000);
}
upTime()

function update(value){
    curValue = value;
    document.getElementById('input').innerHTML = curValue;
}

function highlight(target){
    target.classList.add('highlighted')
}

document.getElementById('buttonHolder').onclick = function(event){
    let target = event.target;

    if(target.classList.contains('grayB')){
        if(target.id === 'button18'){ // comma
            if(curValue.toString() === '0'){
                update('0,')
            } else if(!curValue.toString().includes(',')) {
                update(curValue.toString() + ',')
            }
        } else {
            if(curValue === '0'){
                update(target.innerHTML)
            } else {
                update(curValue + target.innerHTML)
            }
        }
    }

    else if (target.classList.contains('goldB')) {
        if (target.id === 'button19'){

        } else {
            memValue = curValue;
            update('0')
            highlight(target)

        }
    }
    console.log("CLICK!")
}
