/**
 * represents some additional functionality for the Event class
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Event = new Class(Event, {
  extend: {
    NATIVE:   Event,
    
    // mouse button codes
    BUTTONS: {
      click:       0,
      middleclick: 1,
      rightclick:  2
    },
    
    // key codes
    KEYS: {
      BACKSPACE:  8,
      TAB:        9,
      ENTER:     13,
      ESCAPE:    27,
      SPACE:     32,
      PAGE_UP:   33,
      PAGE_DOWN: 34,
      END:       35,
      HOME:      36,
      LEFT:      37,
      UP:        38,
      RIGHT:     39,
      DOWN:      40,
      INSERT:    45,
      DELETE:    46
    },
    
    /**
     * extends a native object with additional functionality
     *
     * @param Event event
     * @return Event same event but extended
     */
    ext: function(event) {
      if (!event.stop) {
        Event.Base.ext(event);
        
        event.eventName = Event.cleanName(event.type || '');
        if (Event.Mouse.NAMES.includes(event.eventName)) {
          Event.Mouse.ext(event);
        } else if (defined(event.keyCode)){
          Event.Keyboard.ext(event);
        }
      }
      
      return event;
    },
    
    /**
     * cleans up the event name
     *
     * @param String event name
     * @return String fixed event name
     */
    cleanName: function(name) {
      name = name.toLowerCase();
      name = name.startsWith('on') ? name.slice(2) : name;
      name = name == 'contextmenu' ? 'rightclick'  : name;
      return name;
    },
    
    /**
     * returns a real, browser specific event name 
     *
     * @param String clean unified name
     * @return String real name
     */
    realName: function(name) {
      if (name == 'mousewheel' && Browser.Gecko) name = 'DOMMouseScroll';
      if (name == 'rightclick' && Browser.IE)    name = 'contextmenu';
      return name;
    }
  },
  
  /**
   * constructor. pretty much plays a virtual factory, instances new events or extends
   * existing ones and always returns an event instead of void as a normal constructor
   *
   * @param mixed native Event instance or String event name
   * @param Object options
   * @return Event instance
   */
  initialize: function() {
    var args = $A(arguments), event = args.shift(), options = args.pop() || {};
    
    if (isString(event)) {
      var name = Event.cleanName(event);
      if (Event.Mouse.NAMES.includes(name)) {
        event = new Event.Mouse(name, options);
      } else if (Event.Keyboard.NAMES.includes(name)) {
        event = new Event.Keyboard(name, options);
      } else {
        event = new Event.Custom(name, options);
      }
    }
    
    return Event.ext(event);
  }
});