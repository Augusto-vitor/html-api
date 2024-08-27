let users = [];

function getApiUrl() {
    const container = document.querySelector('.container');
    return container.getAttribute('data-api-url');
}

function fetchUsers() {
    const apiUrl = getApiUrl();
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            users = data;
            renderTable();
        })
        .catch(error => console.error('Error fetching users:', error));
}

function renderTable() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function searchUsers() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(input));
    renderFilteredTable(filteredUsers);
}

function renderFilteredTable(filteredUsers) {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function addUser() {
    const apiUrl = getApiUrl();
    const userName = prompt("Enter the new user's name:");
    const userEmail = prompt("Enter the new user's email:");
    if (userName && userEmail) {
        const newUser = { name: userName, email: userEmail };
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            users.push(data);
            renderTable();
        })
        .catch(error => console.error('Error adding user:', error));
    }
}

function addemail() {
    const apiUrl = getApiUrl();
    const userName = prompt("Enter the new user's name:");
    const userEmail = prompt("Enter the new user's email:");
    if (userName && userEmail) {
        const newUser = { name: userName, email: userEmail };
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            users.push(data);
            renderTable();
        })
        .catch(error => console.error('Error adding user:', error));
    }
}

function editUser(id) {
    const apiUrl = getApiUrl();
    const user = users.find(user => user.id === id);
    const newName = prompt("Edit the user's name:", user.name);
    const newEmail = prompt("Edit the user's email:", user.email);
    if (newName && newEmail) {
        const updatedUser = { ...user, name: newName, email: newEmail };
        fetch(`${apiUrl}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            const index = users.findIndex(u => u.id === id);
            users[index] = data;
            renderTable();
        })
        .catch(error => console.error('Error editing user:', error));
    }
}

function deleteUser(id) {
    const apiUrl = getApiUrl();
    const confirmation = confirm("Are you sure you want to delete this user?");
    if (confirmation) {
        fetch(`${apiUrl}${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            users = users.filter(user => user.id !== id);
            renderTable();
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}

// Initial fetch and render
fetchUsers();
