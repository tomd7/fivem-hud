--
-- Update the HUD
--
function updateHud(vehicle, player, safeZone)
    SendNUIMessage({
        type = 'update',
        vehicle = vehicle,
        player = player,
    })
end

--
-- Toggle the HUD of the vehicle
--
function toggleVehicleHud(show)
    DisplayRadar(show)

    SendNUIMessage({
        type = 'display',
        target = 'vehicle',
        show = show
    })
end

function toggleEditionMode(show)
    local safezone = GetSafeZoneSize()
    SendNUIMessage({
        type = 'update',
        target = 'safezone',
        safezone = safezone
    })

    if IsPedInAnyVehicle(PlayerPedId(), true) then
        if show then
            DisplayRadar(show)
        end
    else
        DisplayRadar(show)
    end

    SetNuiFocus(show, show)
end

--
-- Return the speed of the vehicle
--
function getSpeed(vehicle)
    return math.floor(GetEntitySpeed(vehicle) * 3.6)
end

--
-- Return the fuel level of the vehicle
--
function getFuel(vehicle)
    return math.floor(GetVehicleFuelLevel(vehicle) / 0.6)
end

function getGear(vehicle)
    local gear = GetVehicleCurrentGear(vehicle)

    if (gear == 0 and getSpeed(vehicle) > 0) then
        gear = 'R'
    end

    return gear
end
