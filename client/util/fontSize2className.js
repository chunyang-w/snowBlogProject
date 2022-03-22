// convert font size (possible value: extraLarge, large, medium, small, extraSmall)
// to class name (css selector.)
// all class name specified are defined in global.css
const PREFIX = 'snow-blog-font-'

export default function fontSize2className(link) {
  let className = ''
  className += 'snow-blog-font-' + link.fontSize
  className +=  ' snow-blog-font'
  if (link.clickable) {
    className += ' snow-blog-link'
  }
  return className
}