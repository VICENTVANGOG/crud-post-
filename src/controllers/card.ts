import { Ipost } from "../models/Ipost";

// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Selecciono los elementos del DOM y los asigno a constantes
  const postList = document.getElementById('post-list') as HTMLUListElement;
  const createPostBtn = document.getElementById('create-post') as HTMLButtonElement;
  const loading = document.getElementById('loading') as HTMLDivElement;

  // Función para mostrar el indicador de carga
  function showLoading() {
    if (loading) loading.style.display = 'block';
  }

  // Función para ocultar el indicador de carga
  function hideLoading() {
    if (loading) loading.style.display = 'none';
  }

  // Función asíncrona para obtener posts desde una API
  async function fetchPosts() {
    try {
      const response = await fetch('https://api-posts.codificando.xyz/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const posts: Ipost[] = await response.json();
      return posts;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  }

  // Función asíncrona para verificar la ortografía de un texto
  async function checkSpelling(text: string): Promise<number> {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&language=es`
    });
    const data = await response.json();
    return data.matches.length; // Número de errores encontrados
  }

  // Función asíncrona para calcular la calidad de un post
  async function calculateQuality(post: Ipost): Promise<number> {
    const prohibitedWords = ['grosería1', 'grosería2']; // Lista de palabras prohibidas
    const contentWords = post.body.split(' ');
    const errors = contentWords.filter(word => prohibitedWords.includes(word)); // Encuentra palabras prohibidas en el contenido
    const spellingErrors = await checkSpelling(post.body); // Verifica errores ortográficos
    const totalErrors = errors.length + spellingErrors;
    return 100 - (totalErrors / contentWords.length) * 100; // Calcula la calidad en porcentaje
  }

  // Función asíncrona para renderizar los posts en la interfaz
  async function renderPosts(posts: Ipost[]) {
    postList.innerHTML = ''; // Limpia la lista de posts

    for (const post of posts) {
      const postItem = document.createElement('li'); // Crea un nuevo elemento de lista para el post
      postItem.className = 'post-item';
      postItem.innerHTML = `
        <div class="post-card">
          <img src="${post.multimediaUrl}" alt="${post.title}" class="post-image" />
          <div class="info">
            <div class="title">${post.title}</div>
            <div class="date">Fecha de Creación: ${post.creationDate}</div>
            <div class="date">Fecha Estimada: ${post.date}</div>
            <div class="quality">Calidad: <span class="loading-quality">Calculando...</span></div>
          </div>
          <div class="actions">
            <button class="edit" data-id="${post.id}">Editar</button>
            <button class="delete" data-id="${post.id}">Eliminar</button>
          </div>
        </div>
      `;
      postList.appendChild(postItem); // Añade el elemento de lista a la lista de posts

      // Calcular la calidad de forma asíncrona
      calculateQuality(post).then(quality => {
        const qualityClass = quality > 95 ? 'quality-good' : 'quality-bad';
        const qualityElement = postItem.querySelector('.quality span') as HTMLElement;
        qualityElement.textContent = `${quality}%`;
        qualityElement.className = qualityClass; // Aplica la clase según la calidad del post
      });
    }

    // Asignar event listeners después de que todos los posts hayan sido renderizados
    assignEventListeners();
  }

  // Función para asignar event listeners a los botones de editar y eliminar
  function assignEventListeners() {
    document.querySelectorAll('.edit').forEach(button => {
      button.addEventListener('click', (event) => {
        const postId = (event.target as HTMLButtonElement).dataset.id;
        editPost(Number(postId));
      });
    });

    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', (event) => {
        const postId = (event.target as HTMLButtonElement).dataset.id;
        deletePost(Number(postId));
      });
    });
  }

  // Función para cargar los posts desde localStorage y renderizarlos
  function loadPosts() {
    showLoading();
    const posts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
    renderPosts(posts);
    hideLoading();
  }

  // Event listener para el botón de crear post
  createPostBtn.addEventListener('click', () => {
    window.location.href = '../views/home.html';
  });

  // Función para editar un post
  function editPost(id: number) {
    const posts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
    const post = posts.find(p => p.id === id);
    if (post) {
      const title = prompt('Edit Title', post.title);
      const date = prompt('Edit Estimated Date', post.date);
      const multimediaUrl = prompt('Edit Image URL', post.multimediaUrl);
      const body = prompt('Edit Content', post.body);

      if (title !== null && date !== null && multimediaUrl !== null && body !== null) {
        post.title = title;
        post.date = date;
        post.multimediaUrl = multimediaUrl;
        post.body = body;

        localStorage.setItem('postArray', JSON.stringify(posts));
        refreshPosts(); // Actualiza la lista de posts
      }
    }
  }

  // Función para eliminar un post
  function deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      const localPosts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
      const updatedLocalPosts = localPosts.filter(post => post.id !== id);
      localStorage.setItem('postArray', JSON.stringify(updatedLocalPosts));
      refreshPosts(); // Actualiza la lista de posts
    }
  }

  // Función para actualizar la lista de posts
  function refreshPosts() {
    const localPosts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
    fetchPosts().then(apiPosts => {
      const allPosts = [...localPosts, ...apiPosts];
      renderPosts(allPosts);
    });
  }

  // Función para ver los detalles de un post
  (window as any).viewPost = function (id: number) {
    window.location.href = `post-detail.html?id=${id}`;
  };

  // Función de inicialización
  async function initialize() {
    showLoading();
    const localPosts = JSON.parse(localStorage.getItem('postArray') || '[]');
    const apiPosts = await fetchPosts();
    const allPosts = [...localPosts, ...apiPosts];
    await renderPosts(allPosts);
    hideLoading();
  }

  // Llamada a la función de inicialización para cargar y mostrar los posts
  initialize();
});
