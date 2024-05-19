function toggleReadMore() {
    var content = document.getElementById("moreContent");
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// ซ่อนเนื้อหาเมื่อโหลดหน้าเว็บครั้งแรก
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("moreContent").style.display = "none";
});
