const form = document.querySelector("form");
const progressBar = document.querySelector(".progress");

const MY_API = "http://localhost:3000/wiss";
progressBar.style.display = "none";

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");
  const content = formData.get("content");

  const wiss = {
    name,
    content
  };

  form.style.display = "none";
  progressBar.style.display = "";

  fetch(MY_API, {
    method: "POST",
    body: JSON.stringify(wiss),
    headers: {
      "content-type": "application/json"
    }
  });
});
