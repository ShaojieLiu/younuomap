const querystring = require('node:querystring');

const downloadPNG = require('./downloadPNG')
const fs = require('fs')

const demoUrl = 'http://webst03.is.autonavi.com/appmaptile?style=6&x=0&y=0&z=1'

const baseUrl = 'http://webst03.is.autonavi.com/appmaptile?'

const baseDir = './map/'

const downMap = async ({ style, z }) => {
  const mapName = `style=${style}_z=${z}`
  const maxIndex = Math.pow(2, z)
  const dirName = baseDir + mapName

  await fs.promises.mkdir(dirName, { recursive: true })

  for (let y = 0; y < maxIndex; y++) {
    for (let x = 0; x < maxIndex; x++) {

      const q = querystring.stringify({ style, z, x, y })
      const fileName = `x=${x}_y=${y}` + '.png'
      const url = baseUrl + q

      downloadPNG(url, dirName, fileName)
    }
  }
}

// downMap({ style: 6, z: 1 })
// downMap({ style: 6, z: 2 })
// downMap({ style: 6, z: 3 })
// downMap({ style: 6, z: 4 })
downMap({ style: 6, z: 5 })
downMap({ style: 6, z: 6 })

// downloadPNG(demoUrl, './', 'file.png')
