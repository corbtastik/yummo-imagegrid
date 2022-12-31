const ImageGrids = (function() {
  /**
   * ImageGrid constructor: Creates an ImageGrid instance.
   * @param {String} name - Name of the ImageGrid.
   * @constructor
   */
  const ImageGrid = function(name) {
    this.name = name
    // The Image Grid elementId
    this.imageGridId = "ig-" + this.name
    // The elementId holding source images
    this.imageGridTargetId = "ig-target-" + this.name
    // The elementId of the selected image from grid
    this.imageGridImageCaptionId = this.name + "-caption-{0}"
    // Load the ImageGrid element
    this.imageGridElement = Utils.dom.getById(this.imageGridId)
    // Load the ImageGrid target element
    this.imageGridTargetElement = Utils.dom.getById(this.imageGridTargetId)
    // Load the Images
    this.imageGridElements = Utils.dom.getImgElements(this.imageGridTargetElement)
  }

  /**
   * Static
   * @type {Map<string, ImageGrid>} instances: A cache of ImageGrid instances.
   */
  ImageGrid.instances = new Map()

  /**
   * Static
   * @type {number} IMAGE_GRID_LIMIT: The max number of Image Grids that can be created.
   */
  ImageGrid.IMAGE_GRID_LIMIT = 25

  /**
   * @static - This method is static because it does not need a specific ImageGrid object to work with.
   * @returns {object} ImageGrid - The ImageGrid instance
   */
  ImageGrid.instance = function(name) {
    // Return the ImageGrid instance if it exists
    if(ImageGrid.instances.has(name)) {
      return ImageGrid.instances.get(name)
    }
    // Protect against ImageGrid craziness by enforcing a limit
    if(ImageGrid.instances.size > ImageGrid.IMAGE_GRID_LIMIT) {
      const errorMessage = "Can't create ImageGrid {0} because it would exceed IMAGE_GRID_LIMIT={1}."
        .format(name, ImageGrid.IMAGE_GRID_LIMIT)
      Utils.error(errorMessage)
      throw errorMessage
    }
    // Create a new ImageGrid
    const imageGrid = new ImageGrid(name)
    Utils.log("ImageGrid " + name + " created.")
    ImageGrid.instances.set(name, imageGrid)
    return imageGrid
  }

  /**
   * Opens an image from the ImageGrid when a user clicks it, hides the
   * grid and other images.
   *
   * @param {String} imageId - The elementId of the image to open.
   */
  ImageGrid.prototype.openImage = function(imageId) {
    // Hide the ImageGrid
    Utils.dom.hide(this.imageGridElement)
    // Loop over all images, show the selected one, hide the rest
    for(let i = 0; i < this.imageGridElements.length; i++) {
      if(this.imageGridElements[i].id === imageId) {
        Utils.dom.show(this.imageGridElements[i])
        Utils.dom.show(Utils.dom.getById(this.imageGridImageCaptionId.format(i)))
        this.openImageIndex = i
      } else {
        Utils.dom.hide(this.imageGridElements[i])
        Utils.dom.hide(Utils.dom.getById(this.imageGridImageCaptionId.format(i)))
      }
    }
    // Show the selected image by toggling off "no-display"
    Utils.dom.toggleClass(this.imageGridTargetElement, "no-display")
    Utils.dom.show(this.imageGridTargetElement)
  }

  /**
   * Close all open images and show the grid when user clicks on an open one.
   * Unlike the openImage function, closeImage does not need the "imageId"
   * parameter, because this function closes all images and shows the grid.
   */
  ImageGrid.prototype.closeImage = function() {
    // Hide all images
    for(let i = 0; i < this.imageGridElements.length; i++) {
      Utils.dom.hide(Utils.dom.getById(this.imageGridImageCaptionId.format(i)))
      Utils.dom.hide(this.imageGridElements[i])
    }
    // Hide the open image
    Utils.dom.hide(this.imageGridTargetElement)
    Utils.dom.toggleClass(this.imageGridTargetElement, "no-display")
    // Show the ImageGrid
    Utils.dom.show(Utils.dom.getById(this.imageGridId))
  }

  //----------------------------------------------------------------------
  // Return the module's interface
  //----------------------------------------------------------------------
  return {
    instance: ImageGrid.instance
  }
})();