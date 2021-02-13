const glob = require('glob')
const write = require('write-json-file')

glob('./public/images/bg/**', { nodir: true }, (err, res) => {
  if (err) throw new Error(err)
  const result = {}
  res.forEach(file => {
    const data = file.split('/')
    data.pop()
    const station = data.pop()

    if (!result[station]) result[station] = [file.replace('./public/', '')]
    else result[station].push(file.replace('./public/', ''))
  })
  write('./src/js/bg.json', result)
})
