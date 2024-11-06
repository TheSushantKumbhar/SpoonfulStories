function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
  }

 
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const profileIcon = document.querySelector('.profile-icon');
    if (!profileIcon.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });