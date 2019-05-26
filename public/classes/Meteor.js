class Meteor {
	constructor(targetpos, id) {
		this.id = id;
		this.size = 300;

		this.tpos = targetpos;
		this.pos = {
			x: 0,
			y: -this.size
		}

		this.speed = 10;
		this.speedX = abs(this.tpos.x - this.pos.x) / this.size;
		this.speedY = abs(this.tpos.y - this.pos.y) / this.size;

		this.models = window.gameAssets["ANIMATED_EFFECTS"].output["METEOR"];
		this.frame = 0;
		this.nextFrame = this.nextFrameD = 20;
	}

	render() {
		push();
			tint(100);
			image(
				this.models[this.frame],
				this.pos.x,
				this.pos.y,
				this.size,
				this.size
			);
		pop();

		return this;
	}

	update() {
		// Update position
		this.pos.x += this.speedX * this.speed;
		this.pos.y += this.speedY * this.speed;

		// Destroy falling blocks
		window.gameInfo.activeObjects.fallingItems.forEach(io => {
			if(io.checkTouch(
				this.pos.x,
				this.pos.y,
				this.size,
				this.size
			)) {
				io.destroySelf();
			}
		});

		// Update model
		if(--this.nextFrame <= 0) {
			this.nextFrame = this.nextFrameD;
			if(++this.frame > this.models.length - 1) this.frame = 0;
		}

		// Destroy if out of screen
		if(this.pos.y > innerHeight || this.pos.x > innerWidth) {
			this.destroySelf();
		}

		return this;
	}

	destroySelf() {
		const a = window.gameInfo.activeObjects.meteors;

		a.splice(a.findIndex(io => io.id === this.id), 1);
	}
}