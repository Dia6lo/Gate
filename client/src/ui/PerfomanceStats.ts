class PerfomanceStats {

    //static stats = new Stats();

    private static _stats: Stats = null;

    static get stats() {
        if (this._stats == null) {
            this._stats = new Stats();
            // 0: fps, 1: ms
            this._stats.setMode(0); 
            // align top-left
            this._stats.domElement.style.position = "absolute";
            this._stats.domElement.style.right = "10px";
            this._stats.domElement.style.top = "10px";
            document.body.appendChild(this._stats.domElement);
        }
        return this._stats;
    }
}

export = PerfomanceStats;