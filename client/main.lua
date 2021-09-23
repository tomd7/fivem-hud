--
-- Listen when the players enters and leaves a vehicle
--
Citizen.CreateThread(function()
    Citizen.Wait(0)

    while true do
        Citizen.Wait(0)

        local isInVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
        toggleVehicleHud(isInVehicle)

        -- Loop as long as the player state hasn't changed
        while IsPedInAnyVehicle(PlayerPedId(), false) == isInVehicle do
            Citizen.Wait(0)
        end
    end

end)

--
-- Update the HUD
--
Citizen.CreateThread(function()
    Citizen.Wait(0)

    while true do
        Citizen.Wait(0)
        
        local ped = PlayerPedId()
        local playerID = PlayerId()
        local veh = GetVehiclePedIsIn(ped, false)
        local vehicle = {
            speed = 0,
            fuel = 0,
            seatbelt = false,
            gear = 0
        }

        if veh ~= 0 then
            vehicle.speed = getSpeed(veh)
            vehicle.fuel = getFuel(veh)
            vehicle.seatbelt = false
            vehicle.gear = getGear(veh)
        end

        local player = {
            isUnderwater = IsPedSwimmingUnderWater(ped),
            oxygen = GetPlayerUnderwaterTimeRemaining(playerID) * 10,
            armour = GetPedArmour(ped),
            stamina = 100 - math.floor(GetPlayerSprintStaminaRemaining(playerID)),
            health = GetEntityHealth(ped) - 100,
            food = 100,
            drink = 100
        }
        
        updateHud(vehicle, player)
    end

end)
