<template lang="html">
  <div class="daily-article">
    <Loading v-show="isLoading"></Loading>
    <div class="daily-article-title"v-text="data.title"></div>
    <div class="daily-article-content" v-html="data.body"></div>
  </div>
</template>

<script>
import $ from '../libs/util';
import Loading from '../components/loading.vue'
export default {
  components: { Loading },
  props: {
    id: {
      type:Number,
      default: 0
    }
  },
  data(){
    return{
      data: {},
      isLoading:false
    }
  },
  methods:{
    getArticle() {
      this.isLoading = true;
      $.ajax.get('news/'+this.id).then(res => {
        this.isLoading = false;
        res.body = res.body.replace(/src="http:/g, 'src="' + $.imgPath + 'http');
        res.body = res.body.replace(/src="https:/g, 'src="' + $.imgPath + 'https');
        this.data = res;
        window.scrollTo(0,0);
      })
    }
  },
  watch: {
    id(val){
      if(val){
        this.getArticle();
      }
    }
  }
}
</script>

<style lang="css">
</style>
