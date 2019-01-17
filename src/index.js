import Vue from 'vue'
export default Vue.directive('tooltip', {
  bind: function (el, binding) {
    createTooltip(el, binding)
  },
  unbind: function (el, binding) {
    let oldTooltipElements = document.getElementsByClassName(el.tooltip)
    for (let i = 0; oldTooltipElements[0]; i++) {
      oldTooltipElements[0].parentNode.removeChild(oldTooltipElements[0])
    }
  },
  componentUpdated: function (el, binding) {
    let oldTooltipElements = document.getElementsByClassName(el.tooltip)
    for (let i = 0; oldTooltipElements[0]; i++) {
      oldTooltipElements[0].parentNode.removeChild(oldTooltipElements[0])
    }
    createTooltip(el, binding)
  }
})
function createTooltip(el, binding) {
  let tooltipBox = document.createElement('div')
  let tooltipArrow = document.createElement('div')
  let tooltipText = document.createElement('span')

  tooltipText.innerHTML = binding.value
  let zIndex = findParentZIndex(el)
  if (!zIndex || zIndex === 'auto' || zIndex === '') {
    zIndex = '10'
  }
  console.log(zIndex)
  zIndex = parseInt(zIndex)
  zIndex += 10
  zIndex = zIndex.toString()

  tooltipBox.style.position = 'absolute'
  tooltipBox.style.zIndex = zIndex
  tooltipBox.style.backgroundColor = 'black'
  tooltipBox.style.color = '#fff'
  tooltipBox.style.padding = '5px 20px 5px 20px'
  tooltipBox.style.borderRadius = '6px'
  tooltipBox.style.display = 'none'
  tooltipBox.style.fontSize = '12px'
  tooltipBox.style.maxWidth = '320px'

  tooltipArrow.style.content = ''
  tooltipArrow.style.position = 'absolute'
  tooltipArrow.style.zIndex = zIndex
  tooltipArrow.style.borderWidth = '5px'
  tooltipArrow.style.borderStyle = 'solid'
  tooltipArrow.style.display = 'none'

  tooltipBox.appendChild(tooltipText)
  let idClass = makeId()
  tooltipBox.classList.add(idClass)
  tooltipArrow.classList.add(idClass)
  el.tooltip = idClass

  let body = document.getElementsByTagName('body')[0]
  body.appendChild(tooltipBox)
  body.appendChild(tooltipArrow)
  el.onmouseover = function () {
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    tooltipBox.style.display = 'flex'
    tooltipArrow.style.display = 'flex'
    switch (binding.arg) {
      case 'bottom':
        tooltipBox.style.left = el.getBoundingClientRect().left - tooltipBox.getBoundingClientRect().width / 2 + el.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipBox.style.top = el.getBoundingClientRect().top + el.getBoundingClientRect().height + tooltipArrow.getBoundingClientRect().height / 2 + scrollTop + 'px'
        tooltipArrow.style.left = el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipArrow.style.top = el.getBoundingClientRect().top + el.getBoundingClientRect().height - tooltipArrow.getBoundingClientRect().height / 2  + scrollTop + 'px'
        tooltipArrow.style.borderColor = 'transparent transparent black transparent'
        tooltipArrow.style.marginLeft = '-5px'
        break
      case 'right':
        tooltipBox.style.left = el.getBoundingClientRect().left + el.getBoundingClientRect().width + tooltipArrow.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipBox.style.top = el.getBoundingClientRect().top - tooltipBox.getBoundingClientRect().height / 2 + el.getBoundingClientRect().height / 2   + scrollTop + 'px'
        tooltipArrow.style.left = el.getBoundingClientRect().left + el.getBoundingClientRect().width - tooltipArrow.getBoundingClientRect().width /2 + scrollLeft + 'px'
        tooltipArrow.style.top = el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2 + scrollTop + 'px'
        tooltipArrow.style.borderColor = 'transparent black transparent transparent'
        tooltipArrow.style.marginTop = '-5px'
        break
      case 'left':
        tooltipBox.style.left = el.getBoundingClientRect().left - tooltipBox.getBoundingClientRect().width - tooltipArrow.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipBox.style.top = el.getBoundingClientRect().top - tooltipBox.getBoundingClientRect().height / 2 + el.getBoundingClientRect().height / 2   + scrollTop + 'px'
        tooltipArrow.style.left = el.getBoundingClientRect().left - tooltipArrow.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipArrow.style.top = el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2 + scrollTop + 'px'
        tooltipArrow.style.borderColor = 'transparent transparent transparent black'
        tooltipArrow.style.marginTop = '-5px'
        break
      default:
        tooltipBox.style.left = el.getBoundingClientRect().left - tooltipBox.getBoundingClientRect().width / 2 + el.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipBox.style.top = el.getBoundingClientRect().top - tooltipBox.getBoundingClientRect().height - tooltipArrow.getBoundingClientRect().height / 2 + scrollTop + 'px'
        tooltipArrow.style.left = el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2 + scrollLeft + 'px'
        tooltipArrow.style.top = el.getBoundingClientRect().top - tooltipArrow.getBoundingClientRect().height / 2 + scrollTop + 'px'
        tooltipArrow.style.borderColor = 'black transparent transparent transparent'
        tooltipArrow.style.marginLeft = '-5px'
        break
    }
  }
  el.onmouseleave = function () {
    tooltipBox.style.display = 'none'
    tooltipArrow.style.display = 'none'
  }
  tooltipArrow.onmouseover = function () {
    tooltipBox.style.display = 'flex'
    tooltipArrow.style.display = 'flex'
  }
  tooltipArrow.onmouseleave = function () {
    tooltipBox.style.display = 'none'
    tooltipArrow.style.display = 'none'
  }
  tooltipBox.onmouseover = function () {
    tooltipBox.style.display = 'flex'
    tooltipArrow.style.display = 'flex'
  }
  tooltipBox.onmouseleave = function () {
    tooltipBox.style.display = 'none'
    tooltipArrow.style.display = 'none'
  }
}
function findParentZIndex(el) {
  let zIndex
  if (el && el.tagName !== 'BODY') {
    zIndex = document.defaultView.getComputedStyle(el).getPropertyValue('z-index')
    if (zIndex === 'auto' || zIndex === '') {
      zIndex = findParentZIndex(el.parentElement)
    }
  }
  return zIndex
}
function makeId() {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
