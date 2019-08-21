export const getWordCount = ({pastedText}) => pastedText.length ? pastedText.length : 0

export const formatWordsArray = ({pastedText}) => {
  // replace new lines with spaces and split into array
  return pastedText ? pastedText.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ') : ''
}