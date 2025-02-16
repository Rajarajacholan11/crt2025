document.addEventListener("DOMContentLoaded", () => {
    let btnxx = document.getElementById("btnxx");
    if (btnxx) {
        btnxx.addEventListener("click", generateCertificate);
    }
});

function generateCertificate() {
    let name = document.getElementById("name").value.trim();
    let course = document.getElementById("course").value.trim();

    if (!name || !course) {
        alert("Please enter both Name and Course Name.");
        return;
    }

    document.getElementById("recipient-name").textContent = name;
    document.getElementById("course-name").textContent = course;

    let today = new Date();
    let formattedDate = today.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById("date").textContent = formattedDate;

    document.getElementById("certificate-section").classList.remove("hidden");
    document.getElementById("download-btn").classList.remove("hidden");
}

function downloadCertificate() {
    setTimeout(generatePDF, 300);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 400] // Fixed max width and height
    });

    const certificateElement = document.querySelector(".certificate");

    html2canvas(certificateElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff"
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0, 600, 400);
        doc.save("Certificate.pdf");
    });
}
