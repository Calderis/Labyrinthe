function avancerDroite()
{
    if(allow){
        allow=false;
        x=parseInt(personnage.style.left);
        y=parseInt(personnage.style.top);

        pos_x = Math.floor(x/32);
        pos_y = Math.floor(y/32);

        if (LABYRINTHE[pos_y][pos_x][2]) {
            Piege(pos_x+1,pos_y);
            
            for (var i = 1; i <= 8; i++) {
                setTimeout(function () {
                    posx = posx - 4;
                    terrain.style.left = posx+'px';
                }, Math.round(280 / 8 * i));
            }
            setTimeout("personnage.className='dirDroite3';",35);
            setTimeout("personnage.style.left=parseInt(x)+4+'px';",35);
            setTimeout("personnage.style.left=parseInt(x)+8+'px';",70);
            setTimeout("personnage.className='dirDroite2';",105);
            setTimeout("personnage.style.left=parseInt(x)+12+'px';",105);
            setTimeout("personnage.style.left=parseInt(x)+16+'px';",140);
            setTimeout("personnage.className='dirDroite1';",175);
            setTimeout("personnage.style.left=parseInt(x)+20+'px';",175);
            setTimeout("personnage.style.left=parseInt(x)+24+'px';",210);
            setTimeout("personnage.className='dirDroite2';",245);
            setTimeout("personnage.style.left=parseInt(x)+28+'px';",245);
            setTimeout("personnage.style.left=parseInt(x)+32+'px';",280);
        }
        setTimeout("allow=true;VerifArrive();",280);
    }
}

function avancerGauche(mapactuel)
{
    if(allow){
        allow=false;
        x=parseInt(personnage.style.left);
        y=parseInt(personnage.style.top);
        
        pos_x = Math.floor(x/32);
        pos_y = Math.floor(y/32);

        if (LABYRINTHE[pos_y][pos_x][4]) {
            Piege(pos_x-1,pos_y);
            
            for (var i = 1; i <= 8; i++) {
                setTimeout(function () {
                    posx = posx + 4;
                    terrain.style.left = posx+'px';
                }, Math.round(280 / 8 * i));
            }
            setTimeout("personnage.className='dirGauche3';",35);
            setTimeout("personnage.style.left=parseInt(x)-4+'px';",35);
            setTimeout("personnage.style.left=parseInt(x)-8+'px';",70);
            setTimeout("personnage.className='dirGauche2';",105);
            setTimeout("personnage.style.left=parseInt(x)-12+'px';",105);
            setTimeout("personnage.style.left=parseInt(x)-16+'px';",140);
            setTimeout("personnage.className='dirGauche1';",175);
            setTimeout("personnage.style.left=parseInt(x)-20+'px';",175);
            setTimeout("personnage.style.left=parseInt(x)-24+'px';",210);
            setTimeout("personnage.className='dirGauche2';",245);
            setTimeout("personnage.style.left=parseInt(x)-28+'px';",245);
            setTimeout("personnage.style.left=parseInt(x)-32+'px';",280);
        }
        setTimeout("allow=true;VerifArrive();",280);
    }
}

function avancerBas()
{
    if(allow){
        allow=false;
        x=parseInt(personnage.style.left);
        y=parseInt(personnage.style.top);
        
        pos_x = Math.floor(x/32);
        pos_y = Math.floor(y/32);

        if (LABYRINTHE[pos_y][pos_x][3]) {
            Piege(pos_x,pos_y+1);
            
            for (var i = 1; i <= 8; i++) {
                setTimeout(function () {
                    posy = posy - 4;
                    terrain.style.top = posy+'px';
                }, Math.round(280 / 8 * i));
            }
            setTimeout("personnage.className='dirBas3';",35);
            setTimeout("personnage.style.top=parseInt(y)+4+'px';",35);
            setTimeout("personnage.style.top=parseInt(y)+8+'px';",70);
            setTimeout("personnage.className='dirBas2';",105);
            setTimeout("personnage.style.top=parseInt(y)+12+'px';",105);
            setTimeout("personnage.style.top=parseInt(y)+16+'px';",140);
            setTimeout("personnage.className='dirBas1';",175);
            setTimeout("personnage.style.top=parseInt(y)+20+'px';",175);
            setTimeout("personnage.style.top=parseInt(y)+24+'px';",210);
            setTimeout("personnage.className='dirBas2';",245);
            setTimeout("personnage.style.top=parseInt(y)+28+'px';",245);
            setTimeout("personnage.style.top=parseInt(y)+32+'px';",280);
        }
        setTimeout("allow=true;VerifArrive();",280);
    }
}


function avancerHaut()
{
    if(allow){
        allow=false;
        x=parseInt(personnage.style.left);
        y=parseInt(personnage.style.top);

        pos_x = Math.floor(x/32);
        pos_y = Math.floor(y/32);

        if (LABYRINTHE[pos_y][pos_x][1]) {
            Piege(pos_x,pos_y-1);
            
            for (var i = 1; i <= 8; i++) {
                setTimeout(function () {
                    posy = posy + 4;
                    terrain.style.top = posy+'px';
                }, Math.round(280 / 8 * i));
            }
            setTimeout("personnage.className='dirHaut3';",35);
            setTimeout("personnage.style.top=parseInt(y)-4+'px';",35);
            setTimeout("personnage.style.top=parseInt(y)-8+'px';",70);
            setTimeout("personnage.className='dirHaut2';",105);
            setTimeout("personnage.style.top=parseInt(y)-12+'px';",105);
            setTimeout("personnage.style.top=parseInt(y)-16+'px';",140);
            setTimeout("personnage.className='dirHaut1';",175);
            setTimeout("personnage.style.top=parseInt(y)-20+'px';",175);
            setTimeout("personnage.style.top=parseInt(y)-24+'px';",210);
            setTimeout("personnage.className='dirHaut2';",245);
            setTimeout("personnage.style.top=parseInt(y)-28+'px';",245);
            setTimeout("personnage.style.top=parseInt(y)-32+'px';",280);
        }
        setTimeout("allow=true;VerifArrive();",280);
    }
}