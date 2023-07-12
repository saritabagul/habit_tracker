{
    function setFlash(type,text){
        new Noty({
            theme: 'relax',
            text: text,
            type: type, // success or error
            layout: 'topRight',
            timeout: 1500                        
        }).show();
    }

}