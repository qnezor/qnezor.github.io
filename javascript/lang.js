const last_track = document.getElementById('last_track');
const blog_name = document.getElementById('blog_name');

var Lang = navigator.language || navigator.userLanguage;

    if (Lang.startsWith('ru')) {
        last_track.textContent = "Последний прослушанный трек";
        blog_name.textContent = "Блог";
    } else {
        last_track.textContent = "Last played track";
        blog_name.textContent = "Blog";
    }