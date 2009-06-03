/**
 * DOM Element events handling methods
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Element.addMethods((function() {
  var observer = Observer.create({});
  
  observer.$o = {
    add: function(hash) {
      var callback = hash.f, args = hash.a;
      hash.e = Event.cleanName(hash.e);
      hash.n = Event.realName(hash.e);
      
      hash.w = function() {
        Event.ext(arguments[0]);
        return callback.apply(this, $A(arguments).concat(args));
      };
      
      if (Browser.IE) hash.w = hash.w.bind(this);
      
      if (this.addEventListener) {
        this.addEventListener(hash.n, hash.w, false);
      } else {
        this.attachEvent('on'+ hash.n, hash.w);
      }
    },
    
    remove: function(hash) {
      if (this.removeEventListener) {
        this.removeEventListener(hash.n, hash.w, false);
      } else {
        this.detachEvent('on'+ hash.n, hash.w);
      }
    },
    
    fire: function(name, args, hash) {
      var event = new Event(name, args.shift());
      hash.f.apply(this, [event].concat(hash.a).concat(args));
    }
  };
  
  return observer;
})());
