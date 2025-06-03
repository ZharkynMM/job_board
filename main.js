document.addEventListener('DOMContentLoaded', () => {
    // Alert on load
    alert("Welcome to JobBoard! Start your career journey today!");

    // Random Number Generation
    const numberGenerator = document.getElementById('refresh-number');
    const numberDisplay = document.getElementById('random-number');

    function generateLuckyNumber() {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        numberDisplay.textContent = randomNum.toString().padStart(3, '0');
    }
    generateLuckyNumber();
    numberGenerator.addEventListener('click', generateLuckyNumber);

    // Features Generation
    const features = [
        { title: "AI Matching", desc: "Smart candidate-job matching" },
        { title: "Alerts", desc: "Instant job notifications" },
        { title: "Analytics", desc: "Detailed career insights" }
    ];

    const featuresContainer = document.getElementById('features-container');
    features.forEach((feature, index) => {
        const featureHTML = `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5><i class="bi bi-star me-2"></i>${feature.title}</h5>
                        <p>${feature.desc}</p>
                        <small class="text-muted">Feature #${index + 1}</small>
                    </div>
                </div>
            </div>
        `;
        featuresContainer.insertAdjacentHTML('beforeend', featureHTML);
    });

    // Featured Jobs
    const featuredJobs = [
        { title: 'Senior Frontend Developer', company: 'Tech Corp', location: 'Almaty', type: 'Full-time' },
        { title: 'Financial Analyst', company: 'Finance Pro', location: 'Astana', type: 'Contract' },
        { title: 'UX Designer', company: 'Digital Studio', location: 'Remote', type: 'Part-time' },
        { title: 'Project Manager', company: 'Construction Ltd', location: 'Nur-Sultan', type: 'Full-time' },
        { title: 'Marketing Specialist', company: 'Ad Agency', location: 'Almaty', type: 'Contract' }
    ];

    const jobsContainer = document.getElementById('jobs-container');
    featuredJobs.forEach((job, index) => {
        const jobCard = `
            <div class="col-md-6 col-lg-4 ${index % 2 === 0 ? 'even-job' : 'odd-job'}">
                <div class="card h-100">
                    <div class="card-body">
                        <h5>${job.title}</h5>
                        <p class="job-company mb-1">${job.company}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="job-meta"><i class="bi bi-geo-alt"></i> ${job.location}</span>
                            <span class="job-meta"><i class="bi bi-clock"></i> ${job.type}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        jobsContainer.insertAdjacentHTML('beforeend', jobCard);
    });
    
    // Salary Comparison
    const salary1 = document.getElementById('salary1');
    const salary2 = document.getElementById('salary2');
    const resultDisplay = document.getElementById('comparison-result');

    function compareSalaries() {
        const val1 = parseInt(salary1.value) || 0;
        const val2 = parseInt(salary2.value) || 0;

        if (!val1 || !val2) return;

        if (val1 > val2) {
            resultDisplay.textContent = `First salary (${val1}₸) is higher than second (${val2}₸)`;
        } else if (val2 > val1) {
            resultDisplay.textContent = `Second salary (${val2}₸) is higher than first (${val1}₸)`;
        } else {
            resultDisplay.textContent = `Both salaries are equal at ${val1}₸`;
        }
    }

    salary1.addEventListener('input', compareSalaries);
    salary2.addEventListener('input', compareSalaries);

    // Job Categories
const defaultCategories = ['IT', 'Finance', 'Healthcare', 'Education'];
const categoryList = document.getElementById('categories-list');
const newCategoryInput = document.getElementById('new-category');

// Load from localStorage or use default
let categories = JSON.parse(localStorage.getItem('categories')) || [...defaultCategories];

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function updateCategoryList() {
    categoryList.innerHTML = categories.map((cat, index) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="category-name">${cat}</span>
            <div>
                <button class="btn btn-sm btn-secondary edit-category" data-index="${index}">Edit</button>
                <button class="btn btn-sm btn-danger remove-category" data-index="${index}">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </li>
    `).join('');

    document.querySelectorAll('.remove-category').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = +btn.dataset.index;
            categories.splice(index, 1);
            saveCategories();
            updateCategoryList();
        });
    });

    document.querySelectorAll('.edit-category').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = +btn.dataset.index;
            const li = e.target.closest('li');
            const currentName = categories[index];
            li.innerHTML = `
                <input type="text" class="form-control form-control-sm me-2 edit-input" value="${currentName}" style="flex: 1;" />
                <button class="btn btn-sm btn-success save-edit">Save</button>
            `;
            li.querySelector('.save-edit').addEventListener('click', () => {
                const newName = li.querySelector('.edit-input').value.trim();
                if (newName) {
                    categories[index] = newName;
                    saveCategories();
                    updateCategoryList();
                }
            });
        });
    });
}

document.getElementById('add-category').addEventListener('click', () => {
    const newCat = newCategoryInput.value.trim();
    if (newCat) {
        categories.push(newCat);
        saveCategories();
        newCategoryInput.value = '';
        updateCategoryList();
    }
});

// Initial render
updateCategoryList();   


    // jQuery Animations
    $(document).ready(function() {
        $('.hero img').hide().fadeIn(1500);
        $('.card').hover(
            function() { $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)'); },
            function() { $(this).removeClass('shadow-lg').css('transform', 'translateY(0)'); }
        );
    });
});