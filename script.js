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

function renderObject(obj){
    const plank = document.getElementById('plank');

    const el = document.createElement('div');
    el.classList.add('weight-object');

    // Her obje için  id ataması
    el.setAttribute('data-id', obj.id);

    //Ağırlığa göre renk değişimi
    const ratio = (obj.weight -1) / 9;
    const r = Math.round(66 + ratio *150);
    const g = Math.round(153 - ratio * 100);
    const b = Math.round(255 - ratio * 150);
    el.style.backgroundColor = `rgb(${r},${g},${b})`;

    el.style.left = (obj.clickX - 20) + 'px';
    el.style.top = '-48px'

    el.innerHTML = `<span>${obj.weight}kg</span>`;
    plank.appendChild(el);
}

function updateSeesaw(){
    const {leftTorque, rightTorque} = calculateTorques();
    const angle = calculateAngle(leftTorque, rightTorque);

    // Tahtayı döndür
    const wrapper = document.getElementById('seesaw-wrapper');
    wrapper.style.transform = `rotate(${angle}deg)`;

    let leftWeight = 0;
    let rightWeight = 0;
    objects.forEach(function(obj){
        if (obj.side === 'left') leftWeight += obj.weight;
        else rightWeight += obj.weight
    });

    document.getElementById('left-total').textContent = leftWeight + ' kg';
    document.getElementById('right-total').textContent = rightWeight + ' kg';
}

// Local Storage
function saveToStorage(){
    localStorage.setItem('seesaw-objects', JSON.stringify(objects));
}

//Sayfa açıldığında kayıtlı veri yüklenir
function loadFromStorage(){
    const saved = localStorage.getItem('seesaw-objects');
    if (!saved) return;

    objects = JSON.parse(saved);

    //Kaydedilen objeleri ekrana çiz
    objects.forEach(function(obj){
        renderObject(obj);
    });

    updateSeesaw();
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
    renderObject(obj);
    updateSeesaw();
    saveToStorage();
    
});

// Sayfa açılınca yükler
loadFromStorage();