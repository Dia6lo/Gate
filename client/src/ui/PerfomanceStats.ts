class PerfomanceStats {

    static stats = new Stats();
    static initialize() {
        this.stats.setMode(0); // 0: fps, 1: ms

        // align top-left
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.right = "10px";
        this.stats.domElement.style.top = "10px";

        document.body.appendChild(this.stats.domElement);
        //requestAnimationFrame(PerfomanceStats.update(this.stats));
    }

    private static update(stats: Stats): FrameRequestCallback {
        stats.begin();
        stats.end();
        return <any>requestAnimationFrame(PerfomanceStats.update(stats));
    }
}

export = PerfomanceStats;