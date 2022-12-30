/* ===========================================================================================
 * Yummo Utils module
 * @param {Object} config - Properties of the module
 * @param {Number} config.enableLog - Enable logging or not, defaults to false/off
 * =========================================================================================*/
const Utils = (function(config = {}) {

  //----------------------------------------------------------------------
  // Private variables
  //----------------------------------------------------------------------
  this.enableLog = config.enableLog !== null ? config.enableLog : false

  //----------------------------------------------------------------------
  // Add format function to String
  // usage: "My name is {0}, I'm {1} years old.".format("Bucky", 12)
  //----------------------------------------------------------------------
  String.prototype.format = function () {
    let args = arguments
    return this.replace(/{(\d+)}/g, function (match, index) {
      return typeof args[index] == 'undefined' ? match : args[index]
    })
  }

  /**
   * Print a message to the console
   * @param {String} message
   */
  const log = (message) => {
    /* eslint-disable no-console */
    if(console.log && enableLog) {
      console.log(message)
    }
    /* eslint-enable no-console */
  }

  /**
   * Print a warning message to console
   * @param {String} message
   */
  const warn = (message) => {
    /* eslint-disable no-console */
    if(console.warn && enableLog) {
      console.warn(message)
    }
    /* eslint-enable no-console */
  }

  /**
   * Print an error message to console
   * @param message
   */
  const error = (message) => {
    /* eslint-disable no-console */
    if(console.error && enableLog) {
      console.error(message)
    }
    /* eslint-enable no-console */
  }

  /**
   * Convert an object to a string.
   *
   * If `null` or `undefined` return an empty string, otherwise
   * call `toString` on the object and return the result.
   *
   * @param {any} obj The object to convert to a string.
   * @return {String} string representation of the object.
   */
  const asString = (obj) => {
    if (obj === void 0 || obj === null) {
      return ""
    } else {
      return obj.toString()
    }
  }

  /**
   * A namespace containing DOM utils for a Yummo site.
   * @type {{
   *   hide: dom.hide,
   *   toggleClass: dom.toggleClass,
   *   getById: (function(*): HTMLElement),
   *   getImgElements: (function(*): *),
   *   show: dom.show
   * }}
   */
  const dom = {
    /**
     * Get an element by ID
     * @param elementId
     * @returns {HTMLElement}
     */
    getById: (elementId) => {
      return document.getElementById(elementId)
    },

    /**
     * Get an element by CSS class selector
     * @param {HTMLElement} sourceElement
     * @param {String} selector
     */
    getByClass: (sourceElement, selector) => {
      return sourceElement.getElementsByClassName(selector)
    },

    /**
     * Add a class to an element
     * @param {HTMLElement} sourceElement
     * @param {String} token
     */
    addClass: (sourceElement, token) => {
      sourceElement.classList.add(token)
    },

    /**
     * Remove a class from an element
     * @param {HTMLElement} sourceElement
     * @param {String} token
     */
    removeClass: (sourceElement, token) => {
      sourceElement.classList.remove(token)
    },

    /**
     * Set the opacity of an element
     * @param sourceElement
     * @param opacity
     */
    setOpacity(sourceElement, opacity) {
      sourceElement.style.opacity = opacity
    },

    /**
     * Get <img> elements from a given source element.
     * @param sourceElement
     * @returns {*}
     */
    getImgElements: (sourceElement) => {
      return sourceElement.getElementsByTagName("img")
    },

    /**
     * Hide an element by setting display="none".
     * @param element
     */
    hide: (element) => {
      element.style.display = "none"
    },

    /**
     * Show an element by setting display="block"
     * @param element
     */
    show: (element) => {
      element.style.display = "block"
    },

    /**
     * Toggle a CSS class (i.e. token) on the given element.
     * @param element
     * @param token
     */
    toggleClass: (element, token) => {
      element.classList.toggle(token)
    },

    /**
     * Set innerHTML of element
     * @param {HTMLElement} element to set innerHTML on
     * @param {String} text to set
     */
    innerHTML: (element, text) => {
      element.innerHTML = text
    },

    /**
     * Select all elements
     * @param element
     * @param selector
     * @returns {NodeListOf<Element> | NodeListOf<*>}
     */
    selectAll: (element, selector) => {
      return element.querySelectorAll(selector)
    }
  }

  //----------------------------------------------------------------------
  // Return the module's interface
  //----------------------------------------------------------------------
  return {
    log: log,
    warn: warn,
    error: error,
    asString: asString,
    dom: dom,
  }
})({enableLog: true});
