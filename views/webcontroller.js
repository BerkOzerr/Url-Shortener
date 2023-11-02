let deleteButton = document.querySelectorAll(".delete-btn");

deleteButton.forEach((del) => {
  del.addEventListener("click", async (e) => {
    console.log(e.target.dataset.id);
    const delId = e.target.dataset.id;
    try {
      await axios.delete(`/${delId}`);
    } catch (error) {
      console.log(error);
    }
  });
});
