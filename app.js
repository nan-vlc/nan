// Base de datos de productos. 
const catalog = [
   {
        id: 1,
        category: 'collares',
        name: 'Mix & Match',
        images: [
            'Mix & Match.JPG',
            'Mix & Match 1.JPG',
            'Mix & Match 2.JPG',
            'Mix & Match 3.JPG',
            'Mix & Match 4.JPG'
        ]
    },
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
        id: 6,
        category: 'collares',
        name: 'Lucca',
        images: [
            'Lucca.JPG'
        ]
    },
   {
        id: 7,
        category: 'collares',
        name: 'Roma',
        images: [
            'Roma.JPG'
        ]
    },
   {
        id: 8,
        category: 'collares',
        name: 'Sicilia',
        images: [
            'Sicilia.JPG'
        ]
    },
   {
        id: 9,
        category: 'collares',
        name: 'Loop',
        images: [
            'Lacito.JPG',
            'Lacito 2.JPG',
            'Lacito 3.JPG'
        ]
    },
   
    {
        id: 101,
        category: 'colgadores',
        name: 'NaN Trinity',
        images: [
            'Trinity.JPG'
        ]
    },
   {
        id: 102,
        category: 'colgadores',
        name: 'NaN Bolita',
        images: [
            'Bolita.JPG',
            'Bolita 2.JPG',
            'Bolita 3.JPG',
            'Bolita 4.JPG',
            'Bolita 5.JPG'
        ]
    },
   {
        id: 103,
        category: 'colgadores',
        name: 'NaN Medalla',
        images: [
            'Medalla.JPG'
        ]
    },
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
        const slidesHTML = product.images.map((img, index) => `
            <div class="carousel-slide">
                <img src="${img}" alt="${product.name}" class="product-image" loading="lazy" data-product-id="${product.id}" data-index="${index}">
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

// --- LÓGICA DEL VISOR A PANTALLA COMPLETA ---
document.addEventListener('click', (e) => {
    // 1. Si tocamos una foto del catálogo
    if (e.target.classList.contains('product-image')) {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        const clickedIndex = parseInt(e.target.getAttribute('data-index'));
        
        const product = catalog.find(p => p.id === productId);
        if (product) {
            const modal = document.getElementById('image-modal');
            const modalTrack = document.getElementById('modal-track');
            
            if (!modal || !modalTrack) return; // Evita errores si falta el HTML
            
            // Inyectamos las fotos
            modalTrack.innerHTML = product.images.map(img => `
                <div class="modal-slide">
                    <img src="${img}" alt="Producto ampliado">
                </div>
            `).join('');

            // Mostramos el visor y bloqueamos la web de fondo
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // Movemos el carrusel a la foto exacta que hemos tocado
            setTimeout(() => {
                modalTrack.scrollLeft = modalTrack.clientWidth * clickedIndex;
            }, 10);
        }
    }

    // 2. Si tocamos la "X" para cerrar
    if (e.target.id === 'close-modal') {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
});


