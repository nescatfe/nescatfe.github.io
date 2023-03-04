window.addEventListener("scroll", function() {
  var header = document.querySelector("header");
  var content = document.querySelector(".content");
  if (window.pageYOffset > header.offsetHeight) {
    content.classList.add("blur");
  } else {
    content.classList.remove("blur");
  }
});
