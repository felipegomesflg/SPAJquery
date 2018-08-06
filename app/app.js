

var Assets = {
    loadedJS: {},
    removeJS: function(asset_name) {
        delete this.loadedJS[asset_name];
        $('script[src="' + asset_name + '"]').remove();
    },
    hasJS: function(asset_name) {
        return $('script[src="' + asset_name + '"]').length > 0;
    },
    loadJS: function (asset_name) {
        if (typeof this.loadedJS[asset_name] != 'undefined' )
            return;

        var html_doc = document.getElementsByTagName('head')[0];
        var st = document.createElement('script');
        st.setAttribute('language', 'javascript');
        st.setAttribute('type', 'text/javascript');
        st.setAttribute('src', asset_name);
        st.onload = function () { Assets._script_loaded(asset_name); };
        html_doc.appendChild(st);
    },
    _script_loaded: function (asset_name) {
        this.loadedJS[asset_name] = true;
        return;
    }
};


$(function ()
{
	Assets.loadJS('js/ajax.js');
    $(window).on('hashchange', loadPages); //mudança de rota
    loadPages();
});


function loadPages()
{
    $('*[extends]').each(function(){
                $(this).load(Config.dir_template + $(this).attr('extends') + '.html');
        });

    var app = '.' + $('html').attr('app-name');
    var content = $('*[content]');

    if(location.hash == '')
        location.hash = '#' + Config.homepage;
    var route = location.hash.replace(/[#\/]/g, '') || Config.homepage;
    var routes = null;
$.getJSON('routes.json', function(data) {
        routes = data;
        route = defineRoute(routes, route);

        if(route == null) {
           console.log('Rota não foi definida');
           return;
        }

        content.load(Config.dir_views + route.replace('!', '') + '.html');

        var first = route.substring(0, 1);
        if(first == '!')
			route = route.replace('!','');
		
            $.getScript(Config.dir_controllers + route + '.js', function(){});

        if( typeof Config.load_gdb != 'undefined')
            Config.load_gdb.destroyInstance();

    }).error(function() {
        console.log('Há algum erro no arquivo de rotas');
    });
}
function defineRoute(routes, route_p)
{
    var routes_key = Object.keys(routes);
    var routes_values = Object.values(routes);

    for (var i = 0; i < routes_key.length; i++)
        if(route_p == routes_key[i])
            return routes_values[i].replace('.', '/');

    return null;
}

