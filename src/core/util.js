/**
 * There are some util methods
 *
 * Credits:
 *   Some of the functionality and names are inspired or copied from
 *     - Prototype (http://prototypejs.org)   Copyright (C) Sam Stephenson
 *     - MooTools  (http://mootools.net)      Copyright (C) Valerio Proietti
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
 
/**
 * extends the first object with the keys and values of the second one
 *
 * NOTE: the third optional argument tells if the existing values
 *       of the first object should _NOT_ get updated by the values of the second object
 *
 * @param Object destintation object
 * @param Object source object
 * @param Boolean flag if the function should not overwrite intersecting values
 * @return Objecte extended destination object
 */
function $ext(dest, src, dont_overwrite) { 
  var src = src || {}, key;

  for (key in src)
    if (dont_overwrite === undefined || dest[key] === undefined)
      dest[key] = src[key];

  return dest;
};

/**
 * tries to execute all the functions passed as arguments
 *
 * NOTE: will hide all the exceptions raised by the functions
 *
 * @param Function to execute
 * ......
 * @return mixed first sucessfully executed function result or undefined by default
 */
function $try() {
  for (var i=0; i < arguments.length; i++) {
    try {
      return arguments[i]();
    } catch(e) {}
  }
};

/** !#server
 * evals the given javascript text in the context of the current window
 *
 * @param String javascript
 * @return void
 */
function $eval(text) {
  if (!isString(text) || text.blank()) return;
  if (window.execScript) {
    window.execScript(text);
  } else {
    $E('script', {type: 'text/javascript', text: text}).insertTo(document.body);
  }
}

/**
 * throws an exception to break iterations throw a callback
 *
 * @return void
 * @throws Break
 */
function $break() {
  throw new Break();
};

/**
 * generates aliases for the object properties
 *
 * @param Object object
 * @param Object aliases hash
 * @return Object the extended objects
 */
function $alias(object, names) {
  for (var new_name in names) {
    object[new_name] = object[names[new_name]];
  }
  return object;
};

/**
 * checks if the given value or a reference points
 * to a really defined value
 *
 * NOTE: will return true for variables equal to null, false, 0, and so one.
 *
 * EXAMPLE:
 *
 *   var smth = null;
 *   defined(smth); <- will return true
 *
 *   var obj = {};
 *   defined(obj['smth']); <- will return false
 *
 * @param mixed value
 * @return boolean check result
 */
function defined(value) {
  return value !== undefined;
};


/**
 * checks if the given value is a function
 *
 * @param mixed value
 * @return boolean check result
 */
function isFunction(value) {
  return typeof(value) === 'function';
};

/**
 * checks if the given value is a string
 *
 * @param mixed value
 * @return boolean check result
 */
function isString(value) {
  return typeof(value) === 'string';
};


/**
 * checks if the given value is a number
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isNumber(value) {
  return typeof(value) === 'number';
};

/** !#server
 * checks if the given value is an element
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isElement(value) {
  return value && value.tagName;
};

/** !#server
 * checks if the given value is a DOM-node
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isNode(value) {
  return value && value.nodeType;
};

/** !#server
 * shortcut to instance new elements
 *
 * @param String tag name
 * @param object options
 * @return Element instance
 */
function $E(tag_name, options) {
  return new Element(tag_name, options);
};

/** !#server
 * searches an element by id and/or extends it with the framework extentions
 *
 * @param String element id or Element to extend
 * @return Element or null
 */
function $(element) {
  return typeof(element) === 'string' ? document.getElementById(element) : element;
};

/** !#server
 * searches for elements in the document which matches the given css-rule
 *
 * @param String css-rule
 * @return Array matching elements list
 */
function $$(css_rule) {
  return $A(document.querySelectorAll(css_rule));
};

/**
 * shortcut, generates an array of words from a given string
 *
 * @param String string
 * @return Array of words
 */
function $w(string) {
  return string.trim().split(/\s+/);
}

// we need to generate those functions in an anonymous scope
(function() {
  var to_s = Object.prototype.toString, slice = Array.prototype.slice, UID = 1;
  
  /**
   * checks if the given value is a hash-like object
   *
   * @param mixed value
   * @return boolean check result
   */
  isHash = function(value) {
    return to_s.call(value) === '[object Object]';
  };
  
  /** !#server
   * Internet Explorer needs some additional mumbo-jumbo in here
   */
  if (isHash(document.documentElement)) {
    isHash = function(value) {
      return to_s.call(value) === '[object Object]' &&
        value !== null && value !== undefined &&
        value.hasOwnProperty !== undefined;
    };
  }

  /**
   * checks if the given value is an array
   *
   * @param mixed value to check
   * @return boolean check result
   */
  isArray = function(value) {
    return to_s.call(value) === '[object Array]';
  };
  
  /**
   * converts any iterables into an array
   *
   * @param Object iterable
   * @return Array list
   */
  $A = function (it) {
    try {
      return slice.call(it);
    } catch(e) {
      for (var a=[], i=0, length = it.length; i < length; i++)
        a[i] = it[i];
      return a;
    }
  };

  /**
   * generates an unique id for an object
   *
   * @param Object object
   * @return Integer uniq id
   */
  $uid = function(item) {
    return item.uid || (item.uid = UID++);
  };
  
})();


