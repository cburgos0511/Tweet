const form = document.querySelector("form");
const progressBar = document.querySelector(".progress");
const wissEle = document.querySelector(".wiss");
const MY_API = "http://localhost:3000/wiss";
progressBar.style.display = "none";

listAllWiss();

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
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      form.reset();
      form.style.display = "";
      listAllWiss();
      progressBar.style.display = "none";
    });
});

function listAllWiss() {
  wissEle.innerHTML = "";
  fetch(MY_API)
    .then(res => res.json())
    .then(wiss => {
      console.log(wiss);
      wiss.reverse();
      wiss.forEach(wis => {
        const div = document.createElement("div");

        const header = document.createElement("h5");
        header.textContent = wis.name;
        const content = document.createElement("p");
        content.textContent = wis.content;

        div.appendChild(header);
        div.appendChild(content);

        wissEle.appendChild(div);
      });
    });
}
