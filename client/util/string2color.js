const COLOR_LIST = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue","purple"]

export default function string2color(string) {
  let hashIndex = 0
  let index = 0
  for (let i = 0; i < string.length; i++) {
    hashIndex += string.charCodeAt(i)
  }
  index = hashIndex % COLOR_LIST.length
  return COLOR_LIST[index]
}