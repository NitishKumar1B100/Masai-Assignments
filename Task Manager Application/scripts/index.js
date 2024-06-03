document.addEventListener("DOMContentLoaded", function() {
    loadPage('pages/home.html', 0);  // Load the home page by default
});

async function loadPage(page, pageId) {
   await fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            ChangeTheAtivePage(pageId);
            document.getElementById('content').innerHTML = data;
            if(pageId == 0){
                homeDataload()
            }else{
                DeletedDataload()
            }
            
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
        });
}

function ChangeTheAtivePage(pageId){
    const listOfTag = document.querySelectorAll('nav ul li a');
    listOfTag.forEach((item, index) => {
        if(index === pageId){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
}
