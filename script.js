function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.getElementById('animatedH1');
    const text = h1.textContent;
    h1.textContent = ''; // Clear the existing text

    let index = 0;
    function type() {
        if (index < text.length) {
            h1.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust the delay as needed
        }
    }

    type();
});



