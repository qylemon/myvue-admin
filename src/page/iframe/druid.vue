<template>
  <div>
    <iframe src="http://localhost:9090/druid/datasource.html" id="mobsf" scrolling="yes" frameborder="0" style="zoom:97%;position:absolute;top:14%;left: 14%;"></iframe>
  </div>
</template>
 
 
<script>
  export default {
    data () {
      return {
      }
    },
    mounted(){
      /**
      * iframe-宽高自适应显示   
      */
      function changeMobsfIframe(){
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth)-(deviceWidth*14/100)) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight)-(deviceHeight*14/100)) + 'px'; //数字是页面布局高度差
      }
 
      changeMobsfIframe()
 
      window.onresize = function(){
        changeMobsfIframe()
      }
    },     
  }
</script>