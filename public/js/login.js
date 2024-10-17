document.getElementById('signup-switch').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
    document.getElementById('title').innerHTML = "Welcome...";
});

document.getElementById('login-switch').addEventListener('click', function() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('title').innerHTML = "Welcome Back!!!"
});