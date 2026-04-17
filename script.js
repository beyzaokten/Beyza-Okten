let objects = [];

const dropSound = new Audio('drop.mp3');

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

    const currentWidth = plank.offsetWidth;
    el.style.left = (obj.clickRatio * currentWidth - 20) + 'px';
    el.style.top = '-48px'

    el.innerHTML = `<span>${obj.weight}kg</span>`;
    plank.appendChild(el);
}

function updateSeesaw(){
    const {leftTorque, rightTorque} = calculateTorques();
    const angle = calculateAngle(leftTorque, rightTorque);

    // Tahtayı döndür
    const wrapper = document.getElementById('plank');
    plank.style.transform = `rotate(${angle}deg)`;

    let leftWeight = 0;
    let rightWeight = 0;
    objects.forEach(function(obj){
        if (obj.side === 'left') leftWeight += obj.weight;
        else rightWeight += obj.weight
    });

    document.getElementById('left-total').textContent = leftWeight + ' kg';
    document.getElementById('right-total').textContent = rightWeight + ' kg';

    const diff = (rightTorque - leftTorque).toFixed(1);
    const sign = diff > 0 ? '+' : '';
    document.getElementById('torque-diff').textContent = sign + diff;
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
    const clickX = e.offsetX;

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
        clickX:clickX,
        clickRatio: clickX/plankWidth

    };

    objects.push(obj);
    renderObject(obj);
    updateSeesaw();
    saveToStorage();

    dropSound.currentTime = 0;
    dropSound.play();
    
});

// Sayfa açılınca yükler
loadFromStorage();

// Reset Butonu
document.getElementById('reset-btn').addEventListener('click', function(){
    objects = [];

    //Ağırlıkları DOM'dan siler
    const plank = document.getElementById('plank');
    const weightEls = plank.querySelectorAll('.weight-object');
    weightEls.forEach(function(el) { el.remove(); });

    plank.style.transform = 'rotate(0deg)';
    document.getElementById('left-total').textContent = '0 kg';
    document.getElementById('right-total').textContent = '0 kg';
    document.getElementById('torque-diff').textContent = '0';

    localStorage.removeItem('seesaw-objects');
});

//Ekran boyutuna göre obje konumlandırma
window.addEventListener('resize',function(){
    const currentWidth = plank.offsetWidth;
    const els = plank.querySelectorAll('.weight-object');
    els.forEach(function(el){
        const id = parseInt(el.getAttribute('data-id'));
        const obj = objects.find(function(o) {return o.id === id;});
        if(obj){
            el.style.left=(obj.clickRatio * currentWidth - 20) + 'px';
        }
    });
});