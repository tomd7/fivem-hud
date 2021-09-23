class Player {
    constructor() {
      this.armourEl = document.querySelector('#player #armour');
      this.armourBarEl = document.querySelector('#player #armour .status-bar');
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
      if (isUnderwater) {
        this.oxygenBarEl.style.height = oxygen + '%';
        if (this.oxygenEl.classList.contains('hidden')) {
          this.oxygenEl.classList.remove('hidden');
        }
      } else if (!this.oxygenEl.classList.contains('hidden')) {
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
      if (armour > 0) {
        this.armourBarEl.style.height = armour + '%';
        if (this.armourEl.classList.contains('hidden')) {
          this.armourEl.classList.remove('hidden');
        }
      } else if (!this.armourEl.classList.contains('hidden')) {
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