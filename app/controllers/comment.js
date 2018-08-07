newComment = function() {
    var formValida = validaForm();
    if (formValida) {
        formValida['postid'] = location.hash.split('/')[1]; //pega id do endereco da pagina
        new Ajax('https://jsonplaceholder.typicode.com/comments')
            .type('post')
            .data(formValida)
            .send(function(result) {
                alert('Comentário criado com sucesso!');
                setTimeout(function() {
                    window.location = "./#home";
                }, 500);
            }, function(error) {
                console.log(error);
            });
    }
}