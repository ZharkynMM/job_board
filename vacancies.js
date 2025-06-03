document.addEventListener('DOMContentLoaded', () => {
    let vacancies = [
        {
            title: "Senior Frontend Developer",
            company: "Tech Corp",
            location: "Almaty",
            salary: "600,000 ₸",
            type: "Full-time",
            posted: "2d ago",
            category: "IT"
        },
        {
            title: "Financial Analyst",
            company: "Finance Pro",
            location: "Astana",
            salary: "450,000 ₸",
            type: "Contract",
            posted: "5d ago",
            category: "Finance"
        },
        {
            title: "UX Designer",
            company: "Digital Studio",
            location: "Remote",
            salary: "550,000 ₸",
            type: "Part-time",
            posted: "1d ago",
            category: "IT"
        },
        {
            title: "Project Manager",
            company: "Construction Ltd",
            location: "Nur-Sultan",
            salary: "800,000 ₸",
            type: "Full-time",
            posted: "3d ago",
            category: "Finance"
        }
    ];

    const container = document.getElementById('vacancies-container');
    const filterSelect = document.getElementById('filter');

    function renderVacancies(filter = 'All Jobs') {
        container.innerHTML = '';
        const filtered = filter === 'All Jobs' 
            ? vacancies 
            : vacancies.filter(job => job.category === filter);

        filtered.forEach((job, index) => {
            const card = `
                <div class="col-md-6 col-lg-4 ${index % 2 === 0 ? 'even-job' : 'odd-job'}">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge ${job.type === 'Full-time' ? 'bg-primary' : 'bg-secondary'}">${job.type}</span>
                                <small class="text-muted"><i class="bi bi-clock"></i> ${job.posted}</small>
                            </div>
                            <h5 class="card-title">${job.title}</h5>
                            <p class="job-company mb-2">${job.company}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="job-meta mb-0"><i class="bi bi-geo-alt"></i> ${job.location}</p>
                                <p class="fw-bold mb-0">${job.salary}</p>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 apply-btn">
                                <i class="bi bi-send-check"></i> Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        });

        // Application logic
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const jobTitle = btn.closest('.card-body').querySelector('.card-title').textContent;
                btn.innerHTML = `<i class="bi bi-check2"></i> Applied!`;
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = `<i class="bi bi-send-check"></i> Apply Now`;
                    btn.disabled = false;
                }, 2000);
            });
        });
    }

    // Initial render
    renderVacancies();

    // Filter event
    filterSelect.addEventListener('change', (e) => {
        renderVacancies(e.target.value);
    });

    // jQuery animations
    $(document).ready(function() {
        $('.card').hide().each(function(index) {
            $(this).delay(100 * index).fadeIn(500);
        });

        $('#filter').change(function() {
            $('#vacancies-container').fadeOut(250, function() {
                $(this).fadeIn(250);
            });
        });

        $('.card').hover(
            function() { $(this).css('transform', 'translateY(-5px)'); },
            function() { $(this).css('transform', 'translateY(0)'); }
        );
    });
});

// vacancies.js файлына мына кодты қосыңыз
async function fetchVacancies() {
  try {
    const response = await fetch('https://api.example.com/jobs');
    if (!response.ok) {
      throw new Error('API қатесі: ' + response.status);
    }
    const data = await response.json();
    vacancies = data;
    renderVacancies();
  } catch (error) {
    console.error('Деректерді жүктеу сәтсіз аяқталды:', error);
    // Қате хабарламасын көрсету
    const container = document.getElementById('vacancies-container');
    container.innerHTML = `
      <div class="alert alert-danger">
        Вакансияларды жүктеу сәтсіз аяқталды. Қайталап көріңіз.
      </div>
    `;
  }
}

// Барлық вакансияларды көрсету функциясын өзгертіңіз
function renderVacancies(filter = 'All Jobs') {
  // ...өзгеріссіз...
}

// DOM жүктелгенде API-дан деректерді алу
document.addEventListener('DOMContentLoaded', () => {
  fetchVacancies(); // Локальды массивті жою
  // ...қалған код...
});