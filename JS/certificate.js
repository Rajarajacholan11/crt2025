document.addEventListener("DOMContentLoaded", () => { 
    let btnxx = document.getElementById("btnxx");
    let downloadBtn = document.getElementById("download-btn");
    let certificateSection = document.getElementById("certificate-section");

    // Ensure certificate is completely hidden initially
    certificateSection.style.display = "none";

    if (btnxx) {
        btnxx.addEventListener("click", generateCertificate);
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", generatePDF);
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

    // Show certificate only after clicking the button
    document.getElementById("certificate-section").style.display = "block";
    document.getElementById("download-btn").classList.remove("hidden");
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4" // Standard A4 size for better fitting
    });

    const certificateElement = document.querySelector(".certificate");

    // Temporarily set a fixed width for proper capture
    // Temporarily set a fixed width to capture properly
    certificateElement.style.width = "900px";
    certificateElement.style.maxWidth = "900px";
    certificateElement.style.height = "600px"; // Fixed height for accurate capture
    certificateElement.style.overflow = "hidden"; // Prevents extra content from being cut

    html2canvas(certificateElement, {
        scale: 2, // Improves quality
        useCORS: true,
        backgroundColor: "#fff"
    }).then((canvas) => {
       

        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save("Certificate.pdf");
    });
}
