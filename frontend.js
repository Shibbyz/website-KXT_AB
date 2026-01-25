document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        organization: form.organization.value,
        message: form.message.value
    };

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        });

        if(res.ok){
            submitBtn.textContent = 'Sent!';
            form.reset();
        } else {
            const errorText = await res.text();
            submitBtn.textContent = 'Error';
            console.error(errorText);
        }
    } catch(err){
        submitBtn.textContent = 'Error';
        console.error(err);
    }

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 3000);
});
