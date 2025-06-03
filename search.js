document.addEventListener('DOMContentLoaded', () => {
    let jobs = [
        { 
            title: "Senior Frontend Developer", 
            company: "Tech Solutions", 
            location: "Almaty",
            salary: "600,000 ₸",
            type: "Full-time",
            posted: "2d ago"
        },
        { 
            title: "Marketing Manager", 
            company: "Digital Agency", 
            location: "Astana",
            salary: "450,000 ₸",
            type: "Contract",
            posted: "5d ago"
        }
    ];

    const resultsContainer = document.getElementById('search-results');
    const searchInputs = document.querySelectorAll('input[type="text"]');

    function renderJobs(filteredJobs) {
        resultsContainer.innerHTML = '';
        filteredJobs.forEach((job, index) => {
            const jobHTML = `
                <div class="col-12 ${index % 2 === 0 ? 'even-job' : 'odd-job'}">
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
                            <div class="d-flex gap-2 mt-3">
                                <button class="btn btn-primary flex-grow-1 apply-btn">
                                    <i class="bi bi-send-check"></i> Apply
                                </button>
                                <button class="btn btn-outline-secondary save-job">
                                    <i class="bi bi-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            resultsContainer.insertAdjacentHTML('beforeend', jobHTML);
        });

        // Save functionality
        document.querySelectorAll('.save-job').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.card');
                const jobTitle = card.querySelector('.card-title').textContent;
                btn.innerHTML = `<i class="bi bi-bookmark-check-fill"></i>`;
                btn.disabled = true;
                card.classList.add('border-primary');
                setTimeout(() => {
                    btn.innerHTML = `<i class="bi bi-bookmark"></i>`;
                    btn.disabled = false;
                    card.classList.remove('border-primary');
                }, 2000);
            });
        });
    }

    // Search functionality
    function performSearch() {
        const searchTerm = document.getElementById('main-search').value.toLowerCase();
        const locationFilter = document.getElementById('location-filter').value;
        
        const filtered = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                                  job.company.toLowerCase().includes(searchTerm);
            const matchesLocation = locationFilter === 'All Locations' || 
                                  job.location === locationFilter;
            return matchesSearch && matchesLocation;
        });
        
        renderJobs(filtered);
    }

    // Event listeners
    searchInputs.forEach(input => input.addEventListener('input', performSearch));
    document.getElementById('location-filter').addEventListener('change', performSearch);

    // Initial render
    renderJobs(jobs);

    // jQuery animations
    $(document).ready(function() {
        $('.card').hover(
            function() { $(this).css('transform', 'translateY(-5px)'); },
            function() { $(this).css('transform', 'translateY(0)'); }
        );

        $('#search-btn').click(function() {
            $(this).find('i').toggleClass('bi-search bi-arrow-repeat');
            setTimeout(() => $(this).find('i').toggleClass('bi-search bi-arrow-repeat'), 500);
        });
    });
});

// search.js файлына мына кодты қосыңыз
async function fetchJobs() {
  try {
    const response = await fetch('https://api.example.com/jobs/search');
    if (!response.ok) throw new Error('API қатесі: ' + response.status);
    jobs = await response.json();
    renderJobs(jobs);
  } catch (error) {
    console.error('Іздеу деректерін жүктеу мүмкін емес:', error);
    const container = document.getElementById('search-results');
    container.innerHTML = `
      <div class="alert alert-warning">
        Іздеу нәтижелерін көрсету мүмкін емес. Интернет байланысын тексеріңіз.
      </div>
    `;
  }
}

// DOM жүктелгенде
document.addEventListener('DOMContentLoaded', () => {
  fetchJobs(); // Локальды массивті ауыстыру
  // ...қалған код...
});