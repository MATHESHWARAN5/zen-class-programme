document.addEventListener('DOMContentLoaded', function() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            let content = document.getElementById('content');
            let html = '<h2>Users</h2><table class="table">';
            html += '<tr><th>Name</th><th>Email</th><th>Phone</th></tr>';
            data.forEach(user => {
                html += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.phone}</td></tr>`;
            });
            html += '</table>';
            content.innerHTML = html;
        });
});
