
let btnxx=document.getElementById("btnxx");
btnxx.addEventListener("click",()=>{generateCertificate()});
function generateCertificate() {
    let name = document.getElementById("name").value.trim();
    let course = document.getElementById("course").value.trim();

    if (name.length === 0 || course.length === 0) {
        alert("Please enter both Name and Course Name.");
        return;
    }

    document.getElementById("recipient-name").textContent = name;
    document.getElementById("course-name").textContent = course;

    // Generate today's date
    let today = new Date();
    let formattedDate = today.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById("date").textContent = formattedDate;

    // Show certificate section
    document.getElementById("certificate-section").classList.remove("hidden");
}

function downloadCertificate() {
    setTimeout(() => {
        generatePDF();
    }, 300); // Delay to ensure text is fully loaded
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [900, 600]
    });

    const certificateElement = document.querySelector(".certificate");

    // Use html2canvas to capture the full certificate
    html2canvas(certificateElement, {
        scale: window.devicePixelRatio, // Adjust quality based on device
        useCORS: true, // Ensures images/fonts load
        allowTaint: false, // Prevents tainting issues
        backgroundColor: "#fff", // Ensures white background
        letterRendering: true, // Proper text rendering
        width: certificateElement.offsetWidth, // Capture full width
        height: certificateElement.offsetHeight // Capture full height
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0, 900, 600);
        doc.save("Certificate.pdf");
    });
}
