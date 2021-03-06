class Player {
    #_bs
    #availableSkills

    constructor(x, y) {
        this.#_bs = window.gameInfo.blockSize;

        this.jumpHeight = this.jumpHeightD = this.#_bs / 3;
        this.movespeed = this.movespeedD = this.#_bs / 4;

        this.maxHealth = this.health = this.previousHealth = this.currentHealth = this.lastHealthInfinity = 100;
        this.maxMana = this.mana = this.previousMana = this.currentMana = this.lastManaInfinity = 100;

        this.framesPerMana = this.manaFramesLeft = window.secondsToFrames(2);

        this.isDead = false;

        // Pos
        this.pos = {
            x,
            y
        }

        this.dirX = -1;
        this.movementX = false;

        this.usedSkills = {} // [name]: { startFrame, leftFrames }
        this.usingSkill = false;
        this.skillModels = [];
        this.#availableSkills = [
            {
                level: 1,
                name: "REGENERATION",
                displayName: "Regenerate",
                borderType: "SAVE",
                icons: window.gameAssets["SKILLS"].output["REGENERATION"],
                restorePack: [ // s
                    10,
                    9,
                    7,
                    5
                ],
                fireKeyCode: 102, // f
                durationPack: 4, // s
                usePrice: 5, // mana
                updatePrice: [
                    80,
                    150,
                    250
                ],
                regeneratePack: [
                    5,
                    15,
                    25,
                    35
                ]
            },
            {
                level: 1,
                name: "SLIDE",
                displayName: "Slide",
                borderType: "DEFAULT",
                icons: window.gameAssets["SKILLS"].output["SLIDE"],
                restorePack: [ // s
                    4,
                    5,
                    6
                ],
                fireKeyCode: 103, // g
                durationPack: 2, // s
                usePrice: 1, // mana
                updatePrice: [
                    50,
                    250
                ],
                jumpHeight: [
                    this.#_bs / 10,
                    this.#_bs / 8,
                    this.#_bs / 6
                ]
            },
            {
                level: 1,
                name: "ATTACK",
                displayName: "Attack",
                borderType: "DAMAGE",
                icons: window.gameAssets["SKILLS"].output["ATTACK"],
                restorePack: [ // s
                    15,
                    20,
                    30
                ],
                fireKeyCode: 104, // h
                durationPack: 4, // s
                usePrice: 30, // mana
                updatePrice: [
                    40,
                    600
                ],
                rangePack: [
                    this.#_bs * 2,
                    this.#_bs * 4,
                    this.#_bs * 6
                ]
            },
            {
                level: 1, // AND_SWW
                name: "SHIELD",
                displayName: "Shield",
                borderType: "SAVE",
                icons: window.gameAssets["SKILLS"].output["SHIELD"],
                restorePack: [ // s
                    10,
                    12,
                    15
                ],
                fireKeyCode: 107, // k
                durationPack: 8, // s
                usePrice: 4, // mana
                updatePrice: [
                    60,
                    500
                ],
                damageReduce: [ // reduces damage for every attack // %
                    30,
                    80,
                    100
                ]
            },
            {
                level: 1,
                name: "SUMMON_METEOR",
                displayName: "Meteoristic",
                borderType: "DAMAGE",
                icons: window.gameAssets["SKILLS"].output["METEOR"],
                restorePack: [ // s
                    30,
                    20,
                    10
                ],
                fireKeyCode: 108, // l
                usePrice: 5, // mana
                updatePrice: [
                    50,
                    400
                ]
            },
            {
                level: 1,
                name: "RAGE",
                displayName: "Rage",
                borderType: "DAMAGE",
                icons: window.gameAssets["SKILLS"].output["RAGE"],
                restorePack: [ // s
                    100,
                    80,
                    100
                ],
                fireKeyCode: 105, // i
                durationPack: [ // s
                    5,
                    7,
                    10
                ],
                usePrice: 50, // mana
                updatePrice: [
                    400,
                    1250
                ]
            },
            {
                level: 1,
                name: "FREEZE_TIME",
                displayName: "Freeze",
                borderType: "DEFAULT",
                icons: window.gameAssets["SKILLS"].output["FREEZE_TIME"],
                restorePack: [ // s
                    30,
                    40,
                    20
                ],
                fireKeyCode: 111, // o
                durationPack: [ // s
                    5,
                    7,
                    8
                ],
                usePrice: 15, // mana
                updatePrice: [
                    100,
                    600
                ],
                speedReduce: [ // reduces falling blocks speed // %
                    40,
                    60,
                    99
                ]
            },
            {
                level: 1, // AND_SWW
                name: "NO_LIMITS",
                displayName: "Infinity",
                borderType: "DAMAGE",
                icons: window.gameAssets["SKILLS"].output["NO_LIMITS"],
                restorePack: [ // s
                    30,
                    60,
                    800
                ],
                fireKeyCode: 112, // p
                durationPack: [ // s
                    4,
                    8,
                    100
                ],
                usePrice: 100, // mana
                updatePrice: [
                    800,
                    2000
                ]
            },
        ];

        this.shieldActive = false;
        this.shieldModels = window.gameAssets["ANIMATED_EFFECTS"].output["SHIELD"];
        this.shieldFrame = 0;
        this.shieldModelSize = this.#_bs * 4;
        this.shieldFrameNext = this.shieldFrameNextD = 5;
        this.shieldMinus = 0; // %

        this.isBlinking = false;
        this.blinkingTO = this.blinkingTOD = 1;

        // Dims
        this.dims = {
            width: .9 * this.#_bs,
            height: 1.3 * this.#_bs
        }

        // View
        this.models = window.gameAssets["PLAYER"].output;
        this.currentModels = "IDLE";
        this.currentFrame = 0;
        this.lastAnimation = this.lastAnimationDone = false;
        this.framesToUpdate = this.framesToUpdateD = 10; // time to frame update & default
        this.drawRange = 0;

        // Blocks and Player have different values of gravity
        this.velocity = 0;
        this.gravity = this.gravityD = .75;
    }

    render() {
        const m = this.models[this.currentModels][this.currentFrame];

        // Draw shield
        if(this.shieldActive) {
            if(--this.shieldFrameNext <= 0) {
                this.shieldFrameNext = this.shieldFrameNextD;
                this.shieldFrame++;
                if(this.shieldFrame > this.shieldModels.length - 1) {
                    this.shieldFrame = 0;
                }
            }

            image(
                this.shieldModels[this.shieldFrame],
                this.pos.x - this.shieldModelSize / 2 + this.dims.width / 2,
                this.pos.y - this.shieldModelSize / 2 + this.dims.height / 2,
                this.shieldModelSize,
                this.shieldModelSize
            );
        } else if(this.shieldFrame !== 0 || this.shieldFrameNext !== this.shieldFrameNextD) {
            this.shieldFrame = 0;
            this.shieldFrameNext = this.shieldFrameNextD;
        }

        if(this.drawRange) {
            push();
                fill('rgba(0, 0, 0, 0)');
                drawingContext.setLineDash([5, 15])
                strokeWeight(4);
                stroke('rgba(255, 255, 255, .25)');
                ellipse(
                    this.pos.x + this.dims.width / 2,
                    this.pos.y + this.dims.height / 2,
                    this.drawRange,
                    this.drawRange
                );
            pop();
        }

        if(!this.isBlinking || this.blinkingTO !== 0) {
            if(this.dirX === -1) {
                image(
                    m,
                    this.pos.x,
                    this.pos.y,
                    this.dims.width,
                    this.dims.height
                );
            } else if(this.dirX === 1) {
                push();
                    translate(
                        m.width + this.pos.x + this.dims.width / 2,
                        this.pos.y
                    );
                    scale(-1, 1);
                    image(
                        m,
                        0,
                        0,
                        this.dims.width,
                        this.dims.height
                    );
                pop();
            } else {
                console.error("Invalid dirX value");
            }
        }

        return this;
    }

    update() {
        this.health = lerp(this.health, this.currentHealth, .25);
        this.mana = lerp(this.mana, this.currentMana, .25);
        this.movespeed = lerp(this.movespeed, this.movespeedD, .01);
        this.handleSkills();

        if(this.isBlinking && --this.blinkingTO < 0) { // not <= 0!
            this.blinkingTO = this.blinkingTOD;
        }

        if(this.currentMana < this.maxMana && --this.manaFramesLeft <= 0) {
            this.manaFramesLeft = this.framesPerMana;
            this.currentMana++;
        }

        if (--this.framesToUpdate <= 0) {
            this.framesToUpdate = this.framesToUpdateD;
            this.nextFrame();
        }

        const nextVelocity = this.velocity + this.gravity,
            nextY = this.pos.y + this.velocity + this.gravity;
        let yAllowed = true,
            xAllowed = true,
            nextX = this.pos.x - (this.movementX ? this.dirX * this.movespeed : 0);

        [
            ...window.liveMap.flat().filter(io => io),
            ...window.gameInfo.activeObjects.fallingItems.filter(io => io instanceof Obstacle)
        ].forEach(io => {
            // Y
            if (io.checkTouch(
                    this.pos.x,
                    nextY,
                    this.dims.width,
                    this.dims.height
                )) {
                if(io instanceof Block) {
                    if(yAllowed) yAllowed = false;
                    if(io.touchAction) io.touchAction(this);
                } else if(io instanceof FallingItem && io.potential) {
                    if(io.type === "OBSTACLE") { // dead
                        this.damage(io.damage);
                        io.setPotential(false);
                    } else if(io.type === "POINTS") { // more points
                        this.eat(10);
                        io.setPotential(false);
                    }
                }
            }

            // X
            if (xAllowed && io instanceof Block && io.checkTouch(
                    nextX,
                    this.pos.y,
                    this.dims.width,
                    this.dims.height
                )) {
                xAllowed = false;

                if(io.touchAction) io.touchAction(this);
            }

            // Test for attack & defend
            if(
                (this.drawRange || this.shield) &&
                io instanceof FallingItem &&
                io.type === "OBSTACLE" &&
                io.checkTouch(
                    this.pos.x - this.drawRange / 2,
                    nextY - this.drawRange / 2,
                    this.dims.width + this.drawRange / 2,
                    this.dims.height + this.drawRange / 2
                )
            ) {
                io.setPotential(false, true);
            }
        });

        if (yAllowed) {
            this.velocity = nextVelocity;
            this.pos.y = nextY;
        } else {
            this.velocity = 0;
        }

        if (xAllowed && nextX + this.dims.width < innerWidth && nextX > 0) {
            this.pos.x = nextX;
        }

        this.updateModel();
        return this;
    }

    eat(p) {
        const a = window.gameInfo.gameSession;
        a.points += p;

        window.gameInfo.pushSession(a);
        // window.playSound(window.gameAssets["SOUNDS"].output["HERO_EARNS_FALLING_POINT"]);
    }

    useFood(c) {
        const a = window.gameInfo.gameSession;
        if(a.points - c < 0) return false;

        a.points -= c;
        window.gameInfo.pushSession(a);

        return true;
    }

    useMana(c) {
        if(this.currentMana - c < 0) return false;
        this.currentMana -= c;
        return true;
    }

    jump() {
        if (this.velocity || this.isDead) return;

        this.velocity = -this.jumpHeight;
    }

    setDir(d, a) {
        if(this.isDead) return;

        this.movementX = a;
        this.dirX = {
            "LEFT": -1,
            "RIGHT": 1
        }[d] || 0;
    }

    damage(d) {
        if(this.isDead || this.currentHealth === Infinity) return;

        this.previousHealth = this.health;
        this.currentHealth = this.health - ( (!this.shieldActive) ? d : d / 100 * this.shieldMinus );

        if(this.previousHealth > this.currentHealth && this.currentHealth > 0) {
            // window.playSound(window.gameAssets["SOUNDS"].output["HERO_DAMAGE"]);
        }

        if(this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.die();
        } else if(this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    die() {
        if(this.isDead) return;

        window.gameInfo.active = false;
        this.isDead = true;
        this.lastAnimation = true;
        this.lastAnimationDone = false;
        this.updateModel();
        // window.playSound(window.gameAssets["SOUNDS"].output["HERO_DEATH"]);
    }

    updateModel() {
        if(this.skillModels.length) return; // curr models handle by useSkill() func

        let a = this.currentModels;

        if(this.isDead) {
            this.currentModels = "DIE";
        } else if(this.velocity) {
            this.currentModels = "JUMP";
        } else if(this.movementX) {
            this.currentModels = "RUN";
        } else {
            this.currentModels = "IDLE";
        }

        if (this.currentModels !== a) {
            this.currentFrame = 0;
            this.framesToUpdate = this.framesToUpdateD;
        }

        return a;
    }

    setCustomModel(n) {
        this.currentModels = n;
        this.currentFrame = 0;
    }

    nextFrame() {
        if(this.lastAnimationDone) return;

        const lfi = this.models[this.currentModels].length - 1; // last frame index

        if (++this.currentFrame > lfi) {
            if(!this.lastAnimation) {
                this.currentFrame = 0;
            } else {
                // Don't run animation anymore
                this.lastAnimationDone = true;

                // Stop at the last frame
                this.currentFrame = lfi;
            }
        }

        return this;
    }

    getStats() {
        return ({
            health: {
                max: this.maxHealth,
                current: this.health,
                real: this.currentHealth
            },
            mana: {
                max: this.maxMana,
                current: this.mana,
                real: this.currentMana
            }
        });
    }

    useSkill(sn, at, pr) { // @sn:> Skill name, @at:> Active time, @pr: Use price (mana)
        // Idea: check if requesting skill is reloading
        const o = {
            startFrame: frameCount,
            leftFrames: at
        }

        const fd = () => this.skills.find(io => io.name === sn); // find skill data
        const gp = (f, l) => (Array.isArray(f)) ? f[l - 1] || f[0] : f; // get pack lvl

        let inv = null;

        switch(sn) {
            case 'ATTACK':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_ATTACK_SKILL"]);
                    this.updateModelsSkillController("ATTACK_SKILL", true);
                    this.setCustomModel("ATTACK_SKILL");
                    if(!this.velocity) this.velocity -= this.jumpHeight;

                    const _a = fd();
                    this.drawRange = gp(_a.rangePack, _a.level);

                    o.outfunc = () => {
                        this.drawRange = 0;
                        this.updateModelsSkillController("ATTACK_SKILL", false);
                    }
                }
            break;
            case 'SLIDE':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_SLIDE_SKILL"]);
                    const _a = fd();

                    this.updateModelsSkillController("SLIDE_SKILL", true);
                    this.setCustomModel("SLIDE_SKILL");
                    this.movespeed = this.#_bs / 2;
                    this.jumpHeight = gp(_a.jumpHeight, _a.level);

                    o.outfunc = () => {
                        this.movespeed = this.movespeedD;
                        this.jumpHeight = this.jumpHeightD;
                        this.updateModelsSkillController("SLIDE_SKILL", false);
                    }
                }
            break;
            case 'FREEZE_TIME':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_TIME_FREEZE_SKILL"]);
                    const _a = fd();

                    window.gameInfo.slowFallingObjects = gp(_a.speedReduce, _a.level);
                    o.outfunc = () => {
                        window.gameInfo.slowFallingObjects = false;
                    }
                }
            break;
            case 'REGENERATION':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_REGENERATE_SKILL"]);
                    const _a = fd();

                    for(let ma = 1; ma <= gp(_a.durationPack, _a.durationPack); ma++) {
                        setTimeout(() => {
                            this.damage(-gp(_a.regeneratePack, _a.level));
                        }, ma * 1e3);
                    }
                }
            break;
            case 'SUMMON_METEOR':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_SUMMON_METEOR_SKILL"]);
                    window.gameInfo.activeObjects.meteors.push(
                        new Meteor(this.pos)
                    );
                }
            break;
            case 'SHIELD':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_SHIELD_SKILL"]);
                    const _a = fd();

                    this.shieldMinus = gp(_a.damageReduce, _a.level);
                    this.shieldActive = true;

                    o.outfunc = () => {
                        this.shieldMinus = 0;
                        this.shieldActive = false;
                    }
                }
            break;
            case 'NO_LIMITS':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_NO_LIMITS_SKILL"]);
                    this.lastManaInfinity = this.currentMana;
                    this.currentMana = this.mana = Infinity;

                    o.outfunc = () => {
                        this.currentMana = this.mana = this.lastManaInfinity;
                    }
                }
            break;
            case 'RAGE':
                inv = () => {
                    // window.playSound(window.gameAssets["SOUNDS"].output["HERO_RAGE_SKILL"]);
                    this.isBlinking = true;

                    this.movespeed = this.#_bs / 2;

                    this.shieldActive = true;
                    this.lastHealthInfinity = this.currentHealth;
                    this.currentHealth = this.health = Infinity;

                    this.gravity = .85;

                    o.outfunc = () => {
                        this.isBlinking = false;

                        this.movespeed = this.movespeedD;

                        this.shieldMinus = 0;
                        this.shieldActive = false;
                        this.currentHealth = this.health = this.lastHealthInfinity;

                        this.gravity = this.gravityD;
                    }
                }
            break;
            default:
                inv = null;
            break;
        }

        if(inv && this.useMana(pr)) {
            inv();
            this.usingSkill = true;
            this.usedSkills[sn] = o;
        } else if(!inv) {
            console.error(`Invalid skill: ${ sn }`);
        }
    }

    handleSkills() {
        if(!this.usingSkillsFrames || --this.usingSkillFrames <= 0) {
            this.usingSkill = false;
        }

        const g = () => Object.keys(this.usedSkills).filter(io => this.usedSkills[io].leftFrames > 0);

        // Update active skills
        for(let ma of g()) {
            const a = this.usedSkills[ma];

            a.leftFrames--;
            if(a.leftFrames <= 0 && a.outfunc) a.outfunc();
        }

        // Update this.usingSkill variable
        this.usingSkill = !!g().length;
    }

    get getUsedSkills() {
        return this.usedSkills;
    }

    get skills() {
        return this.#availableSkills;
    }

    updateModelsSkillController(n, a) { // @n: Name, @a: Add
        if(a) { // add
            if(!this.skillModels.includes(n)) this.skillModels.push(n);
        } else { // remove
            this.skillModels = this.skillModels.filter(io => io !== n);
        }
    }
}