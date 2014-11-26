data = {
    articles: [
        {
            author: 'admin',
            date: new Date(2014, 10, 20),
            stringDate: formatDate(new Date(2014, 10, 20)),
            header: 'test header',
            text: 'some text'
        },

        {
            author: 'admin',
            date: new Date(2014, 10, 22),
            stringDate: formatDate(new Date(2014, 10, 22)),
            header: 'second header',
            text: 'another some text'
        }
    ]
}

template = '{{#articles}}<h3>{{header}}</h3><p>added by: <strong>{{author}}</strong> on <strong>{{stringDate}}</strong></p><p>{{text}}</p><hr>{{/articles}}'

function loadTemplate() {
    document.getElementById('content-container').innerHTML = Mustache.render(template, data)
}

function formatDate(date) {

    var dd = date.getDate()
    if ( dd < 10 ) dd = '0' + dd;

    var mm = date.getMonth()+1
    if ( mm < 10 ) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if ( yy < 10 ) yy = '0' + yy;

    return dd+'.'+mm+'.'+yy;
}