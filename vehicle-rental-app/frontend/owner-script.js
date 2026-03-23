// Navigation Logic
function showSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show target section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update active button
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    if(sectionId === 'my-vehicles') renderFleet();
}

// Data Management
const vehicleForm = document.getElementById('vehicleForm');

vehicleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newVehicle = {
        id: Date.now(),
        name: document.getElementById('vName').value,
        cat: document.getElementById('vCat').value,
        loc: document.getElementById('vLoc').value,
        seats: document.getElementById('vSeats').value,
        price: document.getElementById('vPrice').value,
        vNum: document.getElementById('vNum').value,
        driver: document.getElementById('vDriver').value,
        img: document.getElementById('vImg').value || 'https://via.placeholder.com/400x250',
        desc: document.getElementById('vDesc').value,
        status: 'Available',
        returns: 'Now',
        rentedTimes: 0
    };

    // Save to LocalStorage
    let myFleet = JSON.parse(localStorage.getItem('myFleet')) || [];
    myFleet.push(newVehicle);
    localStorage.setItem('myFleet', JSON.stringify(myFleet));

    // Notification
    addNotification(`Vehicle "${newVehicle.name}" added successfully!`);
    
    alert('Vehicle Listed!');
    vehicleForm.reset();
    showSection('my-vehicles', document.querySelectorAll('.nav-item')[2]);
});

function renderFleet() {
    const fleetGrid = document.getElementById('fleet-grid');
    const myFleet = JSON.parse(localStorage.getItem('myFleet')) || [];

    if(myFleet.length === 0) {
        fleetGrid.innerHTML = '<p class="muted">No vehicles listed yet.</p>';
        return;
    }

    fleetGrid.innerHTML = myFleet.map(v => `
        <div class="v-card-owner">
            <img src="${v.img}" alt="vehicle">
            <div class="v-card-info">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3 style="margin:0">${v.name}</h3>
                    <span class="status-badge">${v.status}</span>
                </div>
                <p style="font-size:0.8rem; color:#9ca3af; margin:5px 0;">📍 ${v.loc} | 👤 ${v.seats} Seats</p>
                <hr style="opacity:0.1; margin:10px 0;">
                <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                    <span>Price: <b>$${v.price}</b></span>
                    <span>Rented: <b>${v.rentedTimes} times</b></span>
                </div>
                <p style="font-size:0.75rem; margin-top:10px; color:#fbbf24;">Returns: ${v.returns}</p>
            </div>
        </div>
    `).join('');
}

function addNotification(text) {
    const list = document.getElementById('notif-list');
    const li = document.createElement('li');
    li.innerText = `${new Date().toLocaleTimeString()}: ${text}`;
    list.prepend(li);
}

// Initial Call
renderFleet();