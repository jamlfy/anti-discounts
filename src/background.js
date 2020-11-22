import Mutations from "./store";

class Runner {
	constructor(mutation){
		this.mutation = mutation;
	}
	get items(){
		return this.mutation.getData();
	}
	set items(data){
		this.mutation.setData(data);
	}
	get settings(){
		return this.mutation.getSettings();
	}
	set settings(data){
		this.mutation.setSettings(data);
	}
	cron (lastRun){
		for (var i = this.items.length - 1; i >= 0; i--) {
			const prices = this.items[i].prices;
			const times = Object.keys(prices);

			if (lastRun > times[ times.length - 1 ] ){
				const { now, price, ...data } = await this.request(this.items[i].url);

				if (prices[lastTime] !== price ){
					this.items.splice(i, 1,{
						...this.items[i],
						...data,
						prices: {
							...prices,
							[ now ] : price,
						}
					};
				}
			}
		}
	}
	request(url, times = 10){
		try {
			const now = (new Date()).getTime()
			fetch(url);

			return {
				now,
			};
		} catch(e){
			return this.request(url, times - 1);
		}
	}
	addItem(url){
		try{
			const { now, price, ...data } = await this.request(url);
			this.items.unshift({
				...data,
				prices : {
					[ now ] : price,
				}
			});
		} catch(e){
			console.log("error internt");
		}
	}
}

const runner = new Runner(Mutations);

browser.runtime.onMessage.addListener(({ command, url }) => {
	if(command === "addItem"){
		runner.addItem(url);
	}
});

