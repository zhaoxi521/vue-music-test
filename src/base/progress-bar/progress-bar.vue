<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
  const widthBtn = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initStated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initStated) return
        const del = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min((this.$refs.progressBar.clientWidth - widthBtn), Math.max(0, this.touch.left + del))
        this._setOffSet(offsetWidth)
      },
      progressTouchEnd(e) {
        this.touch.initStated = false
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        this._setOffSet(e.pageX - rect.left)
        this._triggerPercent()
      },
      _triggerPercent() {
        const widthBar = this.$refs.progressBar.clientWidth - widthBtn
        const percent = this.$refs.progress.clientWidth / widthBar
        this.$emit('percentChange', percent)
      },
      _setOffSet(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent(newVal) {
        if (newVal >= 0 && !this.touch.initStated) {
          const widthBar = this.$refs.progressBar.clientWidth - widthBtn
          const offsetWidth = newVal * widthBar
          this._setOffSet(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
