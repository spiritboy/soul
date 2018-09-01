window.menu = null;
window.Focus =(guid,quid)=>  {
    var q = window.menu.findQV(guid,quid);
    console.log('focusing to ',q);
}
