Type.registerNamespace ("AspNetResources");

AspNetResources.CenteredProgressIndicator = function (element) {
    AspNetResources.CenteredProgressIndicator.initializeBase (this, [element]);
    
    this._beginRequestDelegate = null;
    this._endRequestDelegate = null;
}

AspNetResources.CenteredProgressIndicator.prototype = {
    // -----------------------------------------------------------------------------
    initialize : function () {
        
        if (this._beginRequestDelegate === null)
            this._beginRequestDelegate = Function.createDelegate(this, this._beginRequest);    

        if (this._endRequestDelegate === null)
            this._endRequestDelegate = Function.createDelegate(this, this._endRequest);    
            
        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest (this._beginRequestDelegate);
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest (this._endRequestDelegate);

        var progressContainer = this.get_element();
        progressContainer.style.display = 'none';
        Sys.UI.DomElement.addCssClass (progressContainer, 'select_free__');
        
        if (progressContainer.getElementsByTagName ('IFRAME').length == 0) {
            var frameKludge = document.createElement ('iframe');
            // Workaround: http://support.microsoft.com/kb/261188
            frameKludge.src = "about:blank";
            progressContainer.appendChild (frameKludge);
        }
        
        AspNetResources.CenteredProgressIndicator.callBaseMethod (this, 'initialize');
    },
    
    // -----------------------------------------------------------------------------
    dispose: function() {
        if (this._beginRequestDelegate) {
            Sys.WebForms.PageRequestManager.getInstance().remove_beginRequest (this._beginRequestDelegate);
            delete this._beginRequestDelegate;
        }
        
        if (this._endRequestDelegate) {
            Sys.WebForms.PageRequestManager.getInstance().remove_endRequest (this._endRequestDelegate);
            delete this._endRequestDelegate;
        }
    },
    
    // -----------------------------------------------------------------------------
    _beginRequest : function (sender, args) {
        if (Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack())
            return;
            
        var progressContainer = this.get_element();
        progressContainer.style.display  = '';
        
        var scrollX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
        
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var windowWidth  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
        
        var x = Math.round (windowWidth/2 - progressContainer.offsetWidth/2) + scrollX;
        var y = Math.round (windowHeight/2 - progressContainer.offsetHeight/2) + scrollY;
        
        Sys.UI.DomElement.setLocation (progressContainer, x, y);
    },
    
    // -----------------------------------------------------------------------------
    _endRequest : function (sender, args) {
        this.get_element().style.display = 'none';
    }
}

AspNetResources.CenteredProgressIndicator.registerClass ('AspNetResources.CenteredProgressIndicator', Sys.UI.Control);

if (typeof (Sys) !== "undefined")
    Sys.Application.notifyScriptLoaded();

