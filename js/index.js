
var vm = new Vue({
	el: "#main",
	data: {
        dataList: []
	},
	mounted: function () {
		var _this = this;
		this.$nextTick(function () {
			// 获取数据
            _this.getData();
        });
    },
	methods: {
		// 获取数据
		getData: function (res) {
			var _this = this;
			this.$http.get('data/test.json').then(function (res) {
				_this.dataList = res.body;
            });
        }
	}



});