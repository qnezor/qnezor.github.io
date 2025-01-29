function getConfigByLanguage() {
    const userLang = navigator.language || navigator.userLanguage;

    switch(userLang.startsWith) {
        case 'ru':
        case 'uk':
        case 'be':
            return import('https://qnezor.ru/javascript/database-ru.js');
        default:
            return import('https://qnezor.ru/javascript/database-en.js');
    }
}

let config; // Переменная для хранения конфигурации

async function initializeConfig() {
    const module = await getConfigByLanguage();
    config = module.config;
}

function listBlogPosts() {
    const postsListingDiv = document.getElementById('blog');
    postsListingDiv.innerHTML = '';

    const postsList = document.createElement('ul');
    postsList.className = 'posts-list';

    const posts = config.posts;

    if (posts.length === 0) {
        postsListingDiv.innerHTML = '<p>No posts available.</p>';
        return;
    }

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';

        listItem.innerHTML = `
            <a href="#${post.file}" class="post-title">${post.title}</a>
            <div class="post-date">${post.date}</div>
            <div class="post-subtitle">${post.subtitle}</div>
        `;

        postsList.appendChild(listItem);
    });

    postsListingDiv.appendChild(postsList);
}

async function loadPost(filename) {
    const post = config.posts.find(p => p.file === filename);

    if (!post) {
        listBlogPosts();
        return;
    }

    try {
        const response = await fetch(`${config.postsDirectory}${filename}.md`);
        const markdown = await response.text();
        const postContent = document.getElementById('blog');

        postContent.innerHTML =
            `
            <div class="load-post border-dashed">
            <a href="#" class="back-button">← Back to Posts</a>
            <article class="post-content">
                
                <div class="post-date" id="top">${post.date}</div>
                 ${marked.parse(markdown)}
            </article>
            <a href="#" class="back-button">← Back to Posts</a>
            </div>
            `;

        const title = document.getElementById("top");
        title.scrollIntoView();
    } catch (error) {
        console.error('Error loading post:', error);
        const postContent = document.getElementById('blog');
        postContent.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

function handleRoute() {
    const hash = window.location.hash.slice(1) || '';

    if (hash && hash !== '') {
        loadPost(hash);
    } else {
        listBlogPosts();
    }
}

async function initialize() {
    await initializeConfig(); // Загружаем конфигурацию в зависимости от языка
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
}

initialize();
