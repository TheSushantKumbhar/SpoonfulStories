function copyToClipboard() {
  const currentURL = window.location.href; // Get the current URL
  navigator.clipboard
    .writeText(currentURL) // Write it to the clipboard
    .then(() => {
      alert("URL copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
