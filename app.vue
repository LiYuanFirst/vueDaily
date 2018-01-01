<template>
  <div class="daily">
    <div class="daily-menu">
      <div class="daily-menu-item"
           :class="{on:type==='recommend'}"
           @click="handleToRecommend">每日推荐</div>
      <div class="daily-menu-item" :class="{on:type==='daily'}" @click="showThemes = !showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="item in themes">
          <a
            :class="{on:item.id === themeId && type==='daily'}"
            @click="handleToTheme (item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list">
      <div v-if="type == 'recommend'">
        <div class="" v-for="list in recommendList">
          <div class="daily-date">
            {{ formatDay(list.date) }}
          </div>
          <Item v-for="item in list.stories"
                :data="item"
                :key="item.id">

          </Item>
        </div>

      </div>
      <div v-if="type == 'daily'">
        <Item v-for="item in list"
                :data="item"
                :key="item.id">

        </Item>
      </div>
      <Loading v-show="isLoading"></Loading>
    </div>
    <!-- <daily-article></daily-article> -->
  </div>
</template>
<script type="text/javascript">
  import $ from './libs/util';
  import Item from './components/item.vue';
  import Loading from './components/loading.vue'
  export default{
    components: { Item,Loading },
    data(){
      return{
        type:'recommend',
        themes:[],
        showThemes:false,
        themeId:0,
        list:[],
        recommendList:[],
        dailyTime:$.getTodayTime(),
        isLoading:false

      }
    },
    methods:{
      //获取主题列表
      getThemes(){
        console.log(this.dailyTime);
        $.ajax.get('themes').then(res => {
          console.log(res);
          this.themes = res.others;
        })
      },
      //获取某一主题详细列表
      handleToTheme (id){
        this.type = 'daily';
        this.themeId = id;
        this.list = [];
        this.isLoading = true;
        $.ajax.get('theme/'+ id).then(res => {
          console.log(res);
          this.isLoading = false;
          this.list = res.stories.filter(item => item.type !== 1);
        })
      },
      //点击每日推荐触发
      handleToRecommend(){
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = $.getTodayTime();
        this.getRecommendList();

      },
      //获取每日推荐列表
      getRecommendList (){
        console.log(0);
        this.isLoading = true;
        const prevDay = $.prevDay(this.dailyTime + 86400000);
        console.log(prevDay);
        $.ajax.get('news/before/'+ prevDay).then(res => {
          console.log(res);
          this.recommendList.push(res);
          this.isLoading = false;
          console.log(this.recommendList);
        })
      },
      //将日期转化为中文
      formatDay (date){
        let month = date.substr(4,2);
        let day = date.substr(6,2);
        if (month.substr(0,1)==='0'){
          month = month.substr(1,1);
        };
        if (date.substr(0,1)==='0'){
          day = date.substr(1,1);

        }
        return `${month}月${day}日`;
      }
    },
    mounted(){
      this.getThemes();
      this.getRecommendList();
    }
  }
</script>
