const hrstart = process.hrtime()
const path = require('path')
const readdir = require('readdir-enhanced')
const config = require('./config.json')
const fs = require('fs')

const mm = require('./music-metadata')
const failedSongs = []
const addedSongs = []
const ignoredSongs = []
let songsToRemove = []

const songsToAdd = []

const db = require('./startSequelize')
const { Op } = require('sequelize')
const { models, queryInterface } = db
start()

async function start () {
  await db.sync()
  const songsDB = await db.models.song.findAll()
  songsToRemove = songsDB.map(s => s.path)

  console.log('Starting directory scan')
  readdir.stream(config.musicPath, { deep: true, filter: '**/*.{mp3,flac}' })
    .on('file', pathN => {
      const found = songsDB.filter(s => s.path === pathN)
      songsToRemove = songsToRemove.filter(s => s !== pathN)
      if (found.length > 0) {
        ignoredSongs.push(pathN)
      } else {
        songsToAdd.push(pathN)
      }
    })
    .on('end', async () => {
      console.log(`Songs found: ${songsToAdd.length}`)
      console.log('Starting database syncing')

      await handleQueue(songsToAdd)

      if (songsToRemove.length > 0) {
        await queryInterface.bulkDelete('songs', { path: { [Op.in]: songsToRemove } }, {})
        console.log(`Removed Songs: ${songsToRemove.length}`)
      }

      const hrend = process.hrtime(hrstart)
      console.log(`Execution time: ${hrend[0]} seconds`)
      console.log(`Failed Songs: ${failedSongs.length}`)
      console.log(`Added Songs: ${addedSongs.length}`)
      console.log(`Ignored Songs: ${ignoredSongs.length}`)
      if (failedSongs.length > 0) console.log(`Failed: ${failedSongs}`)
      process.exit()
    })
    .resume()
}

async function handleQueue (songs) {
  for (const song of songs) await handleSong(song)
};

async function handleSong (song) {
  return db.transaction(async () => {
    const metadata = await mm.parseFile(path.join(config.musicPath, song))
    let { album, track, artists, composer, disk, picture, title } = metadata.common
    album = album.replace(new RegExp('/', 'g'), '\\')
    track = track.no
    disk = disk.no

    const [albumInstance, created] = await models.album.findOrCreate({ where: { title: album }, defaults: { type: song.split('/')[0] } })
    if (created) fs.writeFileSync(`/home/rikumax/radio/covers/${album}.jpg`, picture[0].data)

    await models.song.create({
      path: song,
      track: track === null ? 0 : track,
      title,
      artist: artists.join(' /'),
      composer: composer === undefined ? '' : composer.join(' /'),
      disk: disk === null ? 0 : disk,
      albumTitle: albumInstance.title
    })
  }).then(() => {
    addedSongs.push(song)
    console.log(`Added songs:${addedSongs.length}`)
  }).catch(err => {
    console.log(song)
    console.log(err)
    failedSongs.push(song)
  })
}
