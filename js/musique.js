var audio = document.createElement("audio");  
if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg"))  
{  
    audio.src = "GuildWars2SoundtrackNorntheme.mp3";  
    audio.autoplay = true;
    audio.loop = true;
}  


$(document).ready(function(){  
   $(document).ready(function(){  
        $(".volumemuted").mouseup(function() {  
          audio.play();
          $(".volumemuted").css('display', 'none');
          $('.volume').css('display', 'block');
        });
        $(".volume").mouseup(function() {  
          audio.pause();
          $(".volume").css('display', 'none');
          $('.volumemuted').css('display', 'block');
        });    
   });  
});
