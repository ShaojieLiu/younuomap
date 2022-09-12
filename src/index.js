const querystring = require('node:querystring');
const fs = require('fs')

const downloadPNG = require('./downloadPNG')
const Queue = require('./Queue')

const demoUrl = 'http://webst03.is.autonavi.com/appmaptile?style=6&x=0&y=0&z=1'

const baseUrl = 'http://webst03.is.autonavi.com/appmaptile?'

// const baseDir = './map/'
const baseDir = 'M:/map/'

const queue = new Queue(100)

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

      const doWork = async () => {
        try {
          return downloadPNG(url, dirName, fileName)
        } catch (error) {
          console.error('download Error, need retry! ', url, dirName, fileName)
          setTimeout(doWork, 1000)
          return false
        }

      }

      queue.pushFunc(doWork)
      // doWork()
    }
  }
}

const main = async() => {
  // await downMap({ style: 6, z: 1 })
  // await downMap({ style: 6, z: 2 })
  // await downMap({ style: 6, z: 3 })
  // await downMap({ style: 6, z: 4 })
  // await downMap({ style: 6, z: 5 })
  // await downMap({ style: 6, z: 6 })
  // await downMap({ style: 6, z: 7 })
  // await downMap({ style: 6, z: 8 })
  await downMap({ style: 6, z: 9 })
  await downMap({ style: 6, z: 10 })
  // await downMap({ style: 6, z: 11 })
  
  queue.start()
}

main()

// downloadPNG(demoUrl, './', 'file.png')
