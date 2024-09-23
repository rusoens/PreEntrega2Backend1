document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productForm')) {
        const form = document.getElementById('productForm');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = document.getElementById('id').value;  // id es un campo único en tu JSON
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const category = document.getElementById('category').value;
            const price = parseFloat(document.getElementById('price').value);
            const thumbnail = document.getElementById('thumbnail').value;
            const code = document.getElementById('code').value;
            const stock = document.getElementById('stock').value;
        
            const producto = {
                id,
                title,
                description,
                category,
                price,
                thumbnail,
                code,
                stock
            };

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(producto)
                });

                if (response.ok) {
                    console.log('Hubo un error 😕');
                } else {
                    console.error('Hubo un error 😕');
                }
            } catch (error) {
                console.error('Hubo un error 😕', error);
            }
        });
    }
});
