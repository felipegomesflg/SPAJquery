//Eu usaria  jQuery.tmpl mas como nao estava na listagem de plugins permitidos...
$(document).ready(function() { //carrega usuarios
    new Ajax('https://jsonplaceholder.typicode.com/users')
        .type('get')
        .send(function(users) {
            loadPosts(users);
        }, function(error) {
            console.log(error);
        });
});

loadPosts = function(users) { //carrega todos posts
    new Ajax('https://jsonplaceholder.typicode.com/posts')
        .type('get')
        .send(function(post) {
            var html = '';
            for (var i in post) { //pega nome do usuário
                for (var y in users) {
                    if (users[y].id == post[i].userId)
                        post[i]['userName'] = users[y].name;
                }
                html += `
            <li class="posts" id="post-` + post[i].id + `">
                <div class="row" >
                    <div class="col-sm-2">
                        <h5 class="cont">Ver</h5>
                        <small> Comentários</small>
                    </div>
                    <div class="col-sm-8">
                        <h4>` + post[i].title + `</h4>
                        <span> ` + post[i].body + `</span>
                    </div>
                    <div class="col-sm-2">
                        <h5> ` + post[i].userName + `</h5>
                    </div>
                </div>
                <div class="comments col-sm-12">
                </div>
            </li>
            `
            }
            $('#posts').html(html)
                //console.log(result);
            loadComments();
        }, function(error) {
            console.log(error);
        });
}

loadComments = function() { //ao clicar na linha da postagem carrega seus comentarios
    $('.posts>.row').on('click', function() {
        var row = $(this).parent();
        if (row.hasClass('open')) {
            row.find('.comments').empty();
            row.find('.cont').html('Ver');
            row.removeClass('open');
            return false;
        } else
            row.addClass('open');

        var html = '';
        new Ajax('https://jsonplaceholder.typicode.com/comments?postId=' + row.attr('id').split('post-')[1])
            .type('get')
            .send((comment) => {
                row.find('.cont').html(comment.length);
                for (var y in comment) {
                    html += `
                    <div class="col-sm-3">
                    <h6>` + comment[y].email + `</h6>
                    <p>` + comment[y].body + `</p>
                    </div>
                `;
                }
                html += `
                    <div class="col-sm-3 add">
                    <a href="#comment/` + row.attr('id').split('post-')[1] + `" class="btn"> Novo Comentário</a>
                    </div>
                    `
                row.find('.comments').html(html);

            }, function(error) {
                console.log(error);
            });
    })

}



//                    <td></td>