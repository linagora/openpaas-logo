(function() {
  /**
  * Utility function to create elements. If no tag name is given,
  * a DIV is created. Optionally properties can be passed.
  */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
  * Appends children and returns the parent.
  */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }
  
  function createStyleSheet() {
    var el = createEl('style', {type : 'text/css'});
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  };

  angular.module('openpaas-logo', [])
  .service('op:injectCss', function() {
    var rules = [
      '.openpaas-logo{width:11em;height:11em;position:relative;display:inline-block;}',
      '.openpaas-logo,.openpaas-logo>div{-moz-box-sizing:content-box;box-sizing:content-box;' +
      '-o-box-sizing:content-box;-ms-box-sizing:content-box;-webkit-box-sizing:content-box;}',
      '.openpaas-logo>.circle{position: absolute;border-radius: 40em;}',
      '.openpaas-logo>.blue-circle{height:3em;width:3em;border:0.9em solid rgb(89,122,183);top:1em;left:0.6em;',
      '.openpaas-logo>.yellow-circle{height:3.4em;width:3.4em;border:1em solid rgb(241,206,40);top:3.7em;left:5.2em;',
      '.openpaas-logo>.grey-circle{height:1.3em;width:1.3em;border:0.5em solid rgb(176,177,178);top:6.4em;left:2.2em;'
    ];
    
    var animrules = [
    '.openpaas-logo.spin>.blue-circle{'+
      'animation-duration: 3s;animation-name:spin-blue;animation-iteration-count:infinite;animation-timing-function:linear;' +
      '-moz-animation-duration: 3s;-moz-animation-name:spin-blue;-moz-animation-iteration-count:infinite;-moz-animation-timing-function:linear;' +
      '-webkit-animation-duration: 3s;-webkit-animation-name:spin-blue;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear;' +
      '-ms-animation-duration: 3s;-ms-animation-name:spin-blue;-ms-animation-iteration-count:infinite;-ms-animation-timing-function:linear;' +
      '-o-animation-duration: 3s;-o-animation-name:spin-blue;-o-animation-iteration-count:infinite;-o-animation-timing-function:linear;}' ,
      '.openpaas-logo.spin>.yellow-circle{'+
      'animation-duration: 3s;animation-name:spin-yellow;animation-iteration-count:infinite;animation-timing-function:linear;' +
      '-moz-animation-duration: 3s;-moz-animation-name:spin-yellow;-moz-animation-iteration-count:infinite;-moz-animation-timing-function:linear;' +
      '-webkit-animation-duration: 3s;-webkit-animation-name:spin-yellow;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear;' +
      '-ms-animation-duration: 3s;-ms-animation-name:spin-yellow;-ms-animation-iteration-count:infinite;-ms-animation-timing-function:linear;' +
      '-o-animation-duration: 3s;-o-animation-name:spin-yellow;-o-animation-iteration-count:infinite;-o-animation-timing-function:linear;}' ,
      '.openpaas-logo.spin>.grey-circle{' +
      'animation-duration: 3s;animation-name:spin-grey;animation-iteration-count:infinite;animation-timing-function:linear;' +
      '-moz-animation-duration: 3s;-moz-animation-name:spin-grey;-moz-animation-iteration-count:infinite;-moz-animation-timing-function:linear;' +
      '-webkit-animation-duration: 3s;-webkit-animation-name:spin-grey;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear;' +
      '-ms-animation-duration: 3s;-ms-animation-name:spin-grey;-ms-animation-iteration-count:infinite;-ms-animation-timing-function:linear;' +
      '-o-animation-duration: 3s;-o-animation-name:spin-grey;-o-animation-iteration-count:infinite;-o-animation-timing-function:linear;}' 
    ];
    
    var keyframesrules = [
      '@PREFIXkeyframes spin-blue {from{height:3em;width:3em;border: 0.9em solid rgb(89,122,183);top:1em;left:0.6em;} ' +
      '33% {height:3.4em;width:3.4em;border:1em solid rgb(241,206,40);top:3.7em;left:5.2em;} ' +
      '66% {height:1.3em;width:1.3em;border:0.5em solid rgb(176,177,178);top:6.4em;left:2.2em;} '+
      'to {height:3em;width:3em;border:0.9em solid rgb(89,122,183);top:1em;left:0.6em;}}',
      '@PREFIXkeyframes spin-yellow{from {height:3.4em;width:3.4em;border:1em solid rgb(241,206,40);top:3.7em;left:5.2em;} ' +
      '33% {height:1.3em;width:1.3em;border:0.5em solid rgb(176,177,178);top:6.4em;left:2.2em;} '+
      '66% {height:3em;width:3em;border:0.9em solid rgb(89,122,183);top:1em;left:0.6em;} '+
      'to {height:3.4em;width:3.4em;border:1em solid rgb(241,206,40);top:3.7em;left:5.2em;}}',
      '@PREFIXkeyframes spin-grey{from {height:1.3em;width:1.3em;border:0.5em solid rgb(176,177,178);top:6.4em;left:2.2em;} ' +
      '33% {height:3em;width:3em;border:0.9em solid rgb(89,122,183);top:1em;left:0.6em;} '+
      '66% {height:3.4em;width:3.4em;border:1em solid rgb(241,206,40);top:3.7em;left:5.2em;} '+
      'to {height:1.3em;width:1.3em;border:0.5em solid rgb(176,177,178);top:6.4em;left:2.2em;}}'
    ];
    
    var sheet = createStyleSheet();
    
    ['', '-moz-', '-webkit-', '-ms-', '-o-'].forEach(function(prefix) {
      keyframesrules.forEach(function(rule) {
        try {
          sheet.insertRule(rule.replace(/PREFIX/g,prefix), sheet.cssRules.length);
        } catch(e) {}
      });
    });
    
    rules.concat(animrules).forEach(function(rule) {
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch(e) {}
    });
    
  })
  .value('op:template', '<div class="openpaas-logo"><div class="circle blue-circle"></div><div class="circle yellow-circle"></div><div class="circle grey-circle"></div></div>')
  .factory('openpaasDomLogo', ['$document', function($document) {
    return function openpaasDomLogo() {
      var root = $document[0].createElement('div');
      root.classList.add('openpaas-logo');
      var b = $document[0].createElement('div');
      b.classList.add('circle');
      b.classList.add('blue-circle');
      root.appendChild(b);
      var y = $document[0].createElement('div');
      y.classList.add('circle');
      y.classList.add('yellow-circle');
      root.appendChild(y);
      var g = $document[0].createElement('div');
      g.classList.add('circle');
      g.classList.add('grey-circle');
      root.appendChild(g);
      return root;
    };
  }])
  .directive('openpaasLogo', ['op:injectCss', 'op:template', function(foo, template) {
    return {
      restrict: 'EA',
      replace: true,
      template: template
    };
  }])
  .directive('openpaasLogoSpinner', ['openpaasDomLogo', 'op:injectCss', function(openpaasDomLogo) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.spinner = null;
        scope.size = angular.isDefined(attrs.spinnerSize) ? attrs.spinnerSize : false;
        scope.key = angular.isDefined(attrs.spinnerKey) ? attrs.spinnerKey : false;
        scope.spinnerClass = angular.isDefined(attrs.spinnerClass) ? attrs.spinnerClass : 'spin';
        scope.startActive = angular.isDefined(attrs.spinnerStartActive) ?
                            attrs.spinnerStartActive : !(scope.key);

        scope.spin = function() {
          if ( !scope.spinner ) {
            scope.spinner = openpaasDomLogo();
            if ( scope.size ) { scope.spinner.style.fontSize = scope.size+'em'; }
            scope.spinner.classList.add(scope.spinnerClass);
          }
          element[0].appendChild(scope.spinner);
        };

        scope.stop = function() {
          if ( !scope.spinner ) { return ; }
          element[0].removeChild(scope.spinner);
        };

        scope.$on('us-spinner:spin', function (event, key) {
          if(key === scope.key){ scope.spin(); }
        });

        scope.$on('us-spinner:stop', function (event, key) {
          if(key === scope.key){ scope.stop(); }
        });
        
        if ( scope.startActive ) {
          scope.spin();
        }
      }
    }
  }])
  .factory('usSpinnerService', ['$rootScope', function ($rootScope) {
    var config = {};

    config.spin = function (key) {
      $rootScope.$broadcast('us-spinner:spin', key);
    };

    config.stop = function (key) {
      $rootScope.$broadcast('us-spinner:stop', key);
    };

    return config;
  }]);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
})();
