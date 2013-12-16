chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("frameless_window.html",
    {  frame: "none",
       id: "framelessWinID",
       bounds: {
         width: 265,
         height: 620,
         left: 600
       },
       "resizable": false
    }
  );
});

