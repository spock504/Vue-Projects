import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playlist: loadPlay(),
  favoriteList: []
}

export default state