function showReplyForm(button) {
    const replyForm = button.nextElementSibling;
    
    if (replyForm.style.display === "block") {
      replyForm.style.display = "none";
    } else {
      replyForm.style.display = "block";
    }
  }


  function toggleFollow() {
    const followButton = document.querySelector('.follow-button');
    if (followButton.classList.contains('Subscribed')) {
        followButton.classList.remove('Subscribed');
        followButton.textContent = 'Subscribe';
    } else {
        followButton.classList.add('Subscribed');
        followButton.textContent = 'Subscribed';
    }
}