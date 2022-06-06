// Cesium轨迹回放实例
import TrailLineAnimate from "@/components/map/map3d/class/TrailLineAnimate"

let trailLine = {
    //初始化轨迹线
    initTrackLine(stops) {
        // let stops = [{
        //         time: "2020-10-10 20:40:44",
        //         position: { x: -1573617.4792363436, y: 5327874.154272335, z: 3122892.2787437937 },
        //     },
        //     {
        //         time: "2020-10-10 20:50:34",
        //         position: { x: -1573731.9941211839, y: 5327897.036182902, z: 3122799.912331608 },
        //     }, {
        //         time: "2020-10-10 21:10:43",
        //         position: { x: -1573827.099578625, y: 5327918.677117841, z: 3122722.2807716513 },
        //     }, {
        //         time: "2020-10-10 21:40:33",
        //         position: { x: -1573884.5479743225, y: 5327843.811385092, z: 3122812.1113319555 },
        //     }, {
        //         time: "2020-10-10 21:55:22",
        //         position: { x: -1573936.4138518127, y: 5327774.013957246, z: 3122901.092331419 },
        //     }
        // ]

        if (this.t) {
            this.t.stop();
            this.clearStops();
        }
        this.t = new TrailLineAnimate(window.viewer);
        this.stopEntities = [];
        this.t.StopsArrivedEvent.addEventListener(this.stopsArrivedEventHandler, this);
        this.t.play(stops, 50);
    },

    //站点到达事件
    stopsArrivedEventHandler(stop, index) {
        const stopEntity = window.viewer.entities.add({
            position: stop.position,
            label: {
                text: stop.time,
                scale: 0.5,
                font: 'normal 24px MicroSoft YaHei',
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -50),
                outlineWidth: 9,
                outlineColor: Cesium.Color.WHITE
            },
            billboard: {
                image: "../../static/3d/images/marker.png",
                scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
        });
        this.stopEntities.push(stopEntity);
    },

    //清除站点
    clearStops() {
        if (!this.stopEntities) return;
        this.stopEntities.forEach(item => {
            window.viewer.entities.remove(item);
        });
        this.stopEntities = [];
    },
}
export default trailLine;