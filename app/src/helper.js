window.menu = null;
window.Focus =(guid,quid)=>  {
    var q = window.menu.findQuestion(guid,quid);
    console.log('focusing to ',q);
}
