<template>
  <transition name="slide">
    <music-list :bg-image="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail, getSongVkey} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    bgImage() {
      return this.singer.avatar
    },
    title() {
      return this.singer.name
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        getSongVkey(musicData.songmid).then((res) => {
          console.log('得到vkey')
          const vkey = res.data.items[0].vkey
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, vkey))
          }
        })
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>