class Player {
    constructor() {
      this.armourEl = document.querySelector('#player #armour');
      this.armourBarEl = document.querySelector('#player #armour .status-bar');
      this.healthEl = document.querySelector('#player #health');
      this.healthBarEl = document.querySelector('#player #health .status-bar');
      this.foodBarEl = document.querySelector('#player #food .status-bar');
      this.drinkBarEl = document.querySelector('#player #drink .status-bar');
      this.oxygenEl = document.querySelector('#player #oxygen');
      this.oxygenBarEl = document.querySelector('#player #oxygen .status-bar');
      this.staminaBarEl = document.querySelector('#player #stamina .status-bar');
    }

    update(player) {
        if (player) {
            this.updateHealth(player.health);
            this.updateArmour(player.armour);
            this.updateFood(player.food);
            this.updateDrink(player.drink);
            this.updateOxygen(player.isUnderwater, player.oxygen);
            this.updateStamina(player.stamina);
        }
    }

    updateOxygen(isUnderwater, oxygen) {
        const parent = this.oxygenEl.parentElement;
        const statusRect = this.healthEl.getBoundingClientRect();
        const playerRect = parent.getBoundingClientRect();
        const statusMargin = Number(window.getComputedStyle(this.healthEl)['margin-top'].replace('px', ''));

        if (isUnderwater) {

            this.oxygenBarEl.style.height = oxygen + '%';
            if (this.oxygenEl.classList.contains('hidden')) {
                // Show the oxygen status bar
                this.oxygenEl.classList.remove('hidden');

                if ((playerRect.y + (playerRect.height / 2)) > (window.innerHeight / 2)) {
                    const newY = playerRect.y - (statusRect.height + statusMargin);
                    parent.style.transform = `translate3d(${playerRect.x}px, ${newY}px, 0)`;
                    this.moveUpAfterHidingOxygen = true;
                }
            }

        } else if (!this.oxygenEl.classList.contains('hidden')) {

            if (this.moveUpAfterHidingOxygen === true) {
                const newY = playerRect.y + (statusRect.height + statusMargin);
                parent.style.transform = `translate3d(${playerRect.x}px, ${newY}px, 0)`;
                this.moveUpAfterHidingOxygen = false;
            }

            // Hide the oxygen status bar
            this.oxygenEl.classList.add('hidden');
        }
    }

    updateStamina(stamina) {
      this.staminaBarEl.style.height = stamina + '%';
    }

    updateHealth(health) {
      if (health <= 0) {
        this.healthBarEl.style.height = '0%';
      } else {
        this.healthBarEl.style.height = health + '%';
      }

      if (health > 25) {
        this.healthBarEl.className = 'status-bar green';
      } else {
        this.healthBarEl.className = 'status-bar red';
      }
    }

    updateArmour(armour) {
        const parent = this.oxygenEl.parentElement;
        const statusRect = this.healthEl.getBoundingClientRect();
        const playerRect = parent.getBoundingClientRect();
        const statusMargin = Number(window.getComputedStyle(this.healthEl)['margin-top'].replace('px', ''));

        if (armour > 0) {

            this.armourBarEl.style.height = armour + '%';
            if (this.armourEl.classList.contains('hidden')) {
                // Show the armour status bar
                this.armourEl.classList.remove('hidden');

                if ((playerRect.y + (playerRect.height / 2)) > (window.innerHeight / 2)) {
                    const newY = playerRect.y - (statusRect.height + statusMargin);
                    parent.style.transform = `translate3d(${playerRect.x}px, ${newY}px, 0)`;
                    this.moveUpAfterHidingArmour = true;
                }
            }

        } else if (!this.armourEl.classList.contains('hidden')) {

            if (this.moveUpAfterHidingArmour === true) {
                const newY = playerRect.y + (statusRect.height + statusMargin);
                parent.style.transform = `translate3d(${playerRect.x}px, ${newY}px, 0)`;
            }

            // Hide the armour status bar
            this.armourEl.classList.add('hidden');
        }
    }

    updateFood(food) {
      this.foodBarEl.style.height = food + '%';
    }

    updateDrink(drink) {
      this.drinkBarEl.style.height = drink + '%';
    }
}