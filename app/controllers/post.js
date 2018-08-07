//Eu usaria  jQuery.tmpl mas como nao estava na listagem de plugins permitidos...
$(document).ready(function() {
    new Ajax('https://jsonplaceholder.typicode.com/users')
        .type('get')
        .send(function(result) {
            var html = '';
            for (var i in result) {
                html += `
                <option value="` + result[i].id + `">
                ` + result[i].name + `
                </option>
            `
            }
            $('#users').append(html)
        }, function(error) {
            console.log(error);
        });
})

newPost = function() {
    var formValida = validaForm();
    if (formValida) {
        new Ajax('https://jsonplaceholder.typicode.com/posts')
            .type('post')
            .data(formValida)
            .send(function(result) {
                alert('Post criado com sucesso!');
                setTimeout(function() {
                    window.location = "./#home";
                }, 500);
            }, function(error) {
                console.log(error);
            });
    }
}