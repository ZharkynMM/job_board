document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    let submissionCount = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        const name = form.elements[0].value;
        const email = form.elements[1].value;
        const file = form.elements[2].files[0];

        if (!name || !email || !file) {
            alert('Please fill all fields!');
            return;
        }

        // Show confirmation
        submissionCount++;
        alert(`Resume submitted successfully! Total submissions: ${submissionCount}`);

        // Reset form
        form.reset();

        // Update counter
        document.getElementById('submission-count').textContent = submissionCount;
    });

    // jQuery animations
    $(document).ready(function() {
        $('input[type="file"]').change(function() {
            if (this.files.length > 0) {
                $('#file-name').text(this.files[0].name).fadeIn();
            }
        });

        $('form').on('reset', function() {
            $('#file-name').fadeOut();
        });
    });
});