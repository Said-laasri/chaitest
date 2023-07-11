document.addEventListener("DOMContentLoaded", () => {
  const addPerson = document.getElementById("addPerson");
  const getPerson = document.getElementById("getPerson");
  const listPeople = document.getElementById("listPeople");
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const index = document.getElementById("index");
  const result = document.getElementById("result");
  addPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const nameValue = name.value.trim();
      const ageValue = parseInt(age.value, 10);

      if (!nameValue || isNaN(ageValue) || ageValue < 0) {
        result.textContent = "Invalid name or age";
        return;
      }

      if (!/^[A-Za-z]+$/.test(nameValue)) {
        result.textContent = "Name should only contain alphabetic characters";
        return;
      }

      const response = await fetch("/api/v1/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameValue, age: ageValue }),
      });

      if (response.status === 400) {
        const data = await response.json();
        result.textContent = data.error;
      } else {
        const data = await response.json();
        result.textContent = JSON.stringify(data);
      }
    } catch (err) {
      result.textContent = err.message;
    }
  });

  listPeople.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/people", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      result.textContent = JSON.stringify(data);
    } catch (err) {
      result.textContent = err.message;
    }
  });

  
  getPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    const index1 = encodeURIComponent(index.value);
    try {
      const response = await fetch(`/api/v1/people/${index1}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      result.textContent = JSON.stringify(data);
    } catch (err) {
      result.textContent = err.message;
    }
  });
});
