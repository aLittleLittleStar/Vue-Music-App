/* import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
*/



/*
* @Author: Star
* @Date:   2018-09-17 20:38:21
* @Last Modified by:   Star
* @Last Modified time: 2018-09-26 16:08:32
*/


import storage from 'good-storage'

const SEARCH_KEY = '__search__'
// 数组最大存 15条数据
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

// 喜欢列表
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insterArray(arr, val, compare, maxLen) {
  // 查找当前数组里面是否有某一个元素
  const index = arr.findIndex(compare)
  // 如果是第一条数据，什么都不用做
  if (index === 0 ) {
    return
  } 
  if (index > 0) {
    // 如果数据大于零的话，把之前的数据删掉
    arr.splice(index, 1)
  }
  // 把数据插入进去
  arr.unshift(val)
  // 如果数据大于15条的话，把最后一个数据pop掉
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insterArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)

  // 把数据用storage存进去
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除搜索历史
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 保存数组
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 存储播放
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])

  insterArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN) 
  storage.set(PLAY_KEY, songs)
  return songs
}
// 读取数据
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 保存喜欢歌曲
export function saveFavorite(song) {
  // 先找到 FAVORITE_KEY 如果找不到就赋值为空
  let songs = storage.get(FAVORITE_KEY, [])
  // 把它插入到歌曲
  insterArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  // 
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 删除喜欢的歌曲

export function deleteFavorite(song) {
  // 获取该歌曲
  let songs = storage.get(FAVORITE_KEY, [])
  // 删除该歌曲
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}