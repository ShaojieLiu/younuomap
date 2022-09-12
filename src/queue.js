class Queue {
  _maxParallel = 10;
  _parallelCount = 0;
  _queue = [];

  constructor(max) {
    this._maxParallel = max
  }

  pushFunc(func) {
    this._queue.push(func)
  }

  start() {
    const totalCount = this._queue.length;
    console.log("🚀 ~ file: queue.js ~ line 16 ~ Queue ~ start ~ totalCount", totalCount)
    const runNext = () => {
      const func = this._queue.shift();
      if (!func) {
        return
      }
      const restCount = this._queue.length;
      const cond = (restCount % 10 === 0)
      1 && console.log("------------------------------------------------------------------------- restCount / totalCount / parallelCount", restCount, ' / ', totalCount, ' / ', this._parallelCount)

      const runThis = () => {
        this._parallelCount += 1
        func().then(() => {
          this._parallelCount -= 1
          runNext()
        }).catch((e) => {
          console.log("🚀 ~ file: queue.js ~ line 30 ~ Queue ~ func ~ e", e)
          this._parallelCount -= 1
          // runThis()
        })
      }
      runThis()
    }

    for (let index = 0; index < this._maxParallel; index++) {
      runNext()
    }
  }
}

module.exports = Queue
