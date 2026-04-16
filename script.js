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
