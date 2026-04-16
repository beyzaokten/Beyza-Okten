let objects = [];

// Tork hesabı için obje ağırlığı x destek noktası uzaklığı
function calculateTorques() {
    let leftTorque = 0;
    let rightTorque = 0;

    objects.forEach(function(obj){
     let torque = obj.weight * obj.distance;
     if (obj.side === 'left'){
        leftTorque+=torque;
     }else {
        rightTorque+=torque;
     }
    });

    return {leftTorque,rightTorque};
}

// Sağ taraf pozitif, sol taraf negatif olarak ele alınır
function calculateAngle(leftTorque,rightTorque) {
    return Math.max(-30, Math.min(30, (rightTorque-leftTorque)/10));
}

//Click Handler
const plank = document.getElementById('plank');

plank.addEventListener('click',function(e){
    //Tıklama pozisyonu 
    const rect = plank.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const plankWidth = plank.offsetWidth; //400px
    const pivotX = plankWidth /2; //Merkez = 200px

    const distance = Math.abs(clickX-pivotX);
    const side = clickX < pivotX ? 'left' : 'right';

    //Random ağırlık
    const weight = Math.floor(Math.random()*10)+1;

    const obj = {
        id: Date.now(),
        weight:weight,
        distance:distance,
        side:side,
        clickX:clickX

    };

    objects.push(obj);
    
})