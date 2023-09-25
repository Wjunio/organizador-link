$(function () {

  acordion();

  var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    

});

function acordion() {
  
  var acc = document.getElementsByClassName("accordion");

  var i;

  for (i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {

      var panel = this.nextElementSibling;


      if (this.parentElement.classList.contains("manterActive")) {

        this.parentElement.classList.remove("manterActive");

        panel.style.display = "none";

      } else {

        this.classList.toggle("active");

        if (panel.style.display === "block") {

          panel.style.display = "none";

        } else {

          panel.style.display = "block";

        }

      }
    });
  }
}
