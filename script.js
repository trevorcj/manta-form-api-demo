"use strict";

const form = document.querySelector("#userForm");
const statusMessage = document.querySelector(".statusMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // POST request
  try {
    const res = await fetch(
      "https://api.mantahq.com/api/workflow/trev/test/post-users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    // Error handling
    if (!res.ok) {
      form.reset();
      statusMessage.classList.remove("success");
      statusMessage.classList.add("error");
      statusMessage.textContent = `Error: ${result.message}`;
      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    }

    statusMessage.classList.add("success");
    statusMessage.textContent = "User submitted successfully!";

    setTimeout(() => {
      statusMessage.classList.remove("success");
      statusMessage.textContent = "";
      form.reset();
    }, 2000);
  } catch (err) {
    statusMessage.textContent = `Network Error: Something went wrong.`;
  }
});
