document.getElementById("first-floor").addEventListener("click", function (e) {
    e.preventDefault();
    showModal("image/first-floor.jpg");
  });

  document.getElementById("second-floor").addEventListener("click", function (e) {
    e.preventDefault();
    showModal("image/second-floor.jpg");
  });

  function showModal(imageSrc) {
    const modal = document.getElementById("floorModal");
    const modalImg = document.getElementById("modalImg");
    modalImg.src = imageSrc;
    modal.style.display = "flex";
  }

  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("floorModal").style.display = "none";
  });

  window.addEventListener("click", function (event) {
    const modal = document.getElementById("floorModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });