class Vehicle {
    constructor() {
      this.vehicleEl = document.getElementById('vehicle');
      this.speedometerEl = document.getElementById('svg-speedometer');
      this.speedEl = document.getElementById('speed');
      this.seatbeltBarEl = document.getElementById('seatbelt-bar');
      this.fuelBarEl = document.getElementById('fuel-bar');
      this.gearEl = document.getElementById('gear');
    }

    update(vehicle) {
        if (vehicle) {
            this.updateSpeed(vehicle.speed);
            this.updateFuel(vehicle.fuel);
            this.updateSeatbelt(vehicle.seatbelt);
            this.updateGear(vehicle.gear);
        }
    }

    updateSpeed(speed) {
        function map(n, a, b, _a, _b) {
            let d = b - a;
            let _d = _b - _a;
            let u = _d / d;
            return _a + n * u;
        }

        const perc = speed * 0.377;
        if (speed < 265) {
            let v = 265 - map(perc, 0, 100, 0, 265);
            const progressBar = this.speedometerEl.querySelector('.front-bar');
            progressBar.style.strokeDashoffset = v
        }

        this.speedEl.textContent = speed;
    }

    updateFuel(fuel) {
      // Set the height of the fuel bar
      this.fuelBarEl.style.height = fuel + '%';

      // Set the color of the bar depending on the fuel level
      if (fuel > 50) {
        this.fuelBarEl.className = 'status-bar green';
      } else if (fuel > 20) {
        this.fuelBarEl.className = 'status-bar orange';
      } else {
        this.fuelBarEl.className = 'status-bar red';
      }
    }

    updateSeatbelt(enabled) {
      if (enabled) {
        this.seatbeltBarEl.className = 'status-bar green';
      } else {
        this.seatbeltBarEl.className = 'status-bar red';
      }
    }

    updateGear(gear) {
        this.gearEl.textContent = gear;
    }

    show() {
	    this.vehicleEl.classList.add('active');
    }

    hide() {
        this.vehicleEl.classList.remove('active');
    }
}
