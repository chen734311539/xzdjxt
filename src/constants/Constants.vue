<template>
</template>
<script type="text/javascript">

const project_name ="秀洲党建平台";
// const project = "/jczh";//正式发布的前端名称
const url_prefix = "https://changsuoma.haiyan.gov.cn:10110/ybss";

const project = "xzqdp";//正式发布的前端名称
// const url_prefix = "http://localhost:8080/zhddxt";

const ws_url= "ws://41.226.153.158:10001/zhddxt-websocket/websocket";
const map_base_url = "http://106.15.202.38:9000/arcgis_js_api/3.15/";
const gps_prefix = "http://41.226.153.159:9000/zhddxtFile/gps/icon/";
const file_url = "http://41.226.153.159:9000/zhddxtFile/";

const geoserver_url = "http://50.64.103.183:8080/geoserver";
export default{
  project_name,
  project,
  ws_url,
  url_prefix,
  map_base_url,
  gps_prefix,
  file_url,
  geoserver_url,
}
</script>
<style>
</style>
