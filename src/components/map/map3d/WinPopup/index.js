import Vue from "vue";
import jqWindowVue from "./jqwindow.vue";
import jlWindowVue from "./jlwindow.vue";
import spWindowVue from "./spwindow.vue";
import tczyWindowVue from "./tczywindow.vue";
let jqWindowVm = Vue.extend(jqWindowVue);
let jlWindowVm = Vue.extend(jlWindowVue);
let spWindowVm = Vue.extend(spWindowVue);
let tczyWindowVm = Vue.extend(tczyWindowVue);
class WinPopup {
    constructor(viewer, position, type, data, callback, markinfo) {
        if(type=='ssjq'){
            this.vmInstance = new jqWindowVm({
                propsData: {'jqid':data.id}
            }).$mount();
        }
        if(type=='ssjl'){
            this.vmInstance = new jlWindowVm({
                propsData: {'jlid':data.gpsid}
            }).$mount();
        }
        if(type=='spjk'){
            this.vmInstance = new spWindowVm({
                propsData: {'spjkid':data.id}
            }).$mount();
        }
        if(type=='tczy'){
            this.vmInstance = new tczyWindowVm({
                propsData: {'templateObj':data,'markObj':markinfo}
            }).$mount();
        }
        this.viewer = viewer;
        this.position = position;

        //点击窗口上的关闭按钮
        this.vmInstance.closeEvent = e => {
            this.windowClose();
        };

        //窗口上的点击事件
        this.vmInstance.clickEvent = (data,state) => {
            callback(data,state);
        };

        viewer.cesiumWidget.container.appendChild(this.vmInstance.$el);
        this.addPostRender(position);
    }

    //添加场景事件
    addPostRender() {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
    }

    //场景渲染事件 实时更新标签的位置 使其与笛卡尔坐标一致
    postRender() {
        if(!this.vmInstance.$el || !this.vmInstance.$el.style) return;
        const canvasHeight = this.viewer.scene.canvas.height;
        const windowPosition = new Cesium.Cartesian2();
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, windowPosition);
        this.vmInstance.$el.style.bottom = canvasHeight - windowPosition.y + 70 + "px";
        const elWidth = this.vmInstance.$el.offsetWidth;
        this.vmInstance.$el.style.left = windowPosition.x + 20 + "px";

        if (this.viewer.camera.positionCartographic.height > 10000){
            this.vmInstance.$el.style.display = "none";
        } else {
            this.vmInstance.$el.style.display = "block";
        }
    }

    windowClose() {
        this.vmInstance.show = false; //删除dom
        this.viewer.scene.postRender.removeEventListener(this.postRender, this); //移除事件监听
    }
}
export default WinPopup;