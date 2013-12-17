chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("elmnts_window.html",
    {  frame: "none",
       id: "elmntsWinID",
       bounds: {
         width: 265,
         height: 600,
         left: 600
       },
       "resizable": false
     }
  );
});