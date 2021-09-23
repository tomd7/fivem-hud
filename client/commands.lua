local restrictedCommands = false
local editHud = false

RegisterCommand('hud', function(source, args)
    editHud = not editHud
    toggleEditionMode(editHud)
end, false)