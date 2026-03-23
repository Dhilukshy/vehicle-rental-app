/**
 * DriveEase - Core Script
 * Handles vehicle data, category filtering, and the dynamic booking modal.
 */

// 1. Database: Extended with Bus category and more metadata
const vehicles = [
    { 
        id: 1, 
        name: "Tesla Model 3", 
        rating: 4.9, 
        loc: "Colombo 07", 
        seats: 5, 
        price: 120, 
        type: "Car",
        vNum: "WP CAB-1010", 
        desc: "Premium electric sedan. Autopilot enabled for high-end comfort and safety.", 
        owner: "Supun P.", 
        contact: "0771234567", 
        rented: 156, 
        feedback: "Smooth and silent!",
        img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600"
    },
    { 
        id: 2, 
        name: "Yamaha R1", 
        rating: 4.8, 
        loc: "Kandy", 
        seats: 1, 
        price: 45, 
        type: "Bike",
        vNum: "CP BIK-2020", 
        desc: "Superbike for enthusiasts. High-performance engine for the open road.", 
        owner: "Amila K.", 
        contact: "0719876543", 
        rented: 42, 
        feedback: "A beast on the road!",
        img: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=600"
    },
    { 
        id: 3, 
        name: "Luxury Coach X200", 
        rating: 4.7, 
        loc: "Galle", 
        seats: 45, 
        price: 350, 
        type: "Bus",
        vNum: "SP BUS-5050", 
        desc: "Fully air-conditioned luxury bus with reclining seats. Perfect for large groups.", 
        owner: "Lanka Travels", 
        contact: "0112345678", 
        rented: 89, 
        feedback: "Perfect for our company trip!",
        img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600"
    },
    { 
        id: 4, 
        name: "Toyota Hiace", 
        rating: 4.6, 
        loc: "Negombo", 
        seats: 14, 
        price: 180, 
        type: "Van",
        vNum: "WP VAN-9922", 
        desc: "Reliable and spacious van. Ideal for airport pickups and family tours.", 
        owner: "Ruwan D.", 
        contact: "0755566778", 
        rented: 210, 
        feedback: "Very clean and punctual.",
        img: "https://images.unsplash.com/photo-1532939163844-547f958e91b4?w=600"
    }
];

// 2. Filter Functionality
function filter(cat, el) {
    // UI Update: Active class on pills
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    if(el) el.classList.add('active');
    
    // Data Filtering
    const data = cat === 'All' ? vehicles : vehicles.filter(v => v.type === cat);
    
    // Render Grid
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = data.map(v => `
        <div class="v-card-modern">
            <img src="${v.img}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:1.5rem">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3 style="margin:0">${v.name}</h3>
                    <span style="color:var(--primary); font-weight:800">${v.rating} ⭐</span>
                </div>
                <p style="color:var(--slate); font-size:0.8rem; margin:10px 0">📍 ${v.loc} • 👤 ${v.seats} Seats</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <span style="font-weight:800; font-size:1.1rem">$${v.price}/day</span>
                    <button onclick="openModal(${v.id})" 
                        style="padding:8px 15px; border-radius:8px; border:none; background:var(--dark-bg); color:white; cursor:pointer;">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Modal & Booking Logic
function openModal(id) {
    const v = vehicles.find(x => x.id === id);
    const initialDays = 1;
    
    document.getElementById('modalBody').innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
            <div style="position:relative;">
                <img src="${v.img}" style="width:100%; height:100%; object-fit:cover; border-radius:20px;">
                <div style="position:absolute; bottom:15px; left:15px; background:rgba(0,0,0,0.6); padding:5px 15px; border-radius:10px; backdrop-filter:blur(5px);">
                    <p style="color:white; font-size:0.8rem; margin:0;">${v.type} Class</p>
                </div>
            </div>
            
            <div style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <h1 style="margin-bottom:5px;">${v.name}</h1>
                    <span style="background:rgba(255,255,255,0.05); border:1px solid var(--border); padding:4px 10px; border-radius:5px; font-size:0.7rem; color:var(--slate);">REG: ${v.vNum}</span>
                    
                    <div style="margin:20px 0;">
                        <label style="margin-right:15px; cursor:pointer;"><input type="checkbox" checked> Hire with Driver</label>
                        <label style="cursor:pointer;"><input type="checkbox"> Self Rent</label>
                    </div>
                    
                    <p style="color:var(--slate); line-height:1.6; margin-bottom:20px;">${v.desc}</p>
                    
                    <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:15px; border:1px solid var(--border);">
                        <p style="margin-bottom:5px;"><b>Owner:</b> ${v.owner}</p>
                        <p style="margin-bottom:5px;"><b>Contact:</b> ${v.contact}</p>
                        <p style="color:var(--primary); font-weight:700">Daily Rate: $${v.price}</p>
                    </div>
                </div>

                <div style="margin-top:20px; background:rgba(16, 185, 129, 0.08); padding:20px; border-radius:20px; border:1px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <span style="font-weight:600;">Days to Rent:</span>
                        <input type="number" id="rentDays" value="${initialDays}" min="1" 
                            oninput="updateTotalPrice(${v.price})"
                            style="width:80px; padding:8px; border-radius:8px; border:1px solid var(--border); background:var(--dark-bg); color:white; text-align:center;">
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <span style="font-weight:600;">Total Estimate:</span>
                        <span id="totalDisplay" style="font-size:1.5rem; font-weight:800; color:var(--primary);">$${v.price * initialDays}</span>
                    </div>

                    <button onclick="bookNow('${v.name}', ${v.price})" 
                        style="width:100%; padding:15px; border-radius:12px; border:none; background:var(--primary); color:white; font-weight:800; cursor:pointer; font-size:1rem; transition:0.3s;">
                        Confirm & Book Now
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modal').style.display = 'flex';
}

// 4. Live Calculation Utility
function updateTotalPrice(dailyRate) {
    const days = document.getElementById('rentDays').value || 0;
    const total = Math.max(0, days) * dailyRate;
    document.getElementById('totalDisplay').innerText = `$${total}`;
}

// 5. Booking Process
function bookNow(vehicleName, dailyRate) {
    const days = document.getElementById('rentDays').value;
    
    if (days < 1) {
        alert("Please select at least 1 day for the rental.");
        return;
    }
    
    const total = days * dailyRate;
    
    // Simulation of API call
    console.log(`Booking Request: ${vehicleName} for ${days} days. Total: $${total}`);
    
    alert(`📅 Success!\n\nBooking for ${vehicleName} has been recorded.\nDuration: ${days} day(s)\nTotal Cost: $${total}\n\nThe owner will contact you shortly.`);
    closeModal();
}

// 6. UI Helpers
function closeModal() { 
    document.getElementById('modal').style.display = 'none'; 
}

// Initial Load (Default view)
window.onload = () => {
    if(document.getElementById('list')) {
        filter('All');
    }
};