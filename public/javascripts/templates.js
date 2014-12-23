template = '{{#.}}<p>' +
                '<a href="#" data-toggle="modal" data-target="#myModal" onclick="loadSingle(\'{{_id}}\')">' +
                    '<span class="like-a-h">{{header}}</span>' +
                '</a><br><br>' +
                'added by: <strong>{{author}}</strong> on <strong>{{textDate}}</strong><br><br>' +
                '<a href="#" class="linkdeletepost" rel="{{_id}}">Delete post</a><br><br>' +
                '{{text}}<br><hr>' +
            '</p>{{/.}}';
withoutPaginTemplate = '{{#.}}<p><span class="like-a-h">{{header}}</span><br><br>added by: <strong>{{author}}</strong> on <strong>{{textDate}}</strong><br><br>{{text}}<hr></p>{{/.}}';
templateSingle = '<p><a href="#" data-toggle="modal" data-target="#myModal" onclick="loadSingle(\'{{_id}}\')"><h6>{{header}}</h6></a><p>added on {{textDate}}</p><hr>';
sorryTemplate = '<h3>{{sorry}}</h3><br><br><p>{{text}}</p>';
imgTemplate = '{{#.}}<a href="{{href}}" title="{{title}}" data-gallery><img src="{{src}}"></a>{{/.}}';