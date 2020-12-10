import * as Yup from 'yup'

Yup.addMethod(Yup.string, 'katakana', function () {
  return this.test('katakana', 'カタカナで入力して下さい', function (value) {
    if (value == null || value === '') return true
    return value.match(/^[ァ-ヶー　 ]+$/)
  })
})

export default Yup
