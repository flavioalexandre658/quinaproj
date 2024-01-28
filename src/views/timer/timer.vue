<template>
  <div class="pt-4">

    <div class="flex justify-center items-center">
      <div class="col-span-2">
        <svg style="display: inline-block;margin-top:8px;" fill="#ffc107" viewBox="0 0 24 24" width="35px" id="wait-16px"
          xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path id="Path_14" data-name="Path 14"
              d="M-13.5,3.5V8a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V3.5A.5.5,0,0,1-14,3,.5.5,0,0,1-13.5,3.5ZM-13,.55a.5.5,0,0,0-.465-.532Q-13.731,0-14,0a8.009,8.009,0,0,0-8,8,8.009,8.009,0,0,0,8,8q.268,0,.534-.018A.5.5,0,0,0-13,15.45a.507.507,0,0,0-.533-.466c-.154.011-.309.016-.466.016a7.008,7.008,0,0,1-7-7,7.008,7.008,0,0,1,7-7c.157,0,.312,0,.466.016h.034A.5.5,0,0,0-13,.55Zm2.126,13.716a7.165,7.165,0,0,1-.842.354.5.5,0,0,0-.31.635.5.5,0,0,0,.473.337.516.516,0,0,0,.163-.027,8.087,8.087,0,0,0,.962-.4.5.5,0,0,0,.224-.671A.5.5,0,0,0-10.875,14.266ZM-8.738,3.383a.5.5,0,0,0,.376.171.5.5,0,0,0,.33-.124.5.5,0,0,0,.046-.706,7.93,7.93,0,0,0-.739-.739.5.5,0,0,0-.7.047.5.5,0,0,0,.046.7A6.91,6.91,0,0,1-8.738,3.383Zm-3.005-2.011a6.892,6.892,0,0,1,.845.351.5.5,0,0,0,.221.051.5.5,0,0,0,.448-.278.5.5,0,0,0-.227-.67,8.041,8.041,0,0,0-.964-.4.5.5,0,0,0-.635.312A.5.5,0,0,0-11.743,1.372ZM-6.73,9.919a.5.5,0,0,0-.633.314,7.106,7.106,0,0,1-.348.845.5.5,0,0,0,.229.67.5.5,0,0,0,.219.05.5.5,0,0,0,.45-.279,8.145,8.145,0,0,0,.4-.967A.5.5,0,0,0-6.73,9.919ZM-8.721,12.6a7.043,7.043,0,0,1-.644.649.5.5,0,0,0-.042.706.5.5,0,0,0,.374.168.493.493,0,0,0,.331-.126,7.9,7.9,0,0,0,.735-.74.5.5,0,0,0-.048-.706A.5.5,0,0,0-8.721,12.6Zm2.7-5.135A.5.5,0,0,0-6.551,7a.5.5,0,0,0-.465.532C-7.005,7.685-7,7.842-7,8s0,.3-.014.442a.5.5,0,0,0,.466.532h.033a.5.5,0,0,0,.5-.467C-6.005,8.34-6,8.17-6,8S-6.006,7.639-6.018,7.462Zm-1.354-1.72a.5.5,0,0,0,.474.339.508.508,0,0,0,.161-.027.5.5,0,0,0,.312-.635,8.056,8.056,0,0,0-.4-.964.5.5,0,0,0-.67-.226.5.5,0,0,0-.226.669A6.939,6.939,0,0,1-7.372,5.742Z"
              transform="translate(22)"></path>
          </g>
        </svg>
      </div>
      <div class="col-span-10">
        <div class="grid">
          <span>Aguardando o pagamento!</span>
          <small>Finalize o pagamento</small>

        </div>
      </div>

    </div>
    <div class="flex justify-center items-center text-center bg-white form-div">
      <span> Você tem&nbsp;</span>
      <div class="text-[18px] font-bold text-slate-900" v-if="hours != '00'"> {{ hours }}:</div>
      <div class="text-[18px] font-bold text-slate-900">{{ minutes }}:</div>
      <div class="text-[18px] font-bold text-slate-900">{{ seconds }} </div>
      <span>&nbsp;para pagar</span>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    expireDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      countdown: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const expireTime = new Date(this.expireDate).getTime();

      this.countdown = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = expireTime - now;

        if (timeDiff > 0) {
          const totalSeconds = Math.floor(timeDiff / 1000);
          this.hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
          this.minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
          this.seconds = String(totalSeconds % 60).padStart(2, '0');
        } else {
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
          this.expired = true;
          clearInterval(this.countdown);
          this.$emit("expired", this.expired);
        }
      }, 1000);
    }


  },
  beforeDestroy() {
    clearInterval(this.countdown);
  }
};
</script>
  
<style scoped>
.text-center {
  text-align: center;
}

.form-div {
  max-width: 380px;
  margin: auto;
  margin-top: 10px;
}</style>
  