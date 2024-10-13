// script.js

document.addEventListener('DOMContentLoaded', () => {
    /* ==============================
       Banner Animation Logic
    ================================= */
    const bannerImages = document.querySelectorAll('.banner .image');
    const bannerScenes = document.querySelectorAll('.banner .scene');
    let bannerCurrentScene = 0;
    const totalBannerScenes = bannerImages.length;
    const bannerIntervalTime = 6000; // 6 seconds

    // Function to show a specific banner scene
    function showBannerScene(sceneIndex) {
        // Hide all scenes
        bannerScenes.forEach(scene => {
            scene.style.opacity = '0';
        });

        // Show the current scene
        bannerScenes[sceneIndex].style.opacity = '1';

        // Remove 'active' and 'slideInFromLeft' classes from all images
        bannerImages.forEach(image => {
            image.classList.remove('active', 'slideInFromLeft');
        });

        // Add 'active' and 'slideInFromLeft' to the current image
        bannerImages[sceneIndex].classList.add('active', 'slideInFromLeft');

        // The second image will automatically have the zoomInOut animation via CSS when active
    }

    // Function to cycle through banner scenes
    function cycleBannerScenes() {
        bannerCurrentScene = (bannerCurrentScene + 1) % totalBannerScenes;
        showBannerScene(bannerCurrentScene);
    }

    // Initialize the first banner scene
    showBannerScene(bannerCurrentScene);

    // Set interval to change banner scenes every 6 seconds
    let bannerInterval = setInterval(cycleBannerScenes, bannerIntervalTime);

    /* ==============================
       Sidebar Advertisement Logic
    ================================= */
    let sidebarCurrentImage = 0;
    const totalSidebarImages = 3;
    const sidebarImagesList = document.querySelectorAll('.sidebar-ad .ad-image');
    const sidebarIntervalTime = 4000; // 4 seconds

    // Function to show a specific sidebar image
    function showSidebarImage(imageIndex) {
        sidebarImagesList.forEach((img, idx) => {
            if (idx === imageIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    // Function to cycle through sidebar images
    function cycleSidebarImages() {
        sidebarCurrentImage = (sidebarCurrentImage + 1) % totalSidebarImages;
        showSidebarImage(sidebarCurrentImage);
    }

    // Initialize the first sidebar image
    showSidebarImage(sidebarCurrentImage);

    // Set interval to change sidebar images every 4 seconds
    let sidebarInterval = setInterval(cycleSidebarImages, sidebarIntervalTime);

    /* ==============================
       Replay Button Functionality
    ================================= */
    const replayButton = document.getElementById('replay-button');

    replayButton.addEventListener('click', () => {
        // Reset Banner Animation
        clearInterval(bannerInterval);
        bannerCurrentScene = 0;
        showBannerScene(bannerCurrentScene);
        bannerInterval = setInterval(cycleBannerScenes, bannerIntervalTime);

        // Reset Sidebar Animation
        clearInterval(sidebarInterval);
        sidebarCurrentImage = 0;
        showSidebarImage(sidebarCurrentImage);
        sidebarInterval = setInterval(cycleSidebarImages, sidebarIntervalTime);
    });

    /* ==============================
       Click Events for Advertisements
    ================================= */
    // Banner Advertisement Click Event
    document.querySelectorAll('.banner .scene').forEach(scene => {
        scene.addEventListener('click', () => {
            window.open('https://www.parakaisprings.co.nz/', '_blank');
        });
    });

    // Sidebar Advertisement Click Event
    document.querySelectorAll('.sidebar-ad .ad-image').forEach(ad => {
        ad.addEventListener('click', () => {
            window.open('https://www.greatjourneysnz.com/', '_blank');
        });
    });

    /* ==============================
       Booking System Step-by-Step
    ================================= */
    let currentStep = 1;
    const steps = document.querySelectorAll('.booking-form .step');
    const summary = document.getElementById('summary');
    const summaryContent = document.getElementById('summary-content');

    // Function to show a specific step
    function showStep(step) {
        steps.forEach((s, index) => {
            if (index === step - 1) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        // Hide summary if not on final step
        if (step < steps.length) {
            summary.classList.remove('active');
        }
    }

    // Next Buttons
    document.querySelectorAll('.booking-form .next-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Previous Buttons
    document.querySelectorAll('.booking-form .prev-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Submit Button
    document.querySelector('.booking-form .submit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const color = document.getElementById('color').value;
        const locker = document.querySelector('input[name="locker"]:checked') ? document.querySelector('input[name="locker"]:checked').value : 'No';
        const terms = document.getElementById('terms').checked;

        // Validation
        if (!terms) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        // Populate Summary
        summaryContent.innerHTML = `
            <p><strong>Date of Attendance:</strong> ${date}</p>
            <p><strong>Adults:</strong> ${adults}</p>
            <p><strong>Children:</strong> ${children}</p>
            <p><strong>Contact Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Ticket Color:</strong> <span style="display:inline-block;width:20px;height:20px;background-color:${color};"></span> ${color}</p>
            <p><strong>Optional Storage Locker:</strong> ${locker}</p>
            <p><strong>Terms & Conditions:</strong> ${terms ? 'Agreed' : 'Not Agreed'}</p>
        `;

        // Show Summary
        steps.forEach(s => s.classList.remove('active'));
        summary.classList.add('active');
    });

    // Reset Button
    document.querySelector('.booking-form .reset-btn').addEventListener('click', () => {
        // Hide summary and show the first step
        summary.classList.remove('active');
        currentStep = 1;
        showStep(currentStep);

        // Clear all inputs
        document.querySelectorAll('.booking-form input').forEach(input => {
            if (input.type === 'radio') {
                input.checked = input.value === 'No'; // Set 'No' as default
            } else if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    });
});
