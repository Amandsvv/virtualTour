const data = {
    "Auditoriums": {
        "Images": ["Images/audi1.jpeg", "Images/audi2.jpg", "Images/audi3.jpg"],
        "description": "The auditorium at Dev Sanskriti Vishwavidyalaya is a vibrant center for cultural, academic, and spiritual expression. It hosts seminars, guest lectures, musical and dance performances, as well as sacred discourses. Designed with acoustics and elegance in mind, the space inspires inner growth and collective harmony. The auditorium is not just a venue—it is a confluence of learning, values, and soulful celebration.",
        "video": "https://www.youtube.com/embed/IeAk7F2T8P4?si=99PVx3J-Pcb44ZO3"
    },
    "Yoga Classes": {
        "Images": ["Images/yoga1.jpg", "Images/yoga2.jpg", "Images/yoga3.jpg"],
        "description": "At Dev Sanskriti Vishwavidyalaya, yoga is not just a physical practice but a sacred path to inner awakening. Daily yoga sessions combine asanas, pranayama, and meditation to nurture holistic well-being—body, mind, and soul. Guided by experienced instructors, these classes draw from ancient yogic wisdom rooted in Indian culture, fostering discipline, harmony, and self-realization in every student.",
        "video": "https://www.youtube.com/embed/cVbqD48dA6c?si=jaO90VcqqxJA3OvC"
    },
    "Library": {
        "Images": ["Images/lib1.jpg", "Images/lib2.jpg", "Images/lib3.jpg"],
        "description": "The library at Dev Sanskriti Vishwavidyalaya is a treasure trove of wisdom, housing thousands of books, manuscripts, and journals focused on Indian culture, spirituality, Ayurveda, psychology, and holistic sciences. Designed to foster a culture of deep learning and research, it provides a peaceful environment where students can engage with ancient scriptures as well as modern academic resources.",
        "video": "https://www.youtube.com/embed/sampleLibrary"
    },
    "Faculties": {
        "Images": ["Images/fc1.jpg", "Images/fc2.jpg", "Images/fc3.jpg"],
        "description": "The faculties at Dev Sanskriti Vishwavidyalaya are a perfect blend of academic scholars and spiritual practitioners. Each faculty member not only teaches their subject with expertise but also imparts life values rooted in Indian ethos. With qualifications from top institutions and a deep understanding of Bharatiya culture, they mentor students to become compassionate leaders and responsible citizens.",
        "video": "https://www.youtube.com/embed/sampleFaculties"
    },
    "Mahakaal Temple": {
        "Images": ["Images/mk1.webp", "Images/mk2.jpg", "Images/mk3.jpg"],
        "description": "The Mahakaal Temple situated within the campus is a spiritual hub for students and faculty alike. Dedicated to Lord Shiva, this serene place promotes inner peace and devotion. Regular aartis, chanting, and meditation sessions offer students a sacred space for reflection and spiritual growth amidst their academic journey.",
        "video": "https://www.youtube.com/embed/sampleMahakaal"
    },
    "Carbon Free Nature": {
        "Images": ["Images/nature1.jpg", "Images/nature2.jpg", "Images/nature3.jpg"],
        "description": "Dev Sanskriti Vishwavidyalaya takes pride in being a carbon-free, sustainable campus. Surrounded by lush greenery and located near the Ganga river and the Himalayas, the campus encourages eco-friendly practices like solar power usage, organic farming, plastic-free initiatives, and a strong focus on environmental awareness among students.",
        "video": "https://www.youtube.com/embed/sampleNature"
    },
    "Mess": {
        "Images": ["Images/mess1.jpg", "Images/mess2.jpg", "Images/mess3.jpg"],
        "description": "The mess at DSVV offers pure, satvik, and hygienically prepared vegetarian meals that align with Ayurvedic principles. Meals are designed to nourish both body and mind, with seasonal fruits, balanced nutrition, and minimal spices. The food experience is not just about eating but cultivating mindful habits and discipline.",
        "video": "https://www.youtube.com/embed/sampleMess"
    },
    "Hostel Facility": {
        "Images": ["Images/hostel1.jpg", "Images/hostel2.jpg", "Images/hostel3.webp"],
        "description": "Hostel facilities at Dev Sanskriti Vishwavidyalaya are safe, clean, and conducive to holistic development. Equipped with modern amenities, separate blocks for boys and girls, regular spiritual routines, and quiet study environments, the hostels offer a nurturing home-away-from-home for students across India and abroad.",
        "video": "https://www.youtube.com/embed/sampleHostel"
    }
};

let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById('dots');

// Generate dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('span');
dots[0].classList.add('active');

function goToSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

let autoSlide = true;

document.querySelector('.carousel').addEventListener('mouseenter', () => autoSlide = false);
document.querySelector('.carousel').addEventListener('mouseleave', () => autoSlide = true);

function startAutoSlide() {
    setTimeout(() => {
        if (autoSlide) nextSlide();
        startAutoSlide();
    }, 4000);
}

startAutoSlide();

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
    if (place.Images && place.Images.length > 0) {
        const imageHTML = place.Images.map(src => `<img src="${src}" alt="${placeName}">`).join('');
        document.getElementById('photosTab').innerHTML = `<div class='Images'>${imageHTML}</div>`;
    } else {
        document.getElementById('photosTab').innerHTML = '<div class="message">No Images available for this location.</div>';
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
