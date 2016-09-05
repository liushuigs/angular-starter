/**
 * Pagination directive
 * on-update should return a defer
 */
class Pagination {
  constructor() {
    this.restrict = 'E'
    this.scope = {
      offset: '=',
      limit: '=',
      total: '=',
      onPageChange: '&'
    }
    // TODO adding the following will make this directive not work, why?
    //this.replace = true
    this.template = `
      <div class="m-pagination" ng-if="total>limit">
        <div class="item"
        ng-repeat="item in items"
        ng-click="onChange(item)"
        ng-class="{disabled: item.disabled}">{{item.label}}</div>
      </div>
    `
  }

  link(scope) {
    // first time, only scope.total changes
    scope.$watch('total', () => {
      scope.update()
    })
    // afterwards, only scope.offset changes
    scope.$watch('offset', () => {
      scope.update()
    })
    scope.update = () => {
      if (scope.total > 0) {
        const currentPage = scope.offset / scope.limit + 1
        const totalPage = Math.ceil(scope.total / scope.limit)
        const showLen = 5
        const halfShowLen = Math.ceil(showLen / 2)
        const minPage = Math.max(1, currentPage - halfShowLen)
        const maxPage = Math.min(minPage + 5, totalPage)
        const items = []
        items.push({page: 1, label: '首页', disabled: currentPage === 1})
        items.push({page: currentPage - 1, label: '上一页', disabled: currentPage === 1})
        if (minPage > 2) {
          items.push({page: 0, label: '...', disabled: true})
        }
        for (let i = minPage; i < maxPage + 1; i++) {
          items.push({page: i, label: i, disabled: currentPage === i})
        }
        if (maxPage < totalPage - 1) {
          items.push({page: 0, label: '...', disabled: true})
        }
        items.push({page: currentPage + 1, label: '下一页', disabled: currentPage + 1 > totalPage})
        items.push({page: totalPage, label: '尾页', disabled: currentPage >= totalPage})
        scope.items = items
      }
    }
    scope.onChange = (pageItem) => {
      if (!pageItem.disabled && !scope.pageLoading) {
        scope.pageLoading = true
        const offset = (pageItem.page - 1) * scope.limit
        scope.onPageChange()(offset)
          .then(() => {
            scope.pageLoading = false
          })
      }
    }
    scope.update()
  }
}
Pagination.$inject = []

export default Pagination

