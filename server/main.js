const cors = require('cors')

const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { Op } = require('sequelize')
const port = 19711
const db = require('./startSequelize')

start()

async function start () {
  await db.sync()
  const { song } = db.models

  const { data: lastData } = await axios.get('http://localhost:7000/getmeta')

  io.on('connection', function (socket) {
    Object.entries(lastData).forEach(([station, data]) => {
      socket.emit(station, data)
    })
  })

  app.get('/ping', (req, res) => res.send(200))

  app.post('/meta', async (req, res) => {
    const { filename, source } = req.body

    const row = await song.findByPk(filename)
    const data = row || req.body

    io.emit(source, data)
    lastData[source] = data
  })

  app.get('/meta/:station', (req, res) => {
    res.send(lastData[req.params.station])
  })

  app.get('/meta', (req, res) => {
    res.send(lastData)
  })

  app.get('/song', async (req, res) => {
    const { title, artist } = req.query
    const result = await song.findOne({ where: { title, artist } })
    res.send(result)
  })

  app.get('/songlist', (req, res) => {
    /* const socket = new net.Socket()
    socket.on('error', (err) => console.log(err))
    socket.on('data', async (data) => {
      const bufferString = data.toString()
      if (!bufferString.startsWith('[playing]')) return

      bufferString.replace('[playing] ', '')
      const tracklist = bufferString.split('\n').filter(e => e !== '').map(e => e.replace(config.musicPath, ''))

      const queryList = tracklist.map(e => new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM WHERE path = ${pool.escape(e)}`)
      }))
      res.send(await Promise.all(queryList))
      socket.end()
    })
    socket.connect(2424, 'localhost', () => {
      socket.write('Games.next\r\n')
    }) */
  })

  app.get('/search', async (req, res) => {
    const result = await song.findAll({
      where: {
        title: {
          [Op.like]: `%${req.query.search}%`
        }
      }
    })
    res.send(result)
  })

  app.post('/skip', async (req, res) => {
    /* const { station } = req.body
    if (!station) return res.send({})
    if (votes[station] !== undefined) return res.status(401).send({ error: 'Busy' })
    else {
      res.send({})
      voteTimers[station] = setTimeout(station => {
        console.log(`${station}: Skip vote timeout`)
        endVote(station)
      }, 30000, station)

      io.emit('skip_start', { station: station })
      console.log(`${station}: Skip vote started`)
      votes[station] = { votes: 0, total: 0 }
    }
  })

  io.on('connection', function (socket) {
    Object.keys(config.stations).forEach(station => {
      socket.emit(station, lastData[station])
    })

    socket.on('disconnect', () => {
      userStations[userStationsId[socket.id]] += -1
      delete userStationsId[socket.id]
    })

    socket.on('station', data => {
      const { station } = data
      userStationsId[socket.id] = station

      if (!userStations[station]) userStations[station] = 0
      userStations[station]++
    })

    socket.on('skip_vote', data => {
      const { station, vote } = data
      if (votes[station] !== undefined) {
        votes[station].total++
        if (vote) votes[station].votes++

        const neededVotes = Math.ceil(userStations[station] / 2)
        io.emit('skip_vote', { station: station, votes: votes[station].votes, needed: neededVotes })

        if (votes[station].votes >= neededVotes || votes[station].total === userStations[station]) {
          endVote(station)
        }
      }
    }) */
  })

  server.listen(port, () => {
    console.log(`Radio API listening on port ${port}!`)
  })
}

/* async function startSocket (station) {
  const pool = await mysql.createPool(config.mysql)
  icy.fn(config.stations[station].icecast, async metadata => {
    const fullTitle = metadata.StreamTitle.split('-')
    const artist = fullTitle.shift().trim()
    const title = fullTitle.join('-').trim()

    let data = await pool.query('SELECT title,artist,album.name as album FROM song, album WHERE song.album = album.name AND title = ? AND artist = ? LIMIT 1', [title, artist])

    if (data.length === 0) data = { album: 'Not Found', artist: artist.trim(), title: title.trim() }
    else data = data[0]

    if (data) {
      io.emit(station, data)
      lastData[station] = data
    }
  })
}

function endVote (station, pool) {
  io.emit('skip_end', { station: station })
  let restart = false
  if (votes[station].votes >= Math.ceil(userStations[station] / 2)) {
    console.log(`${station}: Skip vote accepted`)
    console.log(`bash skip.sh ${config.stations[station].port} ${station}.skip`)
    restart = true
    exec(`bash skip.sh ${config.stations[station].port} ${station}.skip`)
  }
  console.log(`${station}: Skip vote ended`)
  clearTimeout(voteTimers[station])

  delete votes[station]
  if (restart) setTimeout(process.exit, 2000)
} */
