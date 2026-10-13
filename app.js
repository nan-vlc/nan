// Base de datos de productos. 
const catalog = [
   
    {
        id: 2,
        category: 'collares',
        name: 'Chocker',
        images: [
            'Chocker2.JPG',
            'Chocker.JPG'
        ]
    },
    {
        id: 3,
        category: 'collares',
        name: 'Terreta',
        images: [
            'Terreta.JPG'
        ]
    },
    {
        id: 3,
        category: 'collares',
        name: 'Amalfi',
        images: [
            'Amalfi.JPG'
        ]
    },
    {
        id: 4,
        category: 'collares',
        name: 'Capri',
        images: [
            'Capri.JPG'
        ]
    },
    {
        id: 5,
        category: 'collares',
        name: 'Mango',
        images: [
            'Mango.JPG'
        ]
    },
    {
        id: 101,
        category: 'colgadores',
        name: 'Colgador Nudo Simple',
        images: [
            'https://images.unsplash.com/photo-1522272898950-891000bbd5d2?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589136932408-59c5d19457a3?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520698715781-6780c88de8af?q=80&w=600&auto=format&fit=crop'
        ]
    }
];

// Estado de la aplicación
let currentCategory = 'collares';

// Referencias al DOM
const gridContainer = document.getElementById('product-grid');
const segmentButtons = document.querySelectorAll('.segment-btn');

function renderProducts(category) {
    gridContainer.innerHTML = '';
    const filteredProducts = catalog.filter(item => item.category === category);

    filteredProducts.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        
        // 1. Generamos los slides (fotos)
        const slidesHTML = product.images.map(img => `
            <div class="carousel-slide">
                <img src="${img}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
        `).join('');

        // 2. Generamos los puntitos (solo si hay más de 1 foto)
        const dotsHTML = product.images.length > 1 ? `
            <div class="pagination-dots">
                ${product.images.map((_, index) => `
                    <div class="dot ${index === 0 ? 'active' : ''}"></div>
                `).join('')}
            </div>
        ` : '';
        
        card.innerHTML = `
            <div class="image-wrapper">
                <div class="carousel-container">
                    ${slidesHTML}
                </div>
                ${dotsHTML}
            </div>
            <h2 class="product-name">${product.name}</h2>
        `;
        
        gridContainer.appendChild(card);
    });

    // 3. Activamos la lógica de los puntitos al deslizar
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        const container = wrapper.querySelector('.carousel-container');
        const dots = wrapper.querySelectorAll('.dot');
        
        if(dots.length > 0) {
            // Escuchamos el evento scroll
            container.addEventListener('scroll', () => {
                // Calculamos en qué foto estamos (0, 1, 2...)
                const scrollIndex = Math.round(container.scrollLeft / container.clientWidth);
                
                // Actualizamos la clase 'active' del puntito
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === scrollIndex);
                });
            }, { passive: true }); // passive: true mejora el rendimiento en móviles
        }
    });
}

// Configuración de las pestañas
segmentButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        segmentButtons.forEach(btn => btn.classList.remove('active'));
        const clickedBtn = e.target;
        clickedBtn.classList.add('active');
        currentCategory = clickedBtn.getAttribute('data-category');
        renderProducts(currentCategory);
    });
});

// Renderizado inicial
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(currentCategory);
});