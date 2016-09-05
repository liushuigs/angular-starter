class LoadingSpinner {
  constructor() {
    this.restrict = 'E'
    this.template = `
      <div class="loading-spinner-directive">
        <div class="spinner-wrapper">
            <i class="btr bt-spinner bt-3x bt-spin"></i>
        </div>
    </div>
    `
  }
}
LoadingSpinner.$inject = []

export default LoadingSpinner
