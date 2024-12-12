var background = document.getElementById('background');
var isAnimating = false;

function changebg(e) {
    if (isAnimating == true) {
        return;
    }
    var name = e.target.textContent;
    isAnimating = true;
    background.style.opacity = 0;
    setTimeout(() => {
        background.textContent = name;
        background.style.opacity = 1;
        setTimeout(() => {
            isAnimating = false;
        }, 300)
    }, 300);
}


function backbg() {
    background.style.opacity = 0;
    setTimeout(() => {
        background.textContent = "qnezor";
        background.style.opacity = 1;
    }, 300);
}