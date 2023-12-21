class Comment{
    constructor(postId, id, name, email, body) {
        this.postId = postId
        this.id = id
        this.name = name
        this.email = email
        this.body = body
    }
}

let comments = [];
let index = 0

function FillingArray(json) {
    for(let i = 0; i < json.length; i++){
        comments.push(new Comment(json[i]['postId'], json[i]['id'], json[i]['name'], json[i]['email'], json[i]['body']))
    }

    console.log(comments)
}

function fetchAndDisplayReviews() {
    const loading = document.querySelector(".loader")
    const errorOfLoading = document.querySelector(".errorOfLoading")

    try{
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(json => FillingArray(json))
            .then(a => AddCommentsOnPage())
            .then(a => {window.addEventListener('scroll', handleScroll)})
    }
    catch(error){
        console.error(error);
        errorOfLoading.style.display = 'block';
    }
    finally {
        loading.style.display = 'none'
    }
}

function AddCommentsOnPage(){
    const commentsList = document.querySelector(".commentsList")
    let end

    if(index + 49 > comments.length){
        end = comments.length
    }
    else{
        end = index + 49
    }
    if (index + 1 < comments.length){
        for(let i = index + 1; i < end; i++) {
            const comment = document.createElement('div')
            comment.className = 'comment'

            const commentName = document.createElement('div')
            commentName.className = 'commentName'
            commentName.textContent = comments[i].name

            const commentEmail = document.createElement('div')
            commentEmail.className = 'commentEmail'
            commentEmail.textContent = comments[i].email

            const commentBody = document.createElement('div')
            commentBody.className = 'commentBody'
            commentBody.textContent = comments[i].body

            comment.appendChild(commentName)
            comment.appendChild(commentEmail)
            comment.appendChild(commentBody)

            commentsList.appendChild(comment)
        }

        index += 49
    }

}

function handleScroll() {
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
            AddCommentsOnPage()
        }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayReviews);


