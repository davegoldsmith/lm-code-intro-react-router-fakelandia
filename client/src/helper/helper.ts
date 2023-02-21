export const getTodaysDate = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};

export const showConfessionConfirmationBar = ()  => {
  let snackBar = document.getElementById("confession-message");
  if (snackBar !== null) {
    snackBar.className = "show-bar";
    setTimeout(function () {
      if (snackBar != null) {
        snackBar.className = snackBar.className.replace("show-bar", "");
      }
    }, 5000);
  }
}
