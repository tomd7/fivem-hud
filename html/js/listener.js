window.addEventListener('load', () => {
    const vehicle = new Vehicle();
    const player = new Player();

    window.addEventListener('message', event => {
        const data = event.data;

        switch (data.type) {
            case 'update':
                if (data.target === 'safezone') {

                    // Math the safe area coords and dimensions
                    const width = window.innerWidth * data.safezone;
                    const height = window.innerHeight * data.safezone;
                    const x = (window.innerWidth - width) / 2;
                    const y = (window.innerHeight - height) / 2;

                    // Apply the safe area to each group
                    for (const group of groups) {
                        group.setSafeArea(x, y, width, height);
                    }

                } else {
                    // Update the data displayed on the HUD
                    vehicle.update(data.vehicle);
                    player.update(data.player);
                }
                break;
            case 'display':
                if (data.target === 'vehicle')
                {
                    if (data.show) {
                        vehicle.show();
                    } else {
                        vehicle.hide();
                    }
                }
                break;
        }
    });
});