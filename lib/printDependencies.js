var path = require('path')

module.exports = function printDependencies(files, job) {
  // console.log(files)
  var outbound = {},
    inbound = {}
  function digest(graph, from, to) {
    graph[from] = graph[from] || []
    graph[from].push(to)
  }
  files.forEach(function (f) {
    f.requires.forEach(function (r) {
      digest(outbound, f.fullPath, r.filePath)
      digest(inbound, r.filePath, f.fullPath)
    })
  })

  if (job.files.length) {
    files = files.filter(function (f) {
      return job.files.filter(function (path) {
        return f.fullPath.indexOf(path) === 0
      }).length
    })
  }

  let incoming = []
  files.forEach(function (f) {
    var path = f.fullPath

    print(path, '')
    // ;(outbound[path] || []).forEach(function (to) {
    //   print(to, ' ---> ')
    // })
    ;(inbound[path] || []).forEach(function (from) {
      incoming.push(from)
      // print(from, ' <--- ')
    })
  })
  console.log(JSON.stringify(incoming, null, 2))

  function print(file, leader) {
    // console.log(leader + path.relative(job.base, file))
  }
}
