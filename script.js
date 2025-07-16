
const data = {
    "Auditoriums": {
        "images": ["images/audi1.jpg", "images/audi2.jpg", "images/audi3.jpg"],
        "description": "The auditorium at Dev Sanskriti Vishwavidyalaya is a vibrant center for cultural, academic, and spiritual expression. It hosts seminars, guest lectures, musical and dance performances, as well as sacred discourses. Designed with acoustics and elegance in mind, the space inspires inner growth and collective harmony. The auditorium is not just a venue—it is a confluence of learning, values, and soulful celebration.",
        "video": "https://www.youtube.com/embed/IeAk7F2T8P4?si=99PVx3J-Pcb44ZO3"
    },
    "Yoga Classes": {
        "images": ["images/yoga1.jpg", "images/yoga2.jpg", "images/yoga3.jpg"],
        "description": "At Dev Sanskriti Vishwavidyalaya, yoga is not just a physical practice but a sacred path to inner awakening. Daily yoga sessions combine asanas, pranayama, and meditation to nurture holistic well-being—body, mind, and soul. Guided by experienced instructors, these classes draw from ancient yogic wisdom rooted in Indian culture, fostering discipline, harmony, and self-realization in every student.",
        "video": "https://www.youtube.com/embed/cVbqD48dA6c?si=jaO90VcqqxJA3OvC"
    },
    "Library": {
        "images": ["images/lib1.jpg", "images/lib2.jpg", "images/lib3.jpg"],
        "description": "The library holds rich knowledge on Indian culture, spirituality, and holistic living.",
        "video": "https://www.youtube.com/embed/sampleLibrary"
    },
    "Faculties": {
        "images": ["images/fc1.jpg", "images/fc2.jpg", "images/fc3.jpg"],
        "description": "The faculties at Dev Sanskriti Vishwavidyalaya are more than educators—they are mentors, guides, and torchbearers of Indian culture and values. Each faculty member blends academic excellence with spiritual insight, ensuring that learning goes beyond textbooks. With a deep commitment to holistic education, they inspire students to become responsible, ethical, and enlightened global citizens rooted in Bharatiya wisdom.",
        "video": "https://www.youtube.com/embed/sampleAuditorium"
    }
};

const placesContainer = document.getElementById('places');
Object.keys(data).forEach(place => {
    const div = document.createElement('div');
    div.className = 'place';
    div.innerText = place;
    div.onclick = () => showPlace(place);
    placesContainer.appendChild(div);
});

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}Tab`).style.display = 'block';
}

function showPlace(placeName) {

    if (window.innerWidth <= 900) {
        document.getElementById("sidebar").classList.add("hidden");
    }


    const place = data[placeName];
    document.getElementById('placeName').innerText = placeName;

    // Description
    document.getElementById('descriptionTab').innerText = place.description || 'Description not available.';

    // Photos
    if (place.images && place.images.length > 0) {
        const imageHTML = place.images.map(src => `<img src="${src}" alt="${placeName}">`).join('');
        document.getElementById('photosTab').innerHTML = `<div class='images'>${imageHTML}</div>`;
    } else {
        document.getElementById('photosTab').innerHTML = '<div class="message">No images available for this location.</div>';
    }

    if (place.video) {
        document.getElementById('videoTab').innerHTML = `<iframe src='${place.video}' frameborder='0' allowfullscreen></iframe>`;
    } else {
        document.getElementById('videoTab').innerHTML = '<div class="message">No video available for this location.</div>';
    }

    switchTab('description');
}

document.querySelector(".hamburger").addEventListener('click', () => {
    document.getElementById("sidebar").classList.toggle("hidden");
});


showPlace(Object.keys(data)[0]);
