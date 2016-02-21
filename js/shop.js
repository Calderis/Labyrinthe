$('#profil').mouseup(function(){
    $('#shop').css({
        'display': 'none'
    });
    $('#contentHeros').css({
        'display': 'block'
    })
});

$('#boutique').mouseup(function(){
    $('#shop').css({
        'display': 'block'
    });
    $('#contentHeros').css({
        'display': 'none'
    })
});


function purchase_item(num){
    switch(num){
        case 1:
        price = 2000;
        break;
        case 2:
        price = 8000;
        break;
        case 3:
        price = 12000;
        break;
    }
        if ( OR >= price )
        {
            OR = OR - price;
            document.getElementById("GOLD").innerHTML = OR;
            $('#buy_' + num).css({
                'display': 'none'
            });
            $('#bought_' + num).css({
                'display': 'block'
            })

            if (num == 1){
                craie=true;
            }
            if (num == 2){
                skin2=true;
                $('#skin_2').html("<img src='images/skin2.png'>");
            }
            if (num == 3){
                lampe=true;
                document.getElementById('MASK').className = "MasqueType4";
            }

        }
}

$('#skin_1').mouseup(function(){
    $('#personnage').css({
        'background-image': 'url("../images/47bis.png")'
    });
    $('.avatar').attr('src', '../images/skin2.png');
});

$('#skin_2').mouseup(function(){
    $('#personnage').css({
        'background-image': 'url("images/2.png")'
    });
    $('.avatar').attr('src', 'images/skin2.png');
});

