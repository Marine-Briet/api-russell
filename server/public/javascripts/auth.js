function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            setToken(data.token);
            window.location.href = '/dashboard';
        }
    });
});