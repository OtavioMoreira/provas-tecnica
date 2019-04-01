$(document).ready(function() {
    //Usei esse site para colocar para colocar o json em um servidor
    //Dessa forma não dando conflitos com o crhome 
    //http://myjson.com/105qmi
    $.getJSON("https://api.myjson.com/bins/105qmi", function(data) {
        $.each(data.products, function(key, val) {
            $('.list-products')
                .append('<li class="item item-paginate"><img src="' + val.image + '" class="img-center img-full"><h4 class="title-list">' + val.name + '</h4> <h5>' + val.price + '</h5></li>');
        });
        paginate();
    });
});

$('.menu-toggle').click(function() {
    $('.nav-overlay').fadeToggle('fast', function() {
        $('.menu-mobile').toggleClass('open');
    });
});

$('.select-filter').change(function() {
    var value = $(this).val();
    $('.list-products, #pagin').html('');

    $.getJSON("https://api.myjson.com/bins/105qmi", function(data) {
        switch (value) {
            case 'az':
                data.products = data.products.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                break;
            case 'za':
                data.products = data.products.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
                break;
            case 'maior_preco':
                data.products = data.products.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
                break;
            case 'menor_preco':
                data.products = data.products.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
                break;
            default:
                console.log('Sorry, we are out of ' + value + '.');
        }

        $.each(data.products, function(key, val) {
            $('.list-products')
                .append('<li class="item item-paginate"><img src="' + val.image + '" class="img-center img-full"><h4 class="title-list">' + val.name + '</h4> <h5>' + val.price + '</h5></li>');
        });
        paginate();
    });
});

function paginate() {
    //Aparentemente ele parece não estar trocando, 
    //mas é porque tem itens duplicados na base de calçados, se vocês diminuirem o pageSize, 
    //iram notar que está trocando corretamente
    pageSize = 20; // Número de itens por elemento de páginação
    var pageCount = $(".item-paginate").length / pageSize;
    $("#pagin").prepend('<li class="block" action="first"><i class="fa fa-angle-left"></i></li> ');
    for (var i = 0; i < pageCount; i++) {
        $("#pagin").append('<li action="' + (i + 1) + '">' + (i + 1) + '</li> ');
    }
    $("#pagin").append('<li action="last"><i class="fa fa-angle-right"></i></li> ');

    $("#pagin li:nth-child(2)").addClass("current")

    showPage = function(page) {
        $(".item-paginate").hide();
        $(".item-paginate").each(function(n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    }

    showPage(2);

    $("#pagin li").click(function() {
        var attr = $(this).attr('action');

        $("#pagin li:first-child, #pagin li:last-child").removeClass("block");

        switch (attr) {
            case 'first':
                $("#pagin li:first-child").addClass("block");
                $("#pagin li").removeClass("current");
                $("#pagin li:nth-child(2)").addClass("current");
                showPage(1);
                break;
            case 'last':
                $("#pagin li:last-child").addClass("block");
                $("#pagin li").removeClass("current");
                $("#pagin li:nth-last-child(2)").addClass("current");
                showPage(pageCount);
                break;
            default:
                $("#pagin li:last-child, #pagin li:first-child").removeClass("block");
                $("#pagin li").removeClass("current");
                $(this).addClass("current");
                showPage(parseInt($(this).text()));
        }
    });
}