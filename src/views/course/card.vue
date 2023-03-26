<template>
  <div class="container">
    <div class="title">
      <div id="s">数据结构与算法</div>
      <div class="mean">
        <!-- <div id="c"></div> -->
        <div class="flag"></div>
        已开始
      </div>
    </div>

    <div class="message">
      <div class="count">5小节</div>
      <div class="date">开始时间 :2001-1-1</div>
    </div>
  </div>
</template>

<style>
.container {
  width:230px;
  height: 70px;
  background-color: #1890ff;
  padding: 10px 20px;
  overflow: hidden;
  border-radius: 15px;
}
.title {
  display: block;
  width: fit-content;
  height: 30px;
}
#s {
  font-size: 18px;
  font-weight: bold;
  float: left;
}
.flag:before {
  content: '';
  
  width: 10px;
  height: 10px;
  border: 1px solid rgb(232, 245, 60);
  border-radius: 50%;
  background-color: red;
  float: left;

}
.mean {
    display: flex;
  float: right;
  width: 60px;
  margin-left: 30px;
}
.message {
  margin-top: 20px;
  display: block;
}
.count {
  float: left;
}
.date {
  float: right;
  padding-left: 20px;
}
.flag{
    width:10px;
    height:30px;
    display: block;
}
</style>
