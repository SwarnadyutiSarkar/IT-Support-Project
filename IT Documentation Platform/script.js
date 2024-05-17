document.getElementById('addDocumentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/add_document.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    const result = await response.json();
    alert(result.message);
    loadDocuments();
});

async function loadDocuments() {
    const response = await fetch('/get_documents.php');
    const documents = await response.json();
    const documentsDiv = document.getElementById('documents');
    documentsDiv.innerHTML = '';

    documents.forEach(doc => {
        const docDiv = document.createElement('div');
        docDiv.className = 'document';
        docDiv.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.content}</p>
            <button class="delete-button" onclick="deleteDocument(${doc.id})">Delete</button>
        `;
        documentsDiv.appendChild(docDiv);
    });
}

async function deleteDocument(id) {
    const response = await fetch('/delete_document.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    const result = await response.json();
    alert(result.message);
    loadDocuments();
}

window.onload = loadDocuments;
