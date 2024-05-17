document.getElementById('pingForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const host = document.getElementById('host').value;
    const response = await fetch('/ping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ host }),
    });

    const result = await response.json();
    const resultDiv = document.getElementById('result');
    
    if (response.ok) {
        resultDiv.innerHTML = `<p>Host: ${result.host}</p>
                               <p>Alive: ${result.alive}</p>
                               <p>Time: ${result.time} ms</p>`;
    } else {
        resultDiv.innerHTML = `<p>Error: ${result.error}</p>`;
    }
});
