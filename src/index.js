module.exports = function toReadable (number) {
  oneDigit = (number) => {
    const oneDigitNames = ['','one','two','three','four','five','six','seven','eight','nine']
    return oneDigitNames[number]
  }

  twoDigits = (number) => {
    const teensNames = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    const tensNames = ['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']
    const units = number % 10
    const tens = (number - units) / 10
    if (tens === 1) return teensNames[units]
    else return `${tensNames[tens]} ${oneDigit(units)}`.trim()
  }

  threeDigits = (number) => {
    let twoLowerDigits = number % 100
    let hundreds = (number - twoLowerDigits) / 100
    return `${oneDigit(hundreds)} hundred ${twoDigits(twoLowerDigits)}`
  }

  getTriples = (number) => {
    let triples = []
    let num = number
    let triple = num % 1000
    while (triple !== 0) {
      triples.push(triple)
      num = (num - triple % 1000) / 1000
      triple = num % 1000
    }
    return triples
  }

  if (number === 0) return 'zero'
  let result = ''
  const tripleNames = ['','thousand','million','billion','trillion','quadrillion','quintillion','sextillion']
  const triples = getTriples(number)
  let triple = ''

  for (let index = triples.length - 1; index >= 0; index--) {
    if ((triples[index] - triples[index] % 100) > 0)
      triple = threeDigits(triples[index])
    else if ((triples[index] - triples[index] % 10) > 0)
      triple = twoDigits(triples[index])
    else
      triple = oneDigit(triples[index])

    result = `${result} ${triple} ${tripleNames[index]}`
  }
  return result.trim()
}
