import { Ipost } from "../models/Ipost";

document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('post-list') as HTMLUListElement;
  const createPostBtn = document.getElementById('create-post') as HTMLButtonElement;
  const loading = document.getElementById('loading') as HTMLDivElement;

  function showLoading() {
    if (loading) loading.style.display = 'block';
  }

  function hideLoading() {
    if (loading) loading.style.display = 'none';
  }

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

  async function checkSpelling(text: string): Promise<number> {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&language=es`
    });
    const data = await response.json();
    return data.matches.length; // Número de errores encontrados
  }

  async function calculateQuality(post: Ipost): Promise<number> {
    const prohibitedWords = ['grosería1', 'grosería2'];
    const contentWords = post.body.split(' ');
    const errors = contentWords.filter(word => prohibitedWords.includes(word));
    const spellingErrors = await checkSpelling(post.body);
    const totalErrors = errors.length + spellingErrors;
    return 100 - (totalErrors / contentWords.length) * 100;
  }

  async function renderPosts(posts: Ipost[]) {
    postList.innerHTML = '';

    for (const post of posts) {
      const postItem = document.createElement('li');
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
      postList.appendChild(postItem);

      // Calcular la calidad de forma asíncrona
      calculateQuality(post).then(quality => {
        const qualityClass = quality > 95 ? 'quality-good' : 'quality-bad';
        const qualityElement = postItem.querySelector('.quality span') as HTMLElement;
        qualityElement.textContent = `${quality}%`;
        qualityElement.className = qualityClass;
      });
    }

    // Asignar event listeners después de que todos los posts hayan sido renderizados
    assignEventListeners();
  }

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

  function loadPosts() {
    showLoading();
    const posts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
    renderPosts(posts);
    hideLoading();
  }

  createPostBtn.addEventListener('click', () => {
    window.location.href = '../views/home.html';
  });

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
        refreshPosts();
      }
    }
  }

  function deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      const localPosts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
      const updatedLocalPosts = localPosts.filter(post => post.id !== id);
      localStorage.setItem('postArray', JSON.stringify(updatedLocalPosts));
      refreshPosts();
    }
  }

  function refreshPosts() {
    const localPosts: Ipost[] = JSON.parse(localStorage.getItem('postArray') || '[]');
    fetchPosts().then(apiPosts => {
      const allPosts = [...localPosts, ...apiPosts];
      renderPosts(allPosts);
    });
  }

  (window as any).viewPost = function (id: number) {
    window.location.href = `post-detail.html?id=${id}`;
  };

  async function initialize() {
    showLoading();
    const localPosts = JSON.parse(localStorage.getItem('postArray') || '[]');
    const apiPosts = await fetchPosts();
    const allPosts = [...localPosts, ...apiPosts];
    await renderPosts(allPosts);
    hideLoading();
  }

  initialize();
});







